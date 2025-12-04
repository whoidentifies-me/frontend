import { Component, createMemo } from "solid-js";
import { IntendedUse } from "~/api";
import { defaultLocale, useI18n } from "~/i18n/dict";
import { ItemCard } from "./ItemCard";
import { CountryCode } from "~/i18n/en";

export const IntendedUseItem: Component<{ data: IntendedUse }> = (props) => {
  const { locale, t } = useI18n();

  const purpose = createMemo((): string => {
    const purposes = props.data.purposes
      .slice()
      .sort(
        (a, b) => (a.purpose_index || Infinity) - (b.purpose_index || Infinity)
      );

    let purposeText = purposes.find(
      (p) => p.lang.toLowerCase() === locale().toLowerCase()
    );
    if (purposeText) {
      return purposeText.content;
    }
    purposeText = purposes.find(
      (p) => p.lang.toLowerCase() === defaultLocale.toLowerCase()
    );
    if (purposeText) {
      return purposeText.content;
    }
    if (purposes?.length) {
      return purposes.at(0)?.content || "";
    }
    return "";
  });

  const country = () =>
    props.data.relying_party?.legal_entity.country
      ? t.countries[
          props.data.relying_party.legal_entity.country as CountryCode
        ]?.()
      : undefined;

  const publicSecorBody = () => {
    if (props.data.relying_party?.is_psb === true) {
      return t.relyingParties.public();
    } else if (props.data.relying_party?.is_psb === false) {
      return t.relyingParties.nonPublic();
    }
    return undefined;
  };

  const attributes = createMemo((): string[] => {
    return [
      props.data.relying_party?.trade_name,
      publicSecorBody(),
      country(),
    ].filter((a) => !!a) as string[];
  });

  const href = () =>
    props.data?.id
      ? `/rp/${props.data.wrp_id}#intended_use_${props.data.id.substring(0, 8)}`
      : "";

  return (
    <ItemCard
      id={props.data.id}
      title={purpose()}
      attributes={attributes()}
      href={href()}
    />
  );
};
