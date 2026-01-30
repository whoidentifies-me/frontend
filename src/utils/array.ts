export function toArray<T>(value: T | T[] | null | undefined): T[] {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

export function toArrayOrNull<T>(
  value: T | T[] | null | undefined
): T[] | null {
  if (value == null) return null;
  if (Array.isArray(value)) {
    return value.length > 0 ? value : null;
  }
  return [value];
}
