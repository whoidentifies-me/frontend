import { Component, For } from "solid-js";
import { Collapse } from "~/components/Collapse";
import { TwoColumnLayout } from "~/components/layout/TwoColumnLayout";
import { useTranslate } from "~/i18n/dict";

export const FAQ: Component = () => {
  const t = useTranslate();

  return (
    <section id="faq" class="wim-section">
      <div class="wim-container">
        <TwoColumnLayout
          largerCol="right"
          leftContent={
            <div>
              <h2>{t.home.faq.title()}</h2>
              <p>{t.home.faq.description()}</p>
            </div>
          }
          rightContent={
            <div class="space-y-4">
              <For each={t.home.faq.items()}>
                {(item) => <Collapse title={item.title}>{item.body}</Collapse>}
              </For>
            </div>
          }
        />
      </div>
    </section>
  );
};
