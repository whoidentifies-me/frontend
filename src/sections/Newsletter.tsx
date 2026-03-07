import { Component } from "solid-js";
import { TwoColumnLayout } from "~/components/layout/TwoColumnLayout";
import { NewsletterForm } from "~/components/NewsletterForm";
import { useTranslate } from "~/i18n/dict";

export const Newsletter: Component = () => {
  const t = useTranslate();

  return (
    <section
      id="newsletter"
      class="wim-section bg-primary text-primary-content"
    >
      <TwoColumnLayout
        reverseDesktop
        class="wim-container"
        largerCol="last"
        firstContent={
          <>
            <h2>{t.home.newsletter.title()}</h2>
            <p class="mb-0">{t.home.newsletter.description()}</p>
          </>
        }
        lastContent={<NewsletterForm />}
        lastColumnClass="flex flex-col justify-center"
      ></TwoColumnLayout>
    </section>
  );
};
