import type { Component } from "solid-js";
import { AnchorLink } from "~/components/AnchorLink";

export const CornerRibbon: Component = () => {
  return (
    <AnchorLink
      href="/#status"
      class="corner-ribbon bg-primary text-primary-content text-xs font-bold shadow-md"
    >
      <span class="md:hidden">Demo: </span>Synthetic Data
    </AnchorLink>
  );
};
