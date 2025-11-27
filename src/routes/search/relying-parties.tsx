import { Title } from "@solidjs/meta";
import { createAsync, query, useSearchParams } from "@solidjs/router";
import {
  createEffect,
  createMemo,
  createResource,
  createSignal,
  ErrorBoundary,
  For,
} from "solid-js";
import apiClient, { ApiResponse, BaseFilters, RelyingParty } from "~/api";
import { CategoryTabs } from "~/components/CategoryTabs";
import { SearchAndFilter } from "~/components/SearchAndFilter";
import { useSearchFilters } from "~/composables/useSearchFilters";
import { InfiniteList } from "~/components/InfiniteList";
import { RelyingPartyItem } from "~/components/RelyingPartyItem";
import { createInfiniteScroll } from "~/utils/createInfiniteScroll";

const getRelyingParties = query(async (filters: BaseFilters) => {
  return await apiClient.getRelyingParties(filters);
}, "relying-parties");

export default function SearchRelyingParties() {
  const [searchParams, setSearchParams] = useSearchParams<{ q: string }>();
  const { filters } = useSearchFilters("relying-parties");
  const relyingPartiesInitial = createAsync(() => getRelyingParties(filters()));

  const relyingPartiesInfinite = createInfiniteScroll({
    initialResult: relyingPartiesInitial,
    fetcher: (cursor) => getRelyingParties({ ...filters(), cursor }),
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
      <SearchAndFilter searchCategory="relying-parties"></SearchAndFilter>
      <CategoryTabs />

      <div class="mt-6">
        <h3>Relying Parties</h3>
        <ErrorBoundary fallback={<div>Something went wrong!</div>}>
          <InfiniteList
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
