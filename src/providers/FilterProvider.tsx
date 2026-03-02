import { useLocation, useNavigate, useSearchParams } from "@solidjs/router";
import {
  createContext,
  createEffect,
  createSignal,
  on,
  useContext,
  type Accessor,
  type ParentComponent,
} from "solid-js";
import { routes } from "~/config/routes";
import type { UIFilters } from "~/types/filters";
import type { SearchParams } from "~/types/search-params";
import {
  searchParamsToUIfilters,
  uiFiltersToSearchParams,
} from "~/utils/filter-url";
import { buildUrlWithFilters } from "~/utils/url";

interface FilterContextValue {
  filters: Accessor<UIFilters>;
  handleFiltersChange: (newFilters: Partial<UIFilters>) => void;
  clearFilters: () => void;
}

const FilterContext = createContext<FilterContextValue>();

export const FilterProvider: ParentComponent = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation<SearchParams>();
  const navigate = useNavigate();

  // Initialize from URL
  const [filters, setFilters] = createSignal<UIFilters>(
    searchParamsToUIfilters(searchParams)
  );

  // URL → signal: when URL changes externally (back/forward, link click)
  createEffect(
    on(
      () => JSON.stringify(searchParams),
      () => setFilters(searchParamsToUIfilters(searchParams))
    )
  );

  const clearFilters = () => {
    setFilters({
      q: filters().q,
      trade_name: [],
      purpose: [],
      claim_path: [],
      entitlement: [],
      country: [],
    });
    setSearchParams(uiFiltersToSearchParams(filters()));
  };

  const handleFiltersChange = (newFilters: Partial<UIFilters>) => {
    const mergedFilters: UIFilters = { ...filters(), ...newFilters };
    setFilters(mergedFilters);

    // Signal → URL
    const stringParams = uiFiltersToSearchParams(mergedFilters);
    const shouldNavigate = !location.pathname.startsWith(routes.search.index);

    if (shouldNavigate) {
      navigate(buildUrlWithFilters(routes.search.index, stringParams));
    } else {
      setSearchParams(stringParams);
    }
  };

  return (
    <FilterContext.Provider
      value={{ filters, handleFiltersChange, clearFilters }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export function useSearchFilters(
  searchCategory?: "intended-uses" | "relying-parties"
) {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useSearchFilters must be used within a FilterProvider");
  }

  const formAction = () =>
    searchCategory
      ? `${routes.search.index}/${searchCategory}`
      : routes.search.index;

  return {
    formAction,
    filters: context.filters,
    handleFiltersChange: context.handleFiltersChange,
    clearFilters: context.clearFilters,
  };
}
