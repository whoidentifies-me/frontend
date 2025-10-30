import { Component, createSignal, Show } from "solid-js";
import { SearchBar } from "./SearchBar";
import { Filters } from "./filter/Filters";
import { useSearchParams } from "@solidjs/router";
import { useSearchFilters } from "~/composables/useSearchFilters";

export const SearchAndFilter: Component<{
  collapseFilters?: boolean;
  searchCategory?: "intended-uses" | "relying-parties";
}> = (params) => {
  const [filterCollapsed, setFilterCollapsed] = createSignal<boolean>(
    !!params.collapseFilters
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const { filters, handleFiltersChange } = useSearchFilters(
    searchParams,
    setSearchParams
  );
  const searchValue = (): string | undefined => {
    return Array.isArray(searchParams.q) ? searchParams.q[0] : searchParams.q;
  };
  const toggleFilterCollapsed = () => {
    setFilterCollapsed((state) => !state);
  };
  const onSearchSubmit = (value: string | undefined) => {
    setSearchParams({
      q: value,
    });
  };
  return (
    <search>
      <form role="search" onSubmit={(e) => e.preventDefault()}>
        <SearchBar
          value={searchValue()}
          category={params.searchCategory}
          onFilterClick={toggleFilterCollapsed}
          onSearchSubmit={onSearchSubmit}
        ></SearchBar>
        <Show when={!filterCollapsed()}>
          <Filters
            filters={filters()}
            onFiltersChange={handleFiltersChange}
          ></Filters>
        </Show>
      </form>
    </search>
  );
};
