import { Component, createMemo, createSignal, For, Show } from "solid-js";
import { Combobox, createListCollection } from "@ark-ui/solid/combobox";
import { Portal } from "solid-js/web";
import { TbOutlineCheck } from "solid-icons/tb";
import { useTranslate } from "~/i18n/dict";

interface MultiFilterOption {
  value: string;
  label: string;
}

interface MultiFilterProps {
  label: string;
  name: string;
  options?: MultiFilterOption[];
  values?: string | string[];
  placeholder?: string;
  onChange?: (val: string[]) => void;
}

const REOPEN_GUARD_MS = 350;

export const MultiFilter: Component<MultiFilterProps> = (props) => {
  const t = useTranslate();
  const [inputValue, setInputValue] = createSignal("");
  const [lastCloseTime, setLastCloseTime] = createSignal(0);

  const allOptions = () => props.options || [];

  const filteredOptions = createMemo(() => {
    const query = inputValue().toLowerCase();
    if (!query) return allOptions();
    return allOptions().filter(
      (opt) =>
        opt.label.toLowerCase().includes(query) ||
        opt.value.toLowerCase().includes(query)
    );
  });

  const collection = createMemo(() =>
    createListCollection({
      items: filteredOptions(),
      itemToValue: (item) => item.value,
      itemToString: (item) => item.label,
    })
  );

  const value = createMemo((): string[] => {
    if (!props.values) return [];
    return Array.isArray(props.values) ? props.values : [props.values];
  });

  return (
    <div class="flex flex-col items-stretch justify-end text-start">
      <Combobox.Root
        value={value()}
        collection={collection()}
        selectionBehavior="preserve"
        multiple
        openOnClick
        onOpenChange={(details) => {
          if (!details.open) {
            setLastCloseTime(performance.now());
          }
        }}
        onValueChange={(details) => {
          props.onChange?.(details.value);
        }}
        onInputValueChange={(details) => {
          setInputValue(details.inputValue);
        }}
        loopFocus
        positioning={{ sameWidth: false }}
      >
        <Combobox.Label class="font-semibold text-sm mb-2">
          {props.label}
          <Show when={value().length > 0}>
            <span class="ml-1.5 text-xs bg-primary text-white rounded-full px-1.5 py-0.5 inline-flex items-center justify-center leading-none">
              {value().length}
            </span>
          </Show>
        </Combobox.Label>
        <Combobox.Control
          on:click={(e: MouseEvent) => {
            if (performance.now() - lastCloseTime() < REOPEN_GUARD_MS) {
              e.preventDefault();
            }
          }}
        >
          <Combobox.Input
            class="select w-full"
            placeholder={props.placeholder}
          />
        </Combobox.Control>
        <Portal>
          <Combobox.Positioner>
            <Combobox.Content class="ark-combobox-content">
              <Combobox.ItemGroup>
                <For each={filteredOptions()}>
                  {(option) => (
                    <Combobox.Item item={option} class="ark-combobox-item">
                      <Combobox.ItemText>{option.label}</Combobox.ItemText>
                      <Combobox.ItemIndicator class="ark-combobox-item-indicator">
                        <TbOutlineCheck />
                      </Combobox.ItemIndicator>
                    </Combobox.Item>
                  )}
                </For>
              </Combobox.ItemGroup>
              <Show when={filteredOptions().length === 0}>
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
