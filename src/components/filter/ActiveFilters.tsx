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
    mode?: FilterValue["type"]
  ) => void;
  onClearAll?: () => void;
}

interface FilterBadge {
  key: keyof UIFilters;
  label: string;
  value?: string;
  mode?: FilterValue["type"];
}

export const ActiveFilters: Component<ActiveFiltersProps> = (props) => {
  const t = useTranslate();

  const addBooleanFilter = (
    badges: FilterBadge[],
    key: keyof UIFilters,
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

  const addFilterValueFilter = (
    badges: FilterBadge[],
    key: keyof UIFilters,
    values: FilterValue[] | null | undefined
  ) => {
    if (!values || values.length === 0) return;

    const filterLabel = t.filters.labels[key]?.();
    values.forEach((fv) => {
      const displayLabel =
        fv.type === "like"
          ? `${filterLabel || key} contains "${fv.value}"`
          : fv.value;
      badges.push({
        key,
        label: displayLabel,
        value: fv.value,
        mode: fv.type,
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
      <div class="flex flex-wrap items-center gap-2 mb-4 mt-8">
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
              <span class="line-clamp-2" title={badge.label}>
                {badge.label}
              </span>
            </div>
          )}
        </For>
        <Show when={activeBadges().length > 1 && props.onClearAll}>
          <button
            onClick={() => props.onClearAll?.()}
            class="btn btn-ghost"
            aria-label={t.filters.clear_all()}
          >
            {t.filters.clear_all()}
          </button>
        </Show>
      </div>
    </Show>
  );
};
