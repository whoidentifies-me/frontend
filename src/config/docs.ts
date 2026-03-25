const DOCS_BASE =
  "https://github.com/whoidentifies-me/help/blob/main/README.md";

export const docsLinks = {
  help: DOCS_BASE,
  digitalIdentity: `${DOCS_BASE}#digital-identity`,
  eudiWallet: `${DOCS_BASE}#the-european-digital-identity-wallet-eudi-wallet`,
  relyingParty: `${DOCS_BASE}#relying-party`,
  roles: `${DOCS_BASE}#roles`,
  roleServiceProvider: `${DOCS_BASE}#role-service-provider`,
  roleIssueTrustedAttributes: `${DOCS_BASE}#role-issue-trusted-attributes`,
  roleIssueAttributes: `${DOCS_BASE}#role-issue-attributes`,
  roleIssueAttributesFromPublicSources: `${DOCS_BASE}#role-issue-attributes-from-public-sources`,
  roleIssueDigitalIdentities: `${DOCS_BASE}#role-issue-digital-identities`,
  roleIssueSeals: `${DOCS_BASE}#role-issue-seals-companies`,
  roleIssueSignatures: `${DOCS_BASE}#role-issue-signatures-people`,
  roleIssueRemoteSeals: `${DOCS_BASE}#role-issue-remote-seals-companies`,
  roleIssueRemoteSignatures: `${DOCS_BASE}#role-issue-remote-signatures-people`,
  roleIssueRemoteSealsAndSignatures: `${DOCS_BASE}#role-issue-remote-seals--signatures`,
  providerType: `${DOCS_BASE}#provider-type`,
  providerTypeServiceProvider: `${DOCS_BASE}#provider-type-service-provider`,
  providerTypeIdentityProvider: `${DOCS_BASE}#provider-type-identity-provider`,
  providerTypePublicAttributeProvider: `${DOCS_BASE}#provider-type-public-attribute-provider`,
  providerTypeWalletProvider: `${DOCS_BASE}#provider-type-wallet-provider`,
  providerTypeRelyingPartyRegisterProvider: `${DOCS_BASE}#provider-type-relying-party-register-provider`,
  providerTypeAccessCertificateProvider: `${DOCS_BASE}#provider-type-access-certificate-provider`,
} as const;
