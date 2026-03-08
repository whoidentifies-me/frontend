import { Component, createMemo, For, Show } from "solid-js";
import { IntendedUse } from "~/api";
import { defaultLocale, useI18n } from "~/i18n/dict";
import { getRelyingPartyAttributes } from "~/utils/relyingPartyAttributes";
import { routes } from "~/config/routes";
import { A, useLocation } from "@solidjs/router";
import { RelyingPartyIcon } from "./RelyingPartyIcon";

export const IntendedUseItem: Component<{ data: IntendedUse }> = (props) => {
  const { locale, t } = useI18n();
  const location = useLocation();
  const backUrl = () => location.pathname + location.search;
  const titleId = () => `wim-item-title-${props.data.id}`;

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
    return getRelyingPartyAttributes(props.data.relying_party, t).filter(
      (a) => !!a
    );
  });

  const tradeName = () => props.data.relying_party?.trade_name;
  const isPSB = () => props.data.relying_party?.is_psb;

  const href = () =>
    props.data?.id ? routes.intendedUse(props.data.wrp_id, props.data.id) : "";

  return (
    <article
      class="wim-card wim-card-outline-accent flex sm:flex-row flex-col gap-2 items-center"
      aria-labelledby={titleId()}
    >
      <div class="flex flex-col flex-grow min-w-0 self-start">
        <div class="flex flex-row gap-1 items-center">
          <RelyingPartyIcon isPSB={isPSB()} class="text-primary/80 shrink-0" />
          <span class="line-clamp-1">{tradeName()}</span>
        </div>
        <span id={titleId()} class="wim-font-title line-clamp-1">
          {purpose()}
        </span>
        <Show when={attributes().length > 0}>
          <p class="wim-attributes my-0 text-accent/80 line-clamp-1">
            <For each={attributes()}>
              {(item) => <span class="">{item}</span>}
            </For>
          </p>
        </Show>
      </div>
      <A
        class="btn btn-primary btn-outline no-underline shrink-0"
        href={href()}
        state={{ backUrl: backUrl() }}
      >
        {t.components.generic.details()}
      </A>
    </article>
  );
};
