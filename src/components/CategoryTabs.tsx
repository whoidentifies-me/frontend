import { Component } from "solid-js";
import { A, useSearchParams } from "@solidjs/router";

export const CategoryTabs: Component = () => {
  const [searchParams] = useSearchParams<{ q: string }>();

  const buildUrl = (path: string) => {
    const query = searchParams.q
      ? `?q=${encodeURIComponent(searchParams.q)}`
      : "";
    return `${path}${query}`;
  };

  const tabClass =
    "px-4 py-2 font-medium text-sm border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-blue-100 rounded-t-md transition-colors";
  const activeTabClass = "border-blue-500 text-blue-600 bg-blue-50";

  return (
    <nav class="flex space-x-1 border-b border-gray-200 mt-4" role="tablist">
      <A
        href={buildUrl("/search")}
        class={tabClass}
        activeClass={activeTabClass}
        role="tab"
        end
      >
        All Results
      </A>
      <A
        href={buildUrl("/search/relying-parties")}
        class={tabClass}
        activeClass={activeTabClass}
        role="tab"
      >
        Relying Parties
      </A>
      <A
        href={buildUrl("/search/intended-uses")}
        class={tabClass}
        activeClass={activeTabClass}
        role="tab"
      >
        Intended Uses
      </A>
    </nav>
  );
};
