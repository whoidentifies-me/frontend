import { A } from "@solidjs/router";
import { Component, For, Show } from "solid-js";
import { useTranslate } from "~/i18n/dict";

export interface RelyingPartyCardProps {
  id: string;
  title: string;
  attributes: string[];
  description?: string;
  href: string;
}

export const RelyingPartyCard: Component<RelyingPartyCardProps> = (props) => {
  const t = useTranslate();

  return (
    <article
      class="wim-card wim-card-outline-accent flex sm:flex-row flex-col gap-2 items-center"
      aria-labelledby={props.id}
    >
      <div class="flex flex-col flex-grow min-w-0">
        <span id={props.id} class="wim-font-title line-clamp-1">
          {props.title}
        </span>
        <Show when={props.attributes.length > 0}>
          <p class="wim-attributes my-0 text-accent/80 line-clamp-1">
            <For each={props.attributes}>
              {(item) => <span class="">{item}</span>}
            </For>
          </p>
        </Show>
        <Show when={props.description}>
          <p class="mt-2 mb-0 line-clamp-2">{props.description || ""}</p>
        </Show>
      </div>
      <A
        class="btn btn-primary btn-outline no-underline shrink-0"
        href={props.href}
      >
        {t.components.generic.details()}
      </A>
    </article>
  );
};
