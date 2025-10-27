import { Component } from "solid-js";
import { useNavigate } from "@solidjs/router";

export const SearchBar: Component<{ value?: string }> = (params) => {
  const navigate = useNavigate();

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("q") as string;
    if (query?.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate("/search");
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
            value={params.value || ""}
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
