import { Title } from "@solidjs/meta";
import { createAsync, useLocation, useSearchParams } from "@solidjs/router";
import { ErrorBoundary, For, onMount, Suspense } from "solid-js";
import { IntendedUses } from "~/api";
import { CategoryTabs } from "~/components/CategoryTabs";
import { ErrorCard } from "~/components/ErrorCard";
import { PendingOverlay } from "~/components/PendingOverlay";
import { SearchAndFilter } from "~/components/SearchAndFilter";
import { SkeletonList } from "~/components/SkeletonList";
import { useSearchFilters } from "~/providers/FilterProvider";
import { createInfiniteScroll } from "~/utils/createInfiniteScroll";
import { InfiniteList } from "~/components/InfiniteList";
import { IntendedUseItem } from "~/components/IntendedUseItem";
import { uiFiltersToApiParams } from "~/utils/filter-api";
import { useTranslate } from "~/i18n/dict";
import { Hero } from "~/components/Hero";

export default function SearchIntendedUses() {
  const t = useTranslate();
  const [searchParams] = useSearchParams<{ q: string }>();
  const { deferredFilters, isPending } = useSearchFilters("intended-uses");
  const location = useLocation<{ scrollToResults?: boolean }>();

  const intendedUsesInitial = createAsync(() =>
    IntendedUses.listIntendedUses(uiFiltersToApiParams(deferredFilters()))
  );
  const intendedUsesInfinite = createInfiniteScroll({
    initialResult: intendedUsesInitial,
    resetKey: () => JSON.stringify(uiFiltersToApiParams(deferredFilters())),
    fetcher: (cursor) =>
      IntendedUses.listIntendedUses({
        ...uiFiltersToApiParams(deferredFilters()),
        cursor,
      }),
  });

  const getTitle = () => {
    if (searchParams.q) {
      return `Search Intended Uses: ${searchParams.q}`;
    }
    return "Search Intended Uses";
  };

  onMount(() => {
    if (location.state?.scrollToResults) {
      document
        .getElementById("results")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <>
      <Title>{getTitle()}</Title>

      <Hero>
        <SearchAndFilter searchCategory="intended-uses"></SearchAndFilter>
      </Hero>

      <CategoryTabs />

      <div id="results" class="my-6 relative" data-search-tab="intended-uses">
        {isPending() && <PendingOverlay />}

        <div classList={{ "opacity-60 pointer-events-none": isPending() }}>
          <h2>{t.searchResults.intendedUses()}</h2>
          <ErrorBoundary fallback={() => <ErrorCard />}>
            <Suspense fallback={<SkeletonList />}>
              <InfiniteList
                class="space-y-4"
                isLoading={intendedUsesInfinite.loading()}
                hasMore={intendedUsesInfinite.hasMore()}
                onLoadMore={intendedUsesInfinite.loadMore}
              >
                <For each={intendedUsesInfinite.items()} fallback="No Results">
                  {(item) => <IntendedUseItem data={item} />}
                </For>
              </InfiniteList>
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
}
