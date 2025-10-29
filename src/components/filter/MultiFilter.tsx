import { Component, createMemo, createSignal } from "solid-js";
import { Select } from "@thisbeyond/solid-select";
import "@thisbeyond/solid-select/style.css";

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
  const [seleced, setSelected] = createSignal<string[]>([]);
  const options = createMemo(() => {
    const s = seleced();
    return props.options.filter((o) => s.indexOf(o.value) === -1);
  });
  const onChange = (values: MultiFilterOption[]) => {
    setSelected(values.map((o) => o.value));
    console.log(values);
  };
  return (
    <div>
      <label for="wim-multi-select">{props.label}</label>
      <Select
        multiple
        id="wim-multi-select"
        placeholder={props.placeholder || props.label}
        onChange={onChange}
        options={options}
        format={(opt: MultiFilterOption) => opt.label}
      ></Select>
    </div>
  );
};
