import { describe, expect, it, vi } from "vitest";
import {
  deleteTestimonial,
  deleteMenuCategory,
  deleteMenuItem,
  fetchAdminProfile,
  fetchDashboardStats,
  saveMenuItem,
  saveAdminProfile,
  saveDashboardPriorities,
  uploadMediaFile,
} from "./adminData";

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

  it("rejects unsupported upload types and oversized files before storage", async () => {
    const client = {
      storage: {
        from: vi.fn(),
      },
    };
    const textFile = new File(["notes"], "notes.txt", { type: "text/plain" });
    const largeVideo = new File(["video"], "large.mp4", { type: "video/mp4" });
    Object.defineProperty(largeVideo, "size", { value: 26 * 1024 * 1024 });

    await expect(
      uploadMediaFile(textFile, { client, folder: "moments", kind: "image" }),
    ).rejects.toThrow("Upload an image file.");
    await expect(
      uploadMediaFile(largeVideo, { client, folder: "menu", kind: "video" }),
    ).rejects.toThrow("Videos must be 25 MB or smaller.");
    expect(client.storage.from).not.toHaveBeenCalled();
  });

  it("writes audit log entries after menu item saves and deletes", async () => {
    const auditInsert = vi.fn(async () => ({ data: null, error: null }));
    const upsert = vi.fn(() => ({
      select: () => ({
        single: async () => ({ data: { id: "item-1", name: "Latte" }, error: null }),
      }),
    }));
    const selectDeleted = vi.fn(async () => ({ data: [{ id: "item-1" }], error: null }));
    const remove = vi.fn(() => ({ eq: vi.fn(() => ({ select: selectDeleted })) }));
    const client = {
      from: vi.fn((table) => {
        if (table === "audit_log") {
          return { insert: auditInsert };
        }
        if (table === "menu_items") {
          return { upsert, delete: remove };
        }
        return {};
      }),
    };

    await saveMenuItem(
      {
        category_id: "cat-1",
        name: "Latte",
        description: "Milk coffee",
        price: "240",
        is_available: true,
        status: "published",
      },
      client,
    );
    await deleteMenuItem("item-1", client);

    expect(auditInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "upsert",
        entity_table: "menu_items",
        entity_id: "item-1",
      }),
    );
    expect(auditInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "delete",
        entity_table: "menu_items",
        entity_id: "item-1",
      }),
    );
  });

  it("deletes menu categories by id", async () => {
    const select = vi.fn(async () => ({ data: [{ id: "cat-1" }], error: null }));
    const remove = vi.fn(() => ({ eq: vi.fn(() => ({ select })) }));
    const insert = vi.fn(async () => ({ data: null, error: null }));
    const client = {
      from: vi.fn((table) => (
        table === "audit_log"
          ? { insert }
          : { delete: remove }
      )),
    };

    await deleteMenuCategory("cat-1", client);

    expect(remove).toHaveBeenCalled();
    expect(select).toHaveBeenCalledWith("id");
    expect(client.from).toHaveBeenCalledWith("menu_categories");
  });

  it("loads editable dashboard priorities with fallback stats", async () => {
    const queries = {
      reservations: {
        select: vi.fn(() => ({ eq: vi.fn(async () => ({ count: 2, error: null })) })),
      },
      testimonials: {
        select: vi.fn(() => ({ eq: vi.fn(async () => ({ count: 1, error: null })) })),
      },
      menu_items: {
        select: vi.fn(() => ({ eq: vi.fn(async () => ({ count: 3, error: null })) })),
      },
      audit_log: {
        select: vi.fn(() => ({
          order: vi.fn(() => ({
            limit: vi.fn(async () => ({ data: [{ id: "edit-1", action: "updated" }], error: null })),
          })),
        })),
      },
      site_settings: {
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            maybeSingle: vi.fn(async () => ({
              data: {
                value: {
                  items: [
                    { label: " Check bookings ", path: " /admin/reservations ", enabled: true },
                    { label: "", path: "/admin/menu", enabled: true },
                  ],
                },
              },
              error: null,
            })),
          })),
        })),
      },
    };
    const client = {
      from: vi.fn((table) => queries[table]),
    };

    const stats = await fetchDashboardStats(client);

    expect(stats).toMatchObject({
      pendingReservations: 2,
      pendingTestimonials: 1,
      draftContent: 3,
      priorities: [{ label: "Check bookings", path: "/admin/reservations", enabled: true }],
    });
    expect(client.from).toHaveBeenCalledWith("site_settings");
  });

  it("saves dashboard priorities into site settings", async () => {
    const upsert = vi.fn(() => ({
      select: () => ({
        single: async () => ({ data: { key: "dashboard_priorities" }, error: null }),
      }),
    }));
    const client = {
      from: vi.fn(() => ({ upsert })),
    };

    await saveDashboardPriorities(
      [
        { label: " Review testimonials ", path: " /admin/testimonials ", enabled: true },
        { label: "Broken", path: "", enabled: true },
      ],
      client,
    );

    expect(upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        key: "dashboard_priorities",
        status: "published",
        value: {
          items: [{ label: "Review testimonials", path: "/admin/testimonials", enabled: true }],
        },
      }),
      undefined,
    );
  });

  it("deletes testimonials by id", async () => {
    const select = vi.fn(async () => ({ data: [{ id: "testimonial-1" }], error: null }));
    const remove = vi.fn(() => ({ eq: vi.fn(() => ({ select })) }));
    const client = {
      from: vi.fn(() => ({ delete: remove })),
    };

    await deleteTestimonial("testimonial-1", client);

    expect(remove).toHaveBeenCalled();
    expect(select).toHaveBeenCalledWith("id");
    expect(client.from).toHaveBeenCalledWith("testimonials");
  });
});
