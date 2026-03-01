import { Component } from "solid-js";
import type { FilterValue, UIFilters } from "~/types/filters";
import { BooleanFilter } from "./BooleanFilter";
import { MultiFilter } from "./MultiFilter";
import { createAsync } from "@solidjs/router";
import { Filters as FiltersAPI, RelyingParties, IntendedUses } from "~/api";
import { MultiFilterAsync } from "./MultiFilterAsync";
import { useTranslate } from "~/i18n/dict";
import { CountryCode } from "~/i18n/en";
import { createDebouncedFetch } from "~/utils/createDebouncedFetch";

interface FiltersProps {
  filters: UIFilters;
  onFiltersChange?: (filters: Partial<UIFilters>) => void;
}

export const Filters: Component<FiltersProps> = (props) => {
  const t = useTranslate();

  const handleFilterChange = (key: keyof UIFilters) => (value?: unknown) => {
    props.onFiltersChange?.({ [key]: value });
  };

  const countries = createAsync(() =>
    FiltersAPI.getFilterValues("country", { limit: 1000 })
  );

  const wrpFetch = createDebouncedFetch(async (input) => {
    const result = await RelyingParties.listRelyingParties(
      input?.length ? { trade_name: [`%${input}%`] } : undefined
    );
    return (
      result?.data?.map(
        (o): FilterValue => ({ value: o.trade_name || "", type: "exact" })
      ) || []
    );
  });
  wrpFetch.trigger();

  const claimFetch = createDebouncedFetch(async (input) => {
    const result = await FiltersAPI.getFilterValues(
      "claim_path",
      input?.length ? { q: `%${input}%` } : undefined
    );
    return (
      result?.data?.map(
        (o): FilterValue => ({ value: o.value, type: "exact" })
      ) || []
    );
  });
  claimFetch.trigger();

  const purposeFetch = createDebouncedFetch(async (input) => {
    const result = await IntendedUses.listIntendedUses(
      input?.length ? { purpose: [`%${input}%`] } : undefined
    );
    const purposes =
      result?.data?.flatMap((o) => o.purposes?.map((p) => p.content) || []) ||
      [];
    return [...new Set(purposes)].map(
      (purpose): FilterValue => ({ value: purpose, type: "exact" })
    );
  });
  purposeFetch.trigger();

  const entitlementFetch = createDebouncedFetch(async (input) => {
    const result = await RelyingParties.listRelyingParties(
      input?.length ? { entitlement: [`%${input}%`] } : undefined
    );
    const entitlements =
      result?.data?.flatMap((o) => o.entitlements || []) || [];
    return [...new Set(entitlements)].map(
      (entitlement): FilterValue => ({ value: entitlement, type: "exact" })
    );
  });
  entitlementFetch.trigger();

  const countryOptions = () =>
    countries()
      ?.data?.map((v) => ({
        label: t.countries[v.value as CountryCode]?.() || v.value,
        value: v.value,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <fieldset class="my-4 mx-0 py-0 px-1 border-none">
      <legend class="sr-only">Filters</legend>
      <div
        class="grid gap-8"
        style={{
          "grid-template-columns": "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        <MultiFilterAsync
          label={t.filters.labels.claim_path()!}
          name="claim_path"
          placeholder={t.filters.placeholders.claim_path()}
          options={claimFetch.data()}
          values={props.filters.claim_path || undefined}
          onInputChange={claimFetch.trigger}
          onChange={handleFilterChange("claim_path")}
          allowSubstr={true}
        />
        <MultiFilterAsync
          label={t.filters.labels.purpose()!}
          name="purpose"
          placeholder={t.filters.placeholders.purpose()}
          options={purposeFetch.data()}
          values={props.filters.purpose || undefined}
          onInputChange={purposeFetch.trigger}
          onChange={handleFilterChange("purpose")}
          allowSubstr={true}
        />
        <MultiFilter
          label={t.filters.labels.country()!}
          name="country"
          placeholder={t.filters.placeholders.country()}
          values={props.filters.country || undefined}
          onChange={handleFilterChange("country")}
          options={countryOptions()}
        />
        <MultiFilterAsync
          label={t.filters.labels.trade_name()!}
          name="wrp_id"
          placeholder={t.filters.placeholders.trade_name()}
          options={wrpFetch.data()}
          values={props.filters.trade_name || undefined}
          onInputChange={wrpFetch.trigger}
          onChange={handleFilterChange("trade_name")}
          allowSubstr={true}
        />
        <BooleanFilter
          label={t.filters.labels.is_psb()!}
          name="is_psb"
          value={props.filters.is_psb}
          onChange={(value) => handleFilterChange("is_psb")(value)}
          trueLabel={t.filters.values.is_psb.true()}
          falseLabel={t.filters.values.is_psb.false()}
          allLabel={t.filters.values.is_psb.all()}
        />
        <MultiFilterAsync
          label={t.filters.labels.entitlement()!}
          name="entitlement"
          placeholder={t.filters.placeholders.entitlement()}
          options={entitlementFetch.data()}
          values={props.filters.entitlement || undefined}
          onInputChange={entitlementFetch.trigger}
          onChange={handleFilterChange("entitlement")}
          allowSubstr={true}
        />
        <BooleanFilter
          label={t.filters.labels.is_intermediary()!}
          name="is_intermediary"
          value={props.filters.is_intermediary}
          onChange={(value) => handleFilterChange("is_intermediary")(value)}
          trueLabel={t.filters.values.is_intermediary.true()}
          falseLabel={t.filters.values.is_intermediary.false()}
          allLabel={t.filters.values.is_intermediary.all()}
        />
        <BooleanFilter
          label={t.filters.labels.uses_intermediary()!}
          name="uses_intermediary"
          value={props.filters.uses_intermediary}
          onChange={(value) => handleFilterChange("uses_intermediary")(value)}
          trueLabel={t.filters.values.uses_intermediary.true()}
          falseLabel={t.filters.values.uses_intermediary.false()}
          allLabel={t.filters.values.uses_intermediary.all()}
        />
      </div>
    </fieldset>
  );
};
