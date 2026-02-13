import { Title } from "@solidjs/meta";
import { createAsync, useSearchParams } from "@solidjs/router";
import { ErrorBoundary, For } from "solid-js";
import { RelyingParties } from "~/api";
import { CategoryTabs } from "~/components/CategoryTabs";
import { SearchAndFilter } from "~/components/SearchAndFilter";
import { useSearchFilters } from "~/composables/useSearchFilters";
import { InfiniteList } from "~/components/InfiniteList";
import { RelyingPartyItem } from "~/components/RelyingPartyItem";
import { createInfiniteScroll } from "~/utils/createInfiniteScroll";
import { uiFiltersToApiParams } from "~/types/filters";
import { useTranslate } from "~/i18n/dict";
import { Hero } from "~/components/Hero";

export default function SearchRelyingParties() {
  const t = useTranslate();
  const [searchParams] = useSearchParams<{ q: string }>();
  const { filters } = useSearchFilters("relying-parties");
  const relyingPartiesInitial = createAsync(() =>
    RelyingParties.listRelyingParties(uiFiltersToApiParams(filters()))
  );

  const relyingPartiesInfinite = createInfiniteScroll({
    initialResult: relyingPartiesInitial,
    fetcher: (cursor) =>
      RelyingParties.listRelyingParties({
        ...uiFiltersToApiParams(filters()),
        cursor,
      }),
  });

  const getTitle = () => {
    if (searchParams.q) {
      return `Search Relying Parties: ${searchParams.q}`;
    }
    return "Search Relying Parties";
  };

  return (
    <>
      <Title>{getTitle()}</Title>

      <Hero>
        <SearchAndFilter searchCategory="relying-parties"></SearchAndFilter>
      </Hero>

      <CategoryTabs />

      <div id="results" class="my-6">
        <h2>{t.searchResults.relyingParties()}</h2>
        <ErrorBoundary fallback={<div>Something went wrong!</div>}>
          <InfiniteList
            class="space-y-4"
            onLoadMore={relyingPartiesInfinite.loadMore}
            hasMore={relyingPartiesInfinite.hasMore()}
            isLoading={relyingPartiesInfinite.loading()}
          >
            <For each={relyingPartiesInfinite.items()} fallback="No Results">
              {(item) => <RelyingPartyItem data={item} />}
            </For>
          </InfiniteList>
        </ErrorBoundary>
      </div>
    </>
  );
}
