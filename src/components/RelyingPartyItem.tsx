import { A } from "@solidjs/router";
import { Component } from "solid-js";
import { RelyingParty } from "~/api";
import { useTranslate } from "~/i18n/dict";
import { CountryCode } from "~/i18n/en";

export const RelyingPartyItem: Component<{ data: RelyingParty }> = (props) => {
  const t = useTranslate();
  const titleId = () => `wim-relying-party-title-${props.data.id}`;
  const publicSecorBody = () =>
    props.data.is_psb
      ? t.relyingParties.public()
      : t.relyingParties.nonPublic();
  const country = () =>
    t.countries[props.data.legal_entity.country as CountryCode]?.() ||
    props.data.legal_entity.country;

  return (
    <article
      class="wim-card wim-card-outline-accent flex flex-row items-center"
      aria-labelledby={titleId()}
    >
      <div class="flex flex-col flex-grow">
        <span id={titleId()} class="wim-font-title">
          {props.data.trade_name}
        </span>
        <p class="wim-attributes my-0 text-accent/80">
          <span>{publicSecorBody()}</span>
          <span>{country()}</span>
        </p>
      </div>
      <A
        class="btn btn-primary btn-outline no-underline"
        href={`/rp/${props.data.id}`}
      >
        {t.components.generic.details()}
      </A>
    </article>
  );
};
