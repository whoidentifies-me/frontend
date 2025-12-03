import { Component, createSignal } from "solid-js";
import { SearchBar } from "./SearchBar";
import { Filters } from "./filter/Filters";
import { ActiveFilters } from "./filter/ActiveFilters";
import { useSearchFilters } from "~/composables/useSearchFilters";
import type { BaseFilters } from "~/api/types";

export const SearchAndFilter: Component<{
  collapseFilters?: boolean;
  searchCategory?: "intended-uses" | "relying-parties";
}> = (params) => {
  const [filterCollapsed, setFilterCollapsed] = createSignal<boolean>(
    !!params.collapseFilters
  );
  const toggleFilterCollapsed = () => setFilterCollapsed((state) => !state);

  const { formAction, filters, handleFiltersChange } = useSearchFilters(
    params.searchCategory
  );

  const handleRemoveFilter = (key: keyof BaseFilters, value?: string) => {
    const currentFilters = filters();
    const currentValue = currentFilters[key];

    if (!value) {
      // Remove entire filter
      handleFiltersChange({ [key]: undefined });
    } else if (Array.isArray(currentValue)) {
      // Remove specific value from array
      const newArray = currentValue.filter((v) => v !== value);
      handleFiltersChange({
        [key]: newArray.length > 0 ? newArray : undefined,
      });
    } else {
      // Single value filter - remove entirely
      handleFiltersChange({ [key]: undefined });
    }
  };
  return (
    <search class="rounded-2xl p-6 bg-white border-black/20 border">
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
        />
      </form>
    </search>
  );
};
