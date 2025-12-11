import { Title } from "@solidjs/meta";
import { JSX } from "solid-js";

interface SearchLayoutProps {
  children: JSX.Element;
}

export default function SearchLayout(props: SearchLayoutProps) {
  return (
    <>
      <Title>Search</Title>
      <main class="text-gray-700 wim-container">{props.children}</main>
    </>
  );
}
