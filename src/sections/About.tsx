import { Component } from "solid-js";
import { ExternalLink } from "~/components/ExternalLink";
import { useTranslate } from "~/i18n/dict";

import netideeLogo from "~/assets/img/netidee-logo-color.svg";
import codevelopLogo from "~/assets/img/codevelop-logo.png?format=webp&w=200&imagetools";
import filecoinLogo from "~/assets/img/filecoin-logo.png?format=webp&w=200&imagetools";
import idpiLogo from "~/assets/img/idpi-logo.png?format=webp&w=200&imagetools";

export const About: Component = () => {
  const t = useTranslate();

  return (
    <section id="about" class="wim-section">
      <div class="wim-container space-y-6">
        <h2>{t.home.about.title()}</h2>
        <p>{t.home.about.intro()}</p>
        <p>{t.home.about.collaborate()}</p>
        <p>{t.home.about.thanks()}</p>
        <div class="flex flex-wrap items-center justify-center gap-8 pt-4">
          <ExternalLink href="http://Netidee.at">
            <img
              src={netideeLogo}
              alt={t.home.about.logos.netidee()}
              class="max-h-16 object-contain"
            />
          </ExternalLink>
          <ExternalLink href="https://www.codevelop.fund/">
            <img
              src={codevelopLogo}
              alt={t.home.about.logos.codevelop()}
              class="max-h-16 object-contain"
            />
          </ExternalLink>
          <ExternalLink href="https://fil.org/">
            <img
              src={filecoinLogo}
              alt={t.home.about.logos.filecoin()}
              class="max-h-16 object-contain"
            />
          </ExternalLink>
          <ExternalLink href="https://digitalpublicinterest.org/about-us/">
            <img
              src={idpiLogo}
              alt={t.home.about.logos.idpi()}
              class="max-h-16 object-contain"
            />
          </ExternalLink>
        </div>
      </div>
    </section>
  );
};
