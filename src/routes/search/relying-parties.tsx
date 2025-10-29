import { Title } from "@solidjs/meta";
import { createAsync, query, useSearchParams } from "@solidjs/router";
import { ErrorBoundary } from "solid-js";
import apiClient, { BaseFilters } from "~/api";
import { RelyingParties } from "~/components/RelyingParties";
import { CategoryTabs } from "~/components/CategoryTabs";
import { SearchAndFilter } from "~/components/SearchAndFilter";
import { useSearchFilters } from "~/composables/useSearchFilters";

const getRelyingParties = query(async (filters: BaseFilters) => {
  return await apiClient.getRelyingParties(filters);
}, "relying-parties");

export default function SearchRelyingParties() {
  const [searchParams, setSearchParams] = useSearchParams<{ q: string }>();
  const { filters } = useSearchFilters(searchParams, setSearchParams);

  const relyingParties = createAsync(() => getRelyingParties(filters()));

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
          <RelyingParties items={relyingParties()?.data} />
        </ErrorBoundary>
      </div>
    </>
  );
}
