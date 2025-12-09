import { createAsync, query, useParams } from "@solidjs/router";
import apiClient from "~/api";
import { RelyingPartyDescription } from "~/components/RelyingPartyDescription";
import { RelyingPartyEntitlements } from "~/components/RelyingPartyEntitlements";
import { RelyingPartyHeader } from "~/components/RelyingPartyHeader";
import { RelyingPartyIntendedUses } from "~/components/RelyingPartyIntendedUses";

const getRelyingParty = query(async (id: string) => {
  return await apiClient.getRelyingParty(id);
}, "relying-party");
const getIntendedUsesForRelyingParty = query(async (id: string) => {
  return await apiClient.getIntendedUses({ wrp_id: id, limit: 1000 });
}, "intended-uses-for-relying-party");

export default function RelyingParty() {
  const params = useParams<{ id: string }>();
  const relyingParty = createAsync(() => getRelyingParty(params.id));
  const intendedUses = createAsync(() =>
    getIntendedUsesForRelyingParty(params.id)
  );

  return (
    <div class="space-y-14">
      <RelyingPartyHeader data={relyingParty()} />

      <RelyingPartyDescription data={relyingParty()} />

      <RelyingPartyEntitlements data={relyingParty()} />

      <RelyingPartyIntendedUses
        relyingParty={relyingParty()}
        intendedUses={intendedUses()?.data}
      />
    </div>
  );
}
