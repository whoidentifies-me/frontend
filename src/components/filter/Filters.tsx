import { Component } from "solid-js";
import type { BaseFilters } from "~/api/types";
import { BooleanFilter } from "./BooleanFilter";

interface FiltersProps {
  filters: BaseFilters;
  onFiltersChange?: (filters: Partial<BaseFilters>) => void;
}

export const Filters: Component<FiltersProps> = (props) => {
  const handleFilterChange = (key: keyof BaseFilters) => (value?: boolean) => {
    if (props.onFiltersChange) props.onFiltersChange({ [key]: value });
  };

  return (
    <div class="border-solid my-4 p-2">
      <div
        class="grid gap-8"
        style={{
          "grid-template-columns": "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        <BooleanFilter
          label="Is Public Sector Body"
          value={props.filters.is_psb}
          onChange={handleFilterChange("is_psb")}
          trueLabel="Is PSB"
          falseLabel="Is Not PSB"
          allLabel="All"
        />
        <BooleanFilter
          label="Is Intermediary"
          value={props.filters.is_intermediary}
          onChange={handleFilterChange("is_intermediary")}
          trueLabel="Is Intermediary"
          falseLabel="Is Not Intermediary"
          allLabel="All"
        />
        <BooleanFilter
          label="Uses Intermediaries"
          value={props.filters.uses_intermediary}
          onChange={handleFilterChange("uses_intermediary")}
          trueLabel="Uses Intermediaries"
          falseLabel="Does Not Use Intermediaries"
          allLabel="All"
        />
      </div>
    </div>
  );
};
