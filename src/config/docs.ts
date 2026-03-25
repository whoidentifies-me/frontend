const DOCS_BASE =
  "https://github.com/whoidentifies-me/help/blob/main/README.md";

export const docsLinks = {
  help: DOCS_BASE,
  digitalIdentity: `${DOCS_BASE}#digital-identity`,
  eudiWallet: `${DOCS_BASE}#the-european-digital-identity-wallet-eudi-wallet`,
} as const;
