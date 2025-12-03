import { Component, For, Show } from "solid-js";
import { RelyingParty } from "~/api";
import { RelyingPartyItem } from "./RelyingPartyItem";
import { A } from "@solidjs/router";
import { useSearchFilters } from "~/composables/useSearchFilters";
import { buildUrlWithFilters } from "~/utils/url";

export const RelyingParties: Component<{
  items?: RelyingParty[];
  hasMore?: boolean;
}> = (props) => {
  const { filters } = useSearchFilters();
  return (
    <div class="space-y-4">
      <For each={props.items || []} fallback="No Results">
        {(item) => <RelyingPartyItem data={item} />}
      </For>
      <Show when={props.hasMore}>
        <A href={buildUrlWithFilters("/search/relying-parties", filters())}>
          More companies ...
        </A>
      </Show>
    </div>
  );
};
