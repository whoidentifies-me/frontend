// API Response Types
export interface ApiResponse<T> {
  data: T[];
  next_cursor?: string;
  has_more: boolean;
}

export interface PaginationParams {
  limit?: number;
  cursor?: string;
}

// Core Models
export interface RelyingParty {
  id: string;
  country: string;
  is_psb: boolean;
  is_intermediary: boolean;
  provider_type: string;
  trade_names: string[];
  identifiers: Identifier[];
  entitlements: string[];
  support_uris: string[];
  service_descriptions: ServiceDescription[];
  uses_intermediaries: string[];
  supervisory_authority: SupervisoryAuthority;
  provided_attestations: ProvidedAttestation[];
  created_at: string;
  updated_at: string;
}

export interface IntendedUse {
  id: string;
  wrp_id: string;
  relying_party?: RelyingParty;
  spec_created_at: string;
  spec_revoked_at?: string;
  purposes: LocalizedText[];
  policies: Policy[];
  credentials: CredentialRequirement[];
  created_at: string;
  updated_at: string;
}

// Supporting Types
export interface Identifier {
  type: string;
  identifier: string;
}

export interface ServiceDescription {
  lang: string;
  service_name: string;
  service_description: string;
}

export interface SupervisoryAuthority {
  country: string;
  email: string;
  info_uri: string;
  phone: string;
}

export interface ProvidedAttestation {
  format: string;
  meta: Record<string, any>;
  claims: Claim[];
}

export interface LocalizedText {
  lang: string;
  purpose: string;
}

export interface Policy {
  uri: string;
  type?: string;
}

export interface CredentialRequirement {
  format: string;
  meta: Record<string, any>;
  claims: Claim[];
}

export interface Claim {
  path: string;
  display_name?: string;
  purpose?: string;
}

// Filter Types
export interface RelyingPartyFilters extends PaginationParams {
  q?: string;
  country?: string | string[];
  is_psb?: boolean;
  is_intermediary?: boolean;
  uses_intermediary?: boolean;
  intermediary_id?: string;
  entitlement?: string | string[];
  identifier?: string;
  identifier_type?: string;
  provided_format?: string | string[];
  provided_meta?: string;
  support_uri?: string;
}

export interface IntendedUseFilters extends PaginationParams {
  q?: string;
  wrp_id?: string;
  country?: string;
  credential_format?: string;
  claim_path?: string;
}

// Filtering Options
export interface FilteringOptions {
  [field: string]: {
    description: string;
    type: string;
  };
}

export interface FilterValue {
  value: string;
  count: number;
}

export interface FilterValuesResponse {
  field: string;
  values: FilterValue[];
  next_cursor?: string;
  has_more: boolean;
}

// Health Check
export interface HealthResponse {
  status: string;
  timestamp: string;
}
