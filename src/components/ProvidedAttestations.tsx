import { Component, createMemo, For } from "solid-js";
import { RelyingPartyProvidedAttestationAPIResponse } from "~/api";
import { ClaimItem } from "./ClaimItem";
import { buildUrlWithFilters } from "~/utils/url";
import { routes } from "~/config/routes";

interface ProvidedAttestationsProps {
  attestations: RelyingPartyProvidedAttestationAPIResponse[] | null | undefined;
}

export const ProvidedAttestations: Component<ProvidedAttestationsProps> = (
  props
) => {
  const uniqueClaims = createMemo(() => {
    const seen = new Set<string>();
    const result: { path: string }[] = [];
    for (const attestation of props.attestations || []) {
      for (const claim of attestation.claims || []) {
        if (!seen.has(claim.path)) {
          seen.add(claim.path);
          result.push({ path: claim.path });
        }
      }
    }
    return result;
  });

  return (
    <ul class="mt-4 list-none  grid sm:grid-cols-2 grid-cols-1 gap-6">
      <For each={uniqueClaims()}>
        {(claim) => (
          <ClaimItem
            path={claim.path}
            href={buildUrlWithFilters(routes.search.intendedUses, {
              claim_path: claim.path,
            })}
            hrefState={{ scrollToResults: true }}
          />
        )}
      </For>
    </ul>
  );
};
