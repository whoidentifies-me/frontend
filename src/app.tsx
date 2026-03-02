import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, Show } from "solid-js";
import Header from "~/components/Header";
import "./app.css";
import { MetaProvider, Link, Meta } from "@solidjs/meta";
import "@fontsource-variable/open-sans";
import "@fontsource-variable/montserrat";
import { I18nProvider } from "~/i18n/dict";
import { Footer } from "./sections/Footer";
import { FilterProvider } from "./providers/FilterProvider";

export default function App() {
  return (
    <MetaProvider>
      <Link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <Show when={import.meta.env.VITE_MODE === "stage"}>
        <Meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
      </Show>

      <I18nProvider initialLocale="en">
        <Router
          root={(props) => (
            <FilterProvider>
              <Header />
              <Suspense>{props.children}</Suspense>
              <Footer />
            </FilterProvider>
          )}
        >
          <FileRoutes />
        </Router>
      </I18nProvider>
    </MetaProvider>
  );
}
