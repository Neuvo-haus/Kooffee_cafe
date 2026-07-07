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

const requireData = ({ data, error }) => {
  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
};

const updateRow = async (table, id, values, client = requireAdminSupabase()) =>
  requireData(
    await client
      .from(table)
      .update({ ...values, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single(),
  );

const upsertRow = async (table, values, client = requireAdminSupabase(), options) =>
  requireData(await client.from(table).upsert(values, options).select().single());

const deleteRow = async (table, id, client = requireAdminSupabase()) =>
  (() => {
    const request = client.from(table).delete().eq("id", id).select("id");

    return request.then(({ data, error }) => {
      if (error) {
        throw new Error(error.message);
      }

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error(`No ${table} row was deleted. Check Supabase delete policies.`);
      }

      return data;
    });
  })();

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
  const [reservations, testimonials, menuDrafts, recentEdits] = await Promise.all([
    client.from("reservations").select("id", { count: "exact", head: true }).eq("status", "pending"),
    client.from("testimonials").select("id", { count: "exact", head: true }).eq("status", "pending"),
    client.from("menu_items").select("id", { count: "exact", head: true }).eq("status", "draft"),
    client
      .from("audit_log")
      .select("id,action,entity_table,entity_id,created_at")
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  return {
    pendingReservations: reservations.count ?? 0,
    pendingTestimonials: testimonials.count ?? 0,
    draftContent: menuDrafts.count ?? 0,
    recentEdits: requireData(recentEdits),
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

export const saveMediaAsset = (input, client = requireAdminSupabase()) =>
  upsertRow("media_assets", normalizeMediaAssetPayload(input), client);

export const uploadMediaFile = async (
  file,
  { client = requireAdminSupabase(), folder = "moments" } = {},
) => {
  if (!file) {
    throw new Error("Choose an image before uploading.");
  }

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
