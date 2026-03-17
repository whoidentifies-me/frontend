import { TbOutlineBuilding, TbOutlineBuildingBank } from "solid-icons/tb";
import { Component, Show } from "solid-js";
import { getProviderType } from "~/data/providerTypes";

interface RelyingPartyIconProps {
  isPSB?: boolean;
  providerType?: string;
  class?: string;
}

export const RelyingPartyIcon: Component<RelyingPartyIconProps> = (props) => {
  const providerType = () => getProviderType(props.providerType);

  return (
    <Show
      when={providerType()}
      fallback={
        <Show
          when={props.isPSB}
          fallback={<TbOutlineBuilding class={props.class} />}
        >
          <TbOutlineBuildingBank class={props.class} />
        </Show>
      }
    >
      {(pt) => <span class={props.class}>{pt().icon()}</span>}
    </Show>
  );
};
