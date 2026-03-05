import { Component } from "solid-js";
import { A } from "@solidjs/router";
import { buildUrlWithFilters } from "~/utils/url";
import { useSearchFilters } from "~/providers/FilterProvider";
import { routes } from "~/config/routes";
import { useTranslate } from "~/i18n/dict";
import { uiFiltersToSearchParams } from "~/utils/filter-url";

export const CategoryTabs: Component = () => {
  const t = useTranslate();
  const { filters } = useSearchFilters();

  const tabClass = "mb-2";
  const activeTabClass = "text-primary font-semibold";
  const inactiveTabClass = "no-underline";

  return (
    <nav class="flex space-x-2 border-b border-base-200 pt-8" role="tablist">
      <A
        href={buildUrlWithFilters(
          routes.search.index,
          uiFiltersToSearchParams(filters())
        )}
        class={tabClass}
        activeClass={activeTabClass}
        inactiveClass={inactiveTabClass}
        role="tab"
        end
        noScroll
      >
        {t.searchResults.relyingParties()}
      </A>
      <span>|</span>
      <A
        href={buildUrlWithFilters(
          routes.search.intendedUses,
          uiFiltersToSearchParams(filters())
        )}
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
