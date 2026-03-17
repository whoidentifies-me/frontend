import { Component, createEffect, createMemo, For, Show } from "solid-js";
import { IntendedUse } from "~/api";
import { TbOutlineInfoCircle } from "solid-icons/tb";
import { getLocalizeText } from "~/utils/relyingPartyAttributes";
import { useI18n } from "~/i18n/dict";
import { claimPathNames } from "~/data/claimPathNames";
import { getClaimPathIcon } from "~/data/claimPathIcons";

interface IntendedUseDetailsProps {
  data?: IntendedUse;
  title?: string;
  highlighted?: boolean;
  scrollTo?: boolean;
}

export const IntendedUseDetails: Component<IntendedUseDetailsProps> = (
  props
) => {
  const { locale } = useI18n();

  let sectionRef!: HTMLElement;
  let detailsRef!: HTMLDetailsElement;

  const getID = () =>
    props?.data?.id
      ? `intended_use_${props.data.id.substring(0, 8)}`
      : undefined;

  const purposes = createMemo(() => {
    return getLocalizeText(props.data?.purposes || undefined, locale());
  });

  const credentials = createMemo(() => {
    return props.data?.credentials?.flatMap((c) => c.claims || []) || [];
  });

  createEffect(() => {
    if (props.highlighted) {
      detailsRef.open = true;
    }
    if (props.scrollTo) {
      requestAnimationFrame(() => {
        sectionRef.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  });

  return (
    <section ref={sectionRef} id={getID()}>
      <details
        ref={detailsRef}
        class="wim-card-outline collapse border shadow-md collapse-plus bg-secondary text-secondary-content !rounded-4xl px-4 py-2"
      >
        <summary class="collapse-title">
          <h3 class="my-0 line-clamp-1">
            <Show
              when={props.title}
              fallback={purposes()?.length ? purposes()[0] : "Intended Use"}
            >
              {props.title}
            </Show>
          </h3>
        </summary>
        <div class="collapse-content">
          <For each={purposes()}>{(item) => <p class="">{item}</p>}</For>

          <h4 class="mt-6">Requested Attributes:</h4>
          <ul class="mt-6 list-none grid gap-y-8 gap-x-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            <For each={credentials()}>
              {(item) => {
                const path = item?.path ?? "";
                const name = claimPathNames[path];
                const icon = getClaimPathIcon(path);
                return (
                  <li class="flex flex-row items-center gap-2">
                    <span class="text-primary text-3xl">
                      {icon() || <TbOutlineInfoCircle />}
                    </span>
                    <div class="flex-col">
                      <Show
                        when={name}
                        fallback={
                          <span class="font-semibold text-sm line-clamp-2">
                            {name}
                          </span>
                        }
                      >
                        <span class="font-semibold text-sm line-clamp-2">
                          {name}
                        </span>
                        <span class="text-xs text-base-content/50 font-mono break-all line-clamp-2">
                          {path}
                        </span>
                      </Show>
                    </div>
                  </li>
                );
              }}
            </For>
          </ul>
        </div>
      </details>
    </section>
  );
};
