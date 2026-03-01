import { Component, createSignal } from "solid-js";
import type { FilterValue, UIFilters } from "~/types/filters";
import { BooleanFilter } from "./BooleanFilter";
import { MultiFilter } from "./MultiFilter";
import { createAsync } from "@solidjs/router";
import { Filters as FiltersAPI, RelyingParties, IntendedUses } from "~/api";
import { MultiFilterAsync } from "./MultiFilterAsync";
import { useTranslate } from "~/i18n/dict";
import { CountryCode } from "~/i18n/en";
import {
  booleanToStringLiteral,
  stringLiteralToBoolean,
} from "~/utils/boolean";

interface FiltersProps {
  filters: UIFilters;
  onFiltersChange?: (filters: Partial<UIFilters>) => void;
}

export const Filters: Component<FiltersProps> = (props) => {
  const t = useTranslate();

  const handleFilterChange = (key: keyof UIFilters) => (value?: unknown) => {
    console.log("key", key, "value", value);
    props.onFiltersChange?.({ [key]: value });
  };

  const countries = createAsync(() =>
    FiltersAPI.getFilterValues("country", { limit: 1000 })
  );

  const [wrpOptions, setWRPoptions] = createSignal<FilterValue[]>();
  const onUpdateWRPinput = async (input?: string) => {
    const result = await RelyingParties.listRelyingParties(
      input?.length ? { trade_name: [`%${input}%`] } : undefined
    );
    const opts = result?.data?.map(
      (o): FilterValue => ({
        value: o.trade_name || "",
        type: "exact",
      })
    );
    setWRPoptions(opts || []);
  };
  onUpdateWRPinput();

  const [claimOptions, setClaimOptions] = createSignal<FilterValue[]>();
  const onUpdateClaimInput = async (input?: string) => {
    const result = await FiltersAPI.getFilterValues(
      "claim_path",
      input?.length ? { q: `%${input}%` } : undefined
    );
    const opts = result?.data?.map(
      (o): FilterValue => ({
        value: o.value,
        type: "exact",
      })
    );
    setClaimOptions(opts);
  };
  onUpdateClaimInput();

  const [purposeOptions, setPurposeOptions] = createSignal<FilterValue[]>();
  const onUpdatePurposeInput = async (input?: string) => {
    const result = await IntendedUses.listIntendedUses(
      input?.length ? { purpose: [`%${input}%`] } : undefined
    );
    const purposes =
      result?.data?.flatMap((o) => o.purposes?.map((p) => p.content) || []) ||
      [];
    const uniquePurposes = [...new Set(purposes)];
    const opts = uniquePurposes.map(
      (purpose): FilterValue => ({
        value: purpose,
        type: "exact",
      })
    );
    setPurposeOptions(opts);
  };
  onUpdatePurposeInput();

  const [entitlementOptions, setEntitlementOptions] =
    createSignal<FilterValue[]>();
  const onUpdateEntitlementInput = async (input?: string) => {
    const result = await RelyingParties.listRelyingParties(
      input?.length ? { entitlement: [`%${input}%`] } : undefined
    );
    const entitlements =
      result?.data?.flatMap((o) => o.entitlements || []) || [];
    const uniqueEntitlements = [...new Set(entitlements)];
    const opts = uniqueEntitlements.map(
      (entitlement): FilterValue => ({
        value: entitlement,
        type: "exact",
      })
    );
    setEntitlementOptions(opts);
  };
  onUpdateEntitlementInput();

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
          options={claimOptions()}
          values={props.filters.claim_path || undefined}
          onInputChange={onUpdateClaimInput}
          onChange={handleFilterChange("claim_path")}
          allowSubstr={true}
        />
        <MultiFilterAsync
          label={t.filters.labels.purpose()!}
          name="purpose"
          placeholder={t.filters.placeholders.purpose()}
          options={purposeOptions()}
          values={props.filters.purpose || undefined}
          onInputChange={onUpdatePurposeInput}
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
          options={wrpOptions()}
          values={props.filters.trade_name || undefined}
          onInputChange={onUpdateWRPinput}
          onChange={handleFilterChange("trade_name")}
          allowSubstr={true}
        />
        <BooleanFilter
          label={t.filters.labels.is_psb()!}
          name="is_psb"
          value={stringLiteralToBoolean(props.filters.is_psb)}
          onChange={(value) =>
            handleFilterChange("is_psb")(booleanToStringLiteral(value))
          }
          trueLabel={t.filters.values.is_psb.true()}
          falseLabel={t.filters.values.is_psb.false()}
          allLabel={t.filters.values.is_psb.all()}
        />
        <MultiFilterAsync
          label={t.filters.labels.entitlement()!}
          name="entitlement"
          placeholder={t.filters.placeholders.entitlement()}
          options={entitlementOptions()}
          values={props.filters.entitlement || undefined}
          onInputChange={onUpdateEntitlementInput}
          onChange={handleFilterChange("entitlement")}
          allowSubstr={true}
        />
        <BooleanFilter
          label={t.filters.labels.is_intermediary()!}
          name="is_intermediary"
          value={stringLiteralToBoolean(props.filters.is_intermediary)}
          onChange={(value) =>
            handleFilterChange("is_intermediary")(booleanToStringLiteral(value))
          }
          trueLabel={t.filters.values.is_intermediary.true()}
          falseLabel={t.filters.values.is_intermediary.false()}
          allLabel={t.filters.values.is_intermediary.all()}
        />
        <BooleanFilter
          label={t.filters.labels.uses_intermediary()!}
          name="uses_intermediary"
          value={stringLiteralToBoolean(props.filters.uses_intermediary)}
          onChange={(value) =>
            handleFilterChange("uses_intermediary")(
              booleanToStringLiteral(value)
            )
          }
          trueLabel={t.filters.values.uses_intermediary.true()}
          falseLabel={t.filters.values.uses_intermediary.false()}
          allLabel={t.filters.values.uses_intermediary.all()}
        />
      </div>
    </fieldset>
  );
};
