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
    <div class="flex flex-row gap-2">
      <label class="input flex-grow me-1.5 text-lg" for={id}>
        <span class="sr-only">{t.filters.labels.q()}</span>
        <TbSearch />
        <input
          class="mx-0 grow"
          ref={searchEl}
          type="search"
          id={id}
          name="q"
          value={props.value || ""}
          placeholder={t.filters.placeholders.q()}
        />
      </label>

      <button
        class="flex-shrink-0 btn btn-circle btn-primary"
        onClick={onFiltersClick}
        aria-expanded={props["aria-expanded"]}
        aria-controls={props["aria-controls"]}
        aria-label={`${props["aria-expanded"] ? "Hide" : "Show"} search filters`}
      >
        <TbFilter />
      </button>

      <button
        type="submit"
        class="btn btn-primary flex-shrink-0"
        onClick={onSearchSubmit}
      >
        Search
      </button>
    </div>
  );
};
