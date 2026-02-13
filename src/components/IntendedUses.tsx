import { Component, For, Show } from "solid-js";
import { IntendedUse } from "~/api";
import { IntendedUseItem } from "./IntendedUseItem";
import { useSearchFilters } from "~/composables/useSearchFilters";
import { A } from "@solidjs/router";
import { buildUrlWithFilters } from "~/utils/url";
import { uiFiltersToUrlParams } from "~/types/filters";
import { useTranslate } from "~/i18n/dict";

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
              "/search/intended-uses",
              uiFiltersToUrlParams(filters())
            )}
          >
            {t.components.generic.viewMore()}
          </A>
        </div>
      </Show>
    </div>
  );
};
