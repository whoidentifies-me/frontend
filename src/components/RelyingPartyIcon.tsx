import { TbOutlineBuilding, TbOutlineBuildingBank } from "solid-icons/tb";
import { Component, Show } from "solid-js";

interface RelyingPartyIconProps {
  isPSB?: boolean;
  class?: string;
}

export const RelyingPartyIcon: Component<RelyingPartyIconProps> = (props) => {
  return (
    <Show
      when={props.isPSB}
      fallback={<TbOutlineBuilding class={props.class} />}
    >
      <TbOutlineBuildingBank class={props.class} />
    </Show>
  );
};
