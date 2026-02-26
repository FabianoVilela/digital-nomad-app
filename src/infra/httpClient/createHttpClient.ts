import type {
  HttpClientConfig,
  IHttpClient,
} from '@/domain/interfaces/IHttpClient';

import { FetchHttpClient } from './FetchHttpClient';

/**
 * Factory that creates a pre-configured `IHttpClient`.
 *
 * Usage:
 * ```ts
 * const api = createHttpClient({
 *   baseURL: 'https://api.example.com',
 *   timeout: 10_000,
 *   headers: { 'X-App-Version': '1.0.0' },
 *   retry: { maxRetries: 2 },
 *   tokenRefresh: {
 *     refreshFn: () => authService.refreshToken(),
 *     excludeUrls: ['/auth/refresh'],
 *   },
 * });
 * ```
 */
export function createHttpClient(config?: HttpClientConfig): IHttpClient {
  return new FetchHttpClient(config);
}
