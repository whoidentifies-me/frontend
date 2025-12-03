export const newsletterConfig = {
  // Dialog-Mail configuration - can be overridden via environment variables
  endpoint:
    import.meta.env.VITE_NEWSLETTER_ENDPOINT ||
    "https://secure.dialog-mail.com/s/6U6yH",
  groupId: import.meta.env.VITE_NEWSLETTER_GROUP_ID || "gruppe_82859",
} as const;

export type NewsletterConfig = typeof newsletterConfig;
