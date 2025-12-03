import { Title } from "@solidjs/meta";
import { createAsync, query, useSearchParams } from "@solidjs/router";
import { ErrorBoundary, For } from "solid-js";
import apiClient, { BaseFilters } from "~/api";
import { CategoryTabs } from "~/components/CategoryTabs";
import { SearchAndFilter } from "~/components/SearchAndFilter";
import { useSearchFilters } from "~/composables/useSearchFilters";
import { createInfiniteScroll } from "~/utils/createInfiniteScroll";
import { InfiniteList } from "~/components/InfiniteList";
import { IntendedUseItem } from "~/components/IntendedUseItem";

const getIntendedUses = query(async (filters: BaseFilters) => {
  return await apiClient.getIntendedUses(filters);
}, "intended-uses");

export default function SearchIntendedUses() {
  const [searchParams, setSearchParams] = useSearchParams<{ q: string }>();
  const { filters } = useSearchFilters("intended-uses");

  const intendedUsesInitial = createAsync(() =>
    getIntendedUses({ ...filters() })
  );
  const intendedUsesInfinite = createInfiniteScroll({
    initialResult: intendedUsesInitial,
    fetcher: (cursor) => getIntendedUses({ ...filters(), cursor }),
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
      <SearchAndFilter searchCategory="intended-uses"></SearchAndFilter>
      <CategoryTabs />

      <div class="mt-6">
        <h3>Intended Uses</h3>
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
