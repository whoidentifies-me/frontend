/**
 * Wraps an async function with retry logic and exponential backoff.
 *
 * - Retries are skipped for aborted requests (AbortError).
 * - Only retries errors where `shouldRetry` returns true (defaults to all).
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  {
    retries = 3,
    delay = 1000,
    backoff = 2,
    shouldRetry,
  }: {
    retries?: number;
    delay?: number;
    backoff?: number;
    shouldRetry?: (e: unknown) => boolean;
  } = {}
): Promise<T> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") throw e;
      if (attempt === retries || (shouldRetry && !shouldRetry(e))) throw e;
      await new Promise((r) => setTimeout(r, delay * backoff ** attempt));
    }
  }
  throw new Error("unreachable");
}
