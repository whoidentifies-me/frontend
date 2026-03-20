import { Component, For, JSX, Show } from "solid-js";

type ItemType = string | (() => JSX.Element);

interface InlineListProps {
  items?: ItemType[];
}

export const InlineList: Component<InlineListProps> = (props) => {
  return (
    <Show when={props.items?.length}>
      <p class="wim-attributes my-0 text-accent/80 line-clamp-1">
        <For each={props.items}>
          {(item) => (
            <Show
              when={typeof item === "function"}
              fallback={<span class="">{item.toString()}</span>}
            >
              {(item as () => JSX.Element)()}
            </Show>
          )}
        </For>
      </p>
    </Show>
  );
};
