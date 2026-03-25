export const routes = {
  home: "/",
  sections: {
    explore: "/#explore",
    newsletter: "/#newsletter",
    status: "/#status",
    how: "/#how",
    help: "/#help",
  },
  search: {
    index: "/search",
    filters: "/search#filters",
    results: "/search#results",
    relyingParties: "/search/relying-parties",
    intendedUses: "/search/intended-uses",
  },
  rp: (id: string) => `/rp/${id}`,
  intendedUse: (wrpId: string, useId: string) => `/rp/${wrpId}?use=${useId}`,
} as const;
