import { SearchParams } from "~/types/search-params";

export function buildUrlWithFilters(
  basePath: string,
  filters: Partial<SearchParams>
): string {
  const urlParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      if (Array.isArray(value) && value.length > 0) {
        value.forEach((v) => urlParams.append(key, String(v)));
      } else if (!Array.isArray(value)) {
        urlParams.set(key, String(value));
      }
    }
  });

  const searchString = urlParams.toString();
  return searchString ? `${basePath}?${searchString}` : basePath;
}
