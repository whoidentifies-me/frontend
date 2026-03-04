import { createAsync } from "@solidjs/router";
import { ErrorBoundary, Suspense } from "solid-js";
import {
  RelyingParties as RelyingPartiesAPI,
  IntendedUses as IntendedUsesAPI,
} from "~/api";
import { ErrorCard } from "~/components/ErrorCard";
import { IntendedUses } from "~/components/IntendedUses";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { SkeletonList } from "~/components/SkeletonList";
import { RelyingParties } from "~/components/RelyingParties";

import { CategoryTabs } from "~/components/CategoryTabs";
import { SearchAndFilter } from "~/components/SearchAndFilter";
import { useSearchFilters } from "~/providers/FilterProvider";
import { uiFiltersToApiParams } from "~/utils/filter-api";
import { useTranslate } from "~/i18n/dict";
import { Hero } from "~/components/Hero";

export default function SearchAll() {
  const t = useTranslate();
  const limit = 5;
  const { deferredFilters, isPending } = useSearchFilters();

  const relyingParties = createAsync(() =>
    RelyingPartiesAPI.listRelyingParties({
      ...uiFiltersToApiParams(deferredFilters()),
      limit,
    })
  );
  const intendedUses = createAsync(() =>
    IntendedUsesAPI.listIntendedUses({
      ...uiFiltersToApiParams(deferredFilters()),
      limit,
    })
  );

  return (
    <>
      <Hero>
        <SearchAndFilter></SearchAndFilter>
      </Hero>

      <CategoryTabs />

      <div id="results" class="my-6 relative">
        {isPending() && <PendingOverlay />}

        <div classList={{ "opacity-60 pointer-events-none": isPending() }}>
          <h2>{t.searchResults.relyingParties()}</h2>
          <ErrorBoundary fallback={() => <ErrorCard />}>
            <Suspense fallback={<SkeletonList count={3} />}>
              <RelyingParties
                items={relyingParties()?.data || []}
                hasMore={relyingParties()?.has_more}
              />
            </Suspense>
          </ErrorBoundary>

          <div class="h-10"></div>

          <h2>{t.searchResults.intendedUses()}</h2>
          <ErrorBoundary fallback={() => <ErrorCard />}>
            <Suspense fallback={<SkeletonList count={3} />}>
              <IntendedUses
                items={intendedUses()?.data || []}
                hasMore={intendedUses()?.has_more}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
}

function PendingOverlay() {
  return (
    <div class="absolute inset-0 flex items-center justify-center z-10">
      <LoadingSpinner />
    </div>
  );
}
