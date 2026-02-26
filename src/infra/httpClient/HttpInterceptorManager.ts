import type {
  InterceptorEntry,
  InterceptorManager,
} from '@/domain/interfaces/IHttpClient';

/**
 * Manages an ordered list of interceptors.
 * Mirrors the Axios `InterceptorManager` API (use / eject / forEach).
 */
export class HttpInterceptorManager<
  TFulfilled extends (...args: never[]) => unknown,
  TRejected extends (...args: never[]) => unknown,
> implements InterceptorManager<TFulfilled, TRejected>
{
  private handlers = new Map<number, InterceptorEntry<TFulfilled, TRejected>>();
  private nextId = 0;

  use(fulfilled: TFulfilled, rejected?: TRejected): number {
    const id = this.nextId++;
    this.handlers.set(id, { fulfilled, rejected });
    return id;
  }

  eject(id: number): void {
    this.handlers.delete(id);
  }

  forEach(fn: (entry: InterceptorEntry<TFulfilled, TRejected>) => void): void {
    for (const entry of this.handlers.values()) {
      fn(entry);
    }
  }
}
