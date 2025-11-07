import { useLocation, useNavigate, useSearchParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import type { BaseFilters } from "~/api/types";
import { buildUrlWithFilters } from "~/utils/url";

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

const singleValue = (
  value: string | string[] | undefined
): string | undefined => {
  if (Array.isArray(value)) {
    return value.length ? value[0] : undefined;
  }
  return value;
};

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
      q: singleValue(searchParams.q),
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
    const undefinedKeys = Object.entries(newFilters)
      .filter(([, value]) => value === undefined)
      .reduce((acc, [key]) => ({ ...acc, [key]: undefined }), {});

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
