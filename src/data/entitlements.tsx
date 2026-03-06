import {
  TbOutlineBuildingStore,
  TbOutlineUserCheck,
  TbOutlineUserPlus,
  TbOutlineUserShield,
  TbOutlineUserScan,
  TbOutlineRubberStamp,
} from "solid-icons/tb";
import { JSX } from "solid-js";

export interface Entitlement {
  uri: string;
  shortDescription: string;
  icon: () => JSX.Element;
}

export const entitlements: Entitlement[] = [
  {
    uri: "https://uri.etsi.org/19475/Entitlement/Service_Provider",
    shortDescription: "Service Provider",
    icon: () => <TbOutlineBuildingStore />,
  },
  {
    uri: "https://uri.etsi.org/19475/Entitlement/QEAA_Provider",
    shortDescription: "Issue trusted Attributes",
    icon: () => <TbOutlineUserCheck />,
  },
  {
    uri: "https://uri.etsi.org/19475/Entitlement/Non_Q_EAA_Provider",
    shortDescription: "Issue Attributes",
    icon: () => <TbOutlineUserPlus />,
  },
  {
    uri: "https://uri.etsi.org/19475/Entitlement/PUB_EAA_Provider",
    shortDescription: "Issue Attributes from public Sources",
    icon: () => <TbOutlineUserShield />,
  },
  {
    uri: "https://uri.etsi.org/19475/Entitlement/PID_Provider",
    shortDescription: "Issue Digital Identities",
    icon: () => <TbOutlineUserScan />,
  },
  {
    uri: "https://uri.etsi.org/19475/Entitlement/QCert_for_ESeal_Provider",
    shortDescription: "Issue Seals (companies)",
    icon: () => <TbOutlineRubberStamp />,
  },
  {
    uri: "https://uri.etsi.org/19475/Entitlement/QCert_for_ESig_Provider",
    shortDescription: "Issue Signatures (people)",
    icon: () => <TbOutlineRubberStamp />,
  },
  {
    uri: "https://uri.etsi.org/19475/Entitlement/rQSealCDs_Provider",
    shortDescription: "Issue remote Seals (companies)",
    icon: () => <TbOutlineRubberStamp />,
  },
  {
    uri: "https://uri.etsi.org/19475/Entitlement/rQSigCDs_Provider",
    shortDescription: "Issue remote Signatures (people)",
    icon: () => <TbOutlineRubberStamp />,
  },
  {
    uri: "https://uri.etsi.org/19475/Entitlement/ESig_ESeal_Creation_Provider",
    shortDescription: "Issue remote Seals & Signatures",
    icon: () => <TbOutlineRubberStamp />,
  },
];

const entitlementsMap = new Map<string, Entitlement>(
  entitlements.map((e) => [e.uri, e])
);

export function getEntitlement(uri: string): Entitlement | undefined {
  return entitlementsMap.get(uri);
}
