import { afterEach, describe, expect, it, vi } from "vitest";
import { createSupabaseRestClient } from "./supabaseRest";

describe("createSupabaseRestClient", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("reports missing credentials clearly", () => {
    const client = createSupabaseRestClient({ url: "", anonKey: "" });

    expect(client.isConfigured).toBe(false);
    expect(() => client.requireConfigured()).toThrow(
      "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local.",
    );
  });

  it("posts rows to a Supabase REST table", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: "row-1" }],
    });

    const client = createSupabaseRestClient({
      url: "https://example.supabase.co",
      anonKey: "anon-key",
      fetchImpl: fetchMock,
    });

    const rows = await client.insert("reservations", { customer_name: "Aarav" });

    expect(rows).toEqual([{ id: "row-1" }]);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.supabase.co/rest/v1/reservations",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          apikey: "anon-key",
          Authorization: "Bearer anon-key",
          Prefer: "return=representation",
        }),
        body: JSON.stringify({ customer_name: "Aarav" }),
      }),
    );
  });
});
