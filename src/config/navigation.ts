import { useTranslate } from "~/i18n/dict";
import { routes } from "~/config/routes";
import { docsLinks } from "~/config/docs";

export interface NavigationItem {
  href: string;
  anchor?: string;
  external?: boolean;
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
      href: routes.search.results,
      label: () => t.navigation.explore(),
    },
    {
      href: routes.sections.status,
      anchor: "#status",
      label: () => t.navigation.newsletter(),
    },
    {
      href: routes.sections.how,
      anchor: "#how",
      label: () => t.navigation.howItWorks(),
    },
    {
      href: docsLinks.help,
      external: true,
      label: () => t.navigation.help(),
    },
  ];
};
