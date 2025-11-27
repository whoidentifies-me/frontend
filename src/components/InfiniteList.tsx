import {
  Component,
  ErrorBoundary,
  onCleanup,
  onMount,
  ParentComponent,
  Show,
} from "solid-js";

interface InfiniteListParams {
  onLoadMore?: () => Promise<void> | void;
  isLoading?: boolean;
  hasMore?: boolean;
  rootMargin?: string; // triggers before reaching the end of the list
}

export const InfiniteList: ParentComponent<InfiniteListParams> = (props) => {
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
      {props.children}
      <div style={{ height: "1px", width: "100%" }} ref={triggerElRef}></div>
      <Show when={props.hasMore && !props.isLoading}>
        <div class="flex flex-row justify-center">
          <button onClick={onLoadMoreClick}>Load more</button>
        </div>
      </Show>
      <Show when={!props.hasMore}>
        <div>You reached the end of the List</div>
      </Show>
      <Show when={props.isLoading}>
        <div>Loading more...</div>
      </Show>
    </div>
  );
};
