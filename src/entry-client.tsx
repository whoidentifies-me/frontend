// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";
import { initMatomo } from "~/config/matomo";

initMatomo();

if (import.meta.env.VITE_MOCK) {
  await import("./mocks/browser").then(({ worker }) =>
    worker.start({ onUnhandledRequest: "bypass" })
  );
}

mount(() => <StartClient />, document.getElementById("app")!);
