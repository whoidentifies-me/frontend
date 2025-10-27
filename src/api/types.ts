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
  trade_name: string;
  is_psb: boolean;
  is_intermediary: boolean;
  provider_type: string;
  policy: {
    type: string;
  };
  ipfs_cid: string;
  ipfs_url: string;
  legal_entity: LegalEntity;
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
  ipfs_cid: string;
  ipfs_url: string;
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

export interface LegalEntity {
  id: string;
  country: string;
  email: string[];
  phone: string[];
  info_uri: string[];
  identifiers: Identifier[];
}

export interface ClaimValues {
  const?: any;
  enum?: any[];
}

export interface ServiceDescription {
  service_index: number;
  lang: string;
  content: string;
}

export interface SupervisoryAuthority {
  id: string;
  country: string;
  email: string[];
  phone: string[];
  info_uri: string[];
}

export interface ProvidedAttestation {
  id: string;
  format: string;
  meta: string;
  meta_text: string;
  claims: Claim[];
}

export interface LocalizedText {
  purpose_index: number;
  lang: string;
  content: string;
}

export interface Policy {
  policy_uri: string;
  type: string;
}

export interface CredentialRequirement {
  id: string;
  format: string;
  meta: string;
  meta_text: string;
  claims: Claim[];
}

export interface Claim {
  id: number;
  path: string;
  values: ClaimValues;
}

// Filter Types

/**
 * Filters for querying relying parties.
 * Supports wildcard patterns using SQL LIKE syntax:
 * - Exact match: "ACME"
 * - Starts with: "ACME%" (URL encode as "ACME%25")
 * - Ends with: "%Corp" (URL encode as "%25Corp")
 * - Contains: "%ACME%" (URL encode as "%25ACME%25")
 */
export interface RelyingPartyFilters extends PaginationParams {
  /** Full-text search across relying party fields */
  q?: string;
  /** Filter by trade name with wildcard support */
  trade_name?: string | string[];
  /** Filter by intended use purposes with wildcard support */
  purpose?: string | string[];
  /** Filter by claim paths with wildcard support */
  claim_path?: string | string[];
  /** Filter by ISO 3166-1 alpha-2 country code */
  country?: string | string[];
  /** Filter by PSB (Public Sector Body) status */
  is_psb?: boolean;
  /** Filter by intermediary status */
  is_intermediary?: boolean;
  /** Filter parties that use intermediaries */
  uses_intermediary?: boolean;
  /** Filter by specific intermediary ID */
  intermediary_id?: string;
  /** Filter by entitlement URI */
  entitlement?: string | string[];
  /** Filter by specific identifier value */
  identifier?: string;
  /** Filter by identifier type (e.g., EUID) */
  identifier_type?: string;
  /** Filter by provided attestation format */
  provided_format?: string | string[];
  /** Full-text search within provided attestation metadata with wildcard support */
  provided_meta?: string;
  /** Filter by support URI with wildcard support */
  support_uri?: string;
}

/**
 * Filters for querying intended uses.
 * Supports wildcard patterns using SQL LIKE syntax (see RelyingPartyFilters for details).
 */
export interface IntendedUseFilters extends PaginationParams {
  /** Full-text search across intended use purpose fields */
  q?: string;
  /** Filter by wallet relying party ID */
  wrp_id?: string;
  /** Filter by relying party's country code */
  country?: string | string[];
  /** Filter by required credential format */
  credential_format?: string | string[];
  /** Filter by required claim path with wildcard support */
  claim_path?: string | string[];
  /** Filter by relying party's trade name with wildcard support */
  trade_name?: string | string[];
  /** Filter by intended use purpose with wildcard support */
  purpose?: string | string[];
  /** Filter by relying party's PSB status */
  is_psb?: boolean;
  /** Filter by relying party's intermediary status */
  is_intermediary?: boolean;
  /** Filter by whether relying party uses intermediaries */
  uses_intermediary?: boolean;
  /** Filter by relying party's entitlement URIs with wildcard support */
  entitlement?: string | string[];
}

// Filtering Options
export interface FilterableField {
  name: string;
  display_name: string;
  description: string;
  type: string;
}

export interface FilteringOptions {
  filterable_fields: FilterableField[];
  intended_uses: {
    filters: string[];
  };
  relying_parties: {
    filters: string[];
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
