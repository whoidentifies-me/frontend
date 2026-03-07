import { SearchAndFilter } from "~/components/SearchAndFilter";
import { FAQ } from "~/sections/FAQ";
import { Newsletter } from "~/sections/Newsletter";
import { Explore } from "~/sections/Explore";
import { Hero } from "~/components/Hero";
import { Status } from "~/sections/Status";

export default function Home() {
  return (
    <main>
      <div class="wim-container">
        <Hero>
          <SearchAndFilter collapseFilters={true}></SearchAndFilter>
        </Hero>
      </div>

      <Explore />

      <Newsletter />

      <Status />

      <FAQ />
    </main>
  );
}
