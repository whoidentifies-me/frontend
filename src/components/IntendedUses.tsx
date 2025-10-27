import { Component, For } from "solid-js";
import { IntendedUse } from "~/api";
import { IntendedUseItem } from "./IntendedUseItem";

export const IntendedUses: Component<{ items?: IntendedUse[] }> = (props) => {
  return (
    <div class="">
      <For each={props.items || []}>
        {(item) => <IntendedUseItem data={item} />}
      </For>
    </div>
  );
};
