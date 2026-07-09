import { groupMenuItemsByCategory, toMomentPublicAsset } from "../features/admin/cms";
import { supabaseRest } from "./supabaseRest";

const safeSelect = async (table, query, fallback, client = supabaseRest) => {
  if (!client.isConfigured) {
    return fallback;
  }

  try {
    const rows = await client.select(table, query);
    return rows.length > 0 ? rows : fallback;
  } catch {
    return fallback;
  }
};

export const fetchPublishedMenu = async (fallback, client = supabaseRest) => {
  const [categories, items] = await Promise.all([
    safeSelect(
      "menu_categories",
      "select=id,name,slug,description,image_url,video_url,image_position_x,image_position_y,sort_order,status&status=eq.published&order=sort_order.asc",
      [],
      client,
    ),
    safeSelect(
      "menu_items",
      "select=id,category_id,name,description,price_inr,dietary_tags,image_url,image_position_x,image_position_y,is_available,sort_order,status&status=eq.published&is_available=eq.true&order=sort_order.asc",
      [],
      client,
    ),
  ]);

  const cmsMenu = groupMenuItemsByCategory(categories, items);
  return cmsMenu.length > 0 ? cmsMenu : fallback;
};

export const fetchPublishedMoments = async (fallback, client = supabaseRest) => {
  const rows = await safeSelect(
    "media_assets",
    "select=id,title,alt_text,caption,public_url,image_position_x,image_position_y,sort_order,status,category:moment_categories(name)&status=eq.published&order=sort_order.asc",
    [],
    client,
  );

  return rows.length > 0 ? rows.map(toMomentPublicAsset) : fallback;
};

export const fetchPublishedSections = async (table, fallback, client = supabaseRest) =>
  safeSelect(
    table,
    "select=id,key,title,eyebrow,body,data,status,updated_at&status=eq.published&order=key.asc",
    fallback,
    client,
  );
