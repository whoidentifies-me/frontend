import { TbBuilding, TbBuildingBank } from "solid-icons/tb";
import { Component, Show } from "solid-js";

interface RelyingPartyIconProps {
  isPSB?: boolean;
  class?: string;
}

export const RelyingPartyIcon: Component<RelyingPartyIconProps> = (props) => {
  return (
    <Show when={props.isPSB} fallback={<TbBuilding class={props.class} />}>
      <TbBuildingBank class={props.class} />
    </Show>
  );
};
