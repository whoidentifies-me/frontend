import type { Component } from "solid-js";
import { TbOutlineAlertCircle } from "solid-icons/tb";

export const ErrorCard: Component<{ error?: unknown }> = () => {
  return (
    <div
      role="alert"
      class="alert alert-outline alert-error flex flex-row items-center my-4"
    >
      <TbOutlineAlertCircle class="h-6 w-6 shrink-0" />
      <span class="flex-grow">Something went wrong.</span>
      <button class="btn btn-sm" onClick={() => location.reload()}>
        Reload Page
      </button>
    </div>
  );
};
