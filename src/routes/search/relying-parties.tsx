import { Title } from "@solidjs/meta";
import { createAsync, query, useSearchParams } from "@solidjs/router";
import { ErrorBoundary } from "solid-js";
import apiClient from "~/api";
import { RelyingParties } from "~/components/RelyingParties";
import { SearchBar } from "~/components/SearchBar";
import { Filters } from "~/components/filter/Filters";
import { CategoryTabs } from "~/components/CategoryTabs";
import { useSearchFilters } from "~/composables/useSearchFilters";

const getRelyingParties = query(async (q?: string) => {
  return await apiClient.getRelyingParties({
    q: q?.trim() ? `%${q?.trim()}%` : undefined,
  });
}, "relying-parties");

export default function SearchRelyingParties() {
  const [searchParams, setSearchParams] = useSearchParams<{ q: string }>();
  const { filters, handleFiltersChange } = useSearchFilters(
    searchParams,
    setSearchParams
  );

  const relyingParties = createAsync(() => getRelyingParties(searchParams.q));

  const getTitle = () => {
    if (searchParams.q) {
      return `Search Relying Parties: ${searchParams.q}`;
    }
    return "Search Relying Parties";
  };

  return (
    <>
      <Title>{getTitle()}</Title>
      <SearchBar value={searchParams.q} category="relying-parties" />
      <Filters filters={filters()} onFiltersChange={handleFiltersChange} />
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
