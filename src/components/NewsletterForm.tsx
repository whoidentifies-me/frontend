import { TbFillCircleArrowRight } from "solid-icons/tb";
import { Component } from "solid-js";
import { useTranslate } from "~/i18n/dict";
import { newsletterConfig } from "~/config/newsletter";

export const NewsletterForm: Component = () => {
  const t = useTranslate();
  const id = "feld_email";

  return (
    <form
      class=""
      method="post"
      action={newsletterConfig.endpoint}
      target="_blank"
    >
      {/* Hidden Dialog-Mail fields */}
      <input hidden name="dmail_charset" value="UTF-8" />
      <input
        hidden
        name={newsletterConfig.groupId}
        value={newsletterConfig.groupId}
      />
      <input hidden name="feld_4551" value="EN" />

      {/* Anti-spam honeypot field */}
      <input
        name="last_name"
        type="text"
        value=""
        aria-disabled="true"
        tabindex="-1"
        style="display: contents; width: 1px !important; max-width: 1px !important; height: 1px !important; max-height: 1px !important; line-height: 1px !important; padding: 0 !important; margin: 0 !important; background-color: transparent !important; border: 0 !important;"
      />

      <div class="input input-lg w-full ps-5 pe-2">
        <label class="sr-only" for={id}>
          {t.components.newsletter.label()}
        </label>
        <input
          id={id}
          name="feld_email"
          class=""
          placeholder={t.components.newsletter.placeholder()}
          type="email"
          required
        />

        <button type="submit" class="btn btn-sm btn-primary btn-outline pe-1">
          {t.components.newsletter.subscribeBtn()}
          <TbFillCircleArrowRight size="2em" />
        </button>
      </div>
    </form>
  );
};
