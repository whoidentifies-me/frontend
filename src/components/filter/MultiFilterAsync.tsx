import { Component, createMemo, createSignal, For, Show } from "solid-js";
import { Combobox, createListCollection } from "@ark-ui/solid/combobox";
import { Portal } from "solid-js/web";
import { TbCheck } from "solid-icons/tb";
import type { FilterValue } from "~/types/filters";

function toCompositeKey(fv: FilterValue): string {
  return `${fv.type}:${fv.value}`;
}

interface MultiFilterAsyncProps {
  label: string;
  name: string;
  options?: FilterValue[];
  values?: FilterValue[];
  placeholder?: string;
  allowSubstr?: boolean;
  getLabel?: (fv: FilterValue) => string;
  onChange?: (val: FilterValue[]) => void;
  onInputChange?: (val: string) => void;
}

export const MultiFilterAsync: Component<MultiFilterAsyncProps> = (props) => {
  const [input, setInput] = createSignal("");
  const [isOpen, setIsOpen] = createSignal(false);

  const getLabel = (fv: FilterValue) => props.getLabel?.(fv) ?? fv.value;

  const selectedKeys = createMemo(
    () => new Set(props.values?.map(toCompositeKey))
  );
  const selectedKeysSnapshot = createMemo<Set<string>>((prev) =>
    !isOpen() ? selectedKeys() : prev || new Set<string>()
  );

  const options = createMemo<FilterValue[]>(() => {
    const keys = selectedKeysSnapshot();
    const selected =
      props.values?.filter((v) => keys.has(toCompositeKey(v))) || [];
    const result: FilterValue[] = [...selected];

    if (input()) {
      if (props.allowSubstr) {
        result.push({ value: input(), type: "like" });
      }
      if (props.options) {
        result.push(
          ...props.options.filter((o) => !keys.has(toCompositeKey(o)))
        );
      }
    } else {
      if (props.options) {
        result.push(
          ...props.options.filter((o) => !keys.has(toCompositeKey(o)))
        );
      }
    }

    return result;
  });

  const collection = createMemo(() =>
    createListCollection({
      items: options(),
      itemToValue: (item) => toCompositeKey(item),
      itemToString: (item) =>
        item.type === "like" ? `Contains: "${getLabel(item)}"` : getLabel(item),
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

  const id = () => `async-select-${props.name}`;

  return (
    <div class="flex flex-col items-stretch justify-end text-start">
      <label for={id()} class="text-sm font-semibold mb-2">
        {props.label}
      </label>
      <Combobox.Root
        value={props.values?.map(toCompositeKey) || []}
        collection={collection()}
        multiple
        openOnClick
        onOpenChange={(details) => setIsOpen(details.open)}
        onValueChange={onValueChange}
        inputValue={input()}
        onInputValueChange={(details) => onInputChange(details.inputValue)}
        loopFocus
      >
        <Combobox.Control>
          <Combobox.Input
            id={id()}
            class="select w-full"
            placeholder={props.placeholder}
            on:click={(e: MouseEvent) => {
              if (isOpen()) e.preventDefault();
            }}
          />
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
                          Contains: "{getLabel(option)}"
                        </Show>
                        <Show when={option.type === "exact"}>
                          {getLabel(option)}
                        </Show>
                      </Combobox.ItemText>
                      <Combobox.ItemIndicator class="ark-combobox-item-indicator">
                        <TbCheck />
                      </Combobox.ItemIndicator>
                    </Combobox.Item>
                  )}
                </For>
              </Combobox.ItemGroup>
              <Show when={options().length === 0}>
                <div class="ark-combobox-no-result">No results</div>
              </Show>
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.Root>
    </div>
  );
};
