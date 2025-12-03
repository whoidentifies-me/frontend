import { useTranslate } from "~/i18n/dict";

export interface NavigationItem {
  href: string;
  anchor?: string;
  label: () => string | undefined;
}

export const createNavigationItems = (): NavigationItem[] => {
  const t = useTranslate();

  return [
    {
      href: "/",
      label: () => t.navigation.home(),
    },
    {
      href: "/#explore",
      anchor: "#explore",
      label: () => t.navigation.explore(),
    },
    {
      href: "/#newsletter",
      anchor: "#newsletter",
      label: () => t.navigation.newsletter(),
    },
    {
      href: "/#faq",
      anchor: "#faq",
      label: () => t.navigation.faqs(),
    },
  ];
};
