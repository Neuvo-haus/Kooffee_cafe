import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";
import {
  FiCalendar,
  FiCheckCircle,
  FiCoffee,
  FiEdit3,
  FiGrid,
  FiHome,
  FiImage,
  FiLogOut,
  FiMenu,
  FiSettings,
  FiShield,
  FiStar,
  FiUserPlus,
  FiX,
} from "react-icons/fi";
import { canManageAdmins, getAdminAccessState } from "./features/admin/adminAuth";
import {
  fetchAdminProfile,
  fetchDashboardStats,
  deleteTestimonial,
  listRows,
  saveAdminProfile,
  saveCafeSections,
  saveHomepageSections,
  saveMediaAsset,
  saveMenuCategory,
  saveMenuItem,
  saveSiteBasics,
  saveSiteSetting,
  updateReservation,
  updateTestimonial,
  uploadMediaFile,
} from "./services/adminData";
import { adminSupabase, isAdminSupabaseConfigured } from "./services/adminSupabase";

const panel = "border border-[rgba(226,221,213,0.8)] bg-[rgba(250,247,242,0.92)] shadow-sm";
const inputClass =
  "w-full rounded-lg border border-[rgba(226,221,213,0.9)] bg-[rgba(245,240,232,0.7)] px-3 py-2 text-sm text-[rgba(28,28,26,1)] outline-none focus:border-[#C4A882]";
const roomyInputClass =
  "w-full rounded-lg border border-[rgba(226,221,213,0.9)] bg-[rgba(245,240,232,0.7)] px-4 py-3 text-base leading-7 text-[rgba(28,28,26,1)] outline-none focus:border-[#C4A882]";
const buttonClass =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[rgba(28,28,26,0.12)] px-4 text-xs font-bold uppercase tracking-[0.18em] transition-colors hover:border-[#C4A882] hover:text-[#8C6D46]";
const destructiveButton =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[rgba(153,27,27,0.18)] px-4 text-xs font-bold uppercase tracking-[0.18em] text-red-700 transition-colors hover:border-red-300 hover:text-red-900";
const primaryButton =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[rgba(28,28,26,1)] px-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#8C6D46]";
const editorPanel = "border border-[rgba(226,221,213,0.8)] bg-[rgba(250,247,242,0.92)] shadow-sm rounded-lg p-6 md:p-8";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: FiGrid, end: true },
  { to: "/admin/reservations", label: "Reservations", icon: FiCalendar },
  { to: "/admin/testimonials", label: "Testimonials", icon: FiStar },
  { to: "/admin/menu", label: "Menu", icon: FiCoffee },
  { to: "/admin/moments", label: "Moments", icon: FiImage },
  { to: "/admin/home", label: "Homepage", icon: FiHome },
  { to: "/admin/cafe", label: "Cafe", icon: FiEdit3 },
  { to: "/admin/settings", label: "Settings", icon: FiSettings },
  { to: "/admin/admins", label: "Admins", icon: FiShield, ownerOnly: true },
];

const useAdminSession = () => {
  const [state, setState] = useState({
    loading: true,
    session: null,
    profile: null,
    error: "",
  });

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!adminSupabase) {
        setState({ loading: false, session: null, profile: null, error: "" });
        return;
      }

      try {
        const { data, error } = await adminSupabase.auth.getSession();
        if (error) throw error;
        const profile = await fetchAdminProfile(data.session?.user, adminSupabase);
        if (!cancelled) {
          setState({ loading: false, session: data.session, profile, error: "" });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            loading: false,
            session: null,
            profile: null,
            error: error instanceof Error ? error.message : "Could not load admin session.",
          });
        }
      }
    };

    load();
    const { data: listener } =
      adminSupabase?.auth.onAuthStateChange((_event, session) => {
        fetchAdminProfile(session?.user, adminSupabase)
          .then((profile) => setState({ loading: false, session, profile, error: "" }))
          .catch((error) =>
            setState({
              loading: false,
              session,
              profile: null,
              error: error instanceof Error ? error.message : "Could not load admin profile.",
            }),
          );
      }) ?? {};

    return () => {
      cancelled = true;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  return state;
};

const Spinner = ({ label = "Loading" }) => (
  <div className="flex min-h-[45vh] items-center justify-center text-sm uppercase tracking-[0.2em] text-[rgba(100,96,88,1)]">
    {label}
  </div>
);

const StatusChip = ({ status }) => (
  <span className="inline-flex rounded-full border border-[rgba(226,221,213,0.8)] bg-[rgba(245,240,232,0.75)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[rgba(100,96,88,1)]">
    {status}
  </span>
);

const TextField = ({ label, as = "input", className = "", controlClassName = inputClass, ...props }) => {
  const Control = as;
  return (
    <label className={`flex flex-col gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[rgba(100,96,88,1)] ${className}`}>
      {label}
      <Control className={controlClassName} {...props} />
    </label>
  );
};

const RoomyTextField = (props) => (
  <TextField controlClassName={roomyInputClass} {...props} />
);

const EditorSection = ({ title, eyebrow, children }) => (
  <section className={editorPanel}>
    <div className="mb-6 flex flex-col gap-1 border-b border-[rgba(226,221,213,0.72)] pb-4">
      {eyebrow && (
        <p className="font-dmsans text-[10px] font-bold uppercase tracking-[0.22em] text-[rgba(100,96,88,1)]">
          {eyebrow}
        </p>
      )}
      <h3 className="font-['Cormorant_Garamond'] text-3xl italic md:text-4xl">{title}</h3>
    </div>
    {children}
  </section>
);

const SelectField = ({ label, children, ...props }) => (
  <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[rgba(100,96,88,1)]">
    {label}
    <select className={inputClass} {...props}>
      {children}
    </select>
  </label>
);

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!adminSupabase) {
        throw new Error("Supabase is not configured for admin login.");
      }

      const { error } = await adminSupabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate("/admin");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[rgba(245,240,232,1)] px-6">
      <form onSubmit={submit} className={`${panel} flex w-full max-w-md flex-col gap-6 rounded-lg p-8`}>
        <div>
          <p className="font-dmsans text-xs uppercase tracking-[0.24em] text-[rgba(100,96,88,1)]">
            Kooffee CMS
          </p>
          <h1 className="mt-3 font-['Cormorant_Garamond'] text-4xl italic text-[rgba(28,28,26,1)]">
            Admin login
          </h1>
        </div>
        {!isAdminSupabaseConfigured && (
          <p className="rounded-lg border border-[#C4A882] bg-[#fff8ee] p-3 text-sm text-[rgba(100,96,88,1)]">
            Add Supabase URL and anon key to `.env.local` before signing in.
          </p>
        )}
        <TextField label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {error && <p className="text-sm text-red-700">{error}</p>}
        <button className={primaryButton} disabled={loading} type="submit">
          {loading ? "Signing in" : "Sign in"}
        </button>
      </form>
    </main>
  );
};

const RequireAdmin = ({ children, ownerOnly = false }) => {
  const sessionState = useAdminSession();

  if (sessionState.loading) {
    return <Spinner label="Checking admin access" />;
  }

  const access = getAdminAccessState(sessionState);
  if (access.status === "signed_out") {
    return <Navigate to="/admin/login" replace />;
  }

  if (!access.canAccessAdmin || (ownerOnly && !access.canManageAdmins)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[rgba(245,240,232,1)] px-6">
        <div className={`${panel} max-w-lg rounded-lg p-8 text-center`}>
          <h1 className="font-['Cormorant_Garamond'] text-4xl italic">Access unavailable</h1>
          <p className="mt-3 text-sm leading-6 text-[rgba(100,96,88,1)]">
            This account is signed in but does not have the required Kooffee admin role.
          </p>
        </div>
      </main>
    );
  }

  return children(sessionState);
};

const AdminShell = ({ sessionState }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const visibleNav = navItems.filter((item) => !item.ownerOnly || canManageAdmins(sessionState.profile));

  const signOut = async () => {
    await adminSupabase?.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[rgba(245,240,232,1)] text-[rgba(28,28,26,1)]">
      <button
        className="fixed left-4 top-4 z-50 rounded-lg border border-[rgba(226,221,213,0.8)] bg-[rgba(250,247,242,0.95)] p-3 md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open admin navigation"
      >
        <FiMenu />
      </button>
      <AnimatePresence>
        {(open || window.innerWidth >= 768) && (
          <Motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className="fixed inset-y-0 left-0 z-40 w-72 border-r border-[rgba(226,221,213,0.8)] bg-[rgba(250,247,242,0.98)] p-5 md:translate-x-0"
          >
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="font-dmsans text-[10px] uppercase tracking-[0.24em] text-[rgba(100,96,88,1)]">
                  Kooffee
                </p>
                <h2 className="font-['Cormorant_Garamond'] text-3xl italic">CMS</h2>
              </div>
              <button className="md:hidden" onClick={() => setOpen(false)} aria-label="Close admin navigation">
                <FiX />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {visibleNav.map((item) => {
                const Icon = item.icon;
                const active = item.end
                  ? location.pathname === item.to
                  : location.pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors ${
                      active
                        ? "bg-[rgba(196,168,130,0.18)] text-[#8C6D46]"
                        : "text-[rgba(100,96,88,1)] hover:bg-[rgba(245,240,232,0.8)]"
                    }`}
                  >
                    <Icon /> {item.label}
                  </Link>
                );
              })}
            </nav>
            <button onClick={signOut} className={`${buttonClass} mt-8 w-full`}>
              <FiLogOut /> Sign out
            </button>
          </Motion.aside>
        )}
      </AnimatePresence>
      <main className="min-h-screen px-5 pb-10 pt-20 md:ml-72 md:px-8 md:pt-8">
        <div className="mb-8 flex flex-col justify-between gap-3 border-b border-[rgba(226,221,213,0.8)] pb-5 md:flex-row md:items-end">
          <div>
            <p className="font-dmsans text-xs uppercase tracking-[0.22em] text-[rgba(100,96,88,1)]">
              {sessionState.profile?.role} access
            </p>
            <h1 className="font-['Cormorant_Garamond'] text-4xl italic md:text-5xl">
              Kooffee admin
            </h1>
          </div>
          <Link className={buttonClass} to="/">
            Public site
          </Link>
        </div>
        <AdminRoutes profile={sessionState.profile} />
      </main>
    </div>
  );
};

const AdminRoutes = ({ profile }) => (
  <Routes>
    <Route index element={<Dashboard />} />
    <Route path="reservations" element={<ReservationsAdmin />} />
    <Route path="testimonials" element={<TestimonialsAdmin />} />
    <Route path="menu" element={<MenuAdmin />} />
    <Route path="moments" element={<MomentsAdmin />} />
    <Route path="home" element={<HomeAdmin />} />
    <Route path="cafe" element={<CafeAdmin />} />
    <Route path="settings" element={<SettingsAdmin />} />
    <Route path="admins" element={canManageAdmins(profile) ? <AdminsAdmin /> : <Navigate to="/admin" replace />} />
  </Routes>
);

const PageMotion = ({ children }) => {
  const reduced = useReducedMotion();
  return (
    <Motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={reduced ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
    >
      {children}
    </Motion.div>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchDashboardStats().then(setStats).catch(() => setStats({ pendingReservations: 0, pendingTestimonials: 0, draftContent: 0, recentEdits: [] }));
  }, []);

  if (!stats) return <Spinner />;

  const cards = [
    ["Pending reservations", stats.pendingReservations, FiCalendar, "/admin/reservations"],
    ["Pending testimonials", stats.pendingTestimonials, FiStar, "/admin/testimonials"],
    ["Draft menu items", stats.draftContent, FiCoffee, "/admin/menu"],
  ];

  return (
    <PageMotion>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map(([label, value, CardIcon, to]) => (
          <Link key={label} to={to} className={`${panel} rounded-lg p-5 transition-transform hover:-translate-y-1`}>
            {React.createElement(CardIcon, { className: "text-[#8C6D46]" })}
            <p className="mt-5 text-3xl font-semibold">{value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[rgba(100,96,88,1)]">{label}</p>
          </Link>
        ))}
      </div>
      <section className={`${panel} mt-6 rounded-lg p-5`}>
        <h2 className="font-['Cormorant_Garamond'] text-3xl italic">Recent edits</h2>
        <div className="mt-4 grid gap-3">
          {stats.recentEdits.length === 0 && <p className="text-sm text-[rgba(100,96,88,1)]">No edits logged yet.</p>}
          {stats.recentEdits.map((edit) => (
            <div key={edit.id} className="flex items-center justify-between border-t border-[rgba(226,221,213,0.7)] py-3 text-sm">
              <span>{edit.action} in {edit.entity_table}</span>
              <span className="text-[rgba(100,96,88,1)]">{new Date(edit.created_at).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </section>
    </PageMotion>
  );
};

const useRows = (loader) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const loaderRef = useRef(loader);

  useEffect(() => {
    loaderRef.current = loader;
  }, [loader]);

  const reload = useCallback(() => {
    setLoading(true);
    setError("");
    loaderRef.current()
      .then(setRows)
      .catch((error) => setError(error instanceof Error ? error.message : "Could not load rows."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    queueMicrotask(reload);
  }, [reload]);

  return { rows, loading, error, reload };
};

const Drawer = ({ title, children, onClose }) => (
  <AnimatePresence>
    <Motion.div className="fixed inset-0 z-50 flex justify-end bg-black/20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Motion.div
        initial={{ x: 420 }}
        animate={{ x: 0 }}
        exit={{ x: 420 }}
        className="h-full w-full max-w-lg overflow-y-auto border-l border-[rgba(226,221,213,0.8)] bg-[rgba(250,247,242,1)] p-6"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-['Cormorant_Garamond'] text-3xl italic">{title}</h2>
          <button onClick={onClose} className={buttonClass} aria-label="Close drawer"><FiX /></button>
        </div>
        {children}
      </Motion.div>
    </Motion.div>
  </AnimatePresence>
);

const ReservationsAdmin = () => {
  const { rows, loading, error, reload } = useRows(() =>
    listRows("reservations", (request) => request.select("*").order("requested_date", { ascending: true })),
  );
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("pending");
  const [notes, setNotes] = useState("");

  const open = (row) => {
    setSelected(row);
    setStatus(row.status);
    setNotes(row.staff_notes || "");
  };

  const save = async () => {
    await updateReservation(selected, { status, staff_notes: notes });
    setSelected(null);
    reload();
  };

  return (
    <CrudPage title="Reservations" loading={loading} error={error}>
      <DataTable
        columns={["Guest", "Date", "Party", "Status", ""]}
        rows={rows.map((row) => [
          <div><strong>{row.customer_name}</strong><p className="text-xs text-[rgba(100,96,88,1)]">{row.email}</p></div>,
          `${row.requested_date} ${row.requested_time}`,
          row.party_size,
          <StatusChip status={row.status} />,
          <button className={buttonClass} onClick={() => open(row)}><FiEdit3 /> Edit</button>,
        ])}
      />
      {selected && (
        <Drawer title="Reservation detail" onClose={() => setSelected(null)}>
          <div className="grid gap-4">
            <p className="text-sm text-[rgba(100,96,88,1)]">{selected.notes || "No guest notes."}</p>
            <SelectField label="Status" value={status} onChange={(event) => setStatus(event.target.value)}>
              {["pending", "confirmed", "declined", "cancelled"].map((value) => <option key={value}>{value}</option>)}
            </SelectField>
            <TextField label="Staff notes" as="textarea" rows="5" value={notes} onChange={(event) => setNotes(event.target.value)} />
            <button className={primaryButton} onClick={save}><FiCheckCircle /> Save status</button>
          </div>
        </Drawer>
      )}
    </CrudPage>
  );
};

const TestimonialsAdmin = () => {
  const { rows, loading, error, reload } = useRows(() =>
    listRows("testimonials", (request) => request.select("*").order("created_at", { ascending: false })),
  );
  const [actionError, setActionError] = useState("");
  const save = async (row, values) => {
    setActionError("");
    await updateTestimonial(row.id, { ...row, ...values });
    reload();
  };
  const remove = async (row) => {
    const confirmed = window.confirm(`Delete testimonial from ${row.customer_name}?`);

    if (!confirmed) {
      return;
    }

    setActionError("");

    try {
      await deleteTestimonial(row.id);
      reload();
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Could not delete testimonial.");
    }
  };

  return (
    <CrudPage title="Testimonials" loading={loading} error={error}>
      {actionError && <p className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{actionError}</p>}
      <DataTable
        columns={["Name", "Message", "Status", "Featured", "Actions"]}
        rows={rows.map((row) => [
          row.customer_name,
          <span className="line-clamp-2">{row.message}</span>,
          <StatusChip status={row.status} />,
          row.is_featured ? "Yes" : "No",
          <div className="flex flex-wrap gap-2">
            <button className={buttonClass} onClick={() => save(row, { status: "approved" })}>Approve</button>
            <button className={buttonClass} onClick={() => save(row, { status: "rejected" })}>Reject</button>
            <button className={buttonClass} onClick={() => save(row, { is_featured: !row.is_featured })}>Feature</button>
            <button className={destructiveButton} onClick={() => remove(row)}>Delete</button>
          </div>,
        ])}
      />
    </CrudPage>
  );
};

const MenuAdmin = () => {
  const categories = useRows(() => listRows("menu_categories", (request) => request.select("*").order("sort_order")));
  const items = useRows(() => listRows("menu_items", (request) => request.select("*").order("sort_order")));
  const [item, setItem] = useState({ status: "draft", is_available: true, sort_order: 0 });
  const [category, setCategory] = useState({ status: "published", sort_order: 0 });

  const saveItem = async () => {
    await saveMenuItem(item);
    setItem({ status: "draft", is_available: true, sort_order: 0 });
    items.reload();
  };

  const saveCategory = async () => {
    await saveMenuCategory(category);
    setCategory({ status: "published", sort_order: 0 });
    categories.reload();
  };

  return (
    <CrudPage title="Menu manager" loading={categories.loading || items.loading} error={categories.error || items.error}>
      <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
        <section className={`${panel} rounded-lg p-5`}>
          <h2 className="font-['Cormorant_Garamond'] text-3xl italic">Category</h2>
          <div className="mt-4 grid gap-3">
            <TextField label="Name" value={category.name || ""} onChange={(event) => setCategory({ ...category, name: event.target.value })} />
            <TextField label="Description" value={category.description || ""} onChange={(event) => setCategory({ ...category, description: event.target.value })} />
            <TextField label="Sort" type="number" value={category.sort_order || 0} onChange={(event) => setCategory({ ...category, sort_order: event.target.value })} />
            <button className={primaryButton} onClick={saveCategory}><FiCheckCircle /> Save category</button>
          </div>
        </section>
        <section className={`${panel} rounded-lg p-5`}>
          <h2 className="font-['Cormorant_Garamond'] text-3xl italic">Menu item</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <SelectField label="Category" value={item.category_id || ""} onChange={(event) => setItem({ ...item, category_id: event.target.value })}>
              <option value="">Choose category</option>
              {categories.rows.map((row) => <option key={row.id} value={row.id}>{row.name}</option>)}
            </SelectField>
            <TextField label="Name" value={item.name || ""} onChange={(event) => setItem({ ...item, name: event.target.value })} />
            <TextField label="Price" type="number" value={item.price || ""} onChange={(event) => setItem({ ...item, price: event.target.value })} />
            <TextField label="Dietary tags" value={item.dietary_tags || ""} onChange={(event) => setItem({ ...item, dietary_tags: event.target.value })} />
            <TextField label="Description" as="textarea" rows="3" value={item.description || ""} onChange={(event) => setItem({ ...item, description: event.target.value })} />
            <SelectField label="Status" value={item.status} onChange={(event) => setItem({ ...item, status: event.target.value })}>
              {["draft", "published", "archived"].map((value) => <option key={value}>{value}</option>)}
            </SelectField>
            <button className={primaryButton} onClick={saveItem}><FiCheckCircle /> Save item</button>
          </div>
        </section>
      </div>
      <DataTable columns={["Item", "Price", "Status"]} rows={items.rows.map((row) => [row.name, `₹${row.price_inr}`, <StatusChip status={row.status} />])} />
    </CrudPage>
  );
};

const MomentsAdmin = () => {
  const categories = useRows(() => listRows("moment_categories", (request) => request.select("*").order("sort_order")));
  const assets = useRows(() => listRows("media_assets", (request) => request.select("*").order("sort_order")));
  const [asset, setAsset] = useState({ status: "draft", sort_order: 0 });
  const [uploadState, setUploadState] = useState({ loading: false, error: "" });
  const progressLabel = uploadState.loading
    ? "Uploading photo"
    : asset.public_url
      ? "Ready to publish"
      : "Upload photo or paste URL";

  const uploadPhoto = async (file) => {
    if (!file) {
      return;
    }

    setUploadState({ loading: true, error: "" });

    try {
      const result = await uploadMediaFile(file, { folder: "moments" });
      setAsset((current) => ({
        ...current,
        public_url: result.public_url,
        storage_path: result.storage_path,
        title: current.title || file.name.replace(/\.[^.]+$/, ""),
        alt_text: current.alt_text || file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
      }));
      setUploadState({ loading: false, error: "" });
    } catch (error) {
      setUploadState({
        loading: false,
        error: error instanceof Error ? error.message : "Photo upload failed.",
      });
    }
  };

  const save = async () => {
    await saveMediaAsset(asset);
    setAsset({ status: "draft", sort_order: 0 });
    assets.reload();
  };

  return (
    <CrudPage title="Moments gallery" loading={categories.loading || assets.loading} error={categories.error || assets.error}>
      <section className={`${panel} rounded-lg p-5`}>
        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <h2 className="font-['Cormorant_Garamond'] text-3xl italic">Image asset</h2>
          <StatusChip status={progressLabel} />
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[rgba(100,96,88,1)] md:col-span-2">
            Upload photo
            <input
              className={inputClass}
              type="file"
              accept="image/*"
              disabled={uploadState.loading}
              onChange={(event) => uploadPhoto(event.target.files?.[0])}
            />
          </label>
          {uploadState.error && (
            <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 md:col-span-2">
              {uploadState.error}
            </p>
          )}
          {asset.public_url && (
            <div className="md:col-span-2 overflow-hidden rounded-lg border border-[rgba(226,221,213,0.8)] bg-[rgba(245,240,232,0.7)]">
              <img src={asset.public_url} alt={asset.alt_text || asset.title || "Uploaded moment"} className="h-56 w-full object-cover" />
            </div>
          )}
          <TextField label="Title" value={asset.title || ""} onChange={(event) => setAsset({ ...asset, title: event.target.value })} />
          <TextField label="Public URL" value={asset.public_url || ""} onChange={(event) => setAsset({ ...asset, public_url: event.target.value })} />
          <TextField label="Storage path" value={asset.storage_path || ""} onChange={(event) => setAsset({ ...asset, storage_path: event.target.value })} />
          <TextField label="Alt text" value={asset.alt_text || ""} onChange={(event) => setAsset({ ...asset, alt_text: event.target.value })} />
          <SelectField label="Category" value={asset.category_id || ""} onChange={(event) => setAsset({ ...asset, category_id: event.target.value })}>
            <option value="">Choose category</option>
            {categories.rows.map((row) => <option key={row.id} value={row.id}>{row.name}</option>)}
          </SelectField>
          <TextField label="Caption" value={asset.caption || ""} onChange={(event) => setAsset({ ...asset, caption: event.target.value })} />
          <SelectField label="Status" value={asset.status} onChange={(event) => setAsset({ ...asset, status: event.target.value })}>
            {["draft", "published", "archived"].map((value) => <option key={value}>{value}</option>)}
          </SelectField>
          <button className={primaryButton} onClick={save}><FiImage /> Save asset</button>
        </div>
      </section>
      <DataTable columns={["Title", "URL", "Status"]} rows={assets.rows.map((row) => [row.title, row.public_url, <StatusChip status={row.status} />])} />
    </CrudPage>
  );
};

const getSection = (rows, key) => rows.find((row) => row.key === key) || {};
const getCard = (section, index) => section.data?.cards?.[index] || {};
const getOffer = (section, index) => section.data?.offers?.[index] || {};

const HomeAdmin = () => {
  const { rows, loading, error, reload } = useRows(() => listRows("homepage_sections", (request) => request.select("*").order("key")));
  const hero = getSection(rows, "hero");
  const stayLonger = getSection(rows, "stay_longer");
  const dailyRitual = getSection(rows, "daily_ritual");
  const signatureOffering = getSection(rows, "signature_offering");
  const offers = getSection(rows, "offers");
  const notice = getSection(rows, "notice");
  const savedHome = useMemo(
    () => ({
      heroEyebrow: hero.eyebrow || "EST. AHMEDABAD",
      heroTitle: hero.title || "Kooffee cafe in Ahmedabad",
      heroSubtitle: hero.body || "Specialty coffee. Slow mornings. Open conversations.",
      primaryButtonLabel: hero.data?.primaryButtonLabel || "VIEW MENU",
      primaryButtonPath: hero.data?.primaryButtonPath || "/menu",
      stayTitle1: getCard(stayLonger, 0).title || "Slow Morning",
      stayBody1: getCard(stayLonger, 0).body || "A corner table reserved for no one. Stay as long as you need.",
      stayTitle2: getCard(stayLonger, 1).title || "Deep Conversation",
      stayBody2: getCard(stayLonger, 1).body || "Some tables face each other for a reason.",
      stayTitle3: getCard(stayLonger, 2).title || "Quick Focus",
      stayBody3: getCard(stayLonger, 2).body || "Plug in, tune out. A quiet corner with power outlets.",
      ritualTitle1: getCard(dailyRitual, 0).title || "Golden Hour",
      ritualBody1: getCard(dailyRitual, 0).body || "Morning specialty brews paired with fresh pastries.",
      ritualTime1: getCard(dailyRitual, 0).time || "7-10 AM",
      ritualTitle2: getCard(dailyRitual, 1).title || "Conversation Hour",
      ritualBody2: getCard(dailyRitual, 1).body || "Afternoon gatherings over long blacks and chai.",
      ritualTime2: getCard(dailyRitual, 1).time || "12-4 PM",
      ritualTitle3: getCard(dailyRitual, 2).title || "Quiet Hour",
      ritualBody3: getCard(dailyRitual, 2).body || "Work-friendly evenings with dim lights and deep focus.",
      ritualTime3: getCard(dailyRitual, 2).time || "6-9 PM",
      signatureEyebrow: signatureOffering.eyebrow || "SIGNATURE OFFERING",
      signatureTitle: signatureOffering.title || "What We Serve",
      signatureItemTitle1: signatureOffering.data?.items?.[0]?.title || "Espresso Macchiato",
      signatureItemBody1: signatureOffering.data?.items?.[0]?.body || "Rich espresso marked with a dollop of velvety foamed milk.",
      signatureItemPrice1: signatureOffering.data?.items?.[0]?.price || "₹180",
      signatureItemImageUrl1: signatureOffering.data?.items?.[0]?.imageUrl || "",
      signatureItemTitle2: signatureOffering.data?.items?.[1]?.title || "Americano",
      signatureItemBody2: signatureOffering.data?.items?.[1]?.body || "Smooth espresso shots combined with hot water.",
      signatureItemPrice2: signatureOffering.data?.items?.[1]?.price || "₹160",
      signatureItemImageUrl2: signatureOffering.data?.items?.[1]?.imageUrl || "",
      signatureItemTitle3: signatureOffering.data?.items?.[2]?.title || "Mocha",
      signatureItemBody3: signatureOffering.data?.items?.[2]?.body || "Rich espresso, steamed milk, and premium chocolate.",
      signatureItemPrice3: signatureOffering.data?.items?.[2]?.price || "₹240",
      signatureItemImageUrl3: signatureOffering.data?.items?.[2]?.imageUrl || "",
      signatureItemTitle4: signatureOffering.data?.items?.[3]?.title || "Affogato",
      signatureItemBody4: signatureOffering.data?.items?.[3]?.body || "A hot double shot of espresso poured over vanilla gelato.",
      signatureItemPrice4: signatureOffering.data?.items?.[3]?.price || "₹220",
      signatureItemImageUrl4: signatureOffering.data?.items?.[3]?.imageUrl || "",
      offersEyebrow: offers.eyebrow || "THIS WEEK",
      offersTitle: offers.title || "Slow Hour Offers",
      offerBadge1: getOffer(offers, 0).badge || "Mon-Fri",
      offerTitle1: getOffer(offers, 0).title || "Morning Pour",
      offerBody1: getOffer(offers, 0).body || "Complimentary biscotti with any pour over before 10 AM.",
      offerBadge2: getOffer(offers, 1).badge || "After 4 PM",
      offerTitle2: getOffer(offers, 1).title || "Conversation Pairing",
      offerBody2: getOffer(offers, 1).body || "Two coffees and one shared bake at a softer evening price.",
      offerBadge3: getOffer(offers, 2).badge || "Weekends",
      offerTitle3: getOffer(offers, 2).title || "Long Table Brunch",
      offerBody3: getOffer(offers, 2).body || "Reserved seating for groups with a curated first round.",
      noticeEnabled: Boolean(notice.data?.enabled),
      noticeText: notice.body || "",
    }),
    [dailyRitual, hero, notice, offers, signatureOffering, stayLonger],
  );
  const [draft, setDraft] = useState({});
  const [signatureUpload, setSignatureUpload] = useState({ loadingIndex: null, error: "" });
  const form = { ...savedHome, ...draft };

  const update = (field, value) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const save = async () => {
    await saveHomepageSections(form);
    setDraft({});
    reload();
  };

  const uploadSignatureImage = async (index, file) => {
    if (!file) {
      return;
    }

    setSignatureUpload({ loadingIndex: index, error: "" });

    try {
      const result = await uploadMediaFile(file, { folder: "homepage/signature" });
      update(`signatureItemImageUrl${index}`, result.public_url);
      setSignatureUpload({ loadingIndex: null, error: "" });
    } catch (error) {
      setSignatureUpload({
        loadingIndex: null,
        error: error instanceof Error ? error.message : "Image upload failed.",
      });
    }
  };

  const renderStayCard = (index) => (
    <div key={index} className="grid gap-4 rounded-lg border border-[rgba(226,221,213,0.8)] bg-[rgba(245,240,232,0.42)] p-5">
      <RoomyTextField label={`Card ${index} title`} value={form[`stayTitle${index}`]} onChange={(event) => update(`stayTitle${index}`, event.target.value)} />
      <RoomyTextField label={`Card ${index} text`} as="textarea" rows="5" value={form[`stayBody${index}`]} onChange={(event) => update(`stayBody${index}`, event.target.value)} />
    </div>
  );

  const renderRitualCard = (index) => (
    <div key={index} className="grid gap-4 rounded-lg border border-[rgba(226,221,213,0.8)] bg-[rgba(245,240,232,0.42)] p-5">
      <div className="grid gap-4 md:grid-cols-[1fr_160px]">
        <RoomyTextField label={`Ritual ${index} title`} value={form[`ritualTitle${index}`]} onChange={(event) => update(`ritualTitle${index}`, event.target.value)} />
        <RoomyTextField label={`Time`} value={form[`ritualTime${index}`]} onChange={(event) => update(`ritualTime${index}`, event.target.value)} />
      </div>
      <RoomyTextField label={`Ritual ${index} text`} as="textarea" rows="5" value={form[`ritualBody${index}`]} onChange={(event) => update(`ritualBody${index}`, event.target.value)} />
    </div>
  );

  const renderSignatureItem = (index) => (
    <div key={index} className="grid gap-4 rounded-lg border border-[rgba(226,221,213,0.8)] bg-[rgba(245,240,232,0.42)] p-5">
      {form[`signatureItemImageUrl${index}`] && (
        <div className="overflow-hidden rounded-lg border border-[rgba(226,221,213,0.8)] bg-[rgba(245,240,232,0.7)]">
          <img src={form[`signatureItemImageUrl${index}`]} alt={form[`signatureItemTitle${index}`] || `Signature item ${index}`} className="h-44 w-full object-cover" />
        </div>
      )}
      <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[rgba(100,96,88,1)]">
        Upload image
        <input
          className={inputClass}
          type="file"
          accept="image/*"
          disabled={signatureUpload.loadingIndex === index}
          onChange={(event) => uploadSignatureImage(index, event.target.files?.[0])}
        />
      </label>
      <RoomyTextField label="Image URL" value={form[`signatureItemImageUrl${index}`]} onChange={(event) => update(`signatureItemImageUrl${index}`, event.target.value)} />
      <div className="grid gap-4 md:grid-cols-[1fr_140px]">
        <RoomyTextField label={`Item ${index} name`} value={form[`signatureItemTitle${index}`]} onChange={(event) => update(`signatureItemTitle${index}`, event.target.value)} />
        <RoomyTextField label="Price" value={form[`signatureItemPrice${index}`]} onChange={(event) => update(`signatureItemPrice${index}`, event.target.value)} />
      </div>
      <RoomyTextField label={`Item ${index} description`} as="textarea" rows="5" value={form[`signatureItemBody${index}`]} onChange={(event) => update(`signatureItemBody${index}`, event.target.value)} />
    </div>
  );

  const renderOfferCard = (index) => (
    <div key={index} className="grid gap-4 rounded-lg border border-[rgba(226,221,213,0.8)] bg-[rgba(245,240,232,0.42)] p-5">
      <RoomyTextField label={`Offer ${index} label`} value={form[`offerBadge${index}`]} onChange={(event) => update(`offerBadge${index}`, event.target.value)} />
      <RoomyTextField label={`Offer ${index} title`} value={form[`offerTitle${index}`]} onChange={(event) => update(`offerTitle${index}`, event.target.value)} />
      <RoomyTextField label={`Offer ${index} details`} as="textarea" rows="5" value={form[`offerBody${index}`]} onChange={(event) => update(`offerBody${index}`, event.target.value)} />
    </div>
  );

  return (
    <CrudPage title="Homepage content" loading={loading} error={error}>
      <EditorSection title="Hero" eyebrow="First screen">
        <div className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-[240px_1fr]">
            <RoomyTextField label="Small label" value={form.heroEyebrow} onChange={(event) => update("heroEyebrow", event.target.value)} />
            <RoomyTextField label="Main heading" value={form.heroTitle} onChange={(event) => update("heroTitle", event.target.value)} />
          </div>
          <RoomyTextField label="Subtitle" as="textarea" rows="5" value={form.heroSubtitle} onChange={(event) => update("heroSubtitle", event.target.value)} />
          <div className="grid gap-5 md:grid-cols-2">
            <RoomyTextField label="Button text" value={form.primaryButtonLabel} onChange={(event) => update("primaryButtonLabel", event.target.value)} />
            <RoomyTextField label="Button link" value={form.primaryButtonPath} onChange={(event) => update("primaryButtonPath", event.target.value)} />
          </div>
        </div>
      </EditorSection>
      <EditorSection title="Why people stay longer" eyebrow="Three short cards">
        <div className="grid gap-5 xl:grid-cols-3">
          {[1, 2, 3].map(renderStayCard)}
        </div>
      </EditorSection>
      <EditorSection title="Daily ritual" eyebrow="Time-based cards">
        <div className="grid gap-5 xl:grid-cols-3">
          {[1, 2, 3].map(renderRitualCard)}
        </div>
      </EditorSection>
      <EditorSection title="Signature offering" eyebrow="Homepage menu cards">
        <div className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-[240px_1fr]">
            <RoomyTextField label="Small label" value={form.signatureEyebrow} onChange={(event) => update("signatureEyebrow", event.target.value)} />
            <RoomyTextField label="Section heading" value={form.signatureTitle} onChange={(event) => update("signatureTitle", event.target.value)} />
          </div>
          <div className="grid gap-5 xl:grid-cols-2">
            {[1, 2, 3, 4].map(renderSignatureItem)}
          </div>
          {signatureUpload.error && (
            <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {signatureUpload.error}
            </p>
          )}
        </div>
      </EditorSection>
      <EditorSection title="Offers" eyebrow="Homepage offer cards">
        <div className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-[240px_1fr]">
            <RoomyTextField label="Small label" value={form.offersEyebrow} onChange={(event) => update("offersEyebrow", event.target.value)} />
            <RoomyTextField label="Section heading" value={form.offersTitle} onChange={(event) => update("offersTitle", event.target.value)} />
          </div>
          <div className="grid gap-5 xl:grid-cols-3">
            {[1, 2, 3].map(renderOfferCard)}
          </div>
        </div>
      </EditorSection>
      <EditorSection title="Homepage notice" eyebrow="Optional banner">
        <div className="grid gap-5 md:grid-cols-[220px_1fr]">
          <label className="flex items-center gap-3 rounded-lg border border-[rgba(226,221,213,0.9)] bg-[rgba(245,240,232,0.7)] px-3 py-2 text-sm text-[rgba(28,28,26,1)]">
            <input
              type="checkbox"
              checked={form.noticeEnabled}
              onChange={(event) => update("noticeEnabled", event.target.checked)}
            />
            Show notice
          </label>
          <RoomyTextField label="Notice text" value={form.noticeText} onChange={(event) => update("noticeText", event.target.value)} />
        </div>
      </EditorSection>
      <button className={`${primaryButton} min-h-12 w-full md:w-fit md:px-8`} onClick={save}><FiCheckCircle /> Save homepage</button>
      <DataTable columns={["Section", "Status"]} rows={rows.map((row) => [row.key, <StatusChip status={row.status} />])} />
    </CrudPage>
  );
};

const splitParagraphs = (body) => String(body || "").split(/\n\n+/);
const getPerson = (section, index) => section.data?.people?.[index] || {};

const CafeAdmin = () => {
  const { rows, loading, error, reload } = useRows(() => listRows("cafe_content", (request) => request.select("*").order("key")));
  const story = getSection(rows, "story");
  const founders = getSection(rows, "founders");
  const interior = getSection(rows, "interior");
  const city = getSection(rows, "city");
  const press = getSection(rows, "press");
  const storyParagraphs = splitParagraphs(story.body);
  const interiorParagraphs = splitParagraphs(interior.body);
  const savedCafe = useMemo(
    () => ({
      storyEyebrow: story.eyebrow || "Our Story",
      storyTitle: story.title || "Why This Space Exists",
      storyQuote: story.data?.quote || "We didn't set out to build a cafe. We set out to build a reason to slow down.",
      storyBody1: storyParagraphs[0] || "Kooffe was born from a simple observation: Ahmedabad moves fast, but its best moments happen slowly.",
      storyBody2: storyParagraphs[1] || "We wanted to create a space that honors that pace, where time is something you inhabit.",
      foundersTitle: founders.title || "Founded on Friendship",
      founder1Name: getPerson(founders, 0).name || "Malhar Thakar",
      founder1Role: getPerson(founders, 0).role || "Co-Founder",
      founder1Bio: getPerson(founders, 0).bio || "I grew up in the old city, where every lane has a chai stall and every stall has a story.",
      founder2Name: getPerson(founders, 1).name || "Puja Joshi",
      founder2Role: getPerson(founders, 1).role || "Co-Founder",
      founder2Bio: getPerson(founders, 1).bio || "I believe food and drink should nourish more than the body.",
      interiorTitle: interior.title || "The Space Itself",
      interiorBody1: interiorParagraphs[0] || "Every surface in Kooffe has been chosen with care.",
      interiorBody2: interiorParagraphs[1] || "We designed the seating to offer choices: communal benches, corner nooks, and a window counter.",
      cityTitle: city.title || "Why Ahmedabad",
      cityBody: city.body || "Ahmedabad is a city of contrasts, a city that knows how to hold both energy and calm.",
      cityQuote: city.data?.quote || "Some cities wake up slowly. We built a place for that.",
      pressTitle: press.title || "Press Inquiries",
      pressBody: press.body || "Kooffe is a specialty cafe in Ahmedabad celebrating slow living, Gujarat heritage ingredients, and meaningful human connection.",
    }),
    [city, founders, interior, interiorParagraphs, press, story, storyParagraphs],
  );
  const [draft, setDraft] = useState({});
  const form = { ...savedCafe, ...draft };

  const update = (field, value) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const save = async () => {
    await saveCafeSections(form);
    setDraft({});
    reload();
  };

  const founderFields = (index) => (
    <div key={index} className="grid gap-5 rounded-lg border border-[rgba(226,221,213,0.8)] bg-[rgba(245,240,232,0.42)] p-5">
      <div className="grid gap-5 md:grid-cols-[1fr_180px]">
        <RoomyTextField label={`Founder ${index} name`} value={form[`founder${index}Name`]} onChange={(event) => update(`founder${index}Name`, event.target.value)} />
        <RoomyTextField label="Role" value={form[`founder${index}Role`]} onChange={(event) => update(`founder${index}Role`, event.target.value)} />
      </div>
      <RoomyTextField label={`Founder ${index} bio`} as="textarea" rows="6" value={form[`founder${index}Bio`]} onChange={(event) => update(`founder${index}Bio`, event.target.value)} />
    </div>
  );

  return (
    <CrudPage title="Cafe content" loading={loading} error={error}>
      <EditorSection title="Story" eyebrow="Opening section">
        <div className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-[240px_1fr]">
            <RoomyTextField label="Small label" value={form.storyEyebrow} onChange={(event) => update("storyEyebrow", event.target.value)} />
            <RoomyTextField label="Heading" value={form.storyTitle} onChange={(event) => update("storyTitle", event.target.value)} />
          </div>
          <RoomyTextField label="Quote" as="textarea" rows="4" value={form.storyQuote} onChange={(event) => update("storyQuote", event.target.value)} />
          <RoomyTextField label="Story paragraph 1" as="textarea" rows="6" value={form.storyBody1} onChange={(event) => update("storyBody1", event.target.value)} />
          <RoomyTextField label="Story paragraph 2" as="textarea" rows="6" value={form.storyBody2} onChange={(event) => update("storyBody2", event.target.value)} />
        </div>
      </EditorSection>
      <EditorSection title="Founders" eyebrow="People section">
        <div className="grid gap-5">
          <RoomyTextField label="Section heading" value={form.foundersTitle} onChange={(event) => update("foundersTitle", event.target.value)} />
          <div className="grid gap-5 lg:grid-cols-2">
            {[1, 2].map(founderFields)}
          </div>
        </div>
      </EditorSection>
      <EditorSection title="Interior philosophy" eyebrow="Space section">
        <div className="grid gap-5">
          <RoomyTextField label="Heading" value={form.interiorTitle} onChange={(event) => update("interiorTitle", event.target.value)} />
          <div className="grid gap-5 lg:grid-cols-2">
            <RoomyTextField label="Paragraph 1" as="textarea" rows="7" value={form.interiorBody1} onChange={(event) => update("interiorBody1", event.target.value)} />
            <RoomyTextField label="Paragraph 2" as="textarea" rows="7" value={form.interiorBody2} onChange={(event) => update("interiorBody2", event.target.value)} />
          </div>
        </div>
      </EditorSection>
      <EditorSection title="Why Ahmedabad" eyebrow="Location story">
        <div className="grid gap-5">
          <RoomyTextField label="Heading" value={form.cityTitle} onChange={(event) => update("cityTitle", event.target.value)} />
          <RoomyTextField label="Body" as="textarea" rows="7" value={form.cityBody} onChange={(event) => update("cityBody", event.target.value)} />
          <RoomyTextField label="Quote" value={form.cityQuote} onChange={(event) => update("cityQuote", event.target.value)} />
        </div>
      </EditorSection>
      <EditorSection title="Press" eyebrow="Media card">
        <div className="grid gap-5">
          <RoomyTextField label="Heading" value={form.pressTitle} onChange={(event) => update("pressTitle", event.target.value)} />
          <RoomyTextField label="Description" as="textarea" rows="6" value={form.pressBody} onChange={(event) => update("pressBody", event.target.value)} />
        </div>
      </EditorSection>
      <button className={`${primaryButton} min-h-12 w-full md:w-fit md:px-8`} onClick={save}><FiCheckCircle /> Save cafe page</button>
      <DataTable columns={["Section", "Status"]} rows={rows.map((row) => [row.key, <StatusChip status={row.status} />])} />
    </CrudPage>
  );
};

const ContentAdmin = ({ table, title, saveAction }) => {
  const { rows, loading, error, reload } = useRows(() => listRows(table, (request) => request.select("*").order("key")));
  const [form, setForm] = useState({ status: "draft", dataText: "{}" });

  const save = async () => {
    await saveAction({ ...form, data: JSON.parse(form.dataText || "{}") });
    setForm({ status: "draft", dataText: "{}" });
    reload();
  };

  return (
    <CrudPage title={title} loading={loading} error={error}>
      <section className={`${panel} rounded-lg p-5`}>
        <div className="grid gap-3 md:grid-cols-2">
          <TextField label="Key" value={form.key || ""} onChange={(event) => setForm({ ...form, key: event.target.value })} />
          <TextField label="Eyebrow" value={form.eyebrow || ""} onChange={(event) => setForm({ ...form, eyebrow: event.target.value })} />
          <TextField label="Title" value={form.title || ""} onChange={(event) => setForm({ ...form, title: event.target.value })} />
          <SelectField label="Status" value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>
            {["draft", "published", "archived"].map((value) => <option key={value}>{value}</option>)}
          </SelectField>
          <TextField label="Body" as="textarea" rows="4" value={form.body || ""} onChange={(event) => setForm({ ...form, body: event.target.value })} />
          <TextField label="JSON data" as="textarea" rows="4" value={form.dataText} onChange={(event) => setForm({ ...form, dataText: event.target.value })} />
          <button className={primaryButton} onClick={save}><FiCheckCircle /> Save section</button>
        </div>
      </section>
      <DataTable columns={["Key", "Title", "Status"]} rows={rows.map((row) => [row.key, row.title, <StatusChip status={row.status} />])} />
    </CrudPage>
  );
};

const SettingsAdmin = () => {
  const { rows, loading, error, reload } = useRows(() => listRows("site_settings", (request) => request.select("*").order("key")));
  const existingBasics = rows.find((row) => row.key === "site_basics")?.value;
  const [mode, setMode] = useState("basics");
  const savedBasics = useMemo(
    () => ({
      openClose: existingBasics?.hours?.openClose || "",
      phone: existingBasics?.contact?.phone || "",
      email: existingBasics?.contact?.email || "",
      address: existingBasics?.contact?.address || "",
      directionsUrl: existingBasics?.links?.directions || "",
      instagramUrl: existingBasics?.links?.instagram || "",
      noticeText: existingBasics?.notice?.text || "",
      noticeEnabled: Boolean(existingBasics?.notice?.enabled),
    }),
    [existingBasics],
  );
  const [basicsDraft, setBasicsDraft] = useState({});
  const [form, setForm] = useState({ status: "published", valueText: "{}" });
  const basics = { ...savedBasics, ...basicsDraft };

  const updateBasics = (field, value) => {
    setBasicsDraft((current) => ({ ...current, [field]: value }));
  };

  const saveBasics = async () => {
    await saveSiteBasics(basics);
    setBasicsDraft({});
    reload();
  };

  const save = async () => {
    await saveSiteSetting({ ...form, value: JSON.parse(form.valueText || "{}") });
    setForm({ status: "published", valueText: "{}" });
    reload();
  };

  return (
    <CrudPage title="Settings" loading={loading} error={error}>
      <div className="flex w-fit rounded-lg border border-[rgba(226,221,213,0.8)] bg-[rgba(250,247,242,0.92)] p-1">
        {[
          ["basics", "Cafe basics"],
          ["advanced", "Advanced JSON"],
        ].map(([value, label]) => (
          <button
            key={value}
            className={`rounded-md px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition-colors ${
              mode === value
                ? "bg-[rgba(28,28,26,1)] text-white"
                : "text-[rgba(100,96,88,1)] hover:text-[#8C6D46]"
            }`}
            onClick={() => setMode(value)}
          >
            {label}
          </button>
        ))}
      </div>
      {mode === "basics" && (
        <section className={`${panel} rounded-lg p-5`}>
          <h3 className="font-['Cormorant_Garamond'] text-3xl italic">Cafe basics</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <TextField label="Opening hours" value={basics.openClose} onChange={(event) => updateBasics("openClose", event.target.value)} />
            <TextField label="Phone" value={basics.phone} onChange={(event) => updateBasics("phone", event.target.value)} />
            <TextField label="Email" type="email" value={basics.email} onChange={(event) => updateBasics("email", event.target.value)} />
            <TextField label="Address" value={basics.address} onChange={(event) => updateBasics("address", event.target.value)} />
            <TextField label="Directions link" value={basics.directionsUrl} onChange={(event) => updateBasics("directionsUrl", event.target.value)} />
            <TextField label="Instagram link" value={basics.instagramUrl} onChange={(event) => updateBasics("instagramUrl", event.target.value)} />
            <label className="flex items-center gap-3 rounded-lg border border-[rgba(226,221,213,0.9)] bg-[rgba(245,240,232,0.7)] px-3 py-2 text-sm text-[rgba(28,28,26,1)]">
              <input
                type="checkbox"
                checked={basics.noticeEnabled}
                onChange={(event) => updateBasics("noticeEnabled", event.target.checked)}
              />
              Show homepage notice
            </label>
            <TextField label="Homepage notice" value={basics.noticeText} onChange={(event) => updateBasics("noticeText", event.target.value)} />
            <button className={primaryButton} onClick={saveBasics}><FiSettings /> Save cafe basics</button>
          </div>
        </section>
      )}
      {mode === "advanced" && (
      <section className={`${panel} rounded-lg p-5`}>
        <h3 className="font-['Cormorant_Garamond'] text-3xl italic">Advanced JSON</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <TextField label="Key" value={form.key || ""} onChange={(event) => setForm({ ...form, key: event.target.value })} />
          <TextField label="JSON value" as="textarea" rows="4" value={form.valueText} onChange={(event) => setForm({ ...form, valueText: event.target.value })} />
          <button className={primaryButton} onClick={save}><FiSettings /> Save setting</button>
        </div>
      </section>
      )}
      <DataTable columns={["Key", "Status"]} rows={rows.map((row) => [row.key, <StatusChip status={row.status} />])} />
    </CrudPage>
  );
};

const AdminsAdmin = () => {
  const { rows, loading, error, reload } = useRows(() => listRows("admin_profiles", (request) => request.select("*").order("created_at")));
  const [form, setForm] = useState({ role: "editor", status: "active" });

  const save = async () => {
    await saveAdminProfile(form);
    setForm({ role: "editor", status: "active" });
    reload();
  };

  return (
    <CrudPage title="Admin accounts" loading={loading} error={error}>
      <section className={`${panel} rounded-lg p-5`}>
        <div className="grid gap-3 md:grid-cols-2">
          <TextField label="Email" type="email" value={form.email || ""} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          <TextField label="Display name" value={form.display_name || ""} onChange={(event) => setForm({ ...form, display_name: event.target.value })} />
          <SelectField label="Role" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
            <option>editor</option>
            <option>owner</option>
          </SelectField>
          <TextField label="Supabase user id (optional)" value={form.user_id || ""} onChange={(event) => setForm({ ...form, user_id: event.target.value })} />
          <button className={primaryButton} onClick={save}><FiUserPlus /> Save admin</button>
        </div>
      </section>
      <DataTable columns={["Name", "Email", "Role", "Status"]} rows={rows.map((row) => [row.display_name, row.email, row.role, <StatusChip status={row.status} />])} />
    </CrudPage>
  );
};

const CrudPage = ({ title, loading, error, children }) => (
  <PageMotion>
    <div className="mb-5 flex items-center justify-between">
      <h2 className="font-['Cormorant_Garamond'] text-4xl italic">{title}</h2>
    </div>
    {error && <p className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    {loading ? <Spinner /> : <div className="grid gap-5">{children}</div>}
  </PageMotion>
);

const DataTable = ({ columns, rows }) => {
  const renderedRows = useMemo(() => rows, [rows]);

  return (
    <div className={`${panel} overflow-x-auto rounded-lg`}>
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} className="border-b border-[rgba(226,221,213,0.8)] px-4 py-3 text-xs uppercase tracking-[0.18em] text-[rgba(100,96,88,1)]">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderedRows.length === 0 && (
            <tr><td className="px-4 py-6 text-[rgba(100,96,88,1)]" colSpan={columns.length}>No records yet.</td></tr>
          )}
          {renderedRows.map((row, rowIndex) => (
            <tr key={rowIndex} className="transition-colors hover:bg-[rgba(245,240,232,0.7)]">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border-b border-[rgba(226,221,213,0.55)] px-4 py-3 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AdminApp = () => (
  <Routes>
    <Route path="login" element={<AdminLogin />} />
    <Route
      path="*"
      element={
        <RequireAdmin>
          {(sessionState) => <AdminShell sessionState={sessionState} />}
        </RequireAdmin>
      }
    />
  </Routes>
);

export default AdminApp;
