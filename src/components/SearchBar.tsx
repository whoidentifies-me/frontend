import { Component } from "solid-js";
import { useNavigate, useSearchParams, useLocation } from "@solidjs/router";
import { TbFilter } from "solid-icons/tb";

interface SearchBarProps {
  value?: string;
  category?: "relying-parties" | "intended-uses";
  onFilterClick?: () => void;
}

export const SearchBar: Component<SearchBarProps> = (props) => {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const location = useLocation();

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
  const onFiltersClick = (e: Event) => {
    if (props.onFilterClick) {
      props.onFilterClick();
    }
    e.preventDefault();
  };

  return (
    <search class="flex flex-col">
      <form action={action()} method="get" onSubmit={handleSubmit}>
        <label for="wim-search">Search Relying Parties and Intended Uses</label>
        <div class="flex flex-row">
          <input
            type="search"
            id="wim-search"
            name="q"
            value={props.value || ""}
            placeholder="Type Insurance or Birthdate, ..."
          />
          <button type="submit" class="flex-shrink-0">
            Search
          </button>
          <button class="ml-1 flex-shrink-0" onClick={onFiltersClick}>
            <TbFilter />
          </button>
        </div>
      </form>
    </search>
  );
};
