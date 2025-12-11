import { ParentComponent } from "solid-js";
import { HeaderCard } from "./HeaderCard";
import { useTranslate } from "~/i18n/dict";
import headerBgImage from "../assets/img/header-bg.jpg?format=webp&quality=60&w=1200&imagetools";
import logoImage from "../assets/img/logo-primary.png?format=webp&w=100&imagetools";

export const Hero: ParentComponent = (props) => {
  const t = useTranslate();

  return (
    <HeaderCard
      title={t.page.title()}
      subtitle={t.page.subtitle()}
      logoAlt={t.page.logoAlt()}
      bgImageSrc={headerBgImage}
      logoSrc={logoImage}
    >
      {props.children}
    </HeaderCard>
  );
};
