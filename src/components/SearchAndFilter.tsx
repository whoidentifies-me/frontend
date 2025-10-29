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
  const [searchParams, setSearchParams] = useSearchParams<{ q?: string }>();
  const { filters, handleFiltersChange } = useSearchFilters(
    searchParams,
    setSearchParams
  );
  const toggleFilterCollapsed = () => {
    setFilterCollapsed((state) => !state);
  };
  return (
    <div>
      <SearchBar
        value={searchParams.q}
        category={params.searchCategory}
        onFilterClick={toggleFilterCollapsed}
      ></SearchBar>
      <Show when={!filterCollapsed()}>
        <Filters
          filters={filters()}
          onFiltersChange={handleFiltersChange}
        ></Filters>
      </Show>
    </div>
  );
};
