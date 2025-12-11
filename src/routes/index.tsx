import { SearchAndFilter } from "~/components/SearchAndFilter";
import { FAQ } from "~/sections/FAQ";
import { Newsletter } from "~/sections/Newsletter";
import { Explore } from "~/sections/Explore";
import { Hero } from "~/components/Hero";

export default function Home() {
  return (
    <main class="">
      <Hero>
        <SearchAndFilter collapseFilters={true}></SearchAndFilter>
      </Hero>

      <Explore />

      <Newsletter />

      <FAQ />
    </main>
  );
}
