import { useLocation, useNavigate, useSearchParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import type { UIFilters } from "~/types/filters";
import {
  searchParamsToUIfilters,
  uiFiltersToSearchParams,
} from "~/utils/filter-url";
import { buildUrlWithFilters } from "~/utils/url";
import { routes } from "~/config/routes";
import { SearchParams } from "~/types/search-params";

export function useSearchFilters(
  searchCategory?: "intended-uses" | "relying-parties"
) {
  const location = useLocation<SearchParams>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const formAction = () =>
    searchCategory
      ? `${routes.search.index}/${searchCategory}`
      : routes.search.index;

  const shouldNavigate = () => {
    return !location.pathname.startsWith(routes.search.index);
  };

  const filters = createMemo(() => searchParamsToUIfilters(searchParams));

  const handleFiltersChange = (newFilters: Partial<UIFilters>) => {
    const stringParams = uiFiltersToSearchParams(newFilters);
    console.log("params", stringParams, newFilters);

    if (shouldNavigate()) {
      const url = buildUrlWithFilters(formAction(), stringParams);
      navigate(url);
    } else {
      setSearchParams(stringParams);
    }
  };

  return {
    formAction,
    filters,
    handleFiltersChange,
  };
}
