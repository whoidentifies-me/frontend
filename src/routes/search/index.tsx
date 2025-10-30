import { createAsync, query, useSearchParams } from "@solidjs/router";
import { ErrorBoundary } from "solid-js";
import apiClient, { BaseFilters } from "~/api";
import { IntendedUses } from "~/components/IntendedUses";
import { RelyingParties } from "~/components/RelyingParties";
import { CategoryTabs } from "~/components/CategoryTabs";
import { SearchAndFilter } from "~/components/SearchAndFilter";
import { useSearchFilters } from "~/composables/useSearchFilters";

const getRelyingParties = query(async (filters: BaseFilters) => {
  return await apiClient.getRelyingParties({ ...filters, limit: 10 });
}, "relying-parties");

const getIntendedUses = query(async (filters: BaseFilters) => {
  return await apiClient.getIntendedUses({ ...filters, limit: 10 });
}, "intended-uses");

export default function SearchAll() {
  const [searchParams, setSearchParams] = useSearchParams<{ q: string }>();
  const { filters } = useSearchFilters(searchParams, setSearchParams);

  const relyingParties = createAsync(() => getRelyingParties(filters()));
  const intendedUses = createAsync(() => getIntendedUses(filters()));

  return (
    <>
      <SearchAndFilter></SearchAndFilter>
      <CategoryTabs />

      <div class="mt-6">
        <h3>Relying Parties</h3>
        <ErrorBoundary fallback={<div>Something went wrong!</div>}>
          <RelyingParties items={relyingParties()?.data} />
        </ErrorBoundary>

        <h3>Intended Uses</h3>
        <ErrorBoundary fallback={<div>Something went wrong!</div>}>
          <IntendedUses items={intendedUses()?.data} />
        </ErrorBoundary>
      </div>
    </>
  );
}
