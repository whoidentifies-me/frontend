import { A, createAsync } from "@solidjs/router";
import { Component, For } from "solid-js";
import { RelyingParties } from "~/api";
import { TwoColumnLayout } from "~/components/layout/TwoColumnLayout";
import { RelyingPartyItem } from "~/components/RelyingPartyItem";
import { useTranslate } from "~/i18n/dict";
import { routes } from "~/config/routes";

export const Explore: Component = () => {
  const t = useTranslate();

  const exploreItems = createAsync(() =>
    RelyingParties.listRelyingParties({ limit: 3 })
  );

  return (
    <section id="explore" class="wim-section">
      <TwoColumnLayout
        class="wim-container"
        largerCol="right"
        leftContent={
          <>
            <h2>{t.home.explore.title()}</h2>
            {t.home.explore.description()}
          </>
        }
        rightColumnClass="flex flex-col gap-3 justify-center"
        rightContent={
          <>
            <For each={exploreItems()?.data || []}>
              {(item) => <RelyingPartyItem data={item}></RelyingPartyItem>}
            </For>
            <div class="flex flex-row justify-center">
              <A
                href={routes.search.results}
                class="btn btn-primary no-underline"
              >
                {t.components.generic.viewMore()}
              </A>
            </div>
          </>
        }
      ></TwoColumnLayout>
    </section>
  );
};
