import type { ListRelyingPartiesParams, ListIntendedUsesParams } from "~/api";
import type { FilterValue, UIFilters } from "~/types/filters";
import { booleanToStringLiteral } from "~/utils/boolean";

function filterValuesToApiStrings(
  values: FilterValue[] | null | undefined
): string[] | undefined {
  if (!values || values.length === 0) return undefined;
  return values.map((fv) => (fv.type === "like" ? `%${fv.value}%` : fv.value));
}

export type ApiFilterParams = ListRelyingPartiesParams & ListIntendedUsesParams;

export function uiFiltersToApiParams(filters: UIFilters): ApiFilterParams {
  const result: ApiFilterParams = {};

  if (filters.q) result.q = `%${filters.q}%`;

  const tradeName = filterValuesToApiStrings(filters.trade_name);
  if (tradeName) result.trade_name = tradeName;

  const purpose = filterValuesToApiStrings(filters.purpose);
  if (purpose) result.purpose = purpose;

  const claimPath = filterValuesToApiStrings(filters.claim_path);
  if (claimPath) result.claim_path = claimPath;

  const entitlement = filterValuesToApiStrings(filters.entitlement);
  if (entitlement) result.entitlement = entitlement;

  if (filters.country?.length > 0) result.country = filters.country;

  const isPsb = booleanToStringLiteral(filters.is_psb);
  if (isPsb) result.is_psb = isPsb;

  const isIntermediary = booleanToStringLiteral(filters.is_intermediary);
  if (isIntermediary) result.is_intermediary = isIntermediary;

  const usesIntermediary = booleanToStringLiteral(filters.uses_intermediary);
  if (usesIntermediary) result.uses_intermediary = usesIntermediary;

  return result;
}
