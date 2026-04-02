import { A, useLocation } from "@solidjs/router";
import { For } from "solid-js";
import { TbOutlineMenu2 } from "solid-icons/tb";
import { createNavigationItems } from "~/config/navigation";
import { routes } from "~/config/routes";
import { AnchorLink } from "~/components/AnchorLink";
import logo from "../assets/img/logo-primary.png?format=webp&w=100&imagetools";

export default function Header() {
  const location = useLocation();
  const isHomePage = () => location.pathname === routes.home;
  const navigationItems = createNavigationItems();

  return (
    <div class="w-full">
      <div class="wim-container pt-3 pb-6 md:px-10 px-4">
        <nav class="grid md:grid-cols-[1fr_auto_1fr] grid-cols-[1fr_1fr] items-center">
          <A
            href={routes.home}
            class="flex flex-row items-center gap-4 justify-self-start"
          >
            <img src={logo} alt="Who Identifies Me logo" class="w-10" />
          </A>

          <ul class="hidden md:flex gap-7 justify-self-center list-none">
            <For each={navigationItems}>
              {(item) => {
                const Link = item.anchor ? AnchorLink : A;
                return (
                  <li class="">
                    <Link
                      href={
                        isHomePage() && item.anchor ? item.anchor : item.href
                      }
                      class="no-underline font-bold text-base-content hover:text-primary focus:text-primary transition-colors"
                      target={item.external ? "_blank" : undefined}
                    >
                      {item.label()}
                    </Link>
                  </li>
                );
              }}
            </For>
          </ul>

          <div class="flex justify-self-end">
            <div class="dropdown dropdown-end md:hidden">
              <div tabindex="0" role="button" class="btn btn-ghost">
                <TbOutlineMenu2 class="h-5 w-5" />
                <span class="sr-only">Open Nav Menu</span>
              </div>
              <ul
                tabindex="0"
                class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <For each={navigationItems}>
                  {(item) => {
                    const Link = item.anchor ? AnchorLink : A;
                    return (
                      <li>
                        <Link
                          href={
                            isHomePage() && item.anchor
                              ? item.anchor
                              : item.href
                          }
                          class="no-underline font-bold text-base-content hover:text-primary focus:text-primary transition-colors"
                        >
                          {item.label()}
                        </Link>
                      </li>
                    );
                  }}
                </For>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
