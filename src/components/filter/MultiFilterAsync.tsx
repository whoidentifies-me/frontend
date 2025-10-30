import { Component, Show } from "solid-js";
import { Combobox } from "@kobalte/core/combobox";
import { TbCheck, TbX } from "solid-icons/tb";
import { Search } from "@kobalte/core/search";

export interface MultiFilterOption {
  value: string;
  label: string;
  type: "exact" | "substr";
}

interface MultiFilterProps {
  label: string;
  name: string;
  options?: MultiFilterOption[];
  values?: string | string[];
  placeholder?: string;
  onChange?: (val: string[]) => void;
  onInputChange?: (val: string) => void;
}

export const MultiFilterAsync: Component<MultiFilterProps> = (props) => {
  const onChange = (value: any[]) => {
    console.log("change", value);
    if (props.onChange) {
      props.onChange(value.map((v) => v.value));
    }
  };
  const options = () => props.options || [];
  const value = (): MultiFilterOption[] => {
    if (!props.values) {
      return [];
    }
    const input = Array.isArray(props.values) ? props.values : [props.values];
    return input
      .map((val) => props.options?.find((opt) => opt.value === val))
      .filter((opt) => !!opt);
  };
  const onInputChange = (v: string) => {
    console.log("input", v);
    if (props.onInputChange) {
      props.onInputChange(v);
    }
  };
  const id = () => `async-select-${props.name}`;
  return (
    <div class="flex flex-col items-stretch justify-end text-start">
      <label for={id()}>{props.label}</label>
      <Search
        triggerMode="focus"
        options={options()}
        optionValue={(o) => o.value}
        optionLabel={(o) => o.label}
        optionTextValue={(o) => o.label}
        onInputChange={onInputChange}
        onChange={(v) => onChange(v)}
        name={props.name}
        value={value() as any}
        placeholder={props.placeholder}
        multiple
        debounceOptionsMillisecond={300}
        removeOnBackspace={false}
        closeOnSelection={false}
        itemComponent={(props) => {
          return (
            <Search.Item class="search-item" item={props.item}>
              <Search.ItemLabel>{props.item.rawValue.label}</Search.ItemLabel>
              <Combobox.ItemIndicator class="combobox-item-indicator">
                <TbCheck />
              </Combobox.ItemIndicator>
            </Search.Item>
          );
        }}
      >
        <Search.Control class="search-control" aria-label={props.label}>
          {(state) => (
            <>
              <Search.Input class="search-input" id={id()}></Search.Input>
              <div class="flex flex-row items-center">
                <Show when={state?.selectedOptions()?.length}>
                  <span class="mx-2">{state?.selectedOptions()?.length}</span>
                  <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={state.clear}
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
