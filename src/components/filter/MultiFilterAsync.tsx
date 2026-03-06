import { Component, createMemo, createSignal, For, Show } from "solid-js";
import { Combobox, createListCollection } from "@ark-ui/solid/combobox";
import { Portal } from "solid-js/web";
import { TbOutlineCheck } from "solid-icons/tb";
import type { FilterValue } from "~/types/filters";
import { useTranslate } from "~/i18n/dict";

function toCompositeKey(fv: FilterValue): string {
  return `${fv.type}:${fv.value}`;
}

interface MultiFilterAsyncProps {
  label: string;
  name: string;
  options?: FilterValue[];
  values?: FilterValue[];
  placeholder?: string;
  loading?: boolean;
  allowSubstr?: boolean;
  getLabel?: (fv: FilterValue) => string;
  onChange?: (val: FilterValue[]) => void;
  onInputChange?: (val: string) => void;
}

const REOPEN_GUARD_MS = 350;

export const MultiFilterAsync: Component<MultiFilterAsyncProps> = (props) => {
  const t = useTranslate();
  const [input, setInput] = createSignal("");
  const [isOpen, setIsOpen] = createSignal(false);
  const [lastCloseTime, setLastCloseTime] = createSignal(0);

  const getLabel = (fv: FilterValue) => props.getLabel?.(fv) ?? fv.value;

  const selectedValuesSnapshot = createMemo<FilterValue[]>((prev) => {
    return (!isOpen() ? props.values : prev) || [];
  });

  const options = createMemo<FilterValue[]>(() => {
    // Build the list of options for the dropdown menu
    const result: FilterValue[] = [];
    const seen = new Set<string>();

    // Add all selected items from the last time the dropdown was opened
    for (const val of selectedValuesSnapshot()) {
      const key = toCompositeKey(val);
      result.push(val);
      seen.add(key);
    }

    // Add substring matching item
    if (input() && props.allowSubstr) {
      result.push({ value: input(), type: "like" });
    }

    if (props.options) {
      for (const opt of props.options || []) {
        const key = toCompositeKey(opt);
        if (!seen.has(key)) {
          result.push(opt);
          seen.add(key);
        }
      }
    }

    return result;
  });

  const collection = createMemo(() =>
    createListCollection({
      items: options(),
      itemToValue: (item) => toCompositeKey(item),
      itemToString: (item) =>
        item.type === "like"
          ? `${t.components.generic.contains()} "${getLabel(item)}"`
          : getLabel(item),
    })
  );

  const onInputChange = (v: string) => {
    setInput(v);
    props.onInputChange?.(v);
  };

  const onValueChange = (details: { value: string[] }) => {
    const keyToOption = new Map<string, FilterValue>();
    for (const fv of props.values || [])
      keyToOption.set(toCompositeKey(fv), fv);
    for (const fv of options()) keyToOption.set(toCompositeKey(fv), fv);

    const selected = details.value
      .map((key) => keyToOption.get(key))
      .filter((fv): fv is FilterValue => !!fv);
    props.onChange?.(selected);
  };

  return (
    <div class="flex flex-col items-stretch justify-end text-start">
      <Combobox.Root
        value={props.values?.map(toCompositeKey) || []}
        collection={collection()}
        multiple
        openOnClick
        selectionBehavior="preserve"
        onOpenChange={(details) => {
          setIsOpen(details.open);
          if (!details.open) {
            setLastCloseTime(performance.now());
          }
        }}
        onValueChange={onValueChange}
        onInputValueChange={(details) =>
          onInputChange(details.inputValue?.trim())
        }
        loopFocus
        positioning={{ sameWidth: false }}
      >
        <Combobox.Label class="text-sm font-semibold mb-2">
          {props.label}
          <Show when={(props.values?.length ?? 0) > 0}>
            <span class="ml-1.5 text-xs bg-primary text-white rounded-full px-1.5 py-0.5 inline-flex items-center justify-center leading-none">
              {props.values!.length}
            </span>
          </Show>
        </Combobox.Label>
        <Combobox.Control
          class="relative"
          on:click={(e: MouseEvent) => {
            // prevent flickering
            if (performance.now() - lastCloseTime() < REOPEN_GUARD_MS) {
              e.preventDefault();
            }
          }}
        >
          <Combobox.Input
            class={`select w-full ${props.loading && isOpen() ? "!bg-none" : ""}`}
            placeholder={props.placeholder}
          />
          <Show when={props.loading && isOpen()}>
            <span class="loading loading-spinner loading-xs text-primary absolute right-3 top-1/2 -translate-y-1/2 z-2 " />
          </Show>
        </Combobox.Control>
        <Portal>
          <Combobox.Positioner>
            <Combobox.Content class="ark-combobox-content">
              <Combobox.ItemGroup>
                <For each={options()}>
                  {(option) => (
                    <Combobox.Item item={option} class="ark-combobox-item">
                      <Combobox.ItemText>
                        <Show when={option.type === "like"}>
                          <em>{t.components.generic.contains()}</em> "
                          {getLabel(option)}"
                        </Show>
                        <Show when={option.type === "exact"}>
                          {getLabel(option)}
                        </Show>
                      </Combobox.ItemText>
                      <Combobox.ItemIndicator class="ark-combobox-item-indicator text-primary">
                        <TbOutlineCheck />
                      </Combobox.ItemIndicator>
                    </Combobox.Item>
                  )}
                </For>
              </Combobox.ItemGroup>
              <Show when={props.options && props.options.length === 0}>
                <div class="ark-combobox-no-result">
                  {t.components.generic.noResults()}
                </div>
              </Show>
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.Root>
    </div>
  );
};
