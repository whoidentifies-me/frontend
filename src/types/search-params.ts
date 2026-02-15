// Defines all search (URL) parameters our app is currently using (all values are optional)

export interface SearchParams {
  q: string;
  trade_name: string | string[];
  trade_name_like: string | string[];
  purpose: string | string[];
  purpose_like: string | string[];
  claim_path: string | string[];
  claim_path_like: string | string[];
  entitlement: string | string[];
  entitlement_like: string | string[];
  country: string | string[];
  is_psb: string;
  is_intermediary: string;
  uses_intermediary: string;
}
