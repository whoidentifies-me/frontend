import { createAsync, query } from "@solidjs/router";
import { Component, For } from "solid-js";
import apiClient from "~/api";
import { TwoColumnLayout } from "~/components/layout/TwoColumnLayout";
import { RelyingPartyItem } from "~/components/RelyingPartyItem";
import { useTranslate } from "~/i18n/dict";

const getRelyingParties = query(async () => {
  return await apiClient.getRelyingParties({ limit: 3 });
}, "relying-parties-explore");

export const Explore: Component = () => {
  const t = useTranslate();

  const exploreItems = createAsync(() => getRelyingParties());

  return (
    <section id="explore" class="wim-section">
      <TwoColumnLayout
        class="wim-container"
        largerCol="right"
        leftContent={
          <>
            <h2>{t.home.explore.title()}</h2>
            <p class="mb-0">{t.home.explore.description()}</p>
          </>
        }
        rightContent={
          <For each={exploreItems()?.data || []}>
            {(item) => <RelyingPartyItem data={item}></RelyingPartyItem>}
          </For>
        }
      ></TwoColumnLayout>
    </section>
  );
};
