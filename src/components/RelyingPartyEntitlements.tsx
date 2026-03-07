import { Component, For } from "solid-js";
import { RelyingParty } from "~/api";
import { useTranslate } from "~/i18n/dict";
import { TwoColumnLayout } from "./layout/TwoColumnLayout";
import { TbOutlineInfoCircle } from "solid-icons/tb";
import { entitlements as entitlementMap } from "~/data/entitlements";

export const RelyingPartyEntitlements: Component<{ data?: RelyingParty }> = (
  props
) => {
  const t = useTranslate();

  const entitlements = () => props.data?.entitlements || [];

  return (
    <section class="wim-container mt-10">
      <TwoColumnLayout
        largerCol="right"
        leftContent={
          <>
            <h2>{t.relyingPartyDetails.entitlements.title()}</h2>
            <p>{t.relyingPartyDetails.entitlements.description()}</p>
          </>
        }
        rightContent={
          <ul class="grid sm:grid-cols-2 grid-cols-1 gap-6 list-none">
            <For
              each={entitlements()}
              fallback={
                <p class="text-base-content/75">
                  <em>There are no permissions reportet at the moment.</em>
                </p>
              }
            >
              {(item) => {
                const mapped = entitlementMap[item];
                return (
                  <li class="flex flex-col gap-2">
                    <span class="text-primary [&>svg]:size-8">
                      {mapped ? (
                        mapped.icon()
                      ) : (
                        <TbOutlineInfoCircle size="2rem" />
                      )}
                    </span>
                    <span class="font-semibold text-sm">
                      {mapped?.name ?? item}
                    </span>
                    {mapped && (
                      <span class="text-xs text-base-content/50 font-mono break-all">
                        {item}
                      </span>
                    )}
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
