import { Component, createMemo } from "solid-js";
import { RelyingParty } from "~/api";
import { useI18n } from "~/i18n/dict";
import { ItemCard } from "./ItemCard";
import {
  getRelyingPartyAttributes,
  getFirstDescription,
} from "~/utils/relyingPartyAttributes";

export const RelyingPartyItem: Component<{ data: RelyingParty }> = (props) => {
  const { locale, t } = useI18n();

  const attributes = createMemo(() => getRelyingPartyAttributes(props.data, t));

  const description = createMemo(() =>
    getFirstDescription(props.data.service_descriptions || undefined, locale())
  );

  return (
    <ItemCard
      id={props.data.id}
      title={props.data.trade_name || ""}
      attributes={attributes()}
      description={description() ?? undefined}
      href={`/rp/${props.data.id}`}
    />
  );
};
