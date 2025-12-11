import { Component, Show, For, createMemo } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { RelyingParty } from "~/api";
import { useI18n } from "~/i18n/dict";
import { TbArrowLeft } from "solid-icons/tb";
import { ExternalLink } from "./ExternalLink";
import {
  getRelyingPartyAttributes,
  getFirstDescription,
} from "~/utils/relyingPartyAttributes";

interface RelyingPartyHeaderProps {
  data?: RelyingParty;
}

export const RelyingPartyHeader: Component<RelyingPartyHeaderProps> = (
  props
) => {
  const { locale, t } = useI18n();
  const navigate = useNavigate();

  const attributes = createMemo(() => getRelyingPartyAttributes(props.data, t));

  const description = createMemo(() =>
    getFirstDescription(props.data?.service_descriptions, locale())
  );

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div class="wim-container pb-6 pt-2! md:py-2! bx-8! wim-card wim-card-lg bg-primary text-primary-content grid gap-x-4 gap-y-2 md:grid-rows-[1fr_auto_1fr] md:grid-cols-[1fr_auto] grid-rows-[1fr_auto] grid-cols-1">
      <p class="m-0  row-start-1">
        <button
          class="px-0 btn btn-link btn-primary text-primary-content no-underline"
          onClick={handleBack}
        >
          <TbArrowLeft />
          {t.relyingPartyDetails.backToResults()}
        </button>
      </p>

      <div class="row-start-2 col-start-1">
        <h1 class="mb-2 !md:text-3xl text-2xl line-clamp-2">
          {props.data?.trade_name}
        </h1>
        <Show when={attributes().length > 0}>
          <div class="wim-attributes font-semibold">
            <For each={attributes()}>
              {(attribute) => <span class="">{attribute}</span>}
            </For>
          </div>
        </Show>
        <Show when={description()}>
          <p class="mt-2 mb-0 text-sm opacity-90 line-clamp-2">
            {description()}
          </p>
        </Show>
      </div>

      <Show when={props.data?.legal_entity.info_uri?.length}>
        <div class="md:col-start-2 md:row-start-2 row-start-3 flex flex-col justify-center">
          <ExternalLink
            showIcon={false}
            class="btn btn-outline text-primary-content border-primary-content hover:bg-primary-content hover:text-primary focus:bg-primary-content focus:text-primary no-underline"
            href={props.data!.legal_entity.info_uri[0]}
          >
            {t.relyingPartyDetails.website()}
          </ExternalLink>
        </div>
      </Show>
    </div>
  );
};
