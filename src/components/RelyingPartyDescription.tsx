import { Component, createMemo, For } from "solid-js";
import { RelyingParty } from "~/api";
import { useI18n } from "~/i18n/dict";
import { getAllDescriptions } from "~/utils/relyingPartyAttributes";

export const RelyingPartyDescription: Component<{ data?: RelyingParty }> = (
  props
) => {
  const { locale, t } = useI18n();

  const descriptions = createMemo(() =>
    getAllDescriptions(props.data?.service_descriptions, locale())
  );

  return (
    <section class="wim-container">
      <h2 class="mt-14">
        {t.relyingPartyDetails.relyingPartyDescription.title()}
      </h2>
      <For each={descriptions()}>{(descr) => <p>{descr}</p>}</For>
    </section>
  );
};
