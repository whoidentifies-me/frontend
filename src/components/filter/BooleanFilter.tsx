import { Component } from "solid-js";

interface BooleanFilterProps {
  label: string;
  name: string;
  value?: boolean;
  onChange: (val?: boolean) => void;
  trueLabel?: string;
  falseLabel?: string;
  allLabel?: string;
}

export const BooleanFilter: Component<BooleanFilterProps> = (props) => {
  const trueLabel = () => props.trueLabel || "Yes";
  const falseLabel = () => props.falseLabel || "No";
  const allLabel = () => props.allLabel || "All";

  const currentValue = () => {
    if (props.value === true) return "true";
    if (props.value === false) return "false";
    return "";
  };

  const handleChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;

    if (target.value === "true") {
      props.onChange(true);
    } else if (target.value === "false") {
      props.onChange(false);
    } else {
      props.onChange(undefined);
    }
  };

  const id = () => `bool-select-${props.name}`;

  return (
    <div class="flex flex-col items-stretch justify-end text-start">
      <label for={id()}>{props.label}</label>
      <select
        id={id()}
        name={props.name}
        value={currentValue()}
        onChange={handleChange}
      >
        <option value="" selected={currentValue() === ""}>
          {allLabel()}
        </option>
        <option value="true" selected={currentValue() === "true"}>
          {trueLabel()}
        </option>
        <option value="false" selected={currentValue() === "false"}>
          {falseLabel()}
        </option>
      </select>
    </div>
  );
};
