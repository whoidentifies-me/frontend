import { JSXElement, Component } from "solid-js";

interface TwoColumnLayoutProps {
  largerCol?: "first" | "last";
  reverseDesktop?: boolean;
  class?: string;
  firstColumnClass?: string;
  lastColumnClass?: string;
  firstContent: JSXElement;
  lastContent: JSXElement;
}

export const TwoColumnLayout: Component<TwoColumnLayoutProps> = (props) => {
  const gridCols = () => {
    if (props.largerCol === "first") {
      return !props.reverseDesktop
        ? "grid-cols-1 lg:grid-cols-[3fr_2fr]"
        : "grid-cols-1 lg:grid-cols-[2fr_3fr]";
    } else if (props.largerCol === "last") {
      return !props.reverseDesktop
        ? "grid-cols-1 lg:grid-cols-[2fr_3fr]"
        : "grid-cols-1 lg:grid-cols-[3fr_2fr]";
    }
    return "grid-cols-1 lg:grid-cols-2";
  };

  return (
    <div class={`grid lg:gap-12 gap-6 ${gridCols()} ${props.class || ""}`}>
      <div
        class={`${props.reverseDesktop ? "lg:order-2" : ""} ${props.firstColumnClass || ""}`}
      >
        {props.firstContent}
      </div>
      <div
        class={`${props.reverseDesktop ? "lg:order-1" : ""} ${props.lastColumnClass || ""}`}
      >
        {props.lastContent}
      </div>
    </div>
  );
};
