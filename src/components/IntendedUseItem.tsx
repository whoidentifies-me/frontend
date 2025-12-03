import { Component, createMemo } from "solid-js";
import { IntendedUse } from "~/api";
import { defaultLocale, useI18n, useTranslate } from "~/i18n/dict";
import { ItemCard } from "./ItemCard";

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

  const attributes = createMemo((): string[] => {
    return [props.data.relying_party?.trade_name].filter(
      (a) => !!a
    ) as string[];
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
      description={purpose().length > 60 ? undefined : purpose() || undefined}
      href={href()}
    />
  );
};
