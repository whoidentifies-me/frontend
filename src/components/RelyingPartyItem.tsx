import { A } from "@solidjs/router";
import { Component, createMemo, Show } from "solid-js";
import { RelyingParty } from "~/api";
import { defaultLocale, useI18n, useTranslate } from "~/i18n/dict";
import { CountryCode } from "~/i18n/en";

export const RelyingPartyItem: Component<{ data: RelyingParty }> = (props) => {
  const { locale, t } = useI18n();

  const titleId = () => `wim-relying-party-title-${props.data.id}`;

  const publicSecorBody = () =>
    props.data.is_psb
      ? t.relyingParties.public()
      : t.relyingParties.nonPublic();

  const country = () =>
    t.countries[props.data.legal_entity.country as CountryCode]?.() ||
    props.data.legal_entity.country;

  const description = createMemo((): string | undefined => {
    let description = props.data.service_descriptions.find(
      (d) => d.lang.toLowerCase() === locale().toLowerCase()
    );
    if (description) {
      return description.content;
    }
    description = props.data.service_descriptions.find(
      (d) => d.lang.toLowerCase() === defaultLocale.toLowerCase()
    );
    if (description) {
      return description.content;
    }
    if (props.data.service_descriptions?.length) {
      return props.data.service_descriptions.at(0)?.content;
    }
    return undefined;
  });

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
        <Show when={description()}>
          <p class="mt-2 mb-0 line-clamp-2">{description() || ""}</p>
        </Show>
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
