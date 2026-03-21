import { http, HttpResponse, bypass } from "msw";
import { IntendedUseAPIResponse, RelyingPartyAPIResponse } from "~/api";

const baseUrl = import.meta.env.VITE_API_URL || "";

export const handlers = [
  // Mock data for single relying party and inteded use
  // http://localhost:3000/rp/ab96a312-570b-472e-b9c2-f5bcb5a81cbb?use=dd39acb9-204a-4a7f-9e7a-35bb133a16a1
  http.get(
    `${baseUrl}/api/v1/intended-uses/dd39acb9-204a-4a7f-9e7a-35bb133a16a1`,
    async ({ request }) => {
      const response = await fetch(bypass(request));
      const data = (await response.json()) as IntendedUseAPIResponse;

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

      return HttpResponse.json(data);
    }
  ),

  http.get(
    `${baseUrl}/api/v1/relying-parties/ab96a312-570b-472e-b9c2-f5bcb5a81cbb`,
    async ({ request }) => {
      const response = await fetch(bypass(request));
      const data = (await response.json()) as RelyingPartyAPIResponse;

      if (data.legal_entity && !data.legal_entity.postal_address) {
        data.legal_entity.postal_address =
          "Linke Wienzeile 12/20\n1060 Wien\nAustria";
      }

      return HttpResponse.json(data);
    }
  ),
];
