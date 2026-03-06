import { Component, JSX, Show } from "solid-js";
import { TbOutlineExternalLink } from "solid-icons/tb";

interface ExternalLinkProps
  extends JSX.AnchorHTMLAttributes<HTMLAnchorElement> {
  showIcon?: boolean;
}

export const ExternalLink: Component<ExternalLinkProps> = (props) => {
  const { showIcon = false, ...anchorProps } = props;

  return (
    <a
      {...anchorProps}
      target="_blank"
      rel="noopener noreferrer"
      class={props.class}
    >
      <Show when={showIcon}>
        <TbOutlineExternalLink class="me-1 inline align-middle -translate-y-0.5" />
      </Show>
      {props.children}
    </a>
  );
};
