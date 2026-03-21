import { Component, Show } from "solid-js";
import { A } from "@solidjs/router";
import { TbOutlineInfoCircle } from "solid-icons/tb";
import { claimPathNames } from "~/data/claimPathNames";
import { getClaimPathIcon } from "~/data/claimPathIcons";

interface ClaimItemProps {
  path: string;
  href?: string;
  hrefState?: Record<string, unknown>;
}

export const ClaimItem: Component<ClaimItemProps> = (props) => {
  const name = () => claimPathNames[props.path];
  const icon = () => getClaimPathIcon(props.path);

  return (
    <li class="flex flex-row items-center gap-2">
      <span class="text-primary text-3xl">
        {icon()() || <TbOutlineInfoCircle />}
      </span>
      <div class="flex-col">
        <Show
          when={name()}
          fallback={
            <Show
              when={props.href}
              fallback={
                <span class="font-semibold text-sm line-clamp-2">
                  {props.path}
                </span>
              }
            >
              <A href={props.href!} state={props.hrefState}>
                <span class="font-semibold text-sm line-clamp-2 hover:underline">
                  {props.path}
                </span>
              </A>
            </Show>
          }
        >
          <Show
            when={props.href}
            fallback={
              <>
                <span class="font-semibold text-sm line-clamp-2">{name()}</span>
                <span class="text-xs text-base-content/80 font-mono break-all line-clamp-2">
                  {props.path}
                </span>
              </>
            }
          >
            <A href={props.href!} state={props.hrefState}>
              <span class="font-semibold text-sm line-clamp-2">{name()}</span>
            </A>
            <span class="text-xs text-base-content/80 font-mono break-all line-clamp-2">
              {props.path}
            </span>
          </Show>
        </Show>
      </div>
    </li>
  );
};
