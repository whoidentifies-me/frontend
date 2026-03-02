import { A } from "@solidjs/router";
import { routes } from "~/config/routes";

export default function NotFound() {
  return (
    <main class="text-center mx-auto p-4">
      <h1 class="max-6-xs text-6xl my-16">404 Not Found</h1>
      <p class="my-4">
        Back to
        <A href={routes.home} class="text-sky-600 hover:underline">
          Home
        </A>
      </p>
    </main>
  );
}
