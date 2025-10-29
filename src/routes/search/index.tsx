import { createAsync, query, useSearchParams } from "@solidjs/router";
import { ErrorBoundary } from "solid-js";
import apiClient from "~/api";
import { IntendedUses } from "~/components/IntendedUses";
import { RelyingParties } from "~/components/RelyingParties";
import { CategoryTabs } from "~/components/CategoryTabs";
import { SearchAndFilter } from "~/components/SearchAndFilter";

const getRelyingParties = query(async (q?: string) => {
  return await apiClient.getRelyingParties({
    q: q?.trim() ? `%${q?.trim()}%` : undefined,
  });
}, "relying-parties");

const getIntendedUses = query(async (q?: string) => {
  return await apiClient.getIntendedUses({
    q: q?.trim() ? `%${q?.trim()}%` : undefined,
  });
}, "intended-uses");

export default function SearchAll() {
  const [searchParams] = useSearchParams<{ q: string }>();

  const relyingParties = createAsync(() => getRelyingParties(searchParams.q));
  const intendedUses = createAsync(() => getIntendedUses(searchParams.q));

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
