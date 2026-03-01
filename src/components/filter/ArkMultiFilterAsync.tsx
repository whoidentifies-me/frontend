import { Component, createMemo, createSignal, For, Show } from "solid-js";
import { Combobox, createListCollection } from "@ark-ui/solid/combobox";
import { Portal } from "solid-js/web";
import { TbCheck } from "solid-icons/tb";
import type { FilterValue } from "~/types/filters";

function toCompositeKey(fv: FilterValue): string {
  return `${fv.type}:${fv.value}`;
}

interface ArkMultiFilterAsyncProps {
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

export const ArkMultiFilterAsync: Component<ArkMultiFilterAsyncProps> = (
  props
) => {
  const [input, setInput] = createSignal("");
  const [isOpen, setIsOpen] = createSignal(false);
  let debounceTimer: ReturnType<typeof setTimeout> | undefined;

  const getLabel = (fv: FilterValue) => props.getLabel?.(fv) ?? fv.value;

  const selectedKeys = createMemo(
    () => new Set(props.values?.map(toCompositeKey))
  );
  const optionKeysSet = createMemo(
    () => new Set(props.options?.map(toCompositeKey))
  );
  const selectedValues = createMemo<FilterValue[]>(() => props.values || []);

  // snapshot only updates when modal is closed
  const selectedSnapshot = createMemo<FilterValue[]>((prev) =>
    !isOpen() ? selectedValues() : prev || []
  );
  const selectedSnapshotKeys = createMemo(
    () => new Set(selectedSnapshot().map(toCompositeKey))
  );

  const options = createMemo<FilterValue[]>(() => {
    const result: FilterValue[] = [];

    if (!input()) {
      result.push(
        ...(selectedSnapshot() || []),
        ...(props.options?.filter(
          (o) => !selectedSnapshotKeys()?.has(toCompositeKey(o))
        ) || [])
      );
    } else {
      if (props.allowSubstr) {
        result.push({ value: input(), type: "like" });
      }
      if (props.options) {
        result.push(...props.options);
      }
    }

    return result;
  });

  const selectedCompositeKeys = createMemo((): string[] => {
    return (
      props.values
        ?.map((fv) => {
          const key = toCompositeKey(fv);
          const found = options().find((opt) => toCompositeKey(opt) === key);
          return found ? key : undefined;
        })
        .filter((k): k is string => !!k) || []
    );
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
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      props.onInputChange?.(v);
    }, 300);
  };

  const onValueChange = (details: { value: string[] }) => {
    const newKeys = new Set(details.value);
    let selected = [...selectedValues()];

    // Map composite keys back to FilterValue objects from current options
    const keyToOption = new Map(options().map((o) => [toCompositeKey(o), o]));

    // Add newly selected values
    for (const key of details.value) {
      if (!selectedKeys().has(key)) {
        const option = keyToOption.get(key);
        if (option) {
          selected.push(option);
        }
      }
    }

    // Remove unselected
    const oldSelectedKeys = optionKeysSet().intersection(selectedKeys());
    const removedKeys = oldSelectedKeys.difference(newKeys);

    const selectedLikeKeys = new Set(
      options()
        .filter(
          (o) => selectedKeys().has(toCompositeKey(o)) && o.type === "like"
        )
        .map(toCompositeKey)
    );
    const removedLikeKeys = selectedLikeKeys.difference(newKeys);

    const removeSet = removedKeys.union(removedLikeKeys);
    if (removeSet.size) {
      selected = selected.filter((o) => !removeSet.has(toCompositeKey(o)));
    }

    props.onChange?.(selected);
  };

  const id = () => `ark-async-select-${props.name}`;

  return (
    <div class="flex flex-col items-stretch justify-end text-start">
      <label for={id()} class="text-sm font-semibold mb-2">
        {props.label}
      </label>
      <Combobox.Root
        value={selectedCompositeKeys()}
        collection={collection()}
        multiple
        openOnClick
        open={isOpen()}
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
