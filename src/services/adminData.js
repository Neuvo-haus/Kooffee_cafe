import {
  normalizeCafeSections,
  normalizeCategoryPayload,
  normalizeContentPayload,
  normalizeHomepageSections,
  normalizeMediaAssetPayload,
  normalizeMenuItemPayload,
  normalizeReservationUpdate,
  normalizeSiteBasicsPayload,
  normalizeTestimonialUpdate,
} from "../features/admin/cms";
import { emailJs } from "./emailJs";
import { requireAdminSupabase } from "./adminSupabase";

const MEDIA_BUCKET = "kooffee-media";
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const MAX_VIDEO_BYTES = 25 * 1024 * 1024;
const IMAGE_EXTENSIONS = new Set(["avif", "gif", "jpeg", "jpg", "png", "webp"]);
const VIDEO_EXTENSIONS = new Set(["mp4", "mov", "webm"]);
const DEFAULT_DASHBOARD_PRIORITIES = [
  { label: "Review reservations", path: "/admin/reservations", enabled: true },
  { label: "Moderate testimonials", path: "/admin/testimonials", enabled: true },
  { label: "Add menu item", path: "/admin/menu", enabled: true },
  { label: "Update homepage", path: "/admin/home", enabled: true },
];

const requireData = ({ data, error }) => {
  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
};

const writeAuditLog = async (
  client,
  { action, entityTable, entityId = null, metadata = {} },
) => {
  if (entityTable === "audit_log") {
    return;
  }

  try {
    const request = client.from("audit_log");

    if (typeof request.insert !== "function") {
      return;
    }

    const { error } = await request.insert({
      action,
      entity_table: entityTable,
      entity_id: entityId,
      metadata,
    });

    if (error) {
      console.warn("Could not write admin audit log:", error.message);
    }
  } catch (error) {
    console.warn(
      "Could not write admin audit log:",
      error instanceof Error ? error.message : error,
    );
  }
};

const updateRow = async (table, id, values, client = requireAdminSupabase()) => {
  const row = requireData(
    await client
      .from(table)
      .update({ ...values, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single(),
  );
  await writeAuditLog(client, {
    action: "update",
    entityTable: table,
    entityId: row.id ?? id,
    metadata: { fields: Object.keys(values) },
  });
  return row;
};

const upsertRow = async (table, values, client = requireAdminSupabase(), options) => {
  const row = requireData(await client.from(table).upsert(values, options).select().single());
  await writeAuditLog(client, {
    action: "upsert",
    entityTable: table,
    entityId: row.id ?? values.id ?? null,
    metadata: { fields: Object.keys(values) },
  });
  return row;
};

const deleteRow = async (table, id, client = requireAdminSupabase()) => {
  const request = client.from(table).delete().eq("id", id).select("id");

  const { data, error } = await request;

  if (error) {
    throw new Error(error.message);
  }

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error(`No ${table} row was deleted. Check Supabase delete policies.`);
  }

  await writeAuditLog(client, {
    action: "delete",
    entityTable: table,
    entityId: data[0]?.id ?? id,
  });

  return data;
};

const getFileExtension = (fileName) => {
  const extension = String(fileName ?? "").split(".").pop();
  return extension && extension !== fileName ? extension.toLowerCase() : "jpg";
};

const slugifyFileName = (fileName) =>
  String(fileName ?? "image")
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 70) || "image";

const randomSuffix = () => Math.random().toString(36).slice(2, 10);

const inferUploadKind = (file, requestedKind = "image") => {
  const type = String(file.type ?? "").toLowerCase();
  const kind = String(requestedKind ?? "").toLowerCase();

  if (kind.includes("video") || type.startsWith("video/")) {
    return "video";
  }

  return "image";
};

const validateUploadFile = (file, kind) => {
  const extension = getFileExtension(file.name);
  const type = String(file.type ?? "").toLowerCase();
  const isImage = kind === "image";
  const allowedExtensions = isImage ? IMAGE_EXTENSIONS : VIDEO_EXTENSIONS;
  const maxSize = isImage ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES;
  const typeMatches = type
    ? type.startsWith(isImage ? "image/" : "video/")
    : allowedExtensions.has(extension);

  if (!typeMatches || !allowedExtensions.has(extension)) {
    throw new Error(isImage ? "Upload an image file." : "Upload a video file.");
  }

  if (file.size > maxSize) {
    throw new Error(isImage ? "Images must be 8 MB or smaller." : "Videos must be 25 MB or smaller.");
  }
};

const normalizeDashboardPriorities = (items) => {
  const normalized = (Array.isArray(items) ? items : [])
    .map((item) => ({
      label: String(item?.label ?? "").trim(),
      path: String(item?.path ?? "").trim(),
      enabled: item?.enabled !== false,
    }))
    .filter((item) => item.label && item.path)
    .slice(0, 6);

  return normalized.length > 0 ? normalized : DEFAULT_DASHBOARD_PRIORITIES;
};

export const fetchAdminProfile = async (user, client = requireAdminSupabase()) => {
  const userId = typeof user === "string" ? user : user?.id;
  const email = typeof user === "string" ? "" : String(user?.email ?? "").trim();

  if (!userId && !email) {
    return null;
  }

  const selectProfile = () =>
    client
      .from("admin_profiles")
      .select("id,user_id,email,display_name,role,status,created_at,updated_at");

  const { data, error } = userId
    ? await selectProfile().eq("user_id", userId).maybeSingle()
    : { data: null, error: null };

  if (error) {
    throw new Error(error.message);
  }

  if (data || !email) {
    return data;
  }

  const { data: emailData, error: emailError } = await selectProfile()
    .eq("email", email)
    .maybeSingle();

  if (emailError) {
    throw new Error(emailError.message);
  }

  return emailData;
};

export const fetchDashboardStats = async (client = requireAdminSupabase()) => {
  const [reservations, testimonials, menuDrafts, recentEdits, dashboardPriorities] = await Promise.all([
    client.from("reservations").select("id", { count: "exact", head: true }).eq("status", "pending"),
    client.from("testimonials").select("id", { count: "exact", head: true }).eq("status", "pending"),
    client.from("menu_items").select("id", { count: "exact", head: true }).eq("status", "draft"),
    client
      .from("audit_log")
      .select("id,action,entity_table,entity_id,created_at")
      .order("created_at", { ascending: false })
      .limit(6),
    client.from("site_settings").select("value").eq("key", "dashboard_priorities").maybeSingle(),
  ]);

  return {
    pendingReservations: reservations.count ?? 0,
    pendingTestimonials: testimonials.count ?? 0,
    draftContent: menuDrafts.count ?? 0,
    recentEdits: requireData(recentEdits),
    priorities: normalizeDashboardPriorities(dashboardPriorities.data?.value?.items),
  };
};

export const listRows = async (table, query = (request) => request, client = requireAdminSupabase()) =>
  requireData(await query(client.from(table).select("*")));

export const updateReservation = async (
  reservation,
  input,
  { client = requireAdminSupabase(), emailClient = emailJs } = {},
) => {
  const values = normalizeReservationUpdate(input);
  const updated = await updateRow("reservations", reservation.id, values, client);

  if (reservation.email && values.status !== reservation.status) {
    await emailClient.sendReservationStatusEmail?.({
      ...reservation,
      ...updated,
    });
  }

  return updated;
};

export const updateTestimonial = (id, input, client = requireAdminSupabase()) =>
  updateRow("testimonials", id, normalizeTestimonialUpdate(input), client);

export const deleteTestimonial = (id, client = requireAdminSupabase()) =>
  deleteRow("testimonials", id, client);

export const saveMenuCategory = (input, client = requireAdminSupabase()) =>
  upsertRow("menu_categories", normalizeCategoryPayload(input), client);

export const saveMenuItem = (input, client = requireAdminSupabase()) =>
  upsertRow("menu_items", normalizeMenuItemPayload(input), client);

export const deleteMenuCategory = (id, client = requireAdminSupabase()) =>
  deleteRow("menu_categories", id, client);

export const deleteMenuItem = (id, client = requireAdminSupabase()) =>
  deleteRow("menu_items", id, client);

export const saveMediaAsset = (input, client = requireAdminSupabase()) =>
  upsertRow("media_assets", normalizeMediaAssetPayload(input), client);

export const uploadMediaFile = async (
  file,
  { client = requireAdminSupabase(), folder = "moments", kind = "image" } = {},
) => {
  if (!file) {
    throw new Error(kind === "video" ? "Choose a video before uploading." : "Choose an image before uploading.");
  }

  const uploadKind = inferUploadKind(file, kind);
  validateUploadFile(file, uploadKind);
  const extension = getFileExtension(file.name);
  const baseName = slugifyFileName(file.name);
  const storagePath = `${folder}/${baseName}-${randomSuffix()}.${extension}`;
  const bucket = client.storage.from(MEDIA_BUCKET);
  const { data, error } = await bucket.upload(storagePath, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    throw new Error(error.message);
  }

  const finalPath = data?.path || storagePath;
  const { data: publicData } = bucket.getPublicUrl(finalPath);

  return {
    storage_path: finalPath,
    public_url: publicData.publicUrl,
  };
};

export const saveContentSection = (input, client = requireAdminSupabase()) =>
  upsertRow("homepage_sections", normalizeContentPayload(input), client);

export const saveHomepageSections = (input, client = requireAdminSupabase()) =>
  Promise.all(
    normalizeHomepageSections(input).map((section) =>
      upsertRow("homepage_sections", section, client, { onConflict: "key" }),
    ),
  );

export const saveCafeContent = (input, client = requireAdminSupabase()) =>
  upsertRow("cafe_content", normalizeContentPayload(input), client);

export const saveCafeSections = (input, client = requireAdminSupabase()) =>
  Promise.all(
    normalizeCafeSections(input).map((section) =>
      upsertRow("cafe_content", section, client, { onConflict: "key" }),
    ),
  );

export const saveSiteSetting = (input, client = requireAdminSupabase()) =>
  upsertRow(
    "site_settings",
    {
      key: String(input.key ?? "").trim(),
      value: input.value && typeof input.value === "object" ? input.value : {},
      status: input.status || "published",
      updated_at: new Date().toISOString(),
    },
    client,
  );

export const saveSiteBasics = (input, client = requireAdminSupabase()) =>
  saveSiteSetting(normalizeSiteBasicsPayload(input), client);

export const saveDashboardPriorities = (items, client = requireAdminSupabase()) =>
  saveSiteSetting(
    {
      key: "dashboard_priorities",
      value: { items: normalizeDashboardPriorities(items) },
      status: "published",
    },
    client,
  );

export const saveAdminProfile = (input, client = requireAdminSupabase()) =>
  upsertRow(
    "admin_profiles",
    {
      id: input.id,
      user_id: String(input.user_id ?? "").trim() || null,
      email: String(input.email ?? "").trim(),
      display_name: String(input.display_name ?? "").trim(),
      role: input.role === "owner" ? "owner" : "editor",
      status: input.status || "active",
      updated_at: new Date().toISOString(),
    },
    client,
    { onConflict: "email" },
  );
