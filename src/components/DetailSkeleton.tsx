import type { Component } from "solid-js";

export const DetailSkeleton: Component = () => {
  return (
    <div class="space-y-14 animate-pulse">
      <div class="space-y-4">
        <div class="skeleton h-8 w-64" />
        <div class="skeleton h-4 w-48" />
      </div>
      <div class="space-y-2">
        <div class="skeleton h-4 w-full" />
        <div class="skeleton h-4 w-3/4" />
        <div class="skeleton h-4 w-1/2" />
      </div>
      <div class="space-y-4">
        <div class="skeleton h-24 w-full rounded-xl" />
        <div class="skeleton h-24 w-full rounded-xl" />
      </div>
    </div>
  );
};
