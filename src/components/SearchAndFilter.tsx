import { Component, createSignal } from "solid-js";
import { SearchBar } from "./SearchBar";
import { Filters } from "./filter/Filters";
import { ActiveFilters } from "./filter/ActiveFilters";
import { useSearchFilters } from "~/providers/FilterProvider";
import type { UIFilters, FilterValue } from "~/types/filters";
import { LIKE_FILTER_KEYS, type LikeFilterKey } from "~/types/filters";

export const SearchAndFilter: Component<{
  collapseFilters?: boolean;
  searchCategory?: "intended-uses" | "relying-parties";
}> = (params) => {
  const [filterCollapsed, setFilterCollapsed] = createSignal<boolean>(
    !!params.collapseFilters
  );
  const toggleFilterCollapsed = () => setFilterCollapsed((state) => !state);

  const { formAction, filters, handleFiltersChange, clearFilters } =
    useSearchFilters(params.searchCategory);

  const handleRemoveFilter = (
    key: keyof UIFilters,
    value?: string,
    mode?: FilterValue["type"]
  ) => {
    const currentFilters = filters();
    const currentValue = currentFilters[key];

    if (!value) {
      // Remove entire filter (booleans)
      handleFiltersChange({ [key]: undefined });
    } else if (LIKE_FILTER_KEYS.has(key as LikeFilterKey)) {
      // FilterValue[] filter - match by both value and mode
      const filterValues = currentValue as FilterValue[] | null | undefined;
      if (filterValues) {
        const newArray = filterValues.filter(
          (fv) => !(fv.value === value && fv.type === (mode || "exact"))
        );
        handleFiltersChange({ [key]: newArray });
      }
    } else if (Array.isArray(currentValue)) {
      // string[] filter (country)
      const newArray = (currentValue as string[]).filter((v) => v !== value);
      handleFiltersChange({ [key]: newArray });
    } else {
      handleFiltersChange({ [key]: undefined });
    }
  };

  return (
    <search class="rounded-2xl md:p-6 sm:p-4 p-2 py-4  bg-white border-black/20 border">
      <form
        role="search"
        action={formAction()}
        method="get"
        onSubmit={(e) => e.preventDefault()}
      >
        <SearchBar
          value={filters().q}
          category={params.searchCategory}
          onFilterClick={toggleFilterCollapsed}
          onSearchSubmit={(q) => handleFiltersChange({ q })}
          aria-expanded={!filterCollapsed()}
          aria-controls="search-filters"
        ></SearchBar>
        <div
          class="filter-collapse-container"
          data-expanded={!filterCollapsed()}
          id="search-filters"
          role="region"
          aria-label="Search filters"
          inert={filterCollapsed()}
        >
          <div class="filter-collapse-inner">
            <Filters
              filters={filters()}
              onFiltersChange={handleFiltersChange}
            ></Filters>
          </div>
        </div>
        <ActiveFilters
          filters={filters()}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={clearFilters}
        />
      </form>
    </search>
  );
};
