import { useTranslate } from "~/i18n/dict";
import { routes } from "~/config/routes";

export interface NavigationItem {
  href: string;
  anchor?: string;
  label: () => string | undefined;
}

export const createNavigationItems = (): NavigationItem[] => {
  const t = useTranslate();

  return [
    {
      href: routes.home,
      label: () => t.navigation.home(),
    },
    {
      href: `${routes.home}#explore`,
      anchor: "#explore",
      label: () => t.navigation.explore(),
    },
    {
      href: `${routes.home}#newsletter`,
      anchor: "#newsletter",
      label: () => t.navigation.newsletter(),
    },
    {
      href: `${routes.home}#faq`,
      anchor: "#faq",
      label: () => t.navigation.faqs(),
    },
  ];
};
