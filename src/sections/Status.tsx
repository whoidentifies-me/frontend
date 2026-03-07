import { Component } from "solid-js";
import { EuropeMap } from "~/components/EuropeMap";
import { TwoColumnLayout } from "~/components/layout/TwoColumnLayout";
import { useTranslate } from "~/i18n/dict";

export const Status: Component = () => {
  const t = useTranslate();

  return (
    <section id="status" class="wim-section">
      <TwoColumnLayout
        class="wim-container"
        largerCol="right"
        rightColumnClass="flex flex-col justify-center items-center"
        leftContent={
          <>
            <h2>{t.home.status.title()}</h2>
            <p class="mb-0">{t.home.status.description()}</p>
          </>
        }
        rightContent={
          <EuropeMap
            class="max-w-md"
            ariaLabel={t.home.status.mapAria()}
            countriesPending={["AT"]}
            countriesInactive={[
              "BE",
              "BG",
              "HR",
              "CY",
              "CZ",
              "DK",
              "EE",
              "FI",
              "FR",
              "DE",
              "GR",
              "HU",
              "IE",
              "IT",
              "LV",
              "LT",
              "LU",
              "MT",
              "NL",
              "PL",
              "PT",
              "RO",
              "SK",
              "SI",
              "ES",
              "SE",
            ]}
          />
        }
      ></TwoColumnLayout>
    </section>
  );
};
