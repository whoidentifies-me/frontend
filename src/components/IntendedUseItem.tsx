import { A } from "@solidjs/router";
import { Component } from "solid-js";
import { IntendedUse } from "~/api";

export const IntendedUseItem: Component<{ data: IntendedUse }> = (props) => {
  const getPurpose = () => {
    return (
      props.data?.purposes.find((p) => p.lang === "en")?.content ??
      props.data?.purposes.find(() => true)?.content
    );
  };
  const getURL = () =>
    props?.data?.id
      ? `/rp/${props.data.wrp_id}#intended_use_${props.data.id.substring(0, 8)}`
      : "";
  return (
    <div class="border-solid my-2">
      {getPurpose()}
      <br />
      <A href={getURL()}>More ...</A>
    </div>
  );
};
