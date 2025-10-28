import { createMemo } from "solid-js";
import type { BaseFilters } from "~/api/types";

const booleanValue = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value[0] === "true"
      ? true
      : value[0] === "false"
        ? false
        : undefined;
  }
  return value === "true" ? true : value === "false" ? false : undefined;
};

export function useSearchFilters(
  searchParams: Record<string, string | string[]>,
  setSearchParams: (params: Record<string, string | string[]>) => void
) {
  const filters = createMemo((): BaseFilters => {
    return {
      trade_name: searchParams.trade_name,
      purpose: searchParams.purpose,
      claim_path: searchParams.claim_path,
      country: searchParams.country,
      entitlement: searchParams.entitlement,
      is_psb: booleanValue(searchParams.is_psb),
      is_intermediary: booleanValue(searchParams.is_intermediary),
      uses_intermediary: booleanValue(searchParams.uses_intermediary),
    };
  });

  const handleFiltersChange = (newFilters: Partial<BaseFilters>) => {
    const stringParams: Record<string, string | string[]> = {};

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined) {
        if (typeof value === "boolean") {
          stringParams[key] = String(value);
        } else if (Array.isArray(value)) {
          stringParams[key] = value.map((v) => String(v));
        } else {
          stringParams[key] = String(value);
        }
      }
    });

    // For undefined values, we need to pass them separately
    const undefinedKeys = Object.entries(newFilters)
      .filter(([, value]) => value === undefined)
      .reduce((acc, [key]) => ({ ...acc, [key]: undefined }), {});

    setSearchParams({ ...stringParams, ...undefinedKeys });
  };

  return {
    filters,
    handleFiltersChange,
  };
}
