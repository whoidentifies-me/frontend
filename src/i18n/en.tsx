import { ExternalLink } from "~/components/ExternalLink";
import { JSX } from "solid-js";
import { A } from "@solidjs/router";
import { routes } from "~/config/routes";

export const en = {
  navigation: {
    home: "Home",
    explore: "Explore",
    newsletter: "Status",
    howItWorks: "How",
    help: "Help",
  },
  page: {
    title: "Who identifies me?",
    subtitle:
      "Discover how personal data flows through the EU's digital identity ecosystem",
    logoAlt: `Who Identifies Me logo`,
  },
  home: {
    explore: {
      title: "Explore",
      description: () => (
        <>
          <p>
            People are increasingly asked to identify themselves online. We
            created this website to make it easy for everyone to see who is
            requesting which personal information and for what purpose. Every
            company and public authority using the upcoming EU Identity Wallet
            will be listed here.
          </p>
          <p>
            This is currently a prototype. We plan to launch the full version by
            the end of 2026.{" "}
            <A href={routes.sections.how}>Learn how it works</A>
          </p>
        </>
      ),
    },
    newsletter: {
      title: "Stay tuned",
      description: () => (
        <>
          Subscribe to updates from{" "}
          <ExternalLink href="https://epicenter.works/en">
            epicenter.works
          </ExternalLink>{" "}
          about our work on digital identity and other important issues.
        </>
      ),
    },
    status: {
      title: "Status",
      mapAria:
        "Map of Europe showing EUDI Wallet implementation status by country",
      legend: {
        active: "Active",
        pending: "Pending",
        inactive: "Not yet active",
      },
      timeline: [
        {
          date: "11 April 2024",
          label: "eIDAS Regulation adopted",
          completed: true,
        },
        {
          date: "December 2026",
          label: "Each EU Member State must provide at least one EUDI Wallet",
          completed: false,
        },
        {
          date: "December 2027",
          label: "Major private service providers must accept the EUDI Wallet",
          completed: false,
        },
      ] as { date: string; label: string; completed: boolean }[],
      mapAttribution: () => (
        <>
          Map data ©{" "}
          <ExternalLink href="https://simplemaps.com/resources/svg-europe">
            simplemaps.com
          </ExternalLink>
        </>
      ),
      description: () => (
        <>
          This prototype uses test data, with the exception of Austria.{" "}
          <ExternalLink href="https://eidas.ec.europa.eu/efda/wallet/lists-of-trusted-entities/registrars-registers">
            Currently
          </ExternalLink>
          , no EU member state has launched their EUDI Wallet ecosystem. We
          obtained a snapshot of the Austrian eID ecosystem through FOIA
          requests (
          <ExternalLink href="https://fragdenstaat.at/anfrage/id-austria-service-provider/">
            1
          </ExternalLink>
          ,&#32;
          <ExternalLink href="https://fragdenstaat.at/anfrage/id-austria-service-provider-privatwirtschaft/">
            2
          </ExternalLink>
          ). If you have further information, tips, leaks, or are interested in
          collaborating, we would be glad to{" "}
          <a href="mailto:team@epicenter.works">hear from you</a>.
        </>
      ),
    },
    about: {
      title: "About this project",
      intro: () => (
        <>
          This project is run by the non-profit NGO{" "}
          <ExternalLink href="http://epicenter.works">
            epicenter.works
          </ExternalLink>
          . We've been working on the topic of Digital Identity since 2017 and
          have provided critical feedback to the eIDAS reform since 2021. Help
          us create oversight over the digital identity ecosystem by{" "}
          <ExternalLink href="https://spenden.epicenter.works/">
            donating to us
          </ExternalLink>{" "}
          or{" "}
          <ExternalLink href="http://support.epicenter.works/">
            becoming a supporting member
          </ExternalLink>
          .
        </>
      ),
      collaborate: () => (
        <>
          If you would like to become a partner in this project or use it for
          your own work, please{" "}
          <a href="mailto:team@epicenter.works">reach out to us</a>. We organize
          workshops with the community to help guide its development.{" "}
          <A href={routes.sections.newsletter}>Join the newsletter</A> to stay
          up to date.
        </>
      ),
      thanks:
        "We would like to thank the philanthropic organisations that funded the original development of this tool.",
      logos: {
        netidee: "Netidee.at",
        codevelop: "Co-develop",
        filecoin: "Filecoin Foundation",
        idpi: "Initiative for Digital Public Interest",
      },
    },
    howItWorks: {
      title: "How does it work?",
      items: [
        {
          title: "What is this project?",
          body: "Digital identity is set to become a central part of everyday life in Europe with the rollout of the European Digital Identity Wallet (EUDI Wallet) under the eIDAS Regulation. While this development promises easier cross-border access to public and private services, it also raises a crucial question: who is requesting our personal data, for what purpose, and on what scale? Whoidentifies.me addresses this transparency gap by making the eIDAS ecosystem visible and understandable for everyone. As an open-data platform, it reveals which companies and public authorities rely on digital identity systems, what types of data they request, and how that data is used across all EU Member States. By compiling fragmented information into a searchable, comparable database, Whoidentifies.me acts as an early warning system for digital fundamental rights. The platform empowers citizens, civil society, researchers, and policymakers to identify risks, prevent abuse, and shape a fair, rights-based digital identity future.",
        },
        {
          title: "How do you get the data?",
          body: (
            <>
              EU member states are legally required to register every private
              company or public entity that wants to interact with the Wallet
              and ask information from it. They must also provide an API for
              this registry, which we are scraping and consolidating on EU
              level. Since relying parties can request data across borders, we
              believe full EU-wide transparency is essential.
              <p />
              The eIDAS ecosystem is scheduled to launch by the end of 2026, but{" "}
              <ExternalLink href="https://www.signicat.com/blog/eudi-wallets-only-one-year-to-launch">
                not all member states will meet this deadline
              </ExternalLink>
              . We are preparing in advance and will incorporate all available
              datasets as they become accessible.
            </>
          ),
        },
        {
          title: "What can I do here?",
          body: (
            <>
              You can explore the entire digital identity ecosystem in Europe.
              We provide real-time access as well as historical data up to 10
              years back. Watchdogs and interested users can receive alerts
              about developments tailored to their interests.
              <p />
              Our goal is to make it as easy as possible to identify potential
              cases of over-identification or excessive data requests.
              Transparency helps expose bad actors and enables a fact driven
              debate on the societal impacts of digital identity on our society.
            </>
          ),
        },
        {
          title: "How do you finance this project?",
          body: (
            <>
              Our organisation has been working on digital identity since 2017.
              You can find all our submissions in these years online. Until very
              recently we did this work purely financed by individual small
              donations. This particular project did get funding for a prototype
              and pilot from several donors. We would like to thank{" "}
              <ExternalLink href="https://www.netidee.at/">
                Netidee.at
              </ExternalLink>
              ,{" "}
              <ExternalLink href="https://www.codevelop.fund/">
                Co-develop
              </ExternalLink>
              ,{" "}
              <ExternalLink href="https://fil.org/">
                Filecoin Foundation
              </ExternalLink>{" "}
              and{" "}
              <ExternalLink href="https://digitalpublicinterest.org/about-us/">
                Initiative for Digital Public Interest
              </ExternalLink>{" "}
              for their support.
            </>
          ),
        },
        {
          title:
            "How can I find out which organisations may request my data via the Wallet?",
          body: "The Wallet provides a dashboard with a complete transaction log. Every requested information has to be listed there, including requests that were rejected. You can view the requested and transmitted data, along with details about the relying party and the purpose of their request. This information can be cross-checked against the full registry available on this website.",
        },
        {
          title:
            "What does it mean that Whoidentifies.me acts as an early warning system?",
          body: "By providing a complete overview of the entire ecosystem, we can identify outliers and trends across borders and company types. Usually, a problem only comes to light once users have been affected and filed complaints with the relevant authorities, who then have to piece together what happened before initiating consequences or a public debate. We shortcut this process by enabling discussion as soon as a bad actor registers a potentially harmful use case.",
        },
        {
          title:
            "How does the platform support organisations working with vulnerable groups?",
          body: "Our aim is to be a helpful tool for the work of others. Organisations representing consumers, minorities, marginalised groups or disaffected people can create alerts tailored to their work focus areas, enabling many watchful eyes to spot problems in the eIDAS ecosystem early on.",
        },
        {
          title: "How can NGOs, researchers, or citizens contribute feedback?",
          body: "Please reach out to us and become part of the community. We are always looking for testers for new features, researchers diving deep into the data and new ideas. As a donation-funded NGO we have limited capacities and part of our team consists of volunteers, but we believe we are stronger together.",
        },
      ] as { title: string; body: string | JSX.Element }[],
    },
  },
  searchResults: {
    all: "All",
    relyingParties: "Relying Parties",
    intendedUses: "Use Cases",
  },
  relyingParties: {
    public: "Public Sector",
    nonPublic: "Company",
    intermediary: "Intermediary",
    isIntermediary: "Is Intermediary",
    usesIntermediaries: "Uses Intermediaries:",
    providerTypes: {
      WRPRegistrar: "Relying Party Register",
      WalletProvider: "Wallet Provider",
      PIDProvider: "Identity Provider",
      PubEEAProvider: "Public Attribute Provider",
      WRPAccCertProvider: "Access Certificate Provider",
      WalletRelyingParty: "Service Provider",
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
      trade_name: "Service Provider Name",
      purpose: "Purpose",
      claim_path: "Requested Information",
      country: "Country",
      is_psb: "Public or Private Entity",
      is_intermediary: "Is Intermediary",
      uses_intermediary: "Uses Intermediaries",
      entitlement: "Roles",
    },
    clear_all: "Clear all filters",
    placeholders: {
      q: "Search for Companies, Government Agencies or Use Cases",
      trade_name: "Enter company name...",
      purpose: "Select purpose...",
      claim_path: "Enter requested information URI...",
      country: "Select country...",
      entitlement: "Enter role Name/URI...",
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
  relyingPartyDetails: {
    backToResults: "Back to results",
    website: "Website",
    relyingPartyDescription: {
      title: "Company Description",
    },
    contact: {
      title: "Contact & Support",
      email: "Email",
      phone: "Phone",
      support: "Support",
      identifiers: "Identifiers",
      postalAddress: "Postal Address",
    },
    entitlements: {
      title: "Roles",
      description: undefined,
    },
    intendedUses: {
      title: "Use Cases",
      description: undefined,
      policies: "Policies",
      useCaseX: (number: number) => `Use Case ${number}`,
    },
    supervisoryAuthority: {
      title: "Responsible Regulator",
      country: "Country",
      postalAddress: "Postal Address",
      email: "Email",
      phone: "Phone",
      infoUri: "Info",
    },
  },
  components: {
    newsletter: {
      label: "Enter your Email",
      placeholder: "Enter your Email",
      subscribeBtn: "Subscribe",
    },
    generic: {
      details: "Details",
      viewMore: "View more",
      loadMore: "Load more",
      noResults: "No results",
      contains: "Contains:",
    },
    searchAndFilter: {
      search: "Search",
    },
  },
};

export type CountryCode = keyof typeof en.countries;
