import { IntendedUse } from "~/api";
import { defaultLocale } from "~/i18n/dict";

export function getIntendedUseDescription(
  intendedUse: IntendedUse | undefined,
  locale: string
): string | undefined {
  if (!intendedUse) {
    return undefined;
  }

  const sortedDescriptions = intendedUse.purposes
    .slice()
    .sort(
      (a, b) => (a.purpose_index ?? Infinity) - (b.purpose_index ?? Infinity)
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
