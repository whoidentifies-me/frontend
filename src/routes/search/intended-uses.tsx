import { Title } from "@solidjs/meta";
import { createAsync, useSearchParams } from "@solidjs/router";
import { ErrorBoundary, For } from "solid-js";
import { IntendedUses } from "~/api";
import { CategoryTabs } from "~/components/CategoryTabs";
import { SearchAndFilter } from "~/components/SearchAndFilter";
import { useSearchFilters } from "~/composables/useSearchFilters";
import { createInfiniteScroll } from "~/utils/createInfiniteScroll";
import { InfiniteList } from "~/components/InfiniteList";
import { IntendedUseItem } from "~/components/IntendedUseItem";
import { uiFiltersToApiParams } from "~/utils/filter-api";
import { useTranslate } from "~/i18n/dict";
import { Hero } from "~/components/Hero";

export default function SearchIntendedUses() {
  const t = useTranslate();
  const [searchParams] = useSearchParams<{ q: string }>();
  const { filters } = useSearchFilters("intended-uses");

  const intendedUsesInitial = createAsync(() =>
    IntendedUses.listIntendedUses(uiFiltersToApiParams(filters()))
  );
  const intendedUsesInfinite = createInfiniteScroll({
    initialResult: intendedUsesInitial,
    fetcher: (cursor) =>
      IntendedUses.listIntendedUses({
        ...uiFiltersToApiParams(filters()),
        cursor,
      }),
  });

  const getTitle = () => {
    if (searchParams.q) {
      return `Search Intended Uses: ${searchParams.q}`;
    }
    return "Search Intended Uses";
  };

  return (
    <>
      <Title>{getTitle()}</Title>

      <Hero>
        <SearchAndFilter searchCategory="intended-uses"></SearchAndFilter>
      </Hero>

      <CategoryTabs />

      <div id="results" class="my-6">
        <h2>{t.searchResults.intendedUses()}</h2>
        <ErrorBoundary fallback={<div>Something went wrong!</div>}>
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
        </ErrorBoundary>
      </div>
    </>
  );
}
