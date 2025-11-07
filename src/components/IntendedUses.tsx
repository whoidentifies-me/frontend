import { Component, For, Show } from "solid-js";
import { IntendedUse } from "~/api";
import { IntendedUseItem } from "./IntendedUseItem";
import { useSearchFilters } from "~/composables/useSearchFilters";
import { A } from "@solidjs/router";
import { buildUrlWithFilters } from "~/utils/url";

export const IntendedUses: Component<{
  items?: IntendedUse[];
  hasMore?: boolean;
}> = (props) => {
  const { filters } = useSearchFilters();
  return (
    <div class="">
      <For each={props.items || []} fallback="No Results">
        {(item) => <IntendedUseItem data={item} />}
      </For>
      <Show when={props.hasMore}>
        <A href={buildUrlWithFilters("/search/intended-uses", filters())}>
          More requested information items ...
        </A>
      </Show>
    </div>
  );
};
