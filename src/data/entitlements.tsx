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
  name: string;
  url?: string;
  icon: () => JSX.Element;
}

export const entitlements: Record<string, Entitlement> = {
  "https://uri.etsi.org/19475/Entitlement/Service_Provider": {
    name: "Service Provider",
    icon: () => <TbOutlineBuildingStore />,
  },
  "https://uri.etsi.org/19475/Entitlement/QEAA_Provider": {
    name: "Issue trusted Attributes",
    icon: () => <TbOutlineUserCheck />,
  },
  "https://uri.etsi.org/19475/Entitlement/Non_Q_EAA_Provider": {
    name: "Issue Attributes",
    icon: () => <TbOutlineUserPlus />,
  },
  "https://uri.etsi.org/19475/Entitlement/PUB_EAA_Provider": {
    name: "Issue Attributes from public Sources",
    icon: () => <TbOutlineUserShield />,
  },
  "https://uri.etsi.org/19475/Entitlement/PID_Provider": {
    name: "Issue Digital Identities",
    icon: () => <TbOutlineUserScan />,
  },
  "https://uri.etsi.org/19475/Entitlement/QCert_for_ESeal_Provider": {
    name: "Issue Seals (companies)",
    icon: () => <TbOutlineRubberStamp />,
  },
  "https://uri.etsi.org/19475/Entitlement/QCert_for_ESig_Provider": {
    name: "Issue Signatures (people)",
    icon: () => <TbOutlineRubberStamp />,
  },
  "https://uri.etsi.org/19475/Entitlement/rQSealCDs_Provider": {
    name: "Issue remote Seals (companies)",
    icon: () => <TbOutlineRubberStamp />,
  },
  "https://uri.etsi.org/19475/Entitlement/rQSigCDs_Provider": {
    name: "Issue remote Signatures (people)",
    icon: () => <TbOutlineRubberStamp />,
  },
  "https://uri.etsi.org/19475/Entitlement/ESig_ESeal_Creation_Provider": {
    name: "Issue remote Seals & Signatures",
    icon: () => <TbOutlineRubberStamp />,
  },
};
