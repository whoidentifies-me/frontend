import { withRetry } from "~/utils/withRetry";

class HttpError extends Error {
  constructor(public status: number) {
    super(`HTTP error! status: ${status}`);
  }
}

const NON_RETRYABLE_STATUS_CODES = new Set([400, 401, 403, 404, 405, 409, 422]);

export const fetchInstance = async <T>({
  url,
  method,
  params,
  data,
  headers,
  signal,
}: {
  url: string;
  method: string;
  params?: Record<string, unknown>;
  data?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}): Promise<T> => {
  const normalizedParams = new URLSearchParams();
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value == null) continue;
      if (Array.isArray(value)) {
        for (const item of value) {
          normalizedParams.append(key, String(item));
        }
      } else {
        normalizedParams.append(key, String(value));
      }
    }
  }
  const queryString = normalizedParams.size ? `?${normalizedParams}` : "";

  const response = await withRetry(
    async () => {
      const res = await fetch(`${url}${queryString}`, {
        method,
        headers: {
          ...headers,
          ...(data ? { "Content-Type": "application/json" } : undefined),
        },
        body: data ? JSON.stringify(data) : undefined,
        signal,
      });
      if (!res.ok) throw new HttpError(res.status);
      return res;
    },
    {
      shouldRetry: (e: unknown) =>
        !(e instanceof HttpError && NON_RETRYABLE_STATUS_CODES.has(e.status)),
    }
  );

  return response.json();
};
