export interface FilterValue {
  value: string;
  type: "exact" | "like";
}

export interface UIFilters {
  q?: string;
  trade_name: FilterValue[];
  purpose: FilterValue[];
  claim_path: FilterValue[];
  entitlement: FilterValue[];
  country: string[];
  is_psb?: boolean;
  is_intermediary?: boolean;
  uses_intermediary?: boolean;
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
