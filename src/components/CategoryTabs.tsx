import { Component } from "solid-js";
import { A } from "@solidjs/router";
import { buildUrlWithFilters } from "~/utils/url";
import { useSearchFilters } from "~/composables/useSearchFilters";

export const CategoryTabs: Component = () => {
  const { filters } = useSearchFilters();

  const tabClass =
    "px-4 py-2 font-medium text-sm border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-blue-100 rounded-t-md transition-colors";
  const activeTabClass = "border-blue-500 text-blue-600 bg-blue-50";

  return (
    <nav class="flex space-x-1 border-b border-gray-200 mt-4" role="tablist">
      <A
        href={buildUrlWithFilters("/search", filters())}
        class={tabClass}
        activeClass={activeTabClass}
        role="tab"
        end
        noScroll
      >
        All Results
      </A>
      <A
        href={buildUrlWithFilters("/search/relying-parties", filters())}
        class={tabClass}
        activeClass={activeTabClass}
        role="tab"
        noScroll
      >
        Relying Parties
      </A>
      <A
        href={buildUrlWithFilters("/search/intended-uses", filters())}
        class={tabClass}
        activeClass={activeTabClass}
        role="tab"
        noScroll
      >
        Intended Uses
      </A>
    </nav>
  );
};
