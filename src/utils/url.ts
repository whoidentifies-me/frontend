import type { BaseFilters } from "~/api";

export function buildUrlWithFilters(
  basePath: string,
  filters: BaseFilters
): string {
  const urlParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((v) => urlParams.append(key, String(v)));
      } else {
        urlParams.set(key, String(value));
      }
    }
  });

  const searchString = urlParams.toString();
  return searchString ? `${basePath}?${searchString}` : basePath;
}
