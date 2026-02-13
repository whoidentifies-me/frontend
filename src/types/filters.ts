import type { ListRelyingPartiesParams, ListIntendedUsesParams } from "~/api";

export interface FilterValue {
  value: string;
  mode: "exact" | "like";
}

export interface UIFilters {
  q?: string;
  trade_name?: FilterValue[] | null;
  purpose?: FilterValue[] | null;
  claim_path?: FilterValue[] | null;
  entitlement?: FilterValue[] | null;
  country?: string[] | null;
  is_psb?: "true" | "false";
  is_intermediary?: "true" | "false";
  uses_intermediary?: "true" | "false";
}

export const LIKE_FILTER_KEYS = new Set([
  "trade_name",
  "purpose",
  "claim_path",
  "entitlement",
] as const);

export type LikeFilterKey =
  | "trade_name"
  | "purpose"
  | "claim_path"
  | "entitlement";

function filterValuesToApiStrings(
  values: FilterValue[] | null | undefined
): string[] | undefined {
  if (!values || values.length === 0) return undefined;
  return values.map((fv) => (fv.mode === "like" ? `%${fv.value}%` : fv.value));
}

export function uiFiltersToUrlParams(
  filters: UIFilters
): Record<string, string | string[] | undefined> {
  const params: Record<string, string | string[] | undefined> = {};

  if (filters.q) params.q = filters.q;

  for (const key of LIKE_FILTER_KEYS) {
    const values = filters[key];
    if (!values || values.length === 0) continue;
    const exact = values
      .filter((fv) => fv.mode === "exact")
      .map((fv) => fv.value);
    const like = values
      .filter((fv) => fv.mode === "like")
      .map((fv) => fv.value);
    if (exact.length > 0) params[key] = exact;
    if (like.length > 0) params[`${key}_like`] = like;
  }

  if (filters.country) params.country = filters.country;
  if (filters.is_psb) params.is_psb = filters.is_psb;
  if (filters.is_intermediary) params.is_intermediary = filters.is_intermediary;
  if (filters.uses_intermediary)
    params.uses_intermediary = filters.uses_intermediary;

  return params;
}

export function uiFiltersToApiParams(
  filters: UIFilters
): ListRelyingPartiesParams {
  return {
    q: filters.q ? `%${filters.q}%` : undefined,
    trade_name: filterValuesToApiStrings(filters.trade_name),
    purpose: filterValuesToApiStrings(filters.purpose),
    claim_path: filterValuesToApiStrings(filters.claim_path),
    entitlement: filterValuesToApiStrings(filters.entitlement),
    country: filters.country,
    is_psb: filters.is_psb,
    is_intermediary: filters.is_intermediary,
    uses_intermediary: filters.uses_intermediary,
  };
}

export function uiFiltersToIntendedUsesParams(
  filters: UIFilters
): ListIntendedUsesParams {
  return {
    q: filters.q ? `%${filters.q}%` : undefined,
    trade_name: filterValuesToApiStrings(filters.trade_name),
    purpose: filterValuesToApiStrings(filters.purpose),
    claim_path: filterValuesToApiStrings(filters.claim_path),
    entitlement: filterValuesToApiStrings(filters.entitlement),
    country: filters.country,
    is_psb: filters.is_psb,
    is_intermediary: filters.is_intermediary,
    uses_intermediary: filters.uses_intermediary,
  };
}
