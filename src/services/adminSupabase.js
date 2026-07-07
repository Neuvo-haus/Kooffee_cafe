import { createClient } from "@supabase/supabase-js";

const getViteEnv = () => {
  if (typeof import.meta === "undefined" || !import.meta.env) {
    return {};
  }

  return import.meta.env;
};

const supabaseUrl = String(getViteEnv().VITE_SUPABASE_URL ?? "").trim();
const supabaseAnonKey = String(getViteEnv().VITE_SUPABASE_ANON_KEY ?? "").trim();

export const isAdminSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const adminSupabase = isAdminSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

export const requireAdminSupabase = () => {
  if (!adminSupabase) {
    throw new Error(
      "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local.",
    );
  }

  return adminSupabase;
};
