import { Component, For, Show } from "solid-js";
import { RelyingParty } from "~/api";
import { RelyingPartyItem } from "./RelyingPartyItem";
import { A } from "@solidjs/router";
import { useSearchFilters } from "~/providers/FilterProvider";
import { buildUrlWithFilters } from "~/utils/url";
import { routes } from "~/config/routes";
import { useTranslate } from "~/i18n/dict";
import { uiFiltersToSearchParams } from "~/utils/filter-url";

export const RelyingParties: Component<{
  items?: RelyingParty[];
  hasMore?: boolean;
}> = (props) => {
  const t = useTranslate();

  const { filters } = useSearchFilters();
  return (
    <div class="space-y-4">
      <For each={props.items || []}>
        {(item) => <RelyingPartyItem data={item} />}
      </For>
      <Show when={props.hasMore}>
        <div class="flex flex-row justify-center my-4">
          <A
            class="btn btn-primary no-underline"
            href={buildUrlWithFilters(
              routes.search.relyingParties,
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
