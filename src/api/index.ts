// Export API clients
export { RelyingParties } from "./generated/relying-parties/relying-parties";
export { IntendedUses } from "./generated/intended-uses/intended-uses";
export { Filters } from "./generated/filters/filters";

// Export types
export type {
  RelyingPartyAPIResponse as RelyingParty,
  IntendedUseAPIResponse as IntendedUse,
  PurposeEntryAPIResponse as LocalizedText,
  ServiceDescriptionEntryAPIResponse as ServiceDescription,
  ListRelyingPartiesParams,
  ListIntendedUsesParams,
  ListRelyingPartiesOutputBody,
  ListIntendedUsesOutputBody,
  GetFilterValuesOutputBody,
} from "./generated/index.schemas";

// Re-export all generated types
export * from "./generated/index.schemas";
