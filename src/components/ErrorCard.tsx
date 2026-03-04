import type { Component } from "solid-js";
import { TbAlertCircle } from "solid-icons/tb";

export const ErrorCard: Component<{ error?: unknown; retry?: () => void }> = (
  props
) => {
  return (
    <div
      role="alert"
      class="alert alert-outline alert-error flex flex-row items-center"
    >
      <TbAlertCircle class="h-6 w-6 shrink-0" />
      <span class="flex-grow">Something went wrong.</span>
      {props.retry && (
        <button class="btn btn-sm" onClick={props.retry}>
          Retry
        </button>
      )}
    </div>
  );
};
