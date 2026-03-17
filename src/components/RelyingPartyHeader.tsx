import { Component, Show, For, createMemo } from "solid-js";
import { A, useLocation } from "@solidjs/router";
import { RelyingParty } from "~/api";
import { routes } from "~/config/routes";
import { useI18n } from "~/i18n/dict";
import { TbOutlineArrowLeft } from "solid-icons/tb";
import { ExternalLink } from "./ExternalLink";
import { getProviderType } from "~/data/providerTypes";
import {
  getRelyingPartyAttributes,
  getAllDescriptions,
} from "~/utils/relyingPartyAttributes";

interface RelyingPartyHeaderProps {
  data?: RelyingParty;
}

export const RelyingPartyHeader: Component<RelyingPartyHeaderProps> = (
  props
) => {
  const { locale, t } = useI18n();
  const location = useLocation();
  const backUrl = () =>
    (location.state as { backUrl?: string } | undefined)?.backUrl ||
    routes.search.index;

  const attributes = createMemo(() => getRelyingPartyAttributes(props.data, t));
  const providerType = () => getProviderType(props.data?.provider_type);
  const providerTypeLabel = () => {
    const key = props.data?.provider_type as
      | keyof typeof t.relyingParties.providerTypes
      | undefined;
    return key ? t.relyingParties.providerTypes[key]?.() : undefined;
  };

  const descriptions = createMemo(() =>
    getAllDescriptions(props.data?.service_descriptions || undefined, locale())
  );

  return (
    <div class="wim-container pb-6 pt-2! md:py-2! bx-8! wim-card wim-card-lg bg-primary text-primary-content grid gap-x-4 gap-y-2 md:grid-rows-[1fr_auto_1fr] md:grid-cols-[1fr_auto] grid-rows-[1fr_auto] grid-cols-1">
      <p class="m-0  row-start-1">
        <A
          class="px-0 btn btn-link btn-primary text-primary-content no-underline"
          href={backUrl()}
        >
          <TbOutlineArrowLeft />
          {t.relyingPartyDetails.backToResults()}
        </A>
      </p>

      <div class="row-start-2 col-start-1">
        <h1 class="mb-2 !md:text-3xl text-2xl line-clamp-2">
          {props.data?.trade_name}
        </h1>
        <Show when={providerType()}>
          {(pt) => (
            <div class="flex items-center gap-1.5 mb-2 text-sm font-semibold opacity-80">
              <span class="text-lg">{pt().icon()}</span>
              {providerTypeLabel()}
            </div>
          )}
        </Show>
        <Show when={attributes().length > 0}>
          <div class="wim-attributes font-semibold mb-2">
            <For each={attributes()}>
              {(attribute) => <span class="">{attribute}</span>}
            </For>
          </div>
        </Show>
        <Show when={descriptions()?.length}>
          <For each={descriptions()}>
            {(description) => <p class="mt-2 mb-0 text-sm">{description}</p>}
          </For>
        </Show>
      </div>

      <Show
        when={
          props.data?.legal_entity?.info_uri &&
          Array.isArray(props.data.legal_entity.info_uri) &&
          props.data.legal_entity.info_uri.length > 0
        }
      >
        <div class="md:col-start-2 md:row-start-2 row-start-3 flex flex-col justify-center">
          <ExternalLink
            showIcon={false}
            class="btn btn-outline text-primary-content border-primary-content hover:bg-primary-content hover:text-primary focus:bg-primary-content focus:text-primary no-underline"
            href={(props.data!.legal_entity!.info_uri as string[])[0]}
          >
            {t.relyingPartyDetails.website()}
          </ExternalLink>
        </div>
      </Show>
    </div>
  );
};
