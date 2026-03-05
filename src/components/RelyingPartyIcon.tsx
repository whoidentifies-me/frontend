import { TbBuilding, TbBuildingBank } from "solid-icons/tb";
import { Component, Switch } from "solid-js";

interface RelyingPartyIconProps {
  isPSB?: boolean;
  class?: string;
}

export const RelyingPartyIcon: Component<RelyingPartyIconProps> = (props) => {
  return (
    <Switch fallback={<TbBuildingBank class={props.class} />}>
      <TbBuilding class={props.class} />
    </Switch>
  );
};
