export const ADMIN_ROLES = {
  owner: "owner",
  editor: "editor",
};

const ACTIVE_STATUS = "active";

export const isActiveAdmin = (profile) =>
  Boolean(
    profile &&
      profile.status === ACTIVE_STATUS &&
      (profile.role === ADMIN_ROLES.owner || profile.role === ADMIN_ROLES.editor),
  );

export const canWriteContent = (profile) => isActiveAdmin(profile);

export const canManageAdmins = (profile) =>
  Boolean(profile && profile.status === ACTIVE_STATUS && profile.role === ADMIN_ROLES.owner);

export const getAdminAccessState = ({ session, profile }) => {
  if (!session?.user) {
    return {
      status: "signed_out",
      canAccessAdmin: false,
      canManageAdmins: false,
    };
  }

  if (!isActiveAdmin(profile)) {
    return {
      status: "not_admin",
      canAccessAdmin: false,
      canManageAdmins: false,
    };
  }

  return {
    status: "allowed",
    canAccessAdmin: true,
    canManageAdmins: canManageAdmins(profile),
  };
};
