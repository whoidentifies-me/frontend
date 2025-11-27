import { SearchAndFilter } from "~/components/SearchAndFilter";

export default function Home() {
  return (
    <main class="text-center text-gray-700 wim-container">
      <h1>Who Identifies Me</h1>
      <SearchAndFilter collapseFilters={true}></SearchAndFilter>

      <div class="border-solid my-8 p-4 min-h-96">
        <h2>Explore</h2>
      </div>

      <div class="border-solid my-8 p-4 min-h-56">
        <h2>Newsletter</h2>
      </div>

      <div class="border-solid my-8 p-4 min-h-96">
        <h2>FAQ</h2>
      </div>
    </main>
  );
}
