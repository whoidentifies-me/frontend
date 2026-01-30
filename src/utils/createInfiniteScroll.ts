import { createEffect, createSignal } from "solid-js";
import type {
  ListRelyingPartiesOutputBody,
  ListIntendedUsesOutputBody,
} from "~/api";

type ApiResponseType =
  | ListRelyingPartiesOutputBody
  | ListIntendedUsesOutputBody;

type InfiniteScrollOptions<T extends ApiResponseType> = {
  fetcher: (cursor: string | undefined) => Promise<T>;
  initialResult?: () => T | undefined;
};

export function createInfiniteScroll<T extends ApiResponseType>(
  options: InfiniteScrollOptions<T>
) {
  const { fetcher, initialResult } = options;

  const [cursor, setCursor] = createSignal<string | undefined>(undefined);
  const [items, setItems] = createSignal<any[]>([]);
  const [loading, setLoading] = createSignal(false);
  const [hasMore, setHasMore] = createSignal(false);

  const loadMore = async () => {
    if (loading() || !hasMore()) return;

    setLoading(true);
    try {
      const result = await fetcher(cursor());

      if (result.data && result.data.length > 0) {
        setItems((items) => [...items, ...result.data!]);
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
      setItems(newResult.data || []);
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
