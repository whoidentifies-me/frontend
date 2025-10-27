import { Component, For } from "solid-js";
import { RelyingParty } from "~/api";
import { RelyingPartyItem } from "./RelyingPartyItem";

export const RelyingParties: Component<{ items?: RelyingParty[] }> = (
  props
) => {
  return (
    <div>
      <For each={props.items || []}>
        {(item) => <RelyingPartyItem data={item} />}
      </For>
    </div>
  );
};
