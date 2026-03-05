import { SearchParams } from "~/types/search-params";

export function buildUrlWithFilters(
  basePath: string,
  filters: Partial<SearchParams>,
  anchor?: string
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

  let result = basePath;
  const searchString = urlParams.toString();
  if (searchString) {
    result += `?${searchString}`;
  }
  if (anchor) {
    result += `#${anchor}`;
  }
  return result;
}
