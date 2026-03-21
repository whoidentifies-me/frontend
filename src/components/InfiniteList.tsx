import { onCleanup, onMount, ParentComponent, Show } from "solid-js";
import { useTranslate } from "~/i18n/dict";

interface InfiniteListParams {
  onLoadMore?: () => Promise<void> | void;
  class?: string;
  isLoading?: boolean;
  hasMore?: boolean;
  rootMargin?: string; // triggers before reaching the end of the list
  hideEnd?: boolean; // hide the message that is like "You have reached the end of the list"
}

export const InfiniteList: ParentComponent<InfiniteListParams> = (props) => {
  const t = useTranslate();
  let triggerElRef: HTMLDivElement | undefined;
  let observer: IntersectionObserver | undefined;

  onMount(() => {
    observer = new IntersectionObserver(
      (entries) => {
        if (!entries?.length) return;
        const target = entries[0];
        if (
          target.isIntersecting &&
          props.hasMore &&
          !props.isLoading &&
          props.onLoadMore
        ) {
          props.onLoadMore();
        }
      },
      {
        root: undefined,
        rootMargin: props.rootMargin || "200px",
        threshold: 1,
      }
    );

    if (!triggerElRef) {
      throw new Error("infinite scroll trigger element not initialized");
    }
    observer.observe(triggerElRef);
  });

  onCleanup(() => {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
  });

  const onLoadMoreClick = () => {
    if (props.onLoadMore) {
      props.onLoadMore();
    }
  };

  return (
    <div>
      <div class={`${props.class}`}>
        {props.children}
        <Show when={props.hasMore && !props.isLoading}>
          <div class="flex flex-row justify-center my-4">
            <button class="btn btn-primary" onClick={onLoadMoreClick}>
              {t.components.generic.loadMore()}
            </button>
          </div>
        </Show>
        <Show when={!props.hasMore && !props.hideEnd}>
          <div class="text-center my-4">You reached the end of the List</div>
        </Show>
        <Show when={props.isLoading}>
          <div class="text-center my-4">Loading more...</div>
        </Show>
      </div>
      <div style={{ height: "1px", width: "100%" }} ref={triggerElRef}></div>
    </div>
  );
};
