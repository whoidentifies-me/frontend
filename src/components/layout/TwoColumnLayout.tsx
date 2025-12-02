import { JSXElement, Component } from "solid-js";

interface TwoColumnLayoutProps {
  largerCol?: "left" | "right";
  class?: string;
  leftColumnClass?: string;
  rightColumnClass?: string;
  leftContent: JSXElement;
  rightContent: JSXElement;
}

export const TwoColumnLayout: Component<TwoColumnLayoutProps> = (props) => {
  const gridCols = () => {
    if (!props.largerCol) return "grid-cols-1 lg:grid-cols-2";
    return props.largerCol === "left"
      ? "grid-cols-1 lg:grid-cols-[3fr_2fr]"
      : "grid-cols-1 lg:grid-cols-[2fr_3fr]";
  };

  return (
    <div class={`grid gap-12 ${gridCols()} ${props.class || ""}`}>
      <div class={props.leftColumnClass || ""}>{props.leftContent}</div>
      <div class={props.rightColumnClass || ""}>{props.rightContent}</div>
    </div>
  );
};
