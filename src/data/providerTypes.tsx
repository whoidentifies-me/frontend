import {
  TbOutlineDatabasePlus,
  TbOutlineWallet,
  TbOutlineUserCircle,
  TbOutlineGolf,
  TbOutlineSettingsUp,
  TbOutlineBuildingBroadcastTower,
} from "solid-icons/tb";
import { JSX } from "solid-js";

export interface ProviderType {
  name: string;
  icon: () => JSX.Element;
}

export const providerTypes: Record<string, ProviderType> = {
  WRPRegistrar: {
    name: "Relying Party Register",
    icon: () => <TbOutlineDatabasePlus />,
  },
  WalletProvider: {
    name: "Wallet Provider",
    icon: () => <TbOutlineWallet />,
  },
  PIDProvider: {
    name: "Identity Provider",
    icon: () => <TbOutlineUserCircle />,
  },
  PubEEAProvider: {
    name: "Public Attribute Provider",
    icon: () => <TbOutlineGolf />,
  },
  WRPAccCertProvider: {
    name: "Access Certificate Provider",
    icon: () => <TbOutlineSettingsUp />,
  },
  WalletRelyingParty: {
    name: "Service Provider",
    icon: () => <TbOutlineBuildingBroadcastTower />,
  },
};

export function getProviderType(
  key: string | undefined
): ProviderType | undefined {
  if (!key) return undefined;
  return providerTypes[key];
}
