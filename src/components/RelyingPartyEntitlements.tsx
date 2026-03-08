import { Component, For, Show } from "solid-js";
import { RelyingParty } from "~/api";
import { useTranslate } from "~/i18n/dict";
import { TwoColumnLayout } from "./layout/TwoColumnLayout";
import { TbOutlineInfoCircle } from "solid-icons/tb";
import { entitlements as entitlementMap } from "~/data/entitlements";
import { ExternalLink } from "./ExternalLink";

export const RelyingPartyEntitlements: Component<{ data?: RelyingParty }> = (
  props
) => {
  const t = useTranslate();

  const entitlements = () => props.data?.entitlements || [];

  return (
    <section class="wim-container mt-10">
      <TwoColumnLayout
        largerCol="last"
        firstContent={
          <>
            <h2>{t.relyingPartyDetails.entitlements.title()}</h2>
            <p>{t.relyingPartyDetails.entitlements.description()}</p>
          </>
        }
        lastContent={
          <ul class="grid sm:grid-cols-2 grid-cols-1 gap-6 list-none">
            <For
              each={entitlements()}
              fallback={
                <p class="text-base-content/75">
                  <em>There are no permissions reported at the moment.</em>
                </p>
              }
            >
              {(item) => {
                const mapped = entitlementMap[item];
                return (
                  <li class="flex flex-row items-center gap-2">
                    <span class="text-primary text-3xl">
                      <Show when={mapped} fallback={<TbOutlineInfoCircle />}>
                        {mapped.icon()}
                      </Show>
                    </span>

                    <div class="flex-col">
                      <Show
                        when={mapped?.name}
                        fallback={
                          <span class="font-semibold text-sm line-clamp-2">
                            {item}
                          </span>
                        }
                      >
                        <Show
                          when={mapped.url}
                          fallback={
                            <span class="font-semibold text-sm line-clamp-2">
                              {mapped?.name}
                            </span>
                          }
                        >
                          <ExternalLink
                            class="font-semibold text-sm line-clamp-2"
                            href={mapped.url}
                          >
                            {mapped?.name}
                          </ExternalLink>
                        </Show>
                      </Show>
                      <span class="text-xs text-base-content/50 font-mono break-all line-clamp-2">
                        {item}
                      </span>
                    </div>
                  </li>
                );
              }}
            </For>
          </ul>
        }
      />
    </section>
  );
};
