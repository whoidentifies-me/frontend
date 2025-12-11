import { ParentComponent } from "solid-js";

interface HeaderCardProps {
  title?: string;
  subtitle?: string;
  bgImageSrc?: string;
  logoSrc?: string;
  logoAlt?: string;
  logoLink?: string;
}

export const HeaderCard: ParentComponent<HeaderCardProps> = (props) => {
  return (
    <div class="mb-20 wim-container">
      <div
        class="!pb-32 pt-8 md:pt-14 md:px-14 px-4 header-card header-card-with-overlay"
        style={{
          "--bg-image": props.bgImageSrc
            ? `url(${props.bgImageSrc})`
            : undefined,
        }}
      >
        <div class="flex flex-row justify-between items-end mb-4">
          <a href={props.logoLink || "/"}>
            <img
              src={props.logoSrc}
              alt={props.logoAlt}
              class="max-w-12 md:max-w-24 ml-4 mr-2 md:mr-4"
            />
          </a>
          <hgroup class="text-primary text-end">
            <h1 class="mb-2 text-wrap">{props.title}</h1>
            <p class="subtitle my-0">{props.subtitle}</p>
          </hgroup>
        </div>
        <div class=""></div>
      </div>
      <div class="md:px-14 px-4 -mt-28 -mb-15">{props.children}</div>
    </div>
  );
};
