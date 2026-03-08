import { Component, For, Show } from "solid-js";
import { RelyingParty } from "~/api";
import { useTranslate } from "~/i18n/dict";
import { TwoColumnLayout } from "./layout/TwoColumnLayout";
import { ExternalLink } from "./ExternalLink";
import {
  TbOutlineInfoSquareRounded,
  TbOutlineMail,
  TbOutlinePhone,
} from "solid-icons/tb";

export const RelyingPartyContact: Component<{ data?: RelyingParty }> = (
  props
) => {
  const t = useTranslate();

  const emails = () => (props.data?.legal_entity?.email as string[]) || [];
  const phones = () => (props.data?.legal_entity?.phone as string[]) || [];
  const supportUris = () => props.data?.support_uris || [];

  const hasContent = () =>
    emails().length > 0 || phones().length > 0 || supportUris().length > 0;

  return (
    <Show when={hasContent()}>
      <section class="wim-container mt-10">
        <TwoColumnLayout
          largerCol="last"
          firstContent={<h2>{t.relyingPartyDetails.contact.title()}</h2>}
          lastContent={
            <div class="space-y-6">
              <Show when={emails().length > 0}>
                <div>
                  <h3 class="font-semibold mb-2 flex items-center gap-1">
                    <TbOutlineMail class="text-lg text-primary" />
                    {t.relyingPartyDetails.contact.email()}
                  </h3>
                  <ul class="list-none space-y-1">
                    <For each={emails()}>
                      {(email) => (
                        <li>
                          <a class="line-clamp-2" href={`mailto:${email}`}>
                            {email}
                          </a>
                        </li>
                      )}
                    </For>
                  </ul>
                </div>
              </Show>
              <Show when={phones().length > 0}>
                <div>
                  <h3 class="font-semibold mb-2 flex items-center gap-1">
                    <TbOutlinePhone class="text-lg text-primary" />
                    {t.relyingPartyDetails.contact.phone()}
                  </h3>
                  <ul class="list-none space-y-1">
                    <For each={phones()}>
                      {(phone) => (
                        <li>
                          <a class="line-clamp-2" href={`tel:${phone}`}>
                            {phone}
                          </a>
                        </li>
                      )}
                    </For>
                  </ul>
                </div>
              </Show>
              <Show when={supportUris().length > 0}>
                <div>
                  <h3 class="font-semibold mb-2 flex items-center gap-1">
                    <TbOutlineInfoSquareRounded class="text-lg text-primary" />
                    {t.relyingPartyDetails.contact.support()}
                  </h3>
                  <ul class="list-none space-y-1">
                    <For each={supportUris()}>
                      {(uri) => (
                        <li>
                          <ExternalLink class="line-clamp-2" href={uri}>
                            {uri}
                          </ExternalLink>
                        </li>
                      )}
                    </For>
                  </ul>
                </div>
              </Show>
            </div>
          }
        />
      </section>
    </Show>
  );
};
