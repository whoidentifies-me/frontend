import { Component, For, Show } from "solid-js";
import { RelyingParty } from "~/api";
import { useTranslate } from "~/i18n/dict";
import { ExternalLink } from "./ExternalLink";
import {
  TbOutlineInfoSquareRounded,
  TbOutlineMail,
  TbOutlinePhone,
  TbOutlineMapPin,
  TbOutlineFlag,
} from "solid-icons/tb";
import { CountryFlag } from "./CountryFlag";

export const SupervisoryAuthority: Component<{ data?: RelyingParty }> = (
  props
) => {
  const t = useTranslate();

  const authority = () => props.data?.supervisory_authority;

  const name = () => {
    const auth = authority();
    if (!auth) return undefined;
    const lp = auth.legal_person as
      | { trade_name?: string }
      | string
      | undefined;
    if (lp) {
      if (typeof lp === "string") return lp;
      if (typeof lp === "object" && lp.trade_name) return lp.trade_name;
    }
    const np = auth.natural_person as
      | { given_name?: string; family_name?: string }
      | string
      | undefined;
    if (np) {
      if (typeof np === "string") return np;
      if (typeof np === "object") {
        return (
          [np.given_name, np.family_name].filter(Boolean).join(" ") || undefined
        );
      }
    }
    return undefined;
  };

  const country = () => {
    const code = authority()?.country;
    if (!code) return undefined;
    const countries = t.countries as Record<string, () => string>;
    return countries[code]?.() ?? code;
  };

  const emails = () => (authority()?.email as string[]) || [];
  const phones = () => (authority()?.phone as string[]) || [];
  const infoUris = () => (authority()?.info_uri as string[]) || [];
  const postalAddress = () => {
    const addr = authority()?.postal_address;
    if (!addr) return undefined;
    if (typeof addr === "string") return addr;
    return String(addr);
  };

  const hasContent = () => !!authority();

  return (
    <Show when={hasContent()}>
      <section class="wim-container">
        <div class="wim-card wim-card-lg wim-card-outline-primary">
          <h2 class="mb-8">
            {t.relyingPartyDetails.supervisoryAuthority.title()}
          </h2>
          <Show when={name()}>
            <p class="font-semibold text-lg mb-4">{name()}</p>
          </Show>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Show when={country()}>
              <div>
                <h3 class="font-semibold mb-2 flex items-center gap-1">
                  <TbOutlineFlag class="text-lg text-primary" />
                  {t.relyingPartyDetails.supervisoryAuthority.country()}
                </h3>
                <p class="">
                  <span>
                    <CountryFlag class="mr-0.5" code={authority()?.country} />{" "}
                    {country()}
                  </span>
                </p>
              </div>
            </Show>
            <Show when={postalAddress()}>
              <div>
                <h3 class="font-semibold mb-2 flex items-center gap-1">
                  <TbOutlineMapPin class="text-lg text-primary" />
                  {t.relyingPartyDetails.supervisoryAuthority.postalAddress()}
                </h3>
                <p>{postalAddress()}</p>
              </div>
            </Show>
            <Show when={emails().length > 0}>
              <div>
                <h3 class="font-semibold mb-2 flex items-center gap-1">
                  <TbOutlineMail class="text-lg text-primary" />
                  {t.relyingPartyDetails.supervisoryAuthority.email()}
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
                  {t.relyingPartyDetails.supervisoryAuthority.phone()}
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
            <Show when={infoUris().length > 0}>
              <div>
                <h3 class="font-semibold mb-2 flex items-center gap-1">
                  <TbOutlineInfoSquareRounded class="text-lg text-primary" />
                  {t.relyingPartyDetails.supervisoryAuthority.infoUri()}
                </h3>
                <ul class="list-none space-y-1">
                  <For each={infoUris()}>
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
        </div>
      </section>
    </Show>
  );
};
