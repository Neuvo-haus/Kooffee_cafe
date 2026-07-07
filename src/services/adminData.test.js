import { describe, expect, it, vi } from "vitest";
import { fetchAdminProfile, saveAdminProfile, uploadMediaFile } from "./adminData";

vi.mock("./adminSupabase", () => ({
  requireAdminSupabase: () => {
    throw new Error("A test client is required.");
  },
}));

const createProfileClient = ({ byUser = null, byEmail = null } = {}) => {
  const calls = [];
  const query = {
    select: vi.fn(() => query),
    eq: vi.fn((column, value) => {
      calls.push([column, value]);
      return query;
    }),
    maybeSingle: vi.fn(async () => {
      const lastCall = calls.at(-1);
      if (lastCall?.[0] === "user_id") {
        return { data: byUser, error: null };
      }
      return { data: byEmail, error: null };
    }),
    update: vi.fn(() => query),
  };

  return {
    from: vi.fn(() => query),
    query,
    calls,
  };
};

describe("admin data services", () => {
  it("falls back to email when an admin profile is not linked to a user id", async () => {
    const client = createProfileClient({
      byEmail: {
        id: "profile-1",
        user_id: null,
        email: "owner@example.com",
        role: "owner",
        status: "active",
      },
    });

    const profile = await fetchAdminProfile(
      { id: "auth-user-1", email: "owner@example.com" },
      client,
    );

    expect(profile).toMatchObject({ email: "owner@example.com", role: "owner" });
    expect(client.calls).toEqual([
      ["user_id", "auth-user-1"],
      ["email", "owner@example.com"],
    ]);
  });

  it("saves admin profiles with email only", async () => {
    const upsert = vi.fn(() => ({
      select: () => ({
        single: async () => ({ data: { id: "profile-1" }, error: null }),
      }),
    }));
    const client = {
      from: vi.fn(() => ({ upsert })),
    };

    await saveAdminProfile(
      {
        email: "editor@example.com",
        display_name: "Editor",
        role: "editor",
        status: "active",
      },
      client,
    );

    expect(upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: null,
        email: "editor@example.com",
        role: "editor",
      }),
      { onConflict: "email" },
    );
  });

  it("uploads media files and returns the public URL", async () => {
    let uploadedPath = "";
    const upload = vi.fn(async (path) => {
      uploadedPath = path;
      return {
        data: { path },
        error: null,
      };
    });
    const getPublicUrl = vi.fn((path) => ({
      data: {
        publicUrl: `https://example.supabase.co/storage/v1/object/public/kooffee-media/${path}`,
      },
    }));
    const client = {
      storage: {
        from: vi.fn(() => ({
          upload,
          getPublicUrl,
        })),
      },
    };
    const file = new File(["image"], "Quiet Table.JPG", { type: "image/jpeg" });

    const result = await uploadMediaFile(file, { client, folder: "moments" });

    expect(result).toEqual({
      storage_path: uploadedPath,
      public_url: `https://example.supabase.co/storage/v1/object/public/kooffee-media/${uploadedPath}`,
    });
    expect(client.storage.from).toHaveBeenCalledWith("kooffee-media");
    expect(upload).toHaveBeenCalledWith(
      expect.stringMatching(/^moments\/quiet-table-[a-z0-9]+\.jpg$/),
      file,
      { cacheControl: "3600", upsert: false },
    );
    expect(getPublicUrl).toHaveBeenCalledWith(uploadedPath);
  });
});
