import { RelyingParty, ServiceDescription } from "~/api";
import { CountryCode } from "~/i18n/en";
import { defaultLocale, Translator } from "~/i18n/dict";

export function getRelyingPartyAttributes(
  data: RelyingParty | undefined,
  t: Translator
): string[] {
  if (!data) {
    return [];
  }

  const attributes: string[] = [];

  // Only add public/private if is_psb is explicitly defined
  if (data.is_psb === true) {
    attributes.push(t.relyingParties.public() || "");
  } else if (data.is_psb === false) {
    attributes.push(t.relyingParties.nonPublic() || "");
  }

  // Add country
  const country =
    t.countries[data.legal_entity.country as CountryCode]?.() ||
    data.legal_entity.country;

  if (country) {
    attributes.push(country);
  }

  return attributes;
}

export function getFirstDescription(
  descriptions: ServiceDescription[] | undefined,
  locale: string
): string | undefined {
  if (!descriptions?.length) {
    return undefined;
  }

  const sortedDescriptions = descriptions
    .slice()
    .sort(
      (a, b) => (a.service_index ?? Infinity) - (b.service_index ?? Infinity)
    );

  // Try current locale
  let description = sortedDescriptions.find(
    (d) => d.lang.toLowerCase() === locale.toLowerCase()
  );
  if (description) {
    return description.content;
  }

  // Try default locale
  description = sortedDescriptions.find(
    (d) => d.lang.toLowerCase() === defaultLocale.toLowerCase()
  );
  if (description) {
    return description.content;
  }

  // Fallback to first available
  return sortedDescriptions.at(0)?.content;
}
