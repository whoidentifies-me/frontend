import { Component, createMemo } from "solid-js";
import { RelyingParty } from "~/api";
import { defaultLocale, useI18n, useTranslate } from "~/i18n/dict";
import { CountryCode } from "~/i18n/en";
import { ItemCard } from "./ItemCard";

export const RelyingPartyItem: Component<{ data: RelyingParty }> = (props) => {
  const { locale, t } = useI18n();

  const publicSecorBody = () =>
    props.data.is_psb
      ? t.relyingParties.public()
      : t.relyingParties.nonPublic();

  const country = () =>
    t.countries[props.data.legal_entity.country as CountryCode]?.() ||
    props.data.legal_entity.country;

  const attributes = createMemo(
    (): string[] =>
      [publicSecorBody(), country()].filter((a) => !!a) as string[]
  );

  const description = createMemo((): string | undefined => {
    const descriptions = props.data.service_descriptions
      .slice()
      .sort(
        (a, b) => (a.service_index || Infinity) - (b.service_index || Infinity)
      );

    let description = descriptions.find(
      (d) => d.lang.toLowerCase() === locale().toLowerCase()
    );
    if (description) {
      return description.content;
    }
    description = descriptions.find(
      (d) => d.lang.toLowerCase() === defaultLocale.toLowerCase()
    );
    if (description) {
      return description.content;
    }
    if (descriptions?.length) {
      return descriptions.at(0)?.content;
    }
    return undefined;
  });

  return (
    <ItemCard
      id={props.data.id}
      title={props.data.trade_name}
      attributes={attributes()}
      description={description() ?? undefined}
      href={`/rp/${props.data.id}`}
    />
  );
};
