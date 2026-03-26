import { A } from "@solidjs/router";
import type { ComponentProps } from "solid-js";

export function AnchorLink(props: ComponentProps<typeof A>) {
  return (
    <A
      {...props}
      onClick={() => {
        const hash = props.href?.split("#")[1];
        if (hash) {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
        }
      }}
    />
  );
}
