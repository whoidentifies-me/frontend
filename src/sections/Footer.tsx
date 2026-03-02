import { Component } from "solid-js";
import { ExternalLink } from "~/components/ExternalLink";

export const Footer: Component = () => {
  return (
    <footer class="bg-primary text-primary-content text-sm py-6">
      <div class="wim-container flex justify-between md:flex-row flex-col">
        <p class="text-center">
          This is an open source{" "}
          <ExternalLink
            class="link text-primary-content font-semibold"
            href="https://github.com/whoidentifies-me"
          >
            project
          </ExternalLink>{" "}
          of the digital rights NGO{" "}
          <ExternalLink
            class="link text-primary-content font-semibold"
            href="https://epicenter.works"
          >
            epicenter.works
          </ExternalLink>
          .
        </p>

        <p class="text-center">
          <ExternalLink
            class="link text-primary-content font-semibold"
            href="https://epicenter.works/en/contact"
          >
            Imprint
          </ExternalLink>
          &nbsp;|&nbsp;
          <ExternalLink
            class="link text-primary-content font-semibold"
            href="https://epicenter.works/en/privacy"
          >
            Privacy Policy
          </ExternalLink>
        </p>
      </div>
    </footer>
  );
};
