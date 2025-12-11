import { TbFilter, TbSearch } from "solid-icons/tb";
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
    <div class="grid grid-cols-2 md:grid-cols-[1fr_auto_auto] gap-2">
      <label
        class="col-start-1 col-span-2 md:col-span-1 w-full input text-lg"
        for={id}
      >
        <span class="sr-only">{t.filters.labels.q()}</span>
        <TbSearch />
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
        class="col-start-2 row-start-2 md:col-start-3 md:row-start-1 justify-self-end btn btn-primary"
        onClick={onSearchSubmit}
      >
        {t.components.searchAndFilter.search()}
      </button>

      <button
        class="col-start-1 row-start-2 md:col-start-2 md:row-start-1 btn btn-circle btn-primary"
        onClick={onFiltersClick}
        aria-expanded={props["aria-expanded"]}
        aria-controls={props["aria-controls"]}
        aria-label={`${props["aria-expanded"] ? "Hide" : "Show"} search filters`}
      >
        <TbFilter />
      </button>
    </div>
  );
};
