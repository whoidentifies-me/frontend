import {
  TbOutlineUserCheck,
  TbOutlineUserPlus,
  TbOutlineUserShield,
  TbOutlineUserScan,
  TbOutlineRubberStamp,
  TbOutlineBuildingBroadcastTower,
} from "solid-icons/tb";
import { JSX } from "solid-js";
import { docsLinks } from "~/config/docs";

export interface Entitlement {
  name: string;
  entitlementURI?: string;
  helpURL?: string;
  icon: () => JSX.Element;
}

export const entitlements: Record<string, Entitlement> = {
  "https://uri.etsi.org/19475/Entitlement/Service_Provider": {
    name: "Service Provider",
    helpURL: docsLinks.roleServiceProvider,
    icon: () => <TbOutlineBuildingBroadcastTower />,
  },
  "https://uri.etsi.org/19475/Entitlement/QEAA_Provider": {
    name: "Issue trusted Attributes",
    helpURL: docsLinks.roleIssueTrustedAttributes,
    icon: () => <TbOutlineUserCheck />,
  },
  "https://uri.etsi.org/19475/Entitlement/Non_Q_EAA_Provider": {
    name: "Issue Attributes",
    helpURL: docsLinks.roleIssueAttributes,
    icon: () => <TbOutlineUserPlus />,
  },
  "https://uri.etsi.org/19475/Entitlement/PUB_EAA_Provider": {
    name: "Issue Attributes from public Sources",
    helpURL: docsLinks.roleIssueAttributesFromPublicSources,
    icon: () => <TbOutlineUserShield />,
  },
  "https://uri.etsi.org/19475/Entitlement/PID_Provider": {
    name: "Issue Digital Identities",
    helpURL: docsLinks.roleIssueDigitalIdentities,
    icon: () => <TbOutlineUserScan />,
  },
  "https://uri.etsi.org/19475/Entitlement/QCert_for_ESeal_Provider": {
    name: "Issue Seals (companies)",
    helpURL: docsLinks.roleIssueSeals,
    icon: () => <TbOutlineRubberStamp />,
  },
  "https://uri.etsi.org/19475/Entitlement/QCert_for_ESig_Provider": {
    name: "Issue Signatures (people)",
    helpURL: docsLinks.roleIssueSignatures,
    icon: () => <TbOutlineRubberStamp />,
  },
  "https://uri.etsi.org/19475/Entitlement/rQSealCDs_Provider": {
    name: "Issue remote Seals (companies)",
    helpURL: docsLinks.roleIssueRemoteSeals,
    icon: () => <TbOutlineRubberStamp />,
  },
  "https://uri.etsi.org/19475/Entitlement/rQSigCDs_Provider": {
    name: "Issue remote Signatures (people)",
    helpURL: docsLinks.roleIssueRemoteSignatures,
    icon: () => <TbOutlineRubberStamp />,
  },
  "https://uri.etsi.org/19475/Entitlement/ESig_ESeal_Creation_Provider": {
    name: "Issue remote Seals & Signatures",
    helpURL: docsLinks.roleIssueRemoteSealsAndSignatures,
    icon: () => <TbOutlineRubberStamp />,
  },
};
