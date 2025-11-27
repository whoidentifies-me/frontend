import { Component, For, Show } from "solid-js";
import { TbX } from "solid-icons/tb";
import type { BaseFilters } from "~/api/types";
import { useTranslate } from "~/i18n/dict";
import { CountryCode } from "~/i18n/en";

interface ActiveFiltersProps {
  filters: BaseFilters;
  onRemoveFilter: (key: keyof BaseFilters, value?: string) => void;
}

interface FilterBadge {
  key: keyof BaseFilters;
  label: string;
  value?: string;
}

export const ActiveFilters: Component<ActiveFiltersProps> = (props) => {
  const t = useTranslate();

  const addBooleanFilter = (
    badges: FilterBadge[],
    key: keyof BaseFilters,
    value: boolean | undefined,
    translations: {
      true?: () => string | undefined;
      false?: () => string | undefined;
    }
  ) => {
    if (value !== undefined) {
      badges.push({
        key,
        label: value
          ? translations.true?.() || "Yes"
          : translations.false?.() || "No",
      });
    }
  };

  const addMultiValueFilter = (
    badges: FilterBadge[],
    key: keyof BaseFilters,
    value: string | string[] | undefined,
    labelTransform?: (val: string) => string
  ) => {
    if (!value) return;

    const values = Array.isArray(value) ? value : [value];
    values.forEach((val) => {
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
    addMultiValueFilter(badges, "claim_path", filters.claim_path);
    addMultiValueFilter(badges, "purpose", filters.purpose);
    addMultiValueFilter(
      badges,
      "country",
      filters.country,
      (countryCode) =>
        t.countries[countryCode as CountryCode]?.() || countryCode
    );
    addMultiValueFilter(badges, "trade_name", filters.trade_name);
    addBooleanFilter(badges, "is_psb", filters.is_psb, t.filters.values.is_psb);
    addMultiValueFilter(badges, "entitlement", filters.entitlement);
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
    props.onRemoveFilter(badge.key, badge.value);
  };

  const activeBadges = () => getActiveFilters();

  return (
    <Show when={activeBadges().length > 0}>
      <div class="flex flex-wrap gap-2 my-4">
        <For each={activeBadges()}>
          {(badge) => (
            <div class="inline-flex items-center gap-2 px-3 py-1 border border-solid border-gray-300 text-sm">
              <span>{badge.label}</span>
              <button
                onClick={() => handleRemove(badge)}
                class="flex items-center justify-center w-4 h-4"
                aria-label={`Remove filter: ${badge.label}`}
              >
                <TbX size={12} />
              </button>
            </div>
          )}
        </For>
      </div>
    </Show>
  );
};
