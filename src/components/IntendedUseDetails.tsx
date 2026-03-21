import { Component, createEffect, createMemo, For, Show } from "solid-js";
import { A } from "@solidjs/router";
import { IntendedUse } from "~/api";
import {
  TbOutlineInfoCircle,
  TbOutlineLink,
  TbOutlineCalendar,
  TbOutlineBan,
} from "solid-icons/tb";
import { getLocalizeText } from "~/utils/relyingPartyAttributes";
import { useI18n } from "~/i18n/dict";
import { claimPathNames } from "~/data/claimPathNames";
import { getClaimPathIcon } from "~/data/claimPathIcons";
import { getPolicy } from "~/data/policies";
import { routes } from "~/config/routes";
import { buildUrlWithFilters } from "~/utils/url";

interface IntendedUseDetailsProps {
  data?: IntendedUse;
  title?: string;
  highlighted?: boolean;
  scrollTo?: boolean;
}

export const IntendedUseDetails: Component<IntendedUseDetailsProps> = (
  props
) => {
  const { locale, t } = useI18n();

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

  const policyList = () => {
    return props.data?.policies || [];
  };

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
        class="wim-card-outline collapse border shadow-md collapse-plus bg-secondary text-secondary-content !rounded-4xl px-4 py-2 group"
      >
        <summary class="collapse-title">
          <h3 class="my-0">
            <Show
              when={props.title}
              fallback={
                <>
                  <span class="hidden group-open:inline">Description</span>
                  <span class="line-clamp-1 group-open:hidden">
                    {purposes()?.length ? purposes()[0] : "Intended Use"}
                  </span>
                </>
              }
            >
              {props.title}
            </Show>
          </h3>
        </summary>
        <div class="collapse-content">
          <For each={purposes()}>{(item) => <p class="">{item}</p>}</For>

          <h4 class="mt-6">Requested Attributes:</h4>
          <ul class="mt-6 list-none grid gap-y-8 gap-x-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            <For
              each={credentials()}
              fallback={<span>No requested Attributes</span>}
            >
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
                          <A
                            href={buildUrlWithFilters(
                              routes.search.intendedUses,
                              { claim_path: path }
                            )}
                            state={{ scrollToResults: true }}
                          >
                            <span class="font-semibold text-sm line-clamp-2 hover:underline">
                              {path}
                            </span>
                          </A>
                        }
                      >
                        <A
                          href={buildUrlWithFilters(
                            routes.search.intendedUses,
                            { claim_path: path }
                          )}
                          state={{ scrollToResults: true }}
                        >
                          <span class="font-semibold text-sm line-clamp-2">
                            {name}
                          </span>
                        </A>
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

          <Show when={policyList().length > 0}>
            <h4 class="mt-6">
              {t.relyingPartyDetails.intendedUses.policies()}:
            </h4>
            <ul class="mt-6 mb-6 list-none flex flex-col gap-4">
              <For each={policyList()}>
                {(item) => {
                  const policy = getPolicy(item.type);
                  const name = policy?.name ?? item.policy_uri;
                  const icon = policy?.icon;
                  return (
                    <li class="flex flex-row items-center gap-2">
                      <span class="text-primary text-3xl leading-0">
                        {icon ? icon() : <TbOutlineLink />}
                      </span>
                      <div class="flex flex-col justify-center">
                        <a
                          href={item.policy_uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="font-semibold text-sm line-clamp-2 hover:underline"
                          title={`Type: ${item.type}`}
                        >
                          {name}
                        </a>
                        <Show when={policy}>
                          <span class="text-xs text-base-content/50 font-mono break-all line-clamp-2">
                            {item.policy_uri}
                          </span>
                        </Show>
                      </div>
                    </li>
                  );
                }}
              </For>
            </ul>
          </Show>

          <div class="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            <div>
              <Show when={props.data?.created_at}>
                <span class="flex items-center gap-1 font-semibold">
                  <TbOutlineCalendar class="text-primary text-xl -translate-y-[0.5px]" />
                  Created:{" "}
                  {new Date(props.data!.created_at!).toLocaleDateString()}
                </span>
              </Show>
            </div>

            <div>
              <Show when={(props.data as any)?.revoked_at}>
                <span class="flex items-center gap-1 font-semibold">
                  <TbOutlineBan class="text-primary text-xl -translate-y-[0.5px]" />
                  Revoked:{" "}
                  {new Date(
                    (props.data as any).revoked_at
                  ).toLocaleDateString()}
                </span>
              </Show>
            </div>
          </div>
        </div>
      </details>
    </section>
  );
};
