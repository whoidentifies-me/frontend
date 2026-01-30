export const booleanToStringLiteral = (value?: boolean) => {
  if (value === true) return "true" as const;
  if (value === false) return "false" as const;
  return undefined;
};

export const stringLiteralToBoolean = (value?: "true" | "false") => {
  if (typeof value === "boolean") return value as boolean;
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
};
