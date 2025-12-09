import { Component, createMemo, createSignal, Show } from "solid-js";
import { Combobox } from "@kobalte/core/combobox";
import { TbCheck, TbX } from "solid-icons/tb";
import { Search } from "@kobalte/core/search";

export interface MultiFilterOption {
  value: string;
  label: string;
  type: "exact" | "substr";
}

function toOption(value: string): MultiFilterOption {
  if (value.startsWith("%") && value.endsWith("%")) {
    return {
      label: value.substring(1, value.length - 1),
      value,
      type: "substr",
    };
  }
  return {
    label: value,
    value,
    type: "exact",
  };
}

interface MultiFilterProps {
  label: string;
  name: string;
  options?: MultiFilterOption[];
  values?: string[];
  placeholder?: string;
  allowSubstr?: boolean;
  onChange?: (val: string[]) => void;
  onInputChange?: (val: string) => void;
}

export const MultiFilterAsync: Component<MultiFilterProps> = (props) => {
  const [input, setInput] = createSignal<string | undefined>(undefined);
  const [isOpen, setIsOpen] = createSignal(false);

  const selectedValuesSet = createMemo(() => new Set(props.values));
  const optionValuesSet = createMemo(
    () => new Set(props.options?.map((o) => o.value))
  );
  const selectedOptions = createMemo<MultiFilterOption[]>(
    () => props.values?.map((v) => toOption(v)) || []
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
        options.push(toOption(`%${input()}%`));
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
        ?.map((val) => options().find((opt) => opt.value === val))
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
      if (!selectedValuesSet().has(item.value)) {
        selected.push(item);
      }
    }

    // remove unselected
    const oldSelectedValuesSet =
      optionValuesSet().intersection(selectedValuesSet());
    const newSelectedValuesSet = new Set(values.map((v) => v.value));
    const removedValuesSet =
      oldSelectedValuesSet.difference(newSelectedValuesSet);

    const selectedSubstringValuesSet = new Set(
      options()
        .filter((o) => selectedValuesSet().has(o.value) && o.type === "substr")
        .map((o) => o.value)
    );
    const removedSubstringValue =
      selectedSubstringValuesSet.difference(newSelectedValuesSet);

    const removeSet = removedValuesSet.union(removedSubstringValue);
    if (removeSet.size) {
      selected = selected.filter((o) => !removeSet.has(o.value));
    }

    console.log(
      "updated selected",
      selectedOptions(),
      oldSelectedValuesSet,
      removeSet
    );

    props.onChange?.(selected.map((v) => v.value));
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
                <Search.Item
                  onSelect={console.log}
                  class="search-item"
                  item={props.item}
                >
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
              <Search.Input class="select" id={id()}></Search.Input>
              <div class="flex flex-row items-center">
                <Show when={selectedValuesSet().size && false}>
                  <span class="mx-2">{selectedValuesSet().size}</span>
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
