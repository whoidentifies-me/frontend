import type {
  ApiResponse,
  RelyingParty,
  IntendedUse,
  RelyingPartyFilters,
  IntendedUseFilters,
  FilteringOptions,
  FilterValuesResponse,
} from "./types";

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = import.meta.env.VITE_API_URL || "/") {
    this.baseUrl = baseUrl.replace(/\/$/, ""); // Remove trailing slash
  }

  private async request<T>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`, window.location.origin);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((v) => url.searchParams.append(key, String(v)));
          } else {
            url.searchParams.append(key, String(value));
          }
        }
      });
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  }

  // Relying Parties
  async getRelyingParties(
    filters?: RelyingPartyFilters
  ): Promise<ApiResponse<RelyingParty>> {
    return this.request<ApiResponse<RelyingParty>>(
      "/api/v1/relying-parties",
      filters
    );
  }

  async getRelyingParty(id: string): Promise<RelyingParty> {
    return this.request<RelyingParty>(`/api/v1/relying-parties/${id}`);
  }

  // Intended Uses
  async getIntendedUses(
    filters?: IntendedUseFilters
  ): Promise<ApiResponse<IntendedUse>> {
    return this.request<ApiResponse<IntendedUse>>(
      "/api/v1/intended-uses",
      filters
    );
  }

  async getIntendedUse(id: string): Promise<IntendedUse> {
    return this.request<IntendedUse>(`/api/v1/intended-uses/${id}`);
  }

  // Filtering Options
  async getFilteringOptions(): Promise<FilteringOptions> {
    return this.request<FilteringOptions>("/api/v1/filtering-options");
  }

  async getFilterValues(
    field: string,
    params?: { q?: string; limit?: number; cursor?: string }
  ): Promise<FilterValuesResponse> {
    return this.request<FilterValuesResponse>(
      `/api/v1/filtering-options/${field}`,
      params
    );
  }
}

// Default client instance
export const apiClient = new ApiClient();
