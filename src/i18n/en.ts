export const en = {
  navigation: {
    home: "Home",
    explore: "Explore",
    newsletter: "Newsletter",
    faqs: "FAQs",
  },
  page: {
    title: "who identifies me?",
    subtitle:
      "Discover how identity data flows through the EU's digital ecosystem",
    logoAlt: `"Who Identifies Me" logo with a question mark formed from orange fingerprint patterns and dark gray text.`,
  },
  home: {
    newsletter: {
      title: "Newsletter",
      description:
        "Lorem ipsum dolor sit amet consectetur. Diam diam quis eget nisi neque amet maecenas. Lorem ipsum dolor sit amet consectetur.",
    },
    faq: {
      title: "Frequently Asked Questions",
      description:
        "Here you’ll find answers to the most common questions about our project. We’ve collected the key information in one place to make things easy for you. If you’re still unsure about something, feel free to reach out — we’re happy to help.",
      items: [
        {
          title: "Lorem ipsum dolor sit amet?",
          body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est.",
        },
        {
          title: "Lorem ipsum dolor sit amet?",
          body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est.",
        },
        {
          title: "Lorem ipsum dolor sit amet?",
          body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est.",
        },
        {
          title: "Lorem ipsum dolor sit amet?",
          body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est.",
        },
      ],
    },
  },
  countries: {
    AT: "Austria",
    BE: "Belgium",
    BG: "Bulgaria",
    HR: "Croatia",
    CY: "Cyprus",
    CZ: "Czechia",
    DK: "Denmark",
    EE: "Estonia",
    FI: "Finland",
    FR: "France",
    DE: "Germany",
    GR: "Greece",
    HU: "Hungary",
    IE: "Ireland",
    IT: "Italy",
    LV: "Latvia",
    LT: "Lithuania",
    LU: "Luxembourg",
    MT: "Malta",
    NL: "Netherlands",
    PL: "Poland",
    PT: "Portugal",
    RO: "Romania",
    SK: "Slovakia",
    SI: "Slovenia",
    ES: "Spain",
    SE: "Sweden",
  },
  filters: {
    labels: {
      q: "Search",
      trade_name: "Company Name",
      purpose: "Requested Information Purpose",
      claim_path: "Requested Information",
      country: "Country",
      is_psb: "Public or Private Entity",
      is_intermediary: "Is Intermediary",
      uses_intermediary: "Uses Intermediaries",
      entitlement: "Permissions",
    },
    placeholders: {
      q: "Search for Relying Party or Use Cases",
      trade_name: "Enter company name...",
      purpose: "Select purpose...",
      claim_path: "Enter requested information URI...",
      country: "Select country...",
      entitlement: "Enter permission URI...",
    },
    values: {
      is_psb: {
        true: "Public",
        false: "Private",
        all: "All",
      },
      is_intermediary: {
        true: "Is Intermediary",
        false: "Is Not Intermediary",
        all: "All",
      },
      uses_intermediary: {
        true: "Uses Intermediaries",
        false: "Does Not Use Intermediaries",
        all: "All",
      },
    },
  },
  components: {
    newsletter: {
      label: "Enter your Email",
      placeholder: "Enter your Email",
      subscribeBtn: "Subscribe",
    },
  },
} as const;

export type CountryCode = keyof typeof en.countries;
