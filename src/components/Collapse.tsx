import { ParentComponent } from "solid-js";

interface CollapseProperties {
  title?: string;
  name?: string;
  class?: string;
  appearance?: "base" | "lg";
}

export const Collapse: ParentComponent<CollapseProperties> = (props) => {
  return (
    <details
      name={props.name}
      class={`wim-card-outline collapse border shadow-md collapse-plus bg-secondary text-secondary-content ${props.appearance === "lg" ? "rounded-4xl" : ""} ${props.class}`}
    >
      <summary class="collapse-title font-semibold">{props.title}</summary>
      <div class="collapse-content">{props.children}</div>
    </details>
  );
};
