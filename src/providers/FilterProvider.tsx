import { useLocation, useNavigate, useSearchParams } from "@solidjs/router";
import {
  createContext,
  createEffect,
  createSignal,
  on,
  useContext,
  useTransition,
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
  deferredFilters: Accessor<UIFilters>;
  isPending: Accessor<boolean>;
  handleFiltersChange: (newFilters: Partial<UIFilters>) => void;
  clearFilters: () => void;
}

const FilterContext = createContext<FilterContextValue>();

export const FilterProvider: ParentComponent = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation<SearchParams>();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const initial = searchParamsToUIfilters(searchParams);
  const [filters, setFilters] = createSignal<UIFilters>(initial);
  const [deferredFilters, setDeferredFilters] =
    createSignal<UIFilters>(initial);

  // URL → signals: only for external URL changes (back/forward navigation).
  // Skips when signal already matches URL to avoid a feedback loop with
  // handleFiltersChange, which would cause an unwanted scroll-to-top.
  createEffect(
    on(
      () => JSON.stringify(searchParams),
      () => {
        const urlFilters = searchParamsToUIfilters(searchParams);
        if (JSON.stringify(urlFilters) !== JSON.stringify(filters())) {
          setFilters(urlFilters);
          startTransition(() => setDeferredFilters(urlFilters));
        }
      }
    )
  );

  const applyFilters = (newFilters: UIFilters) => {
    // Update immediately for responsive filter UI
    setFilters(newFilters);
    // Update inside transition so results keep old content with pending overlay
    startTransition(() => setDeferredFilters(newFilters));
  };

  const clearFilters = () => {
    applyFilters({
      q: filters().q,
      trade_name: [],
      purpose: [],
      claim_path: [],
      entitlement: [],
      country: [],
    });
    setSearchParams(uiFiltersToSearchParams(filters()), { scroll: false });
  };

  const handleFiltersChange = (newFilters: Partial<UIFilters>) => {
    const mergedFilters: UIFilters = { ...filters(), ...newFilters };
    const stringParams = uiFiltersToSearchParams(mergedFilters);
    const shouldNavigate = !location.pathname.startsWith(routes.search.results);

    applyFilters(mergedFilters);

    if (shouldNavigate) {
      navigate(
        buildUrlWithFilters(routes.search.index, stringParams, "#results")
      );
    } else {
      setSearchParams(stringParams, { scroll: false });
    }
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        deferredFilters,
        isPending,
        handleFiltersChange,
        clearFilters,
      }}
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
    deferredFilters: context.deferredFilters,
    isPending: context.isPending,
    handleFiltersChange: context.handleFiltersChange,
    clearFilters: context.clearFilters,
  };
}
