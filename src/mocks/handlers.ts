import { http, HttpResponse, bypass } from "msw";
import { ListIntendedUsesOutputBody } from "~/api";

const baseUrl = import.meta.env.VITE_API_URL || "";

export const handlers = [
  // Example: override fields on Intended Use Items
  http.get(`${baseUrl}/api/v1/intended-uses`, async ({ request }) => {
    console.log("mock start");
    const response = await fetch(bypass(request));
    const data = (await response.json()) as ListIntendedUsesOutputBody;

    console.log("mock", data);
    for (const item of data.data || []) {
      (item as any).revoked_at = new Date().toString();
    }

    return HttpResponse.json(data);
  }),
];
