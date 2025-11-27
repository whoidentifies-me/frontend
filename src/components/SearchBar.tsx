import { Component } from "solid-js";
import { TbFilter } from "solid-icons/tb";
import { useTranslate } from "~/i18n/dict";

interface SearchBarProps {
  value?: string;
  category?: "relying-parties" | "intended-uses";
  onFilterClick?: () => void;
  onSearchSubmit?: (value?: string) => void;
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
    <div class="flex flex-col">
      <label for={id}>{t.filters.labels.q()}</label>
      <div class="flex flex-row">
        <input
          ref={searchEl}
          type="search"
          id={id}
          name="q"
          value={props.value || ""}
          placeholder=""
        />
        <button type="submit" class="flex-shrink-0" onClick={onSearchSubmit}>
          Search
        </button>
        <button class="ml-1 flex-shrink-0" onClick={onFiltersClick}>
          <TbFilter />
        </button>
      </div>
    </div>
  );
};
