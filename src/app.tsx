import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, Show } from "solid-js";
import Header from "~/components/Header";
import "./app.css";
import { MetaProvider, Link, Meta } from "@solidjs/meta";
import "@fontsource-variable/manrope";
import "@fontsource/anton";

export default function App() {
  return (
    <MetaProvider>
      <Link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <Show when={import.meta.env.VITE_MODE === "stage"}>
        <Meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
      </Show>
      <Router
        root={(props) => (
          <>
            <Header />
            <Suspense>{props.children}</Suspense>
          </>
        )}
      >
        <FileRoutes />
      </Router>
    </MetaProvider>
  );
}
