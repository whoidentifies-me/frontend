import { createAsync, useParams, useSearchParams } from "@solidjs/router";
import { ErrorBoundary, Suspense } from "solid-js";
import { RelyingParties, IntendedUses } from "~/api";
import { DetailSkeleton } from "~/components/DetailSkeleton";
import { ErrorCard } from "~/components/ErrorCard";
import { RelyingPartyDescription } from "~/components/RelyingPartyDescription";
import { RelyingPartyEntitlements } from "~/components/RelyingPartyEntitlements";
import { RelyingPartyHeader } from "~/components/RelyingPartyHeader";
import { IntendedUseDetailsList } from "~/components/IntendedUseDetailsList";
import { SkeletonList } from "~/components/SkeletonList";
import { createInfiniteScroll } from "~/utils/createInfiniteScroll";

export default function RelyingParty() {
  const params = useParams<{ id: string }>();
  const [searchParams] = useSearchParams<{ use?: string }>();

  const relyingParty = createAsync(() =>
    RelyingParties.getRelyingParty(params.id)
  );

  const featuredUse = createAsync(async () => {
    const useId = searchParams.use;
    return useId ? IntendedUses.getIntendedUse(useId) : undefined;
  });

  const intendedUsesInitial = createAsync(() =>
    IntendedUses.listIntendedUses({ wrp_id: params.id })
  );

  const intendedUsesInfinite = createInfiniteScroll({
    initialResult: intendedUsesInitial,
    fetcher: (cursor) =>
      IntendedUses.listIntendedUses({ wrp_id: params.id, cursor }),
  });

  return (
    <ErrorBoundary
      fallback={() => (
        <div class="wim-container">
          <ErrorCard />
        </div>
      )}
    >
      <Suspense fallback={<DetailSkeleton />}>
        <div class="space-y-14">
          <RelyingPartyHeader data={relyingParty()} />
          <RelyingPartyDescription data={relyingParty()} />
          <RelyingPartyEntitlements data={relyingParty()} />
          <ErrorBoundary fallback={<ErrorCard />}>
            <Suspense fallback={<SkeletonList />}>
              <IntendedUseDetailsList
                relyingParty={relyingParty()}
                featuredUse={featuredUse()}
                items={intendedUsesInfinite.items}
                loading={intendedUsesInfinite.loading}
                hasMore={intendedUsesInfinite.hasMore}
                loadMore={intendedUsesInfinite.loadMore}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}
