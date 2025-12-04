import { A } from "@solidjs/router";
import { Component, For, Show } from "solid-js";
import { useTranslate } from "~/i18n/dict";

export interface ItemCardProps {
  id: string;
  title: string;
  attributes: string[];
  description?: string;
  href: string;
}

export const ItemCard: Component<ItemCardProps> = (props) => {
  const t = useTranslate();
  const titleId = () => `wim-item-title-${props.id}`;

  return (
    <article
      class="wim-card wim-card-outline-accent flex flex-row items-center"
      aria-labelledby={titleId()}
    >
      <div class="flex flex-col flex-grow min-w-0">
        <span id={titleId()} class="wim-font-title line-clamp-1">
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
