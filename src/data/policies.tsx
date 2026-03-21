import {
  TbOutlineShieldLock,
  TbOutlineLicense,
  TbOutlineFileTextShield,
  TbOutlineLockSquareRounded,
  TbOutlineApps,
} from "solid-icons/tb";
import { JSX } from "solid-js";

export interface Policy {
  name: string;
  icon: () => JSX.Element;
}

export const policies: Record<string, Policy> = {
  "https://data.europa.eu/eudi/policy/trust-service-practice-statement": {
    name: "Security Statement of Trust Service Provider",
    icon: () => <TbOutlineShieldLock />,
  },
  "http://data.europa.eu/eudi/policy/terms-and-conditions": {
    name: "Terms and Conditions",
    icon: () => <TbOutlineLicense />,
  },
  "http://data.europa.eu/eudi/policy/privacy-statement": {
    name: "Privacy Statement (external)",
    icon: () => <TbOutlineFileTextShield />,
  },
  "http://data.europa.eu/eudi/policy/privacy-policy": {
    name: "Privacy Policy (internal)",
    icon: () => <TbOutlineLockSquareRounded />,
  },
  "http://data.europa.eu/eudi/policy/registration-policy": {
    name: "Relying Party Registration Policy",
    icon: () => <TbOutlineApps />,
  },
};

export const getPolicy = (uri?: string): Policy | undefined =>
  uri ? policies[uri] : undefined;
