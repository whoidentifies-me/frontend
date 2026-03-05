import { Component } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { buildUrlWithFilters } from "~/utils/url";
import { useSearchFilters } from "~/providers/FilterProvider";
import { routes } from "~/config/routes";
import { useTranslate } from "~/i18n/dict";
import { uiFiltersToSearchParams } from "~/utils/filter-url";

export const CategoryTabs: Component = () => {
  const t = useTranslate();
  const { filters } = useSearchFilters();
  const navigate = useNavigate();

  const getHref = (path: string) =>
    buildUrlWithFilters(path, uiFiltersToSearchParams(filters()));

  const relyingPartiesHref = () => getHref(routes.search.index);
  const intendedUsesHref = () => getHref(routes.search.intendedUses);

  const handleTabClick = (
    event: MouseEvent,
    href: string,
    direction: "forward" | "backward"
  ) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }

    event.preventDefault();
    const scrollY = window.scrollY;
    document.documentElement.setAttribute(
      "data-search-tab-direction",
      direction
    );
    navigate(href, { scroll: false });

    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });

    window.setTimeout(() => {
      if (
        document.documentElement.getAttribute("data-search-tab-direction") ===
        direction
      ) {
        document.documentElement.removeAttribute("data-search-tab-direction");
      }
    }, 260);
  };

  const tabClass = "mb-2";
  const activeTabClass = "text-primary font-semibold";
  const inactiveTabClass = "no-underline";

  return (
    <nav class="flex space-x-2 border-b border-base-200 pt-8" role="tablist">
      <A
        href={relyingPartiesHref()}
        onClick={(event) =>
          handleTabClick(event, relyingPartiesHref(), "backward")
        }
        class={tabClass}
        activeClass={activeTabClass}
        inactiveClass={inactiveTabClass}
        noScroll
        role="tab"
        end
      >
        {t.searchResults.relyingParties()}
      </A>
      <span>|</span>
      <A
        href={intendedUsesHref()}
        onClick={(event) =>
          handleTabClick(event, intendedUsesHref(), "forward")
        }
        class={tabClass}
        activeClass={activeTabClass}
        inactiveClass={inactiveTabClass}
        noScroll
        role="tab"
      >
        {t.searchResults.intendedUses()}
      </A>
    </nav>
  );
};
