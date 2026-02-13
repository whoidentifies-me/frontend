import { useLocation, useNavigate, useSearchParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import type { UIFilters, FilterValue, LikeFilterKey } from "~/types/filters";
import { LIKE_FILTER_KEYS } from "~/types/filters";
import { buildUrlWithFilters } from "~/utils/url";
import { toArrayOrNull } from "~/utils/array";
import { toBooleanEnum, toSingleValue } from "~/utils/params";

function toFilterValues(
  exact: string[] | null,
  like: string[] | null
): FilterValue[] | null {
  const result: FilterValue[] = [];
  if (exact) {
    for (const v of exact) {
      result.push({ value: v, mode: "exact" });
    }
  }
  if (like) {
    for (const v of like) {
      result.push({ value: v, mode: "like" });
    }
  }
  return result.length > 0 ? result : null;
}

export function useSearchFilters(
  searchCategory?: "intended-uses" | "relying-parties"
) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const formAction = () =>
    searchCategory ? `/search/${searchCategory}` : "/search";
  const shouldNavigate = () => {
    return !location.pathname.startsWith("/search");
  };

  const filters = createMemo((): UIFilters => {
    return {
      q: toSingleValue(searchParams.q),
      trade_name: toFilterValues(
        toArrayOrNull(searchParams.trade_name),
        toArrayOrNull(searchParams.trade_name_like)
      ),
      purpose: toFilterValues(
        toArrayOrNull(searchParams.purpose),
        toArrayOrNull(searchParams.purpose_like)
      ),
      claim_path: toFilterValues(
        toArrayOrNull(searchParams.claim_path),
        toArrayOrNull(searchParams.claim_path_like)
      ),
      entitlement: toFilterValues(
        toArrayOrNull(searchParams.entitlement),
        toArrayOrNull(searchParams.entitlement_like)
      ),
      country: toArrayOrNull(searchParams.country),
      is_psb: toBooleanEnum(searchParams.is_psb),
      is_intermediary: toBooleanEnum(searchParams.is_intermediary),
      uses_intermediary: toBooleanEnum(searchParams.uses_intermediary),
    };
  });

  const handleFiltersChange = (newFilters: Partial<UIFilters>) => {
    const stringParams: Record<string, string | string[] | undefined> = {};

    for (const [key, value] of Object.entries(newFilters)) {
      if (LIKE_FILTER_KEYS.has(key as LikeFilterKey)) {
        const filterValues = value as FilterValue[] | null | undefined;
        if (!filterValues || filterValues.length === 0) {
          stringParams[key] = undefined;
          stringParams[`${key}_like`] = undefined;
        } else {
          const exact = filterValues
            .filter((fv) => fv.mode === "exact")
            .map((fv) => fv.value);
          const like = filterValues
            .filter((fv) => fv.mode === "like")
            .map((fv) => fv.value);
          stringParams[key] = exact.length > 0 ? exact : undefined;
          stringParams[`${key}_like`] = like.length > 0 ? like : undefined;
        }
      } else if (value === undefined || value === null) {
        stringParams[key] = undefined;
      } else if (Array.isArray(value)) {
        stringParams[key] = value.map((v) => String(v));
      } else {
        stringParams[key] = String(value);
      }
    }

    if (shouldNavigate()) {
      const url = buildUrlWithFilters(formAction(), stringParams);
      navigate(url);
    } else {
      setSearchParams(stringParams);
    }
  };

  return {
    formAction,
    filters,
    handleFiltersChange,
  };
}
