import { createEffect, createSignal, on } from "solid-js";
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
  resetKey?: () => string;
};

export function createInfiniteScroll<T extends ApiResponseType>(
  options: InfiniteScrollOptions<T>
) {
  const { fetcher, initialResult, resetKey } = options;

  const [appendedItems, setAppendedItems] = createSignal<any[]>([]);
  const [paginationOverride, setPaginationOverride] = createSignal<
    | {
        nextCursor: string | undefined;
        hasMore: boolean;
      }
    | undefined
  >(undefined);
  const [loading, setLoading] = createSignal(false);

  const initialPage = () => initialResult?.();

  const cursor = () =>
    paginationOverride()?.nextCursor ?? initialPage()?.next_cursor;
  const hasMore = () =>
    paginationOverride()?.hasMore ?? initialPage()?.has_more ?? false;

  const loadMore = async () => {
    if (loading() || !hasMore()) return;

    setLoading(true);
    try {
      const result = await fetcher(cursor());

      if (result.data && result.data.length > 0) {
        setAppendedItems((items) => [...items, ...(result.data ?? [])]);
      }

      setPaginationOverride({
        nextCursor: result.next_cursor,
        hasMore: result.has_more,
      });
    } finally {
      setLoading(false);
    }
  };

  createEffect(
    on(
      () => resetKey?.(),
      () => {
        setAppendedItems([]);
        setPaginationOverride(undefined);
      }
    )
  );

  // Wrap items so that reading it inside a <Suspense> boundary
  // triggers suspension while the initial resource is loading
  const suspenseAwareItems = () => {
    const result = initialPage();
    return [...(result?.data || []), ...appendedItems()];
  };

  return {
    items: suspenseAwareItems,
    loading,
    hasMore,
    loadMore,
  };
}
