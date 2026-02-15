import { SearchParams } from "~/types/search-params";

export function buildUrlWithFilters(
  basePath: string,
  filters: Partial<SearchParams>
): string {
  const urlParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      if (Array.isArray(value) && value.length > 0) {
        value.forEach((v) => urlParams.append(key, String(v)));
      } else {
        urlParams.set(key, String(value));
      }
    }
  });

  const searchString = urlParams.toString();
  return searchString ? `${basePath}?${searchString}` : basePath;
}
