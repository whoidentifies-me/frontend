import { Component } from "solid-js";
import { RelyingParty } from "~/api";

export const RelyingPartyDetails: Component<{ data?: RelyingParty }> = (
  props
) => {
  return (
    <div class="border-solid">
      <strong>{props.data?.trade_name}</strong>
      <pre class="mb-0">{JSON.stringify(props.data, null, 2)}</pre>
    </div>
  );
};
