import { createAsync, query } from "@solidjs/router";
import { ErrorBoundary } from "solid-js";
import apiClient, { BaseFilters } from "~/api";
import { IntendedUses } from "~/components/IntendedUses";
import { RelyingParties } from "~/components/RelyingParties";
import { CategoryTabs } from "~/components/CategoryTabs";
import { SearchAndFilter } from "~/components/SearchAndFilter";
import { useSearchFilters } from "~/composables/useSearchFilters";
import { useTranslate } from "~/i18n/dict";
import { Hero } from "~/components/Hero";

const getRelyingParties = query(async (filters: BaseFilters) => {
  return await apiClient.getRelyingParties({
    ...filters,
    q: filters.q ? `%${filters.q}%` : undefined,
  });
}, "relying-parties");

const getIntendedUses = query(async (filters: BaseFilters) => {
  return await apiClient.getIntendedUses({
    ...filters,
    q: filters.q ? `%${filters.q}%` : undefined,
  });
}, "intended-uses");

export default function SearchAll() {
  const t = useTranslate();
  const limit = 5;
  const { filters } = useSearchFilters();

  const relyingParties = createAsync(() =>
    getRelyingParties({ ...filters(), limit })
  );
  const intendedUses = createAsync(() =>
    getIntendedUses({ ...filters(), limit })
  );

  return (
    <>
      <Hero>
        <SearchAndFilter></SearchAndFilter>
      </Hero>

      <CategoryTabs />

      <div id="results" class="mt-6">
        <h2>{t.searchResults.relyingParties()}</h2>
        <ErrorBoundary fallback={<div>Something went wrong!</div>}>
          <RelyingParties
            items={relyingParties()?.data}
            hasMore={relyingParties()?.has_more}
          />
        </ErrorBoundary>

        <div class="h-10"></div>

        <h2>{t.searchResults.intendedUses()}</h2>
        <ErrorBoundary fallback={<div>Something went wrong!</div>}>
          <IntendedUses
            items={intendedUses()?.data}
            hasMore={intendedUses()?.has_more}
          />
        </ErrorBoundary>
      </div>
    </>
  );
}
