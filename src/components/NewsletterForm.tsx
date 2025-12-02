import { TbCircleArrowRight, TbCircleArrowRightFilled } from "solid-icons/tb";
import { Component } from "solid-js";
import { useTranslate } from "~/i18n/dict";

export const NewsletterForm: Component = () => {
  const t = useTranslate();
  const id = "wim-newsletter-email-input";

  return (
    <div class="">
      <div class="input input-lg w-full ps-5 pe-2">
        <label class="sr-only" for={id}>
          {t.components.newsletter.label()}
        </label>
        <input
          id={id}
          class=""
          placeholder={t.components.newsletter.placeholder()}
          type="email"
        />
        <button class="btn btn-sm btn-primary btn-outline pe-1">
          {t.components.newsletter.subscribeBtn()}
          <TbCircleArrowRightFilled size="2em" />
        </button>
      </div>
    </div>
  );
};
