/// <reference types="@solidjs/start/env" />

interface ImportMetaEnv {
  /** Base URL for the API (used in mock handlers) */
  readonly VITE_API_URL?: string;
  /** Enable MSW request mocking when set to any truthy value */
  readonly VITE_MOCK?: string;
  /** Deployment mode (e.g. "stage") — used to set noindex meta tags */
  readonly VITE_MODE?: string;
  /** Dialog-Mail newsletter submission endpoint */
  readonly VITE_NEWSLETTER_ENDPOINT?: string;
  /** Dialog-Mail newsletter group ID */
  readonly VITE_NEWSLETTER_GROUP_ID?: string;
  /** Matomo site ID — Matomo tracking is only enabled when this is set */
  readonly VITE_MATOMO_SITE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  _paq?: Array<unknown[]>;
}

declare module "*&imagetools" {
  const out: string;
  export default out;
}

declare module "country-flag-icons/string/3x2/*" {
  const svg: string;
  export default svg;
}
