import { HeaderCard } from "~/components/HeaderCard";
import { SearchAndFilter } from "~/components/SearchAndFilter";
import { useTranslate } from "~/i18n/dict";
import headerBgImage from "../assets/img/header-bg.jpg?format=webp&quality=60&w=1200&imagetools";
import logoImage from "../assets/img/logo-primary.png?format=webp&w=100&imagetools";
import { FAQ } from "~/sections/FAQ";
import { Newsletter } from "~/sections/Newsletter";
import { Explore } from "~/sections/Explore";

export default function Home() {
  const t = useTranslate();

  return (
    <main class="">
      <HeaderCard
        title={t.page.title()}
        subtitle={t.page.subtitle()}
        logoAlt={t.page.logoAlt()}
        bgImageSrc={headerBgImage}
        logoSrc={logoImage}
      >
        <SearchAndFilter collapseFilters={true}></SearchAndFilter>
      </HeaderCard>

      <Explore />

      <Newsletter />

      <FAQ />
    </main>
  );
}
