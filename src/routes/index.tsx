import { SearchAndFilter } from "~/components/SearchAndFilter";
import { About } from "~/sections/About";
import { FAQ } from "~/sections/FAQ";
import { Newsletter } from "~/sections/Newsletter";
import { Explore } from "~/sections/Explore";
import { Hero } from "~/components/Hero";
import { Status } from "~/sections/Status";
import { Title } from "@solidjs/meta";

export default function Home() {
  return (
    <main>
      <Title>Who identifies me?</Title>
      <div class="wim-container">
        <Hero>
          <SearchAndFilter collapseFilters={true}></SearchAndFilter>
        </Hero>
      </div>

      <Explore />

      <Newsletter />

      <Status />

      <FAQ />

      <About />
    </main>
  );
}
