import { TbOutlineFilter, TbOutlineSearch } from "solid-icons/tb";
import { Component } from "solid-js";
import { useTranslate } from "~/i18n/dict";

interface SearchBarProps {
  value?: string;
  category?: "relying-parties" | "intended-uses";
  onFilterClick?: () => void;
  onSearchSubmit?: (value?: string) => void;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
}

export const SearchBar: Component<SearchBarProps> = (props) => {
  const t = useTranslate();

  const id = "wim-search-bar";
  let searchEl: HTMLInputElement | undefined;
  const onFiltersClick = (e: Event) => {
    e.preventDefault();
    if (props.onFilterClick) {
      props.onFilterClick();
    }
  };
  const onSearchSubmit = (e: Event) => {
    e.preventDefault();
    if (props.onSearchSubmit) {
      props.onSearchSubmit(searchEl?.value?.trim());
    }
  };

  return (
    <div class="grid grid-cols-2 sm:grid-cols-[1fr_auto_auto] gap-2">
      <label
        class="col-start-1 col-span-2 sm:col-span-1 w-full input text-lg"
        for={id}
      >
        <span class="sr-only">{t.filters.labels.q()}</span>
        <TbOutlineSearch />
        <input
          class="mx-0 grow overflow-ellipsis"
          ref={searchEl}
          type="search"
          id={id}
          name="q"
          value={props.value || ""}
          placeholder={t.filters.placeholders.q()}
        />
      </label>

      <button
        type="submit"
        class="col-start-2 row-start-2 sm:col-start-3 sm:row-start-1 justify-self-stretch btn btn-primary"
        onClick={onSearchSubmit}
      >
        {t.components.searchAndFilter.search()}
      </button>

      <button
        class="col-start-1 row-start-2 sm:col-start-2 sm:row-start-1 btn sm:btn-circle justify-self-stretch btn-primary sm:ml-1.5"
        onClick={onFiltersClick}
        aria-expanded={props["aria-expanded"]}
        aria-controls={props["aria-controls"]}
        aria-label={`${props["aria-expanded"] ? "Hide" : "Show"} search filters`}
      >
        <TbOutlineFilter />
      </button>
    </div>
  );
};
