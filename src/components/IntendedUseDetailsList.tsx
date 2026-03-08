import { type Accessor, Component, For, Show } from "solid-js";
import { IntendedUse, RelyingParty } from "~/api";
import { useTranslate } from "~/i18n/dict";
import { IntendedUseDetails } from "./IntendedUseDetails";
import { InfiniteList } from "./InfiniteList";

interface IntendedUseDetailsListProps {
  relyingParty?: RelyingParty;
  featuredUse?: IntendedUse;
  items: Accessor<IntendedUse[]>;
  loading: Accessor<boolean>;
  hasMore: Accessor<boolean>;
  loadMore: () => Promise<void>;
}

export const IntendedUseDetailsList: Component<IntendedUseDetailsListProps> = (
  props
) => {
  const t = useTranslate();

  const filteredItems = () =>
    props.featuredUse
      ? props.items().filter((item) => item.id !== props.featuredUse?.id)
      : props.items();

  return (
    <div class="mb-14">
      <div class="wim-container">
        <h2>{t.relyingPartyDetails.intendedUses.title()}</h2>
        <p>{t.relyingPartyDetails.intendedUses.description()}</p>
      </div>

      <div class="space-y-8 wim-container">
        <Show when={props.featuredUse}>
          {(featured) => (
            <IntendedUseDetails
              data={featured()}
              title={t.relyingPartyDetails.intendedUses.useCaseX(1)}
              highlighted
            />
          )}
        </Show>

        <InfiniteList
          class="space-y-8"
          isLoading={props.loading()}
          hasMore={props.hasMore()}
          onLoadMore={props.loadMore}
          hideEnd
        >
          <For
            each={filteredItems()}
            fallback={
              <Show when={!props.featuredUse}>
                <p class="text-base-content/75">
                  <em>There are no use cases reportet at the moment.</em>
                </p>
              </Show>
            }
          >
            {(item, index) => {
              const offset = props.featuredUse ? 2 : 1;
              return (
                <IntendedUseDetails
                  data={item}
                  title={t.relyingPartyDetails.intendedUses.useCaseX(
                    index() + offset
                  )}
                />
              );
            }}
          </For>
        </InfiniteList>
      </div>
    </div>
  );
};
