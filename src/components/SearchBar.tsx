import { Component } from "solid-js";
import { useNavigate } from "@solidjs/router";

interface SearchBarProps {
  value?: string;
  category?: "relying-parties" | "intended-uses";
}

export const SearchBar: Component<SearchBarProps> = (props) => {
  const navigate = useNavigate();

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("q") as string;

    // Build target path based on category prop
    const targetPath = props.category ? `/search/${props.category}` : "/search";

    if (query?.trim()) {
      navigate(`${targetPath}?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate(targetPath);
    }
  };

  return (
    <search class="flex flex-col">
      <form action="/search" method="get" onSubmit={handleSubmit}>
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
        </div>
      </form>
    </search>
  );
};
