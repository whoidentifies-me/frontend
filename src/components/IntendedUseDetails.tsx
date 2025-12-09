import { Component, createMemo, For } from "solid-js";
import { IntendedUse } from "~/api";
import { TbInfoCircle } from "solid-icons/tb";
import { getLocalizeText } from "~/utils/relyingPartyAttributes";
import { useI18n } from "~/i18n/dict";

interface IntendedUseDetailsProps {
  data?: IntendedUse;
  title?: string;
}

export const IntendedUseDetails: Component<IntendedUseDetailsProps> = (
  props
) => {
  const { locale } = useI18n();

  const getID = () =>
    props?.data?.id
      ? `intended_use_${props.data.id.substring(0, 8)}`
      : undefined;

  const purposes = createMemo(() => {
    return getLocalizeText(props.data?.purposes, locale());
  });

  const credentials = createMemo(() => {
    return props.data?.credentials.flatMap((c) => c.claims) || [];
  });

  return (
    <>
      <section id={getID()} class="wim-container">
        <details class="wim-card-outline collapse border shadow-md collapse-plus bg-secondary text-secondary-content !rounded-4xl px-4 py-2">
          <summary class="collapse-title">
            <h3 class="my-0">{props.title}</h3>
          </summary>
          <div class="collapse-content">
            <For each={purposes()}>{(item) => <p class="">{item}</p>}</For>

            <ul class="mt-6 list-none grid grid-cols-3">
              <For each={credentials()}>
                {(item) => (
                  <li class="flex flex-col gap-2">
                    <TbInfoCircle size="2rem" class="text-primary" />
                    <span class="font-semibold font-mono text-sm">
                      {item.path}
                    </span>
                  </li>
                )}
              </For>
            </ul>
          </div>
        </details>
      </section>
    </>
  );
};
