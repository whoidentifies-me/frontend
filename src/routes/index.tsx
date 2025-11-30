import { HeaderCard } from "~/components/HeaderCard";
import { SearchAndFilter } from "~/components/SearchAndFilter";
import { useTranslate } from "~/i18n/dict";
import headerBgImage from "../assets/img/header-bg.jpg?format=webp&quality=60&w=1200&imagetools";
import logoImage from "../assets/img/logo-primary.png?format=webp&w=100&imagetools";

export default function Home() {
  const t = useTranslate();

  return (
    <main class="text-center wim-container">
      <HeaderCard
        title={t.page.title()}
        subtitle={t.page.subtitle()}
        logoAlt={t.page.logoAlt()}
        bgImageSrc={headerBgImage}
        logoSrc={logoImage}
      >
        <SearchAndFilter collapseFilters={true}></SearchAndFilter>
      </HeaderCard>

      <div class="border-solid my-8 p-4 min-h-96">
        <h2>Explore</h2>
      </div>

      <div class="border-solid my-8 p-4 min-h-56">
        <h2>Newsletter</h2>
      </div>

      <div class="border-solid my-8 p-4 min-h-96">
        <h2>FAQ</h2>
      </div>
    </main>
  );
}
