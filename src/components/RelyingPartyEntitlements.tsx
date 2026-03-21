import { Component, For, Show } from "solid-js";
import { RelyingParty } from "~/api";
import { useTranslate } from "~/i18n/dict";
import { TwoColumnLayout } from "./layout/TwoColumnLayout";
import { TbOutlineInfoCircle, TbOutlineArrowsShuffle } from "solid-icons/tb";
import { entitlements as entitlementMap } from "~/data/entitlements";

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
          <>
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
                          <div class="tooltip" data-tip={item}>
                            <span
                              class="font-semibold line-clamp-2 cursor-pointer"
                              tabindex="0"
                            >
                              {mapped?.name}
                            </span>
                          </div>
                        </Show>
                      </div>
                    </li>
                  );
                }}
              </For>
            </ul>
            <Show when={props.data?.is_intermediary}>
              <div class="mt-6 flex flex-row items-center gap-2">
                <span class="text-primary text-3xl leading-0">
                  <TbOutlineArrowsShuffle />
                </span>
                <span class="font-semibold">
                  {t.relyingParties.isIntermediary()}
                </span>
              </div>
            </Show>
          </>
        }
      />
    </section>
  );
};
