import { Component, createMemo, createSignal, Show } from "solid-js";
import { Combobox } from "@kobalte/core/combobox";
import { TbCheck, TbX } from "solid-icons/tb";
import { Search } from "@kobalte/core/search";
import type { FilterValue } from "~/types/filters";

export interface MultiFilterOption {
  value: string;
  label: string;
  type: "exact" | "substr";
}

function toCompositeKey(fv: FilterValue): string {
  return `${fv.type}:${fv.value}`;
}

function fromCompositeKey(key: string): FilterValue {
  const colonIndex = key.indexOf(":");
  const type = key.substring(0, colonIndex) as "exact" | "like";
  const value = key.substring(colonIndex + 1);
  return { value, type };
}

function filterValueToOption(fv: FilterValue): MultiFilterOption {
  return {
    label: fv.value,
    value: toCompositeKey(fv),
    type: fv.type === "like" ? "substr" : "exact",
  };
}

function optionToFilterValue(opt: MultiFilterOption): FilterValue {
  return fromCompositeKey(opt.value);
}

interface MultiFilterProps {
  label: string;
  name: string;
  options?: MultiFilterOption[];
  values?: FilterValue[];
  placeholder?: string;
  allowSubstr?: boolean;
  onChange?: (val: FilterValue[]) => void;
  onInputChange?: (val: string) => void;
}

export const MultiFilterAsync: Component<MultiFilterProps> = (props) => {
  const [input, setInput] = createSignal<string | undefined>(undefined);
  const [isOpen, setIsOpen] = createSignal(false);

  const selectedCompositeKeys = createMemo(
    () => new Set(props.values?.map(toCompositeKey))
  );
  const optionValuesSet = createMemo(
    () => new Set(props.options?.map((o) => o.value))
  );
  const selectedOptions = createMemo<MultiFilterOption[]>(
    () => props.values?.map(filterValueToOption) || []
  );

  // snapshot only updates when modal is closed
  const selectedOptionsSnapshot = createMemo<MultiFilterOption[]>((prev) =>
    !isOpen() ? selectedOptions() : prev || []
  );
  const selectedOptionsSnapshotValuesSet = createMemo(
    () => new Set(selectedOptionsSnapshot().map((o) => o.value))
  );

  const options = createMemo<MultiFilterOption[]>(() => {
    const options: MultiFilterOption[] = [];

    if (!input()) {
      options.push(
        ...(selectedOptionsSnapshot() || []),
        ...(props.options?.filter(
          (o) => !selectedOptionsSnapshotValuesSet()?.has(o.value)
        ) || [])
      );
    } else {
      if (props.allowSubstr) {
        const substrFv: FilterValue = { value: input()!, type: "like" };
        options.push(filterValueToOption(substrFv));
      }
      if (props.options) {
        options.push(...props.options);
      }
    }

    return options;
  });

  const value = createMemo((): MultiFilterOption[] => {
    return (
      props.values
        ?.map((fv) => {
          const key = toCompositeKey(fv);
          return options().find((opt) => opt.value === key);
        })
        .filter((opt) => !!opt) || []
    );
  });

  const onInputChange = (v: string) => {
    setInput(v);
    props.onInputChange?.(v);
  };

  const onChange = (values: MultiFilterOption[]) => {
    let selected = selectedOptions();

    // Add newly selected values
    for (const item of values) {
      if (!selectedCompositeKeys().has(item.value)) {
        selected.push(item);
      }
    }

    // remove unselected
    const oldSelectedValuesSet = optionValuesSet().intersection(
      selectedCompositeKeys()
    );
    const newSelectedValuesSet = new Set(values.map((v) => v.value));
    const removedValuesSet =
      oldSelectedValuesSet.difference(newSelectedValuesSet);

    const selectedSubstringValuesSet = new Set(
      options()
        .filter(
          (o) => selectedCompositeKeys().has(o.value) && o.type === "substr"
        )
        .map((o) => o.value)
    );
    const removedSubstringValue =
      selectedSubstringValuesSet.difference(newSelectedValuesSet);

    const removeSet = removedValuesSet.union(removedSubstringValue);
    if (removeSet.size) {
      selected = selected.filter((o) => !removeSet.has(o.value));
    }

    props.onChange?.(selected.map(optionToFilterValue));
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
        optionValue={(v) => v.value}
        optionLabel={(o) => o.label}
        optionTextValue={(o) => o.label}
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
        itemComponent={(props) => {
          return (
            <>
              <Show when={props.item.rawValue.type === "exact"}>
                <Search.Item class="search-item" item={props.item}>
                  <Search.ItemLabel>
                    {props.item.rawValue.label}
                  </Search.ItemLabel>
                  <Combobox.ItemIndicator class="combobox-item-indicator">
                    <TbCheck />
                  </Combobox.ItemIndicator>
                </Search.Item>
              </Show>
              <Show when={props.item.rawValue.type === "substr"}>
                <Search.Item class="search-item" item={props.item}>
                  <Search.ItemLabel>
                    Contains: "{props.item.rawValue.label}"
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
                <Show when={selectedCompositeKeys().size && false}>
                  <span class="mx-2">{selectedCompositeKeys().size}</span>
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
