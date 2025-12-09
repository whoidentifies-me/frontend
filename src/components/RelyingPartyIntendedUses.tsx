import { Component, For } from "solid-js";
import { IntendedUse, RelyingParty } from "~/api";
import { useTranslate } from "~/i18n/dict";
import { IntendedUseDetails } from "./IntendedUseDetails";

interface RelyingPartyIntendedUsesProps {
  relyingParty?: RelyingParty;
  intendedUses?: IntendedUse[];
}

export const RelyingPartyIntendedUses: Component<
  RelyingPartyIntendedUsesProps
> = (props) => {
  const t = useTranslate();

  return (
    <div class="mb-14">
      <div class="wim-container">
        <h2>{t.relyingPartyDetails.intendedUses.title()}</h2>
        <p>{t.relyingPartyDetails.intendedUses.description()}</p>
      </div>

      <div class="space-y-8 wim-container">
        <For
          each={props.intendedUses || []}
          fallback={
            <p class="text-base-content/75">
              <em>There are no use cases reportet at the moment.</em>
            </p>
          }
        >
          {(item, index) => (
            <IntendedUseDetails
              data={item}
              title={t.relyingPartyDetails.intendedUses.useCaseX(index() + 1)}
            />
          )}
        </For>
      </div>
    </div>
  );
};
