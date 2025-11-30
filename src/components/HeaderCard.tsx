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
    <div class="mb-20">
      <div
        class="!pb-32 header-card header-card-with-overlay"
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
              class="max-w-24 mx-4"
            />
          </a>
          <hgroup class="text-primary text-end">
            <h1 class="mb-2">{props.title}</h1>
            <p class="subtitle my-0">{props.subtitle}</p>
          </hgroup>
        </div>
        <div class=""></div>
      </div>
      <div class="px-14 -mt-28">{props.children}</div>
    </div>
  );
};
