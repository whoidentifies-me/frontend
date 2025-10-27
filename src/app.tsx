import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Header from "~/components/Header";
import "./app.css";
import { MetaProvider } from "@solidjs/meta";
import "@fontsource-variable/manrope";
import "@fontsource/anton";

export default function App() {
  return (
    <MetaProvider>
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
