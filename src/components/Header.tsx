import { A } from "@solidjs/router";
import logo from "../assets/img/logo-primary.png";

export default function Header() {
  return (
    <div class="wim-container py-2">
      <A href="/" class="flex flex-row items-center gap-4">
        <img src={logo} alt="WhoIdentifies.me Logo" class="h-7" />
        Home
      </A>
    </div>
  );
}
