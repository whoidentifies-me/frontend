import { http, HttpResponse, bypass } from "msw";
import {
  IntendedUseAPIResponse,
  ListIntendedUsesOutputBody,
  ListRelyingPartiesOutputBody,
  RelyingPartyAPIResponse,
} from "~/api";

const baseUrl = import.meta.env.VITE_API_URL || "";

function patchRelyingParty(data: RelyingPartyAPIResponse) {
  if (data.id !== "ab96a312-570b-472e-b9c2-f5bcb5a81cbb") return;

  if (data.legal_entity && !data.legal_entity.postal_address) {
    data.legal_entity.postal_address =
      "Linke Wienzeile 12/20\n1060 Wien\nAustria";
  }

  data.provider_type = "WalletRelyingParty";

  data.uses_intermediaries = [
    "87ab155e-69d9-4559-ad9b-34809a189493",
    "f5230490-fac2-47b2-8c7a-2dbd89713f3e",
    "ed5ade96-994f-40da-8c59-a92867368a1c",
  ];
}

function patchIntendedUse(data: IntendedUseAPIResponse) {
  if (data.id === "dd39acb9-204a-4a7f-9e7a-35bb133a16a1") {
    (data as any).revoked_at = new Date().toString();
    data.policies = [
      {
        policy_uri: "https://www.regional-utilities.com/privacy",
        type: "http://data.europa.eu/eudi/policy/privacy-policy",
      },
      {
        policy_uri: "https://www.regional-utilities.com/terms",
        type: "http://data.europa.eu/eudi/policy/terms-and-conditions",
      },
    ];
  }

  if (data.relying_party) {
    patchRelyingParty(data.relying_party);
  }
}

export const handlers = [
  // Mock data for single relying party and intended use
  // http://localhost:3000/rp/ab96a312-570b-472e-b9c2-f5bcb5a81cbb?use=dd39acb9-204a-4a7f-9e7a-35bb133a16a1
  http.get(`${baseUrl}/api/v1/intended-uses/:id`, async ({ request }) => {
    const response = await fetch(bypass(request));
    const data = (await response.json()) as IntendedUseAPIResponse;
    patchIntendedUse(data);
    return HttpResponse.json(data);
  }),

  http.get(`${baseUrl}/api/v1/relying-parties/:id`, async ({ request }) => {
    const response = await fetch(bypass(request));
    const data = (await response.json()) as RelyingPartyAPIResponse;
    patchRelyingParty(data);
    return HttpResponse.json(data);
  }),

  http.get(`${baseUrl}/api/v1/relying-parties`, async ({ request }) => {
    const response = await fetch(bypass(request));
    const data = (await response.json()) as ListRelyingPartiesOutputBody;
    data.data?.forEach(patchRelyingParty);
    return HttpResponse.json(data);
  }),

  http.get(`${baseUrl}/api/v1/intended-uses`, async ({ request }) => {
    const response = await fetch(bypass(request));
    const data = (await response.json()) as ListIntendedUsesOutputBody;
    data.data?.forEach(patchIntendedUse);
    return HttpResponse.json(data);
  }),
];
