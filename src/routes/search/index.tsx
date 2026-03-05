import { Title } from "@solidjs/meta";
import { createAsync, useSearchParams } from "@solidjs/router";
import { ErrorBoundary, For, Suspense } from "solid-js";
import { RelyingParties } from "~/api";
import { CategoryTabs } from "~/components/CategoryTabs";
import { ErrorCard } from "~/components/ErrorCard";
import { PendingOverlay } from "~/components/PendingOverlay";
import { SearchAndFilter } from "~/components/SearchAndFilter";
import { SkeletonList } from "~/components/SkeletonList";
import { useSearchFilters } from "~/providers/FilterProvider";
import { InfiniteList } from "~/components/InfiniteList";
import { RelyingPartyItem } from "~/components/RelyingPartyItem";
import { createInfiniteScroll } from "~/utils/createInfiniteScroll";
import { uiFiltersToApiParams } from "~/utils/filter-api";
import { useTranslate } from "~/i18n/dict";
import { Hero } from "~/components/Hero";

export default function SearchRelyingParties() {
  const t = useTranslate();
  const [searchParams] = useSearchParams<{ q: string }>();
  const { deferredFilters, isPending } = useSearchFilters("relying-parties");
  const relyingPartiesInitial = createAsync(() =>
    RelyingParties.listRelyingParties(uiFiltersToApiParams(deferredFilters()))
  );

  const relyingPartiesInfinite = createInfiniteScroll({
    initialResult: relyingPartiesInitial,
    fetcher: (cursor) =>
      RelyingParties.listRelyingParties({
        ...uiFiltersToApiParams(deferredFilters()),
        cursor,
      }),
  });

  const getTitle = () => {
    if (searchParams.q) {
      return `Search Service Providers: ${searchParams.q}`;
    }
    return "Search Service Providers";
  };

  return (
    <>
      <Title>{getTitle()}</Title>

      <Hero>
        <SearchAndFilter></SearchAndFilter>
      </Hero>

      <CategoryTabs />

      <div id="results" class="my-6 relative">
        {isPending() && <PendingOverlay />}

        <div classList={{ "opacity-60 pointer-events-none": isPending() }}>
          <h2>{t.searchResults.relyingParties()}</h2>
          <ErrorBoundary fallback={() => <ErrorCard />}>
            <Suspense fallback={<SkeletonList />}>
              <InfiniteList
                class="space-y-4"
                onLoadMore={relyingPartiesInfinite.loadMore}
                hasMore={relyingPartiesInfinite.hasMore()}
                isLoading={relyingPartiesInfinite.loading()}
              >
                <For
                  each={relyingPartiesInfinite.items()}
                  fallback="No Results"
                >
                  {(item) => <RelyingPartyItem data={item} />}
                </For>
              </InfiniteList>
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
}
