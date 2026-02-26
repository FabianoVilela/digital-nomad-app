import type {
  HttpClientConfig,
  HttpRequestConfig,
  HttpResponse,
  IHttpClient,
  RequestInterceptor,
  RequestInterceptorError,
  ResponseInterceptor,
  ResponseInterceptorError,
  RetryConfig,
  TokenRefreshConfig,
} from '@/domain/interfaces/IHttpClient';

import { HttpClientError } from './HttpClientError';
import { HttpInterceptorManager } from './HttpInterceptorManager';

// ─── Default constants ──────────────────────────────────────────────────────

const DEFAULT_TIMEOUT = 30_000; // 30 s
const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_BASE_DELAY = 300; // ms
const DEFAULT_RETRYABLE_STATUS_CODES = [408, 429, 500, 502, 503, 504];
const DEFAULT_REFRESH_STATUS_CODE = 401;

// ─── Helpers ────────────────────────────────────────────────────────────────

function buildURL(
  baseURL: string | undefined,
  url: string,
  params?: Record<string, string | number | boolean | undefined>,
): string {
  let fullUrl = url;

  // Resolve relative URLs against baseURL
  if (baseURL && !url.startsWith('http://') && !url.startsWith('https://')) {
    const base = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
    const path = url.startsWith('/') ? url : `/${url}`;
    fullUrl = `${base}${path}`;
  }

  // Append query parameters
  if (params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    }

    const qs = searchParams.toString();
    if (qs) {
      const separator = fullUrl.includes('?') ? '&' : '?';
      fullUrl = `${fullUrl}${separator}${qs}`;
    }
  }

  return fullUrl;
}

function parseResponseHeaders(headers: Headers): Record<string, string> {
  const parsed: Record<string, string> = {};
  headers.forEach((value, key) => {
    parsed[key] = value;
  });
  return parsed;
}

async function parseResponseBody(
  res: Response,
  responseType: HttpRequestConfig['responseType'] = 'json',
): Promise<unknown> {
  try {
    switch (responseType) {
      case 'text':
        return await res.text();
      case 'blob':
        return await res.blob();
      case 'arrayBuffer':
        return await res.arrayBuffer();
      default: {
        const text = await res.text();
        if (!text) return null;
        try {
          return JSON.parse(text);
        } catch {
          return text;
        }
      }
    }
  } catch {
    return null;
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function calculateBackoff(attempt: number, baseDelay: number): number {
  // Exponential backoff with jitter
  const exponentialDelay = baseDelay * 2 ** attempt;
  const jitter = Math.random() * baseDelay;
  return exponentialDelay + jitter;
}

// ─── FetchHttpClient ────────────────────────────────────────────────────────

/**
 * HTTP client powered by the native `fetch` API.
 *
 * Feature parity with Axios:
 *  • Request / response interceptors
 *  • Automatic retry with exponential backoff + jitter
 *  • Transparent token refresh on 401
 *  • Configurable timeout via AbortController
 *  • Convenience methods (get, post, put, patch, delete, head)
 *  • Default headers management
 *  • Query-string serialization
 *  • Typed error handling with HttpClientError
 */
export class FetchHttpClient implements IHttpClient {
  readonly defaults: HttpClientConfig;

  readonly interceptors: {
    request: HttpInterceptorManager<
      RequestInterceptor,
      RequestInterceptorError
    >;
    response: HttpInterceptorManager<
      ResponseInterceptor,
      ResponseInterceptorError
    >;
  };

  /** Guards against concurrent token refresh calls. */
  private refreshPromise: Promise<string> | null = null;
  /** Queue of requests waiting for the refresh to finish. */
  private refreshQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
  }> = [];

  constructor(config: HttpClientConfig = {}) {
    this.defaults = {
      ...config,
      headers: { ...config.headers },
      timeout: config.timeout ?? DEFAULT_TIMEOUT,
    };

    this.interceptors = {
      request: new HttpInterceptorManager(),
      response: new HttpInterceptorManager(),
    };
  }

  // ── Convenience methods ──────────────────────────────────────────────────

  async get<T = unknown>(
    url: string,
    config?: Omit<HttpRequestConfig, 'url' | 'method'>,
  ): Promise<HttpResponse<T>> {
    return this.request<T>({ ...config, url, method: 'GET' });
  }

  async post<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: Omit<HttpRequestConfig, 'url' | 'method' | 'data'>,
  ): Promise<HttpResponse<T>> {
    return this.request<T>({ ...config, url, method: 'POST', data });
  }

  async put<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: Omit<HttpRequestConfig, 'url' | 'method' | 'data'>,
  ): Promise<HttpResponse<T>> {
    return this.request<T>({ ...config, url, method: 'PUT', data });
  }

  async patch<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: Omit<HttpRequestConfig, 'url' | 'method' | 'data'>,
  ): Promise<HttpResponse<T>> {
    return this.request<T>({ ...config, url, method: 'PATCH', data });
  }

  async delete<T = unknown>(
    url: string,
    config?: Omit<HttpRequestConfig, 'url' | 'method'>,
  ): Promise<HttpResponse<T>> {
    return this.request<T>({ ...config, url, method: 'DELETE' });
  }

  async head<T = unknown>(
    url: string,
    config?: Omit<HttpRequestConfig, 'url' | 'method'>,
  ): Promise<HttpResponse<T>> {
    return this.request<T>({ ...config, url, method: 'HEAD' });
  }

  // ── Generic request ──────────────────────────────────────────────────────

  async request<T = unknown>(
    config: HttpRequestConfig,
  ): Promise<HttpResponse<T>> {
    // 1 ── Merge with defaults
    let mergedConfig = this.mergeConfig(config);

    // 2 ── Run request interceptors
    mergedConfig = await this.runRequestInterceptors(mergedConfig);

    // 3 ── Execute with retry logic
    let response: HttpResponse<T>;
    try {
      response = await this.executeWithRetry<T>(mergedConfig);
    } catch (error) {
      // 3a ── Handle token refresh on 401 (or configured status)
      if (this.shouldRefreshToken(error, mergedConfig)) {
        const newToken = await this.handleTokenRefresh();
        mergedConfig = {
          ...mergedConfig,
          headers: {
            ...mergedConfig.headers,
            Authorization: `Bearer ${newToken}`,
          },
        };
        response = await this.executeWithRetry<T>(mergedConfig);
      } else {
        throw error;
      }
    }

    // 4 ── Run response interceptors
    response = await this.runResponseInterceptors(response);

    return response;
  }

  // ── Header utilities ─────────────────────────────────────────────────────

  setHeader(name: string, value: string): void {
    if (!this.defaults.headers) {
      this.defaults.headers = {};
    }
    this.defaults.headers[name] = value;
  }

  removeHeader(name: string): void {
    if (this.defaults.headers) {
      delete this.defaults.headers[name];
    }
  }

  setAuthToken(token: string): void {
    this.setHeader('Authorization', `Bearer ${token}`);
  }

  clearAuthToken(): void {
    this.removeHeader('Authorization');
  }

  // ── Private helpers ──────────────────────────────────────────────────────

  private mergeConfig(config: HttpRequestConfig): HttpRequestConfig {
    return {
      ...config,
      method: config.method ?? 'GET',
      headers: {
        ...this.defaults.headers,
        ...config.headers,
      },
      timeout: config.timeout ?? this.defaults.timeout,
    };
  }

  // ── Interceptor runners ──────────────────────────────────────────────────

  private async runRequestInterceptors(
    config: HttpRequestConfig,
  ): Promise<HttpRequestConfig> {
    let currentConfig = config;

    // Collect all interceptors, then run sequentially (supports both sync and async)
    const entries: Array<{
      fulfilled: (
        c: HttpRequestConfig,
      ) => HttpRequestConfig | Promise<HttpRequestConfig>;
      rejected?: (error: unknown) => unknown;
    }> = [];

    this.interceptors.request.forEach((entry) => {
      entries.push(entry);
    });

    for (const { fulfilled, rejected } of entries) {
      try {
        currentConfig = await fulfilled(currentConfig);
      } catch (error) {
        if (rejected) {
          rejected(error);
        } else {
          throw error;
        }
      }
    }

    return currentConfig;
  }

  private async runResponseInterceptors<T>(
    response: HttpResponse<T>,
  ): Promise<HttpResponse<T>> {
    let currentResponse = response as HttpResponse;

    const entries: Array<{
      fulfilled: (r: HttpResponse) => HttpResponse | Promise<HttpResponse>;
      rejected?: (error: unknown) => unknown;
    }> = [];

    this.interceptors.response.forEach((entry) => {
      entries.push(entry);
    });

    for (const { fulfilled, rejected } of entries) {
      try {
        currentResponse = await fulfilled(currentResponse);
      } catch (error) {
        if (rejected) {
          rejected(error);
        } else {
          throw error;
        }
      }
    }

    return currentResponse as HttpResponse<T>;
  }

  // ── Retry logic ──────────────────────────────────────────────────────────

  private async executeWithRetry<T>(
    config: HttpRequestConfig,
  ): Promise<HttpResponse<T>> {
    const retryConfig = this.getRetryConfig();
    const maxRetries = retryConfig.maxRetries ?? DEFAULT_MAX_RETRIES;
    const baseDelay = retryConfig.baseDelay ?? DEFAULT_BASE_DELAY;

    let lastError: HttpClientError | undefined;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await this.executeFetch<T>(config);
      } catch (error) {
        if (!HttpClientError.isHttpClientError(error)) {
          throw error;
        }

        lastError = error;

        const isLastAttempt = attempt === maxRetries;
        if (isLastAttempt || !this.shouldRetry(error, retryConfig)) {
          throw error;
        }

        const delay = calculateBackoff(attempt, baseDelay);
        await sleep(delay);
      }
    }

    // Should never reach here, but TS needs it
    throw lastError;
  }

  private shouldRetry(
    error: HttpClientError,
    retryConfig: RetryConfig,
  ): boolean {
    // Don't retry if the request was manually aborted
    if (error.message === 'Request aborted') {
      return false;
    }

    // Custom retry condition has priority
    if (retryConfig.retryCondition) {
      return retryConfig.retryCondition(error);
    }

    // Network errors (no status) are retryable
    if (!error.status) {
      return true;
    }

    const retryableStatusCodes =
      retryConfig.retryableStatusCodes ?? DEFAULT_RETRYABLE_STATUS_CODES;

    return retryableStatusCodes.includes(error.status);
  }

  private getRetryConfig(): RetryConfig {
    return this.defaults.retry ?? {};
  }

  // ── Core fetch execution ─────────────────────────────────────────────────

  private async executeFetch<T>(
    config: HttpRequestConfig,
  ): Promise<HttpResponse<T>> {
    const url = buildURL(this.defaults.baseURL, config.url, config.params);
    const timeout = config.timeout ?? this.defaults.timeout ?? DEFAULT_TIMEOUT;

    // Set up timeout via AbortController
    const controller = new AbortController();
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    // Combine user signal with timeout signal
    const userSignal = config.signal;

    if (userSignal?.aborted) {
      throw new HttpClientError('Request aborted', config);
    }

    // Listen for user abort
    const onUserAbort = () => {
      controller.abort();
    };

    if (userSignal) {
      userSignal.addEventListener('abort', onUserAbort, { once: true });
    }

    timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);

    // Build fetch init
    const fetchInit: RequestInit = {
      method: config.method ?? 'GET',
      headers: this.buildFetchHeaders(config),
      signal: controller.signal,
    };

    // Attach body for methods that support it
    if (
      config.data !== undefined &&
      config.method !== 'GET' &&
      config.method !== 'HEAD'
    ) {
      if (
        typeof config.data === 'string' ||
        config.data instanceof FormData ||
        config.data instanceof Blob ||
        config.data instanceof ArrayBuffer
      ) {
        fetchInit.body = config.data as BodyInit;
      } else {
        fetchInit.body = JSON.stringify(config.data);
        // Ensure Content-Type is set for JSON
        const headers = fetchInit.headers as Record<string, string>;
        if (!headers['Content-Type'] && !headers['content-type']) {
          headers['Content-Type'] = 'application/json';
        }
      }
    }

    try {
      const res = await fetch(url, fetchInit);

      const responseHeaders = parseResponseHeaders(res.headers);
      const body = await parseResponseBody(res, config.responseType);

      const httpResponse: HttpResponse<T> = {
        data: body as T,
        status: res.status,
        statusText: res.statusText,
        headers: responseHeaders,
        config,
      };

      // Throw on non-2xx responses (like Axios default behavior)
      if (!res.ok) {
        throw new HttpClientError(
          `Request failed with status ${res.status}: ${res.statusText}`,
          config,
          httpResponse,
        );
      }

      return httpResponse;
    } catch (error) {
      if (HttpClientError.isHttpClientError(error)) {
        throw error;
      }

      // Handle timeout
      if (error instanceof DOMException && error.name === 'AbortError') {
        const isUserAbort = userSignal?.aborted ?? false;
        const message = isUserAbort
          ? 'Request aborted'
          : `Request timeout of ${timeout}ms exceeded`;

        throw new HttpClientError(message, config);
      }

      // Handle network errors
      if (error instanceof TypeError) {
        throw new HttpClientError(`Network error: ${error.message}`, config);
      }

      throw new HttpClientError(
        error instanceof Error ? error.message : 'Unknown error',
        config,
      );
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (userSignal) {
        userSignal.removeEventListener('abort', onUserAbort);
      }
    }
  }

  private buildFetchHeaders(config: HttpRequestConfig): Record<string, string> {
    const headers: Record<string, string> = {};

    // Default Accept header
    if (!config.headers?.Accept && !config.headers?.accept) {
      headers.Accept = 'application/json';
    }

    // Merge config headers
    if (config.headers) {
      for (const [key, value] of Object.entries(config.headers)) {
        headers[key] = value;
      }
    }

    return headers;
  }

  // ── Token refresh ────────────────────────────────────────────────────────

  private shouldRefreshToken(
    error: unknown,
    config: HttpRequestConfig,
  ): boolean {
    const tokenConfig = this.defaults.tokenRefresh;
    if (!tokenConfig) return false;

    if (!HttpClientError.isHttpClientError(error)) return false;

    const refreshStatusCode =
      tokenConfig.statusCode ?? DEFAULT_REFRESH_STATUS_CODE;

    if (error.status !== refreshStatusCode) return false;

    // Don't refresh if the request URL is in the exclude list
    if (tokenConfig.excludeUrls?.length) {
      const requestUrl = config.url;
      if (
        tokenConfig.excludeUrls.some((excludeUrl) =>
          requestUrl.includes(excludeUrl),
        )
      ) {
        return false;
      }
    }

    return true;
  }

  private async handleTokenRefresh(): Promise<string> {
    const tokenConfig = this.defaults.tokenRefresh as TokenRefreshConfig;

    // If a refresh is already in progress, queue this request
    if (this.refreshPromise) {
      return new Promise<string>((resolve, reject) => {
        this.refreshQueue.push({ resolve, reject });
      });
    }

    try {
      this.refreshPromise = tokenConfig.refreshFn();
      const newToken = await this.refreshPromise;

      // Update default headers with new token
      this.setAuthToken(newToken);

      // Resolve all queued requests
      for (const { resolve } of this.refreshQueue) {
        resolve(newToken);
      }

      return newToken;
    } catch (error) {
      // Reject all queued requests
      for (const { reject } of this.refreshQueue) {
        reject(error);
      }

      throw error;
    } finally {
      this.refreshPromise = null;
      this.refreshQueue = [];
    }
  }
}
