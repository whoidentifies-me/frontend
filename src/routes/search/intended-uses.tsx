import { Title } from "@solidjs/meta";
import { createAsync, query, useSearchParams } from "@solidjs/router";
import { ErrorBoundary } from "solid-js";
import apiClient from "~/api";
import { IntendedUses } from "~/components/IntendedUses";
import { SearchBar } from "~/components/SearchBar";
import { Filters } from "~/components/Filters";
import { CategoryTabs } from "~/components/CategoryTabs";

const getIntendedUses = query(async (q?: string) => {
  return await apiClient.getIntendedUses({
    q: q?.trim() ? `%${q?.trim()}%` : undefined,
  });
}, "intended-uses");

export default function SearchIntendedUses() {
  const [searchParams] = useSearchParams<{ q: string }>();
  const intendedUses = createAsync(() => getIntendedUses(searchParams.q));

  const getTitle = () => {
    if (searchParams.q) {
      return `Search Intended Uses: ${searchParams.q}`;
    }
    return "Search Intended Uses";
  };

  return (
    <>
      <Title>{getTitle()}</Title>
      <SearchBar value={searchParams.q} category="intended-uses" />
      <Filters />
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
