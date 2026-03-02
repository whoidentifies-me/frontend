export const routes = {
  home: "/",
  search: {
    index: "/search",
    relyingParties: "/search/relying-parties",
    intendedUses: "/search/intended-uses",
  },
  rp: (id: string) => `/rp/${id}`,
  intendedUse: (wrpId: string, useId: string) =>
    `/rp/${wrpId}#intended_use_${useId.substring(0, 8)}`,
} as const;
