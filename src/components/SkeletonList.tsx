import { Component, For } from "solid-js";

export const SkeletonList: Component<{ count?: number }> = (props) => {
  const items = () => Array.from({ length: props.count ?? 5 });

  return (
    <div class="space-y-4">
      <For each={items()}>
        {() => (
          <div class="wim-card wim-card-outline-accent flex sm:flex-row flex-col gap-2 items-center animate-pulse">
            <div class="flex flex-col flex-grow min-w-0 gap-2 w-full">
              <div class="skeleton h-5 w-48" />
              <div class="skeleton h-4 w-32" />
              <div class="skeleton h-4 w-full" />
            </div>
            <div class="skeleton h-10 w-24 rounded-lg shrink-0" />
          </div>
        )}
      </For>
    </div>
  );
};
