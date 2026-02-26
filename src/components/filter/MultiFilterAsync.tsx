import { Component, createMemo, createSignal, Show } from "solid-js";
import { Combobox } from "@kobalte/core/combobox";
import { TbCheck, TbX } from "solid-icons/tb";
import { Search } from "@kobalte/core/search";
import type { FilterValue } from "~/types/filters";

function toCompositeKey(fv: FilterValue): string {
  return `${fv.type}:${fv.value}`;
}

interface MultiFilterProps {
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

export const MultiFilterAsync: Component<MultiFilterProps> = (props) => {
  const [input, setInput] = createSignal<string | undefined>(undefined);
  const [isOpen, setIsOpen] = createSignal(false);

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
        result.push({ value: input()!, type: "like" });
      }
      if (props.options) {
        result.push(...props.options);
      }
    }

    return result;
  });

  const value = createMemo((): FilterValue[] => {
    return (
      props.values
        ?.map((fv) => {
          const key = toCompositeKey(fv);
          return options().find((opt) => toCompositeKey(opt) === key);
        })
        .filter((opt) => !!opt) || []
    );
  });

  const onInputChange = (v: string) => {
    setInput(v);
    props.onInputChange?.(v);
  };

  const onChange = (values: FilterValue[]) => {
    let selected = [...selectedValues()];
    const newKeys = new Set(values.map(toCompositeKey));

    // Add newly selected values
    for (const item of values) {
      if (!selectedKeys().has(toCompositeKey(item))) {
        selected.push(item);
      }
    }

    // remove unselected
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

  const onClear = () => {
    props.onChange?.([]);
  };

  const onOpenChange = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  const id = () => `async-select-${props.name}`;

  return (
    <div class="flex flex-col items-stretch justify-end text-start">
      <label for={id()} class="text-sm font-semibold mb-2">
        {props.label}
      </label>
      <Search
        triggerMode="focus"
        options={options()}
        optionValue={(fv) => toCompositeKey(fv)}
        optionLabel={(fv) => getLabel(fv)}
        optionTextValue={(fv) => getLabel(fv)}
        onInputChange={onInputChange}
        onChange={(v) => onChange(v)}
        onOpenChange={onOpenChange}
        name={props.name}
        value={value() as any}
        placeholder={props.placeholder}
        multiple
        debounceOptionsMillisecond={300}
        removeOnBackspace={false}
        closeOnSelection={false}
        itemComponent={(itemProps) => {
          return (
            <>
              <Show when={itemProps.item.rawValue.type === "exact"}>
                <Search.Item class="search-item" item={itemProps.item}>
                  <Search.ItemLabel>
                    {getLabel(itemProps.item.rawValue)}
                  </Search.ItemLabel>
                  <Combobox.ItemIndicator class="combobox-item-indicator">
                    <TbCheck />
                  </Combobox.ItemIndicator>
                </Search.Item>
              </Show>
              <Show when={itemProps.item.rawValue.type === "like"}>
                <Search.Item class="search-item" item={itemProps.item}>
                  <Search.ItemLabel>
                    Contains: "{getLabel(itemProps.item.rawValue)}"
                  </Search.ItemLabel>
                  <Combobox.ItemIndicator class="combobox-item-indicator">
                    <TbCheck />
                  </Combobox.ItemIndicator>
                </Search.Item>
              </Show>
            </>
          );
        }}
      >
        <Search.Control class="" aria-label={props.label}>
          {() => (
            <>
              <Search.Input class="select w-full" id={id()}></Search.Input>
              <div class="flex flex-row items-center">
                <Show when={selectedKeys().size && false}>
                  <span class="mx-2">{selectedKeys().size}</span>
                  <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={onClear}
                  >
                    <TbX />
                  </button>
                </Show>
              </div>
            </>
          )}
        </Search.Control>
        <Search.Portal>
          <Search.Content
            class="search-content"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <Search.Listbox class="search-listbox" />
            <Search.NoResult class="search-no-result">
              No results
            </Search.NoResult>
          </Search.Content>
        </Search.Portal>
      </Search>
    </div>
  );
};
