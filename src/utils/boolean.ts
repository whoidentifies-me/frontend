export const booleanToStringLiteral = (
  value?: boolean
): "true" | "false" | undefined => {
  if (value === true) return "true" as const;
  if (value === false) return "false" as const;
  return undefined;
};

export const stringLiteralToBoolean = (
  value?: string | boolean
): boolean | undefined => {
  if (typeof value === "boolean") return value as boolean;
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
};
