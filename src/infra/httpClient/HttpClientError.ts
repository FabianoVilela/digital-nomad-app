import type {
  HttpError,
  HttpRequestConfig,
  HttpResponse,
} from '@/domain/interfaces/IHttpClient';

/**
 * Concrete HTTP error that satisfies the domain `HttpError` contract.
 *
 * Works like AxiosError — carries status, parsed body, request config
 * and the full response when available.
 */
export class HttpClientError<T = unknown>
  extends Error
  implements HttpError<T>
{
  readonly isHttpError = true as const;
  status?: number;
  data?: T;
  config: HttpRequestConfig;
  response?: HttpResponse<T>;

  constructor(
    message: string,
    config: HttpRequestConfig,
    response?: HttpResponse<T>,
  ) {
    super(message);
    this.name = 'HttpClientError';
    this.config = config;

    if (response) {
      this.status = response.status;
      this.data = response.data;
      this.response = response;
    }
  }

  /** Type-guard helper — mirrors `axios.isAxiosError()`. */
  static isHttpClientError(error: unknown): error is HttpClientError {
    return (
      error instanceof Error &&
      'isHttpError' in error &&
      (error as HttpClientError).isHttpError === true
    );
  }
}
