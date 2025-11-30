import { JSX, children, ParentComponent } from "solid-js";

interface TwoColumnLayoutProps {
  largerCol?: "left" | "right";
  class?: string;
  leftColumnClass?: string;
  rightColumnClass?: string;
}

export const TwoColumnLayout: ParentComponent<TwoColumnLayoutProps> = (
  props
) => {
  const gridCols = () => {
    if (!props.largerCol) return "grid-cols-1 lg:grid-cols-2";
    return props.largerCol === "left"
      ? "grid-cols-1 lg:grid-cols-[3fr_2fr]"
      : "grid-cols-1 lg:grid-cols-[2fr_3fr]";
  };

  const c = children(() => props.children);

  const leftContent = () =>
    c.toArray().find((child: any) => child.slot === "left");
  const rightContent = () =>
    c.toArray().find((child: any) => child.slot === "right");

  return (
    <div class={`grid gap-6 ${gridCols()} ${props.class || ""}`}>
      <div class={props.leftColumnClass || ""}>{leftContent()}</div>
      <div class={props.rightColumnClass || ""}>{rightContent()}</div>
    </div>
  );
};
