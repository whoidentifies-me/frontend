import { Component, createSignal, For, Show } from "solid-js";
import { Combobox } from "@kobalte/core/combobox";
import { TbCheck, TbSelector, TbX } from "solid-icons/tb";

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

export const MultiFilter: Component<MultiFilterProps> = (props) => {
  const onChange = (value: any[]) => {
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
  return (
    <Combobox
      multiple
      options={options()}
      placeholder={props.placeholder}
      onChange={(v) => onChange(v)}
      optionValue={(v) => v.value}
      optionLabel={(v) => v.value}
      optionTextValue={(v) => v.label}
      value={value() as any} // any required as it seems there is some strange type inference going on
      name={props.name}
      triggerMode="focus"
      itemComponent={(props) => (
        <Combobox.Item item={props.item} class="combobox-item">
          <Combobox.ItemLabel>{props.item.rawValue.label}</Combobox.ItemLabel>
          <Combobox.ItemIndicator class="combobox-item-indicator">
            <TbCheck />
          </Combobox.ItemIndicator>
        </Combobox.Item>
      )}
    >
      <Combobox.Control class="combobox-control" aria-label={props.label}>
        {(state) => (
          <>
            <div>
              <For each={state?.selectedOptions() || []}>
                {(option) => (
                  <span onPointerDown={(e) => e.stopPropagation()}>
                    {(option as MultiFilterOption).label}
                    <button onClick={() => state.remove(option)}>
                      <TbX />
                    </button>
                  </span>
                )}
              </For>
              <Combobox.Input class="combobox-input" />
            </div>
            <Show when={state?.selectedOptions()?.length}>
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={state.clear}
              >
                <TbX />
              </button>
            </Show>
            <Combobox.Trigger class="combobox-trigger">
              <Combobox.Icon class="combobox-icon">
                <TbSelector />
              </Combobox.Icon>
            </Combobox.Trigger>
          </>
        )}
      </Combobox.Control>
      <Combobox.Portal>
        <Combobox.Content class="combobox-content">
          <Combobox.Listbox class="combobox-listbox" />
        </Combobox.Content>
      </Combobox.Portal>
    </Combobox>
  );
};
