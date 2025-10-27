import { A } from "@solidjs/router";
import { Component } from "solid-js";
import { RelyingParty } from "~/api";

export const RelyingPartyItem: Component<{ data: RelyingParty }> = (props) => {
  return (
    <div class="border-solid my-2">
      {props.data.trade_name}
      <br />
      <A href={`/rp/${props.data.id}`}>More ...</A>
    </div>
  );
};
