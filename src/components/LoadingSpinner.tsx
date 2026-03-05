import type { Component } from "solid-js";

export const LoadingSpinner: Component = () => {
  return (
    <div class="flex justify-center py-14">
      <span class="loading loading-spinner loading-lg text-primary" />
    </div>
  );
};
