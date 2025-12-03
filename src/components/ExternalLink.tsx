import { Component, JSX } from "solid-js";
import { TbExternalLink } from "solid-icons/tb";

export const ExternalLink: Component<
  JSX.AnchorHTMLAttributes<HTMLAnchorElement>
> = (props) => {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer" class={props.class}>
      <TbExternalLink class="me-1 inline align-middle -translate-y-0.5" />
      {props.children}
    </a>
  );
};
