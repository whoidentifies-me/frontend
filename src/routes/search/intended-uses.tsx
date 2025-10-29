import { Title } from "@solidjs/meta";
import { createAsync, query, useSearchParams } from "@solidjs/router";
import { ErrorBoundary } from "solid-js";
import apiClient, { BaseFilters } from "~/api";
import { IntendedUses } from "~/components/IntendedUses";
import { CategoryTabs } from "~/components/CategoryTabs";
import { SearchAndFilter } from "~/components/SearchAndFilter";
import { useSearchFilters } from "~/composables/useSearchFilters";

const getIntendedUses = query(async (filters: BaseFilters) => {
  return await apiClient.getIntendedUses(filters);
}, "intended-uses");

export default function SearchIntendedUses() {
  const [searchParams, setSearchParams] = useSearchParams<{ q: string }>();
  const { filters } = useSearchFilters(searchParams, setSearchParams);

  const intendedUses = createAsync(() => getIntendedUses(filters()));

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
          <IntendedUses items={intendedUses()?.data} />
        </ErrorBoundary>
      </div>
    </>
  );
}
