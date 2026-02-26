/**
 * HTTP Client port — domain-level abstraction.
 *
 * Every concrete HTTP adapter (Fetch, Axios, etc.) in the `infra` layer
 * MUST satisfy this contract. Domain code depends only on these types,
 * never on the concrete implementation.
 */

// ─── Request / Response types ────────────────────────────────────────────────

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';

export interface HttpRequestConfig<D = unknown> {
  /** Full or relative URL (resolved against `baseURL` when set). */
  url: string;
  method?: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  data?: D;
  /** Timeout in milliseconds. */
  timeout?: number;
  /** AbortSignal for manual cancellation. */
  signal?: AbortSignal;
  /**
   * Expected response type.
   * @default 'json'
   */
  responseType?: 'json' | 'text' | 'blob' | 'arrayBuffer';
}

export interface HttpResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: HttpRequestConfig;
}

// ─── Error ───────────────────────────────────────────────────────────────────

export interface HttpError<T = unknown> extends Error {
  /** HTTP status code (if the server responded). */
  status?: number;
  /** Parsed response body, if available. */
  data?: T;
  /** Original request configuration. */
  config: HttpRequestConfig;
  /** The raw `Response` object when available. */
  response?: HttpResponse<T>;
  /** Identifies this as an HTTP error. */
  isHttpError: true;
}

// ─── Interceptors ────────────────────────────────────────────────────────────

export type RequestInterceptor = (
  config: HttpRequestConfig,
) => HttpRequestConfig | Promise<HttpRequestConfig>;

export type RequestInterceptorError = (error: unknown) => unknown;

export type ResponseInterceptor<T = unknown> = (
  response: HttpResponse<T>,
) => HttpResponse<T> | Promise<HttpResponse<T>>;

export type ResponseInterceptorError = (error: unknown) => unknown;

export interface InterceptorEntry<
  TFulfilled extends (...args: never[]) => unknown,
  TRejected extends (...args: never[]) => unknown,
> {
  fulfilled: TFulfilled;
  rejected?: TRejected;
}

export interface InterceptorManager<
  TFulfilled extends (...args: never[]) => unknown,
  TRejected extends (...args: never[]) => unknown,
> {
  /** Register a new interceptor. Returns an id to eject later. */
  use(fulfilled: TFulfilled, rejected?: TRejected): number;
  /** Remove a previously registered interceptor by id. */
  eject(id: number): void;
  /** Iterate over all active interceptors. */
  forEach(fn: (entry: InterceptorEntry<TFulfilled, TRejected>) => void): void;
}

// ─── Retry configuration ────────────────────────────────────────────────────

export interface RetryConfig {
  /** Maximum number of retries (default: 3). */
  maxRetries?: number;
  /**
   * Base delay in ms between retries — exponential backoff is applied
   * automatically (default: 300ms).
   */
  baseDelay?: number;
  /**
   * HTTP status codes that are eligible for retry (default: [408, 429, 500, 502, 503, 504]).
   */
  retryableStatusCodes?: number[];
  /**
   * Custom predicate to decide if a failed request should be retried.
   * When provided, it takes precedence over `retryableStatusCodes`.
   */
  retryCondition?: (error: HttpError) => boolean;
}

// ─── Token refresh ───────────────────────────────────────────────────────────

export interface TokenRefreshConfig {
  /** Async callback that performs the token refresh and returns the new access token. */
  refreshFn: () => Promise<string>;
  /**
   * Status code that signals an expired token (default: 401).
   */
  statusCode?: number;
  /**
   * URLs that should NOT trigger a refresh (e.g. the refresh-token endpoint itself).
   */
  excludeUrls?: string[];
}

// ─── HTTP Client contract ────────────────────────────────────────────────────

export interface HttpClientConfig {
  baseURL?: string;
  headers?: Record<string, string>;
  timeout?: number;
  retry?: RetryConfig;
  tokenRefresh?: TokenRefreshConfig;
}

export interface IHttpClient {
  // ── Convenience methods ──────────────────────────
  get<T = unknown>(
    url: string,
    config?: Omit<HttpRequestConfig, 'url' | 'method'>,
  ): Promise<HttpResponse<T>>;

  post<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: Omit<HttpRequestConfig, 'url' | 'method' | 'data'>,
  ): Promise<HttpResponse<T>>;

  put<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: Omit<HttpRequestConfig, 'url' | 'method' | 'data'>,
  ): Promise<HttpResponse<T>>;

  patch<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: Omit<HttpRequestConfig, 'url' | 'method' | 'data'>,
  ): Promise<HttpResponse<T>>;

  delete<T = unknown>(
    url: string,
    config?: Omit<HttpRequestConfig, 'url' | 'method'>,
  ): Promise<HttpResponse<T>>;

  head<T = unknown>(
    url: string,
    config?: Omit<HttpRequestConfig, 'url' | 'method'>,
  ): Promise<HttpResponse<T>>;

  // ── Generic request ──────────────────────────────
  request<T = unknown>(config: HttpRequestConfig): Promise<HttpResponse<T>>;

  // ── Interceptors ─────────────────────────────────
  readonly interceptors: {
    request: InterceptorManager<RequestInterceptor, RequestInterceptorError>;
    response: InterceptorManager<ResponseInterceptor, ResponseInterceptorError>;
  };

  // ── Defaults ─────────────────────────────────────
  readonly defaults: HttpClientConfig;

  // ── Utilities ────────────────────────────────────
  /** Configure default headers that are sent with every request. */
  setHeader(name: string, value: string): void;
  /** Remove a previously set default header. */
  removeHeader(name: string): void;
  /** Update the bearer token sent with every request. */
  setAuthToken(token: string): void;
  /** Remove the auth token from default headers. */
  clearAuthToken(): void;
}
