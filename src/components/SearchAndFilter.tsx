import { Component, createSignal, Show } from "solid-js";
import { SearchBar } from "./SearchBar";
import { Filters } from "./filter/Filters";
import { ActiveFilters } from "./filter/ActiveFilters";
import { useSearchParams, useLocation, useNavigate } from "@solidjs/router";
import { useSearchFilters } from "~/composables/useSearchFilters";
import { buildUrlWithFilters } from "~/utils/url";
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
    <search>
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
        ></SearchBar>
        <Show when={!filterCollapsed()}>
          <Filters
            filters={filters()}
            onFiltersChange={handleFiltersChange}
          ></Filters>
        </Show>
        <ActiveFilters
          filters={filters()}
          onRemoveFilter={handleRemoveFilter}
        />
      </form>
    </search>
  );
};
