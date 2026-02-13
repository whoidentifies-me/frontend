import { Component, For, Show } from "solid-js";
import { TbX } from "solid-icons/tb";
import type { UIFilters, FilterValue } from "~/types/filters";
import { useTranslate } from "~/i18n/dict";
import { CountryCode } from "~/i18n/en";

interface ActiveFiltersProps {
  filters: UIFilters;
  onRemoveFilter: (
    key: keyof UIFilters,
    value?: string,
    mode?: FilterValue["mode"]
  ) => void;
}

interface FilterBadge {
  key: keyof UIFilters;
  label: string;
  value?: string;
  mode?: FilterValue["mode"];
}

export const ActiveFilters: Component<ActiveFiltersProps> = (props) => {
  const t = useTranslate();

  const addBooleanFilter = (
    badges: FilterBadge[],
    key: keyof UIFilters,
    value: "true" | "false" | undefined,
    translations: {
      true?: () => string | undefined;
      false?: () => string | undefined;
    }
  ) => {
    if (value !== undefined) {
      badges.push({
        key,
        label:
          value === "true"
            ? translations.true?.() || "Yes"
            : translations.false?.() || "No",
      });
    }
  };

  const addFilterValueFilter = (
    badges: FilterBadge[],
    key: keyof UIFilters,
    values: FilterValue[] | null | undefined
  ) => {
    if (!values || values.length === 0) return;

    values.forEach((fv) => {
      badges.push({
        key,
        label: fv.mode === "like" ? `Contains: "${fv.value}"` : fv.value,
        value: fv.value,
        mode: fv.mode,
      });
    });
  };

  const addStringArrayFilter = (
    badges: FilterBadge[],
    key: keyof UIFilters,
    value: string[] | null | undefined,
    labelTransform?: (val: string) => string
  ) => {
    if (!value || value.length === 0) return;

    value.forEach((val) => {
      badges.push({
        key,
        label: labelTransform ? labelTransform(val) : val,
        value: val,
      });
    });
  };

  const getActiveFilters = (): FilterBadge[] => {
    const badges: FilterBadge[] = [];
    const { filters } = props;

    // Match the order from Filters.tsx
    addFilterValueFilter(badges, "claim_path", filters.claim_path);
    addFilterValueFilter(badges, "purpose", filters.purpose);
    addStringArrayFilter(
      badges,
      "country",
      filters.country,
      (countryCode) =>
        t.countries[countryCode as CountryCode]?.() || countryCode
    );
    addFilterValueFilter(badges, "trade_name", filters.trade_name);
    addBooleanFilter(badges, "is_psb", filters.is_psb, t.filters.values.is_psb);
    addFilterValueFilter(badges, "entitlement", filters.entitlement);
    addBooleanFilter(
      badges,
      "is_intermediary",
      filters.is_intermediary,
      t.filters.values.is_intermediary
    );
    addBooleanFilter(
      badges,
      "uses_intermediary",
      filters.uses_intermediary,
      t.filters.values.uses_intermediary
    );

    return badges;
  };

  const handleRemove = (badge: FilterBadge) => {
    props.onRemoveFilter(badge.key, badge.value, badge.mode);
  };

  const activeBadges = () => getActiveFilters();

  return (
    <Show when={activeBadges().length > 0}>
      <div class="flex flex-wrap gap-2 my-4">
        <For each={activeBadges()}>
          {(badge) => (
            <div class="inline-flex items-center gap-2 p-2 pe-4 border border-primary rounded-full text-sm">
              <button
                onClick={() => handleRemove(badge)}
                class="flex items-center justify-center btn btn-ghost btn-circle btn-primary btn-sm -m-1"
                aria-label={`Remove filter: ${badge.label}`}
              >
                <TbX size="1.125rem" />
              </button>
              <span>{badge.label}</span>
            </div>
          )}
        </For>
      </div>
    </Show>
  );
};
