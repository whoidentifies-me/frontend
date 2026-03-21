import { LocalizedText, RelyingParty, ServiceDescription } from "~/api";
import { CountryCode } from "~/i18n/en";
import { defaultLocale, Translator } from "~/i18n/dict";
import { JSX } from "solid-js";
import { CountryFlag } from "~/components/CountryFlag";

export function getRelyingPartyAttributes(
  data: RelyingParty | undefined,
  t: Translator
): (string | (() => JSX.Element))[] {
  if (!data) {
    return [];
  }

  const attributes: (string | (() => JSX.Element))[] = [];

  // Use provider_type translation if available, otherwise fall back to is_psb
  const providerTypeLabel =
    data.provider_type &&
    t.relyingParties.providerTypes[
      data.provider_type as keyof typeof t.relyingParties.providerTypes
    ]?.();

  if (providerTypeLabel) {
    attributes.push(providerTypeLabel);
  } else if (data.is_psb === true) {
    attributes.push(t.relyingParties.public() || "");
  } else if (data.is_psb === false) {
    attributes.push(t.relyingParties.nonPublic() || "");
  }

  if (data.is_intermediary === true) {
    attributes.push(t.relyingParties.intermediary() || "");
  }

  // Add country
  const country =
    t.countries[data.legal_entity?.country as CountryCode]?.() ||
    data.legal_entity?.country;

  if (country) {
    attributes.push(() => (
      <span>
        {country}{" "}
        <CountryFlag code={data.legal_entity?.country} class="ml-0.5" />
      </span>
    ));
  }

  return attributes;
}

export function getFirstDescription(
  descriptions: ServiceDescription[] | undefined,
  locale: string
): string | undefined {
  return getAllDescriptions(descriptions, locale)?.[0];
}

export function getAllDescriptions(
  descriptions: ServiceDescription[] | undefined,
  locale: string
): string[] {
  if (!descriptions?.length) return [];

  const seen = new Set<number>();

  return descriptions
    .slice()
    .sort((a, b) => {
      const indexDiff = a.service_index - b.service_index;
      if (indexDiff !== 0) return indexDiff;

      // Same service_index: prioritize by locale
      if (a.lang.toLowerCase() === locale.toLowerCase()) return -1;
      if (b.lang.toLowerCase() === locale.toLowerCase()) return 1;
      if (a.lang.toLowerCase() === defaultLocale.toLowerCase()) return -1;
      if (b.lang.toLowerCase() === defaultLocale.toLowerCase()) return 1;
      return 0;
    })
    .filter((desc) => {
      if (seen.has(desc.service_index)) return false;
      seen.add(desc.service_index);
      return true;
    })
    .map((desc) => desc.content);
}

export function getLocalizeText(
  descriptions: LocalizedText[] | undefined,
  locale: string
): string[] {
  if (!descriptions?.length) return [];

  const seen = new Set<number>();

  return descriptions
    .slice()
    .sort((a, b) => {
      const indexDiff = a.purpose_index - b.purpose_index;
      if (indexDiff !== 0) return indexDiff;

      // Same service_index: prioritize by locale
      if (a.lang.toLowerCase() === locale.toLowerCase()) return -1;
      if (b.lang.toLowerCase() === locale.toLowerCase()) return 1;
      if (a.lang.toLowerCase() === defaultLocale.toLowerCase()) return -1;
      if (b.lang.toLowerCase() === defaultLocale.toLowerCase()) return 1;
      return 0;
    })
    .filter((desc) => {
      if (seen.has(desc.purpose_index)) return false;
      seen.add(desc.purpose_index);
      return true;
    })
    .map((desc) => desc.content);
}
