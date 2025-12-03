import { ParentComponent } from "solid-js";

interface CollapseProperties {
  title?: string;
}

export const Collapse: ParentComponent<CollapseProperties> = (props) => {
  return (
    <details
      class="collapse border shadow-md collapse-plus bg-secondary text-secondary-content"
      style={{ "border-color": "var(--border-300)" }}
    >
      <summary class="collapse-title">{props.title}</summary>
      <div class="collapse-content">{props.children}</div>
    </details>
  );
};
