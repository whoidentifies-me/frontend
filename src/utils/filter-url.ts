import type { FilterValue, UIFilters } from "~/types/filters";
import type { SearchParams } from "~/types/search-params";
import {
  booleanToStringLiteral,
  stringLiteralToBoolean,
} from "~/utils/boolean";
import { toArray, toArrayOrNull } from "~/utils/array";
import { toSingleValue } from "~/utils/params";
import { assert } from "./assert";

export function uiFiltersToSearchParams(
  uiFilters: Partial<UIFilters>
): Partial<SearchParams> {
  const tradeName = filterValueToExactAndLike(uiFilters.trade_name);
  const purpose = filterValueToExactAndLike(uiFilters.purpose);
  const claimPath = filterValueToExactAndLike(uiFilters.claim_path);
  const entitlement = filterValueToExactAndLike(uiFilters.entitlement);

  return {
    q: uiFilters.q,
    trade_name: tradeName.exact,
    trade_name_like: tradeName.like,
    purpose: purpose.exact,
    purpose_like: purpose.like,
    claim_path: claimPath.exact,
    claim_path_like: claimPath.like,
    entitlement: entitlement.exact,
    entitlement_like: entitlement.like,
    country: uiFilters.country,
    is_psb: booleanToStringLiteral(uiFilters.is_psb),
    is_intermediary: booleanToStringLiteral(uiFilters.is_intermediary),
    uses_intermediary: booleanToStringLiteral(uiFilters.uses_intermediary),
  };
}

export function searchParamsToUIfilters(
  searchParams?: Partial<SearchParams>
): UIFilters {
  return {
    q: toSingleValue(searchParams?.q),
    trade_name: queryStringToFilterValue(
      toArrayOrNull(searchParams?.trade_name),
      toArrayOrNull(searchParams?.trade_name_like)
    ),
    purpose: queryStringToFilterValue(
      toArrayOrNull(searchParams?.purpose),
      toArrayOrNull(searchParams?.purpose_like)
    ),
    claim_path: queryStringToFilterValue(
      toArrayOrNull(searchParams?.claim_path),
      toArrayOrNull(searchParams?.claim_path_like)
    ),
    entitlement: queryStringToFilterValue(
      toArrayOrNull(searchParams?.entitlement),
      toArrayOrNull(searchParams?.entitlement_like)
    ),
    country: toArray(searchParams?.country),
    is_psb: stringLiteralToBoolean(searchParams?.is_psb),
    is_intermediary: stringLiteralToBoolean(searchParams?.is_intermediary),
    uses_intermediary: stringLiteralToBoolean(searchParams?.uses_intermediary),
  };
}

export function queryStringToFilterValue(
  exact: string[] | null,
  like: string[] | null
): FilterValue[] {
  const result: FilterValue[] = [];
  if (exact) {
    for (const v of exact) {
      result.push({ value: v, type: "exact" });
    }
  }
  if (like) {
    for (const v of like) {
      result.push({ value: v, type: "like" });
    }
  }
  return result;
}

function filterValueToExactAndLike(values: FilterValue[] | undefined): {
  exact: string[] | undefined;
  like: string[] | undefined;
} {
  if (!values || values.length === 0)
    return { exact: undefined, like: undefined };
  const exact = values
    .filter((fv) => fv.type === "exact")
    .map((fv) => fv.value);
  const like = values.filter((fv) => fv.type === "like").map((fv) => fv.value);
  assert(
    exact.length + like.length === values.length,
    "Received FilterValue with invalid type"
  );
  return {
    exact: exact.length > 0 ? exact : undefined,
    like: like.length > 0 ? like : undefined,
  };
}
