import type { Component } from "solid-js";

export const CornerRibbon: Component = () => {
  return (
    <a
      href="/#status"
      class="corner-ribbon bg-primary text-primary-content text-xs font-bold shadow-md"
    >
      <span class="md:hidden">Demo: </span>Synthetic Data
    </a>
  );
};
