import { Component, For, Show } from "solid-js";
import { Combobox } from "@kobalte/core/combobox";
import { TbCheck, TbSelector, TbX } from "solid-icons/tb";

interface MultiFilterOption {
  value: string;
  label: string;
}

interface MultiFilterProps {
  label: string;
  options: MultiFilterOption[];
  values?: string[];
  placeholder?: string;
  onChange?: (val: string[]) => void;
}

export const MultiFilter: Component<MultiFilterProps> = (props) => {
  return (
    <Combobox
      options={props.options}
      placeholder={props.placeholder}
      multiple
      optionValue="value"
      optionLabel="label"
      optionTextValue="label"
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
