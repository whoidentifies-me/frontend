const raw = import.meta.env.VITE_EXPLORE_RP_IDS;

const ids = raw
  ? raw
      .split(",")
      .map((id) => id.trim())
      .filter((id) => !!id)
  : undefined;

export const exploreConfig = {
  rpIds: ids && ids.length > 0 ? ids : undefined,
} as const;
