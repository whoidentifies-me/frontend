// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";

if (import.meta.env.VITE_MOCK) {
  import("./mocks/browser").then(({ worker }) =>
    worker.start({ onUnhandledRequest: "bypass" })
  );
}

mount(() => <StartClient />, document.getElementById("app")!);
