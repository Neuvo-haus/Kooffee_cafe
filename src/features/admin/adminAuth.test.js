import { describe, expect, it } from "vitest";
import {
  canManageAdmins,
  canWriteContent,
  getAdminAccessState,
} from "./adminAuth";

describe("admin auth helpers", () => {
  it("blocks signed-out visitors from admin routes", () => {
    expect(getAdminAccessState({ session: null, profile: null })).toEqual({
      status: "signed_out",
      canAccessAdmin: false,
      canManageAdmins: false,
    });
  });

  it("blocks authenticated users without an admin profile", () => {
    expect(
      getAdminAccessState({
        session: { user: { id: "user-1" } },
        profile: null,
      }),
    ).toEqual({
      status: "not_admin",
      canAccessAdmin: false,
      canManageAdmins: false,
    });
  });

  it("allows owners to access admin management", () => {
    const profile = { role: "owner", status: "active" };

    expect(canWriteContent(profile)).toBe(true);
    expect(canManageAdmins(profile)).toBe(true);
    expect(
      getAdminAccessState({
        session: { user: { id: "owner-1" } },
        profile,
      }),
    ).toEqual({
      status: "allowed",
      canAccessAdmin: true,
      canManageAdmins: true,
    });
  });

  it("allows editors to write content but not manage admins", () => {
    const profile = { role: "editor", status: "active" };

    expect(canWriteContent(profile)).toBe(true);
    expect(canManageAdmins(profile)).toBe(false);
  });
});
