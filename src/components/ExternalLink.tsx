import { Component, JSX, Show, splitProps } from "solid-js";
import { TbOutlineExternalLink } from "solid-icons/tb";

interface ExternalLinkProps
  extends JSX.AnchorHTMLAttributes<HTMLAnchorElement> {
  showIcon?: boolean;
}

export const ExternalLink: Component<ExternalLinkProps> = (props) => {
  const [local, anchorProps] = splitProps(props, ["showIcon", "children"]);

  return (
    <a {...anchorProps} target="_blank" rel="noopener noreferrer">
      <Show when={local.showIcon}>
        <TbOutlineExternalLink class="me-1 inline align-middle -translate-y-0.5" />
      </Show>
      {local.children}
    </a>
  );
};
