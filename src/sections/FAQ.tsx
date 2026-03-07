import { Component, For } from "solid-js";
import { Collapse } from "~/components/Collapse";
import { TwoColumnLayout } from "~/components/layout/TwoColumnLayout";
import { useTranslate } from "~/i18n/dict";

export const FAQ: Component = () => {
  const t = useTranslate();
  const name = "wim-faq-items";

  return (
    <section id="how" class="wim-section bg-primary text-primary-content">
      <div class="wim-container">
        <TwoColumnLayout
          reverseDesktop
          largerCol="last"
          firstContent={
            <div>
              <h2>{t.home.howItWorks.title()}</h2>
            </div>
          }
          lastContent={
            <div class="space-y-4">
              <For each={t.home.howItWorks.items()}>
                {(item) => (
                  <Collapse title={item.title} name={name}>
                    {item.body}
                  </Collapse>
                )}
              </For>
            </div>
          }
        />
      </div>
    </section>
  );
};
