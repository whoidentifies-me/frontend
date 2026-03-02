import { createAsync, useParams } from "@solidjs/router";
import { RelyingParties, IntendedUses } from "~/api";
import { RelyingPartyDescription } from "~/components/RelyingPartyDescription";
import { RelyingPartyEntitlements } from "~/components/RelyingPartyEntitlements";
import { RelyingPartyHeader } from "~/components/RelyingPartyHeader";
import { RelyingPartyIntendedUses } from "~/components/RelyingPartyIntendedUses";

export default function RelyingParty() {
  const params = useParams<{ id: string }>();
  const relyingParty = createAsync(() =>
    RelyingParties.getRelyingParty(params.id)
  );
  const intendedUses = createAsync(() =>
    IntendedUses.listIntendedUses({ wrp_id: params.id, limit: 1000 })
  );

  return (
    <div class="space-y-14">
      <RelyingPartyHeader data={relyingParty()} />

      <RelyingPartyDescription data={relyingParty()} />

      <RelyingPartyEntitlements data={relyingParty()} />

      <RelyingPartyIntendedUses
        relyingParty={relyingParty()}
        intendedUses={intendedUses()?.data || []}
      />
    </div>
  );
}
