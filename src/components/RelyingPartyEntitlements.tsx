import { Component, For, Show } from "solid-js";
import { A } from "@solidjs/router";
import { RelyingParty } from "~/api";
import { useTranslate } from "~/i18n/dict";
import { TwoColumnLayout } from "./layout/TwoColumnLayout";
import {
  TbOutlineInfoCircle,
  TbOutlineCornerDownRightDouble,
  TbOutlineCornerUpRightDouble,
  TbOutlineBuilding,
  TbOutlineBuildingBank,
} from "solid-icons/tb";
import { entitlements as entitlementMap } from "~/data/entitlements";
import { getProviderType } from "~/data/providerTypes";
import { routes } from "~/config/routes";

export const RelyingPartyEntitlements: Component<{ data?: RelyingParty }> = (
  props
) => {
  const t = useTranslate();

  const entitlements = () => props.data?.entitlements || [];
  const hasProviderType = () => !!getProviderType(props.data?.provider_type);
  const hasPsbInfo = () =>
    props.data?.is_psb === true || props.data?.is_psb === false;
  const hasIntermediaryInfo = () =>
    props.data?.is_intermediary || !!props.data?.uses_intermediaries?.length;

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
            <Show when={hasProviderType()}>
              <div class="divider my-4" />
              {(() => {
                const pt = getProviderType(props.data?.provider_type)!;
                return (
                  <div class="flex flex-row items-center gap-2">
                    <span class="text-primary text-3xl leading-0">
                      {pt.icon()}
                    </span>
                    <span class="font-semibold">{pt.name}</span>
                  </div>
                );
              })()}
            </Show>
            <Show when={hasPsbInfo()}>
              <div class="divider my-4" />
              <div class="flex flex-row items-center gap-2">
                <span class="text-primary text-3xl leading-0">
                  <Show
                    when={props.data?.is_psb}
                    fallback={<TbOutlineBuilding />}
                  >
                    <TbOutlineBuildingBank />
                  </Show>
                </span>
                <span class="font-semibold">
                  <Show
                    when={props.data?.is_psb}
                    fallback={t.relyingParties.nonPublic()}
                  >
                    {t.relyingParties.public()}
                  </Show>
                </span>
              </div>
            </Show>
            <Show when={hasIntermediaryInfo()}>
              <div class="divider my-4" />
              <Show when={props.data?.is_intermediary}>
                <div class="flex flex-row items-center gap-2">
                  <span class="text-primary text-3xl leading-0">
                    <TbOutlineCornerDownRightDouble />
                  </span>
                  <span class="font-semibold">
                    {t.relyingParties.isIntermediary()}
                  </span>
                </div>
              </Show>
              <Show when={props.data?.uses_intermediaries?.length}>
                <div class="mt-4 flex flex-row items-center gap-2">
                  <span class="text-primary text-3xl leading-0">
                    <TbOutlineCornerUpRightDouble />
                  </span>
                  <span class="font-semibold">
                    {t.relyingParties.usesIntermediaries()}
                  </span>
                  <span class="flex flex-row gap-1">
                    <For each={props.data?.uses_intermediaries}>
                      {(id, index) => (
                        <>
                          <Show when={index() > 0}>, </Show>
                          <A href={routes.rp(id)} class="link link-primary">
                            {index() + 1}
                          </A>
                        </>
                      )}
                    </For>
                  </span>
                </div>
              </Show>
            </Show>
          </>
        }
      />
    </section>
  );
};
