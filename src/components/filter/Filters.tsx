import { Component, createSignal } from "solid-js";
import type { BaseFilters } from "~/api/types";
import { BooleanFilter } from "./BooleanFilter";
import { MultiFilter } from "./MultiFilter";
import { createAsync, query } from "@solidjs/router";
import apiClient from "~/api";
import { MultiFilterAsync, MultiFilterOption } from "./MultiFilterAsync";
import { useI18n, useTranslate } from "~/i18n/dict";
import { CountryCode } from "~/i18n/en";

interface FiltersProps {
  filters: BaseFilters;
  onFiltersChange?: (filters: Partial<BaseFilters>) => void;
}

const countriesQuery = query(
  async () => await apiClient.getFilterValues("country", { limit: 1000 }),
  "countries"
);

export const Filters: Component<FiltersProps> = (props) => {
  const t = useTranslate();

  const handleFilterChange = (key: keyof BaseFilters) => (value?: unknown) => {
    if (props.onFiltersChange) props.onFiltersChange({ [key]: value });
  };

  const countreis = createAsync(() => countriesQuery());

  const [wrpOptions, setWRPoptions] = createSignal<MultiFilterOption[]>();
  const onUpdateWRPinput = async (input?: string) => {
    const result = await apiClient.getRelyingParties({
      trade_name: input?.length ? `%${input}%` : undefined,
    });
    const opts = result?.data?.map(
      (o): MultiFilterOption => ({
        label: o.trade_name,
        value: o.trade_name,
        type: "exact",
      })
    );
    setWRPoptions(opts || []);
  };
  onUpdateWRPinput();

  const countryOptions = () =>
    countreis()
      ?.data?.map((v) => ({
        label: t.countries[v.value as CountryCode]?.() || v.value,
        value: v.value,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <fieldset class="border-solid my-4 p-2">
      <legend>Filters</legend>
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
          options={[]}
          values={props.filters.claim_path}
          onInputChange={() => {}}
          onChange={handleFilterChange("claim_path")}
        ></MultiFilterAsync>
        <MultiFilterAsync
          label={t.filters.labels.purpose()!}
          name="purpose"
          placeholder={t.filters.placeholders.purpose()}
          options={[]}
          values={props.filters.purpose}
          onInputChange={() => {}}
          onChange={handleFilterChange("purpose")}
        ></MultiFilterAsync>
        <MultiFilter
          label={t.filters.labels.country()!}
          name="country"
          placeholder={t.filters.placeholders.country()}
          values={props.filters.country}
          onChange={handleFilterChange("country")}
          options={countryOptions()}
        ></MultiFilter>
        <MultiFilterAsync
          label={t.filters.labels.trade_name()!}
          name="wrp_id"
          placeholder={t.filters.placeholders.trade_name()}
          options={wrpOptions()}
          values={props.filters.trade_name}
          onInputChange={onUpdateWRPinput}
          onChange={handleFilterChange("trade_name")}
        ></MultiFilterAsync>
        <BooleanFilter
          label={t.filters.labels.is_psb()!}
          name="is_psb"
          value={props.filters.is_psb}
          onChange={handleFilterChange("is_psb")}
          trueLabel={t.filters.values.is_psb.true()}
          falseLabel={t.filters.values.is_psb.false()}
          allLabel={t.filters.values.is_psb.all()}
        />
        <MultiFilterAsync
          label={t.filters.labels.entitlement()!}
          name="entitlement"
          placeholder={t.filters.placeholders.entitlement()}
          options={[]}
          values={props.filters.entitlement}
          onInputChange={() => {}}
          onChange={handleFilterChange("entitlement")}
        ></MultiFilterAsync>
        <BooleanFilter
          label={t.filters.labels.is_intermediary()!}
          name="is_intermediary"
          value={props.filters.is_intermediary}
          onChange={handleFilterChange("is_intermediary")}
          trueLabel={t.filters.values.is_intermediary.true()}
          falseLabel={t.filters.values.is_intermediary.false()}
          allLabel={t.filters.values.is_intermediary.all()}
        />
        <BooleanFilter
          label={t.filters.labels.uses_intermediary()!}
          name="uses_intermediary"
          value={props.filters.uses_intermediary}
          onChange={handleFilterChange("uses_intermediary")}
          trueLabel={t.filters.values.uses_intermediary.true()}
          falseLabel={t.filters.values.uses_intermediary.false()}
          allLabel={t.filters.values.uses_intermediary.all()}
        />
      </div>
    </fieldset>
  );
};
