import { Title } from "@solidjs/meta";
import { createAsync, query, useSearchParams } from "@solidjs/router";
import { ErrorBoundary } from "solid-js";
import apiClient from "~/api";
import { Filters } from "~/components/Filters";
import { IntendedUses } from "~/components/IntendedUses";
import { RelyingParties } from "~/components/RelyingParties";
import { SearchBar } from "~/components/SearchBar";

const getRelyingParties = query(async (q?: string) => {
  return await apiClient.getRelyingParties({ q });
}, "relying-parties");

const getIntendedUses = query(async (q?: string) => {
  return await apiClient.getIntendedUses({ q });
}, "intended-uses");

export default function Search() {
  const [searchParams] = useSearchParams<{ q: string }>();
  const relyingParties = createAsync(() => getRelyingParties(searchParams.q));
  const intendedUses = createAsync(() => getIntendedUses(searchParams.q));

  return (
    <>
      <Title>Search</Title>
      <main class="text-center text-gray-700 wim-container">
        <h2>Search</h2>
        <SearchBar value={searchParams.q} />
        <Filters />

        <h3>Relying Parties</h3>
        <ErrorBoundary fallback={<div>Something went wrong!</div>}>
          <RelyingParties items={relyingParties()?.data} />
        </ErrorBoundary>

        <h3>Intended Uses</h3>
        <ErrorBoundary fallback={<div>Something went wrong!</div>}>
          <IntendedUses items={intendedUses()?.data} />
        </ErrorBoundary>
      </main>
    </>
  );
}
