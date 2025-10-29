import { Component } from "solid-js";
import type { BaseFilters } from "~/api/types";
import { BooleanFilter } from "./BooleanFilter";
import { MultiFilter } from "./MultiFilter";
import { createAsync, query } from "@solidjs/router";
import apiClient from "~/api";

interface FiltersProps {
  filters: BaseFilters;
  onFiltersChange?: (filters: Partial<BaseFilters>) => void;
}

const countriesQuery = query(
  async () => await apiClient.getFilterValues("country", { limit: 1000 }),
  "countries"
);

export const Filters: Component<FiltersProps> = (props) => {
  const handleFilterChange = (key: keyof BaseFilters) => (value?: unknown) => {
    if (props.onFiltersChange) props.onFiltersChange({ [key]: value });
  };

  const countreis = createAsync(() => countriesQuery());

  const countryOptions = () =>
    countreis()?.data?.map((v) => ({ label: v.value, value: v.value }));

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
          name="is_psb"
          value={props.filters.is_psb}
          onChange={handleFilterChange("is_psb")}
          trueLabel="Is PSB"
          falseLabel="Is Not PSB"
          allLabel="All"
        />
        <BooleanFilter
          label="Is Intermediary"
          name="is_intermediary"
          value={props.filters.is_intermediary}
          onChange={handleFilterChange("is_intermediary")}
          trueLabel="Is Intermediary"
          falseLabel="Is Not Intermediary"
          allLabel="All"
        />
        <BooleanFilter
          label="Uses Intermediaries"
          name="uses_intermediary"
          value={props.filters.uses_intermediary}
          onChange={handleFilterChange("uses_intermediary")}
          trueLabel="Uses Intermediaries"
          falseLabel="Does Not Use Intermediaries"
          allLabel="All"
        />
        <MultiFilter
          label="Country"
          name="country"
          values={props.filters.country}
          onChange={handleFilterChange("country")}
          options={countryOptions()}
        ></MultiFilter>
      </div>
    </div>
  );
};
