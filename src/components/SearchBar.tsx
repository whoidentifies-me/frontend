import { Component } from "solid-js";
import { useNavigate, useSearchParams, useLocation } from "@solidjs/router";
import { TbFilter } from "solid-icons/tb";

interface SearchBarProps {
  value?: string;
  category?: "relying-parties" | "intended-uses";
  onFilterClick?: () => void;
  onSearchSubmit?: (value?: string) => void;
}

export const SearchBar: Component<SearchBarProps> = (props) => {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const location = useLocation();

  /*
  const action = () =>
    props.category ? `/search/${props.category}` : "/search";

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    let query = formData.get("q") as string;
    query = query?.trim();

    // Check if we're already on a search route
    const isOnSearchRoute = location.pathname.startsWith("/search");

    if (isOnSearchRoute) {
      // Update search params to preserve filters
      if (query?.trim()) {
        setSearchParams({ q: query });
      } else {
        setSearchParams({ q: undefined });
      }
    } else {
      // Navigate to search route
      if (query) {
        navigate(`${action()}?q=${encodeURIComponent(query.trim())}`);
      } else {
        navigate(action());
      }
    }
  };
  */

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
      props.onSearchSubmit(searchEl?.value);
    }
  };

  return (
    <search class="flex flex-col">
      <label for={id}>Search Relying Parties and Intended Uses</label>
      <div class="flex flex-row">
        <input
          ref={searchEl}
          type="search"
          id={id}
          name="q"
          value={props.value || ""}
          placeholder="Type your search term ..."
        />
        <button type="submit" class="flex-shrink-0" onClick={onSearchSubmit}>
          Search
        </button>
        <button class="ml-1 flex-shrink-0" onClick={onFiltersClick}>
          <TbFilter />
        </button>
      </div>
    </search>
  );
};
