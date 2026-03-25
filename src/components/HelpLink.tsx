import { Component } from "solid-js";
import { TbOutlineInfoCircle } from "solid-icons/tb";
import { ExternalLink } from "./ExternalLink";

export const HelpLink: Component<{ href: string; label?: string }> = (
  props
) => {
  return (
    <ExternalLink
      href={props.href}
      aria-label={props.label ?? "Learn more"}
      class="ml-1 inline align-middle -translate-y-0.5 text-primary"
    >
      <TbOutlineInfoCircle />
    </ExternalLink>
  );
};
