import { Component } from "solid-js";

interface BooleanFilterProps {
  label: string;
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
    return "all";
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

  return (
    <div class="flex flex-col items-stretch justify-end text-start">
      <label>{props.label}</label>
      <select value={currentValue()} onChange={handleChange}>
        <option value="all">{allLabel()}</option>
        <option value="true">{trueLabel()}</option>
        <option value="false">{falseLabel()}</option>
      </select>
    </div>
  );
};
