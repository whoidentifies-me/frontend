import { Title } from "@solidjs/meta";
import { createAsync, query, useSearchParams } from "@solidjs/router";
import { ErrorBoundary } from "solid-js";
import apiClient from "~/api";
import { RelyingParties } from "~/components/RelyingParties";
import { SearchBar } from "~/components/SearchBar";
import { Filters } from "~/components/Filters";
import { CategoryTabs } from "~/components/CategoryTabs";

const getRelyingParties = query(async (q?: string) => {
  return await apiClient.getRelyingParties({ q });
}, "relying-parties");

export default function SearchRelyingParties() {
  const [searchParams] = useSearchParams<{ q: string }>();
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
      <Filters />
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
