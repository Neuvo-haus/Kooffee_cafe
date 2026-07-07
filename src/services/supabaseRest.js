const MISSING_SUPABASE_MESSAGE =
  "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local.";

const trimTrailingSlash = (value) => String(value ?? "").replace(/\/+$/, "");

const getViteEnv = () => {
  if (typeof import.meta === "undefined" || !import.meta.env) {
    return {};
  }

  return import.meta.env;
};

export const createSupabaseRestClient = ({
  url = getViteEnv().VITE_SUPABASE_URL,
  anonKey = getViteEnv().VITE_SUPABASE_ANON_KEY,
  fetchImpl = globalThis.fetch,
} = {}) => {
  const cleanUrl = trimTrailingSlash(url);
  const cleanAnonKey = String(anonKey ?? "").trim();
  const isConfigured = Boolean(cleanUrl && cleanAnonKey);

  const requireConfigured = () => {
    if (!isConfigured) {
      throw new Error(MISSING_SUPABASE_MESSAGE);
    }

    if (typeof fetchImpl !== "function") {
      throw new Error("Fetch is not available in this environment.");
    }
  };

  const request = async (table, options) => {
    requireConfigured();

    const response = await fetchImpl(`${cleanUrl}/rest/v1/${table}`, {
      ...options,
      headers: {
        apikey: cleanAnonKey,
        Authorization: `Bearer ${cleanAnonKey}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      let message = "Supabase request failed.";

      try {
        const body = await response.json();
        message = body.message || body.error || message;
      } catch {
        message = response.statusText || message;
      }

      throw new Error(message);
    }

    if (response.status === 204) {
      return [];
    }

    const text = await response.text();

    if (!text) {
      return [];
    }

    return JSON.parse(text);
  };

  return {
    isConfigured,
    requireConfigured,
    insert(table, row, { returnRepresentation = true } = {}) {
      return request(table, {
        method: "POST",
        headers: {
          Prefer: returnRepresentation ? "return=representation" : "return=minimal",
        },
        body: JSON.stringify(row),
      });
    },
    select(table, query = "") {
      const suffix = query ? `?${query}` : "";

      return request(`${table}${suffix}`, {
        method: "GET",
      });
    },
    invoke(functionName, body) {
      requireConfigured();

      return fetchImpl(`${cleanUrl}/functions/v1/${functionName}`, {
        method: "POST",
        headers: {
          apikey: cleanAnonKey,
          Authorization: `Bearer ${cleanAnonKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then(async (response) => {
        const text = await response.text();
        const data = text ? JSON.parse(text) : {};

        if (!response.ok) {
          throw new Error(data.error || data.message || "Supabase function request failed.");
        }

        return data;
      });
    },
  };
};

export const supabaseRest = createSupabaseRestClient();
export { MISSING_SUPABASE_MESSAGE };
