import { Component } from "solid-js";
import { A } from "@solidjs/router";
import { buildUrlWithFilters } from "~/utils/url";
import { useSearchFilters } from "~/composables/useSearchFilters";
import { useTranslate } from "~/i18n/dict";

export const CategoryTabs: Component = () => {
  const t = useTranslate();
  const { filters } = useSearchFilters();

  const tabClass = "mb-2";
  const activeTabClass = "text-primary font-semibold";
  const inactiveTabClass = "no-underline";

  return (
    <nav class="flex space-x-2 border-b border-base-200 mt-4" role="tablist">
      <A
        href={buildUrlWithFilters("/search", filters())}
        class={tabClass}
        activeClass={activeTabClass}
        inactiveClass={inactiveTabClass}
        role="tab"
        end
        noScroll
      >
        {t.searchResults.all()}
      </A>
      <span>|</span>
      <A
        href={buildUrlWithFilters("/search/relying-parties", filters())}
        class={tabClass}
        activeClass={activeTabClass}
        inactiveClass={inactiveTabClass}
        role="tab"
        noScroll
      >
        {t.searchResults.relyingParties()}
      </A>
      <span>|</span>
      <A
        href={buildUrlWithFilters("/search/intended-uses", filters())}
        class={tabClass}
        activeClass={activeTabClass}
        inactiveClass={inactiveTabClass}
        role="tab"
        noScroll
      >
        {t.searchResults.intendedUses()}
      </A>
    </nav>
  );
};
