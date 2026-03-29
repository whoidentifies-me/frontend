import { A, createAsync } from "@solidjs/router";
import { Component, ErrorBoundary, For, Suspense } from "solid-js";
import { RelyingParties } from "~/api";
import type { RelyingParty } from "~/api";
import { ErrorCard } from "~/components/ErrorCard";
import { TwoColumnLayout } from "~/components/layout/TwoColumnLayout";
import { RelyingPartyItem } from "~/components/RelyingPartyItem";
import { SkeletonList } from "~/components/SkeletonList";
import { useTranslate } from "~/i18n/dict";
import { routes } from "~/config/routes";
import { exploreConfig } from "~/config/explore";

const DEFAULT_EXPLORE_COUNT = 3;

export const Explore: Component = () => {
  const t = useTranslate();
  const exploreCount = exploreConfig.rpIds?.length ?? DEFAULT_EXPLORE_COUNT;

  const exploreItems = createAsync<RelyingParty[]>(async () => {
    if (exploreConfig.rpIds) {
      return Promise.all(
        exploreConfig.rpIds.map((id) => RelyingParties.getRelyingParty(id))
      );
    }
    const result = await RelyingParties.listRelyingParties({
      limit: DEFAULT_EXPLORE_COUNT,
    });
    return result?.data ?? [];
  });

  return (
    <section id="explore" class="wim-section">
      <TwoColumnLayout
        class="wim-container"
        largerCol="last"
        firstContent={
          <>
            <h2>{t.home.explore.title()}</h2>
            {t.home.explore.description()}
          </>
        }
        lastColumnClass="flex flex-col gap-3 justify-center"
        lastContent={
          <ErrorBoundary fallback={() => <ErrorCard />}>
            <Suspense fallback={<SkeletonList count={exploreCount} />}>
              <For each={exploreItems() ?? []}>
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
            </Suspense>
          </ErrorBoundary>
        }
      ></TwoColumnLayout>
    </section>
  );
};
