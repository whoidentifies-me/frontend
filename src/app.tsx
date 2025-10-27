import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Header from "~/components/Header";
import "./app.css";
import { MetaProvider, Link } from "@solidjs/meta";
import "@fontsource-variable/manrope";
import "@fontsource/anton";

export default function App() {
  return (
    <MetaProvider>
      <Link rel="icon" href="/favicon.svg" type="image/svg+xml" />
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
