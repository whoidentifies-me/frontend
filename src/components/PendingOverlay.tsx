import { LoadingSpinner } from "~/components/LoadingSpinner";

export function PendingOverlay() {
  return (
    <div class="absolute inset-0 z-10">
      <div class="sticky top-1/3 flex items-center justify-center py-10">
        <LoadingSpinner />
      </div>
    </div>
  );
}
