import { useLocation, useNavigate, useSearchParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import type { BaseFilters } from "~/api";
import { buildUrlWithFilters } from "~/utils/url";
import { toArrayOrNull } from "~/utils/array";
import { toBooleanEnum, toSingleValue } from "~/utils/params";

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

  const filters = createMemo((): BaseFilters => {
    return {
      q: toSingleValue(searchParams.q),
      trade_name: toArrayOrNull(searchParams.trade_name),
      purpose: toArrayOrNull(searchParams.purpose),
      claim_path: toArrayOrNull(searchParams.claim_path),
      country: toArrayOrNull(searchParams.country),
      entitlement: toArrayOrNull(searchParams.entitlement),
      is_psb: toBooleanEnum(searchParams.is_psb),
      is_intermediary: toBooleanEnum(searchParams.is_intermediary),
      uses_intermediary: toBooleanEnum(searchParams.uses_intermediary),
    };
  });

  const handleFiltersChange = (newFilters: Partial<BaseFilters>) => {
    const stringParams: Record<string, string | string[] | undefined> = {};

    Object.entries(newFilters).forEach(([key, value]) => {
      if (typeof value === "boolean") {
        stringParams[key] = String(value);
      } else if (Array.isArray(value)) {
        stringParams[key] = value.map((v) => String(v));
      } else if (value === undefined || value === null) {
        stringParams[key] = undefined;
      } else {
        stringParams[key] = String(value);
      }
    });
    console.log(stringParams);

    // For undefined values, we need to pass them separately

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
