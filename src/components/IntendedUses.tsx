import { Component, For, Show } from "solid-js";
import { IntendedUse } from "~/api";
import { IntendedUseItem } from "./IntendedUseItem";
import { useSearchFilters } from "~/providers/FilterProvider";
import { A } from "@solidjs/router";
import { buildUrlWithFilters } from "~/utils/url";
import { routes } from "~/config/routes";
import { useTranslate } from "~/i18n/dict";
import { uiFiltersToSearchParams } from "~/utils/filter-url";

export const IntendedUses: Component<{
  items?: IntendedUse[];
  hasMore?: boolean;
}> = (props) => {
  const t = useTranslate();

  const { filters } = useSearchFilters();
  return (
    <div class="space-y-4">
      <For each={props.items || []} fallback="No Results">
        {(item) => <IntendedUseItem data={item} />}
      </For>

      <Show when={props.hasMore}>
        <div class="flex flex-row justify-center my-4">
          <A
            class="btn btn-primary no-underline"
            href={buildUrlWithFilters(
              routes.search.intendedUses,
              uiFiltersToSearchParams(filters())
            )}
          >
            {t.components.generic.viewMore()}
          </A>
        </div>
      </Show>
    </div>
  );
};
