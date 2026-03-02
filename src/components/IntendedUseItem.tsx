import { Component, createMemo } from "solid-js";
import { IntendedUse } from "~/api";
import { defaultLocale, useI18n } from "~/i18n/dict";
import { ItemCard } from "./ItemCard";
import { getRelyingPartyAttributes } from "~/utils/relyingPartyAttributes";
import { routes } from "~/config/routes";

export const IntendedUseItem: Component<{ data: IntendedUse }> = (props) => {
  const { locale, t } = useI18n();

  const purpose = createMemo((): string => {
    const purposes = (props.data.purposes || [])
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

  const attributes = createMemo((): string[] => {
    const relyingPartyAttrs = getRelyingPartyAttributes(
      props.data.relying_party,
      t
    );
    return [props.data.relying_party?.trade_name, ...relyingPartyAttrs].filter(
      (a) => !!a
    ) as string[];
  });

  const href = () =>
    props.data?.id ? routes.intendedUse(props.data.wrp_id, props.data.id) : "";

  return (
    <ItemCard
      id={props.data.id}
      title={purpose()}
      attributes={attributes()}
      href={href()}
    />
  );
};
