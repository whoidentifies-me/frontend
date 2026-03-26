import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, Show, onMount, type ParentProps } from "solid-js";
import Header from "~/components/Header";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import "./app.css";
import { MetaProvider, Link, Meta } from "@solidjs/meta";
import "@fontsource-variable/open-sans";
import "@fontsource-variable/montserrat";
import { I18nProvider } from "~/i18n/dict";
import { Footer } from "./sections/Footer";
import { FilterProvider } from "./providers/FilterProvider";
import { CornerRibbon } from "~/components/CornerRibbon";

function RootLayout(props: ParentProps) {
  const location = useLocation();

  onMount(() => {
    const hash = location.hash.slice(1);
    if (hash) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <FilterProvider>
      <div class="min-h-screen grid grid-cols-1 grid-rows-[auto_1fr_auto] pt-7 md:pt-0">
        <CornerRibbon />
        <Header />
        <div>
          <Suspense fallback={<LoadingSpinner />}>{props.children}</Suspense>
        </div>
        <Footer />
      </div>
    </FilterProvider>
  );
}

export default function App() {
  return (
    <MetaProvider>
      <Link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <Show when={import.meta.env.VITE_MODE === "stage"}>
        <Meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
      </Show>

      <I18nProvider initialLocale="en">
        <Router root={RootLayout}>
          <FileRoutes />
        </Router>
      </I18nProvider>
    </MetaProvider>
  );
}
