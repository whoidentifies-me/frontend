import {
  TbOutlineDatabasePlus,
  TbOutlineWallet,
  TbOutlineUserCircle,
  TbOutlineGolf,
  TbOutlineSettingsUp,
  TbOutlineBuildingBroadcastTower,
} from "solid-icons/tb";
import { JSX } from "solid-js";
import { docsLinks } from "~/config/docs";

export interface ProviderType {
  name: string;
  helpURL?: string;
  icon: () => JSX.Element;
}

export const providerTypes: Record<string, ProviderType> = {
  WRPRegistrar: {
    name: "Relying Party Register",
    helpURL: docsLinks.providerTypeRelyingPartyRegisterProvider,
    icon: () => <TbOutlineDatabasePlus />,
  },
  WalletProvider: {
    name: "Wallet Provider",
    helpURL: docsLinks.providerTypeWalletProvider,
    icon: () => <TbOutlineWallet />,
  },
  PIDProvider: {
    name: "Identity Provider",
    helpURL: docsLinks.providerTypeIdentityProvider,
    icon: () => <TbOutlineUserCircle />,
  },
  PubEEAProvider: {
    name: "Public Attribute Provider",
    helpURL: docsLinks.providerTypePublicAttributeProvider,
    icon: () => <TbOutlineGolf />,
  },
  WRPAccCertProvider: {
    name: "Access Certificate Provider",
    helpURL: docsLinks.providerTypeAccessCertificateProvider,
    icon: () => <TbOutlineSettingsUp />,
  },
  WalletRelyingParty: {
    name: "Service Provider",
    helpURL: docsLinks.providerTypeServiceProvider,
    icon: () => <TbOutlineBuildingBroadcastTower />,
  },
};

export function getProviderType(
  key: string | undefined
): ProviderType | undefined {
  if (!key) return undefined;
  return providerTypes[key];
}
