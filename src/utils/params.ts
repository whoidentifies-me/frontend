import type {
  ListRelyingPartiesIsPsb,
  ListRelyingPartiesIsIntermediary,
  ListRelyingPartiesUsesIntermediary,
} from "~/api";

export function toBooleanEnum(
  value: string | string[] | undefined
):
  | ListRelyingPartiesIsPsb
  | ListRelyingPartiesIsIntermediary
  | ListRelyingPartiesUsesIntermediary
  | undefined {
  if (Array.isArray(value)) {
    return value[0] === "true"
      ? ("true" as const)
      : value[0] === "false"
        ? ("false" as const)
        : undefined;
  }
  return value === "true"
    ? ("true" as const)
    : value === "false"
      ? ("false" as const)
      : undefined;
}

export function toSingleValue(
  value: string | string[] | undefined
): string | undefined {
  if (Array.isArray(value)) {
    return value.length ? value[0] : undefined;
  }
  return value;
}
