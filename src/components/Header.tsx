import { A, useLocation } from "@solidjs/router";
import { For } from "solid-js";
import { createNavigationItems } from "~/config/navigation";
import logo from "../assets/img/logo-primary.png?w=48&quality=60&format=webp&imagetools";

export default function Header() {
  const location = useLocation();
  const isHomePage = () => location.pathname === "/";
  const navigationItems = createNavigationItems();

  return (
    <div class="wim-container pt-3 pb-6 px-10">
      <nav class="grid grid-cols-[1fr_auto_1fr] items-center">
        <A href="/" class="flex flex-row items-center gap-4 justify-self-start">
          <img src={logo} alt="WhoIdentifies.me Logo" class="w-10" />
        </A>

        <ul class="flex gap-7 justify-self-center list-none">
          <For each={navigationItems}>
            {(item) => (
              <li class="">
                <A
                  href={isHomePage() && item.anchor ? item.anchor : item.href}
                  class="no-underline font-bold text-base-content hover:text-primary focus:text-primary transition-colors"
                >
                  {item.label()}
                </A>
              </li>
            )}
          </For>
        </ul>

        <div></div>
      </nav>
    </div>
  );
}
