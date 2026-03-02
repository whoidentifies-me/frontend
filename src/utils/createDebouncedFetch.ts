import { createSignal } from "solid-js";

interface DebouncedFetch<T> {
  /** Reactive accessor for the latest result */
  data: () => T | undefined;
  /** Call to trigger a debounced fetch. Aborts any in-flight request. */
  trigger: (input?: string) => void;
}

/**
 * Creates a debounced, abort-aware async fetcher.
 *
 * - Debounces calls by `delay` ms (default 300)
 * - Aborts the previous in-flight HTTP request when a new one fires
 * - Exposes a reactive signal with the latest result
 *
 * The `fetchFn` receives an `AbortSignal` so callers can pass it to `fetch()`.
 */
export function createDebouncedFetch<T>(
  fetchFn: (input: string | undefined, signal: AbortSignal) => Promise<T>,
  delay = 300
): DebouncedFetch<T> {
  const [data, setData] = createSignal<T>();
  let timer: ReturnType<typeof setTimeout> | undefined;
  let controller: AbortController | undefined;

  const trigger = (input?: string) => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      // Abort previous in-flight request
      controller?.abort();
      controller = new AbortController();
      const { signal } = controller;

      try {
        const result = await fetchFn(input, signal);
        if (!signal.aborted) {
          setData(() => result);
        }
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") {
          // Expected when a newer request supersedes this one
          return;
        }
        throw e;
      }
    }, delay);
  };

  return { data, trigger };
}
