import { createEffect, createSignal } from "solid-js";
import { ApiResponse } from "~/api";

type InfiniteScrollOptions<T> = {
  fetcher: (cursor: string | undefined) => Promise<ApiResponse<T>>;
  initialResult?: () => ApiResponse<T> | undefined;
};

export function createInfiniteScroll<T>(options: InfiniteScrollOptions<T>) {
  const { fetcher, initialResult } = options;

  const [cursor, setCursor] = createSignal<string | undefined>(undefined);
  const [items, setItems] = createSignal<T[]>([]);
  const [loading, setLoading] = createSignal(false);
  const [hasMore, setHasMore] = createSignal(false);

  const loadMore = async () => {
    if (loading() || !hasMore()) return;

    setLoading(true);
    try {
      const result = await fetcher(cursor());

      if (result.data.length > 0) {
        setItems((items) => [...items, ...result.data]);
      }

      setCursor(result.next_cursor);
      setHasMore(result.has_more);
    } finally {
      setLoading(false);
    }
  };

  // whenever initial results is updated (due to a filter change for example)
  // we want to reset the items we loaded
  createEffect(() => {
    const newResult = initialResult?.();
    if (newResult) {
      setItems(newResult.data);
      setCursor(newResult.next_cursor);
      setHasMore(newResult.has_more);
    }
  });

  return {
    items,
    loading,
    hasMore,
    loadMore,
  };
}
