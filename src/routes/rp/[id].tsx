import { createAsync, query, useParams } from "@solidjs/router";
import { ErrorBoundary, For } from "solid-js";
import apiClient from "~/api";
import { IntendedUseDetails } from "~/components/IntendedUseDetails";
import { RelyingPartyDetails } from "~/components/RelyingPartyDetails";
import { RelyingPartyHeader } from "~/components/RelyingPartyHeader";

const getRelyingParty = query(async (id: string) => {
  return await apiClient.getRelyingParty(id);
}, "relying-party");
const getIntendedUsesForRelyingParty = query(async (id: string) => {
  return await apiClient.getIntendedUses({ wrp_id: id });
}, "intended-uses-for-relying-party");

export default function RelyingParty() {
  const params = useParams<{ id: string }>();
  const relyingParty = createAsync(() => getRelyingParty(params.id));
  const intendedUses = createAsync(() =>
    getIntendedUsesForRelyingParty(params.id)
  );

  return (
    <>
      <RelyingPartyHeader data={relyingParty()}></RelyingPartyHeader>
      <div class="wim-container">
        <h2>Relying Party</h2>
        <ErrorBoundary fallback={<div>Something went wrong!</div>}>
          <RelyingPartyDetails data={relyingParty()} />
        </ErrorBoundary>
        <h2 class="mt-8">Intended Uses</h2>
        <ErrorBoundary fallback={<div>Something went wrong!</div>}>
          <For each={intendedUses()?.data}>
            {(item) => <IntendedUseDetails data={item} />}
          </For>
        </ErrorBoundary>
      </div>
    </>
  );
}
