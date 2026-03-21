import { A } from "@solidjs/router";
import { Component, JSX, Show } from "solid-js";
import { useTranslate } from "~/i18n/dict";
import { RelyingPartyIcon } from "./RelyingPartyIcon";
import { InlineList } from "./ui/InlineList";

export interface RelyingPartyCardProps {
  id: string;
  title: string;
  isPSB?: boolean;
  providerType?: string;
  attributes: (string | (() => JSX.Element))[];
  description?: string;
  href: string;
  linkState?: Record<string, unknown>;
}

export const RelyingPartyCard: Component<RelyingPartyCardProps> = (props) => {
  const t = useTranslate();

  return (
    <article
      class="wim-card wim-card-outline-accent flex sm:flex-row flex-col gap-2 items-center"
      aria-labelledby={props.id}
    >
      <div class="flex flex-col flex-grow min-w-0">
        <div class="flex flex-row items-center gap-2">
          <RelyingPartyIcon
            isPSB={props.isPSB}
            providerType={props.providerType}
            class="text-primary/80 text-3xl"
          />
          <div>
            <span id={props.id} class="wim-font-title line-clamp-1">
              {props.title}
            </span>
            <InlineList items={props.attributes} />
          </div>
        </div>

        <Show when={props.description}>
          <p class="mt-2 mb-0 line-clamp-2">{props.description || ""}</p>
        </Show>
      </div>
      <A
        class="btn btn-primary btn-outline no-underline shrink-0"
        href={props.href}
        state={props.linkState}
      >
        {t.components.generic.details()}
      </A>
    </article>
  );
};
