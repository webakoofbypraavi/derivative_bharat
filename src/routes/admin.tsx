import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  Activity,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Compass,
  FilePenLine,
  LayoutDashboard,
  LogOut,
  Map,
  Menu,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import "@/admin.css";

type ResourceName = "destinations" | "experiences" | "stories";
// CMS records intentionally mirror flexible JSON fields from MySQL.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AdminRecord = any;
type Summary = {
  destinations: number;
  experiences: number;
  stories: number;
  inquiries: number;
  newInquiries: number;
};

type Field = {
  key: string;
  label: string;
  type?: "textarea" | "json" | "checkbox";
  placeholder?: string;
};

const resourceConfig: Record<ResourceName, { label: string; icon: typeof Map; fields: Field[] }> = {
  destinations: {
    label: "Destinations",
    icon: Map,
    fields: [
      { key: "slug", label: "Slug", placeholder: "jaipur" },
      { key: "city", label: "City" },
      { key: "state", label: "State" },
      { key: "tagline", label: "Tagline" },
      { key: "image_url", label: "Image URL" },
      { key: "best_time", label: "Best time" },
      { key: "intro", label: "Introduction", type: "textarea" },
      { key: "about", label: "About", type: "textarea" },
      { key: "food", label: "Food", type: "textarea" },
      { key: "architecture", label: "Architecture", type: "textarea" },
      { key: "local_stories", label: "Local stories", type: "textarea" },
      {
        key: "neighbourhoods",
        label: "Neighbourhoods (JSON array)",
        type: "json",
        placeholder: '["Old City", "Bazaar"]',
      },
      { key: "status", label: "Status" },
    ],
  },
  experiences: {
    label: "Experiences",
    icon: Compass,
    fields: [
      { key: "slug", label: "Slug" },
      { key: "title", label: "Title" },
      { key: "category_slug", label: "Category slug" },
      { key: "category", label: "Category" },
      { key: "destination_slug", label: "Destination slug" },
      { key: "destination", label: "Destination" },
      { key: "duration", label: "Duration" },
      { key: "price", label: "Price" },
      { key: "rating", label: "Rating" },
      { key: "reviews", label: "Reviews" },
      { key: "image_url", label: "Image URL" },
      { key: "summary", label: "Summary", type: "textarea" },
      {
        key: "language",
        label: "Languages (JSON array)",
        type: "json",
        placeholder: '["English", "Hindi"]',
      },
      {
        key: "itinerary",
        label: "Itinerary (JSON array)",
        type: "json",
        placeholder: '[{"time":"08:00","title":"Meet","detail":"Welcome"}]',
      },
      { key: "trending", label: "Trending", type: "checkbox" },
      { key: "popular", label: "Popular", type: "checkbox" },
      { key: "status", label: "Status" },
    ],
  },
  stories: {
    label: "Stories",
    icon: BookOpen,
    fields: [
      { key: "slug", label: "Slug" },
      { key: "category", label: "Category" },
      { key: "title", label: "Title" },
      { key: "read_time", label: "Read time" },
      { key: "image_url", label: "Image URL" },
      { key: "excerpt", label: "Excerpt", type: "textarea" },
      { key: "body", label: "Story body", type: "textarea" },
      { key: "status", label: "Status" },
    ],
  },
};

const navItems: {
  key: "overview" | ResourceName | "inquiries";
  label: string;
  icon: typeof LayoutDashboard;
}[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "destinations", label: "Destinations", icon: Map },
  { key: "experiences", label: "Experiences", icon: Compass },
  { key: "stories", label: "Stories", icon: BookOpen },
  { key: "inquiries", label: "Inquiries", icon: Users },
];

function tokenFromStorage() {
  try {
    return window.localStorage.getItem("derivative_bharat_admin_token") ?? "";
  } catch {
    return "";
  }
}

function storeToken(token: string) {
  try {
    if (token) window.localStorage.setItem("derivative_bharat_admin_token", token);
    else window.localStorage.removeItem("derivative_bharat_admin_token");
  } catch {
    // Private browsing may disable storage; the in-memory token still works.
  }
}

async function api(path: string, token: string, options: RequestInit = {}) {
  let response: Response;
  try {
    response = await fetch(`/api${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers ?? {}),
      },
    });
  } catch {
    throw new Error("CMS API is offline. Start it with npm run server, or use npm run dev:full.");
  }
  const payload = response.status === 204 ? null : await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 502 || response.status === 504) {
      throw new Error("CMS API is offline. Start it with npm run server, or use npm run dev:full.");
    }
    throw new Error(payload?.error ?? "Something went wrong.");
  }
  return payload;
}

export function AdminPage() {
  const [token, setToken] = useState(tokenFromStorage);
  const [user, setUser] = useState<AdminRecord | null>(null);
  const [section, setSection] = useState<"overview" | ResourceName | "inquiries">("overview");
  const [summary, setSummary] = useState<Summary | null>(null);
  const [records, setRecords] = useState<AdminRecord[]>([]);
  const [inquiries, setInquiries] = useState<AdminRecord[]>([]);
  const [editor, setEditor] = useState<{ resource: ResourceName; record: AdminRecord } | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function logout() {
    setToken("");
    setUser(null);
    storeToken("");
  }

  useEffect(() => {
    if (!token) return;
    api("/admin/me", token)
      .then((payload) => setUser(payload.user))
      .catch(logout);
  }, [token]);

  useEffect(() => {
    if (!token || !user) return;
    setLoading(true);
    setError("");
    const request =
      section === "overview"
        ? api("/admin/summary", token)
        : section === "inquiries"
          ? api("/admin/inquiries", token)
          : api(`/admin/${section}`, token);
    request
      .then((payload) => {
        if (section === "overview") setSummary(payload);
        else if (section === "inquiries") setInquiries(payload);
        else setRecords(payload);
      })
      .catch((reason: Error) => setError(reason.message))
      .finally(() => setLoading(false));
  }, [section, token, user]);

  if (!token || !user)
    return (
      <AdminLogin
        onLogin={(nextToken, nextUser) => {
          setToken(nextToken);
          setUser(nextUser);
          storeToken(nextToken);
        }}
      />
    );

  const activeNav = navItems.find((item) => item.key === section)!;
  const ActiveIcon = activeNav.icon;

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-mark">DB</span>
          <span>
            <strong>Derivative Bharat</strong>
            <small>Content studio</small>
          </span>
        </div>
        <div className="admin-side-label">Workspace</div>
        <nav className="admin-nav" aria-label="Admin navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className={section === item.key ? "is-active" : ""}
                key={item.key}
                onClick={() => {
                  setSection(item.key);
                  setMessage("");
                  setError("");
                }}
              >
                <Icon size={17} />
                {item.label}
                {item.key === "inquiries" && summary?.newInquiries ? (
                  <b>{summary.newInquiries}</b>
                ) : null}
              </button>
            );
          })}
        </nav>
        <div className="admin-sidebar-bottom">
          <div className="admin-health">
            <span />
            <span>
              <strong>CMS connected</strong>
              <small>MySQL database</small>
            </span>
          </div>
          <button onClick={logout}>
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <span className="admin-breadcrumb">Admin / {activeNav.label}</span>
            <h1>{section === "overview" ? "Good morning, admin" : activeNav.label}</h1>
          </div>
          <div className="admin-header-actions">
            <a href="/" target="_blank" rel="noreferrer">
              View website <ArrowUpRight size={15} />
            </a>
            <span className="admin-avatar">
              {String(user.email ?? "A")
                .charAt(0)
                .toUpperCase()}
            </span>
          </div>
        </header>
        {message ? (
          <div className="admin-alert admin-alert-success">
            <Check size={16} />
            {message}
            <button onClick={() => setMessage("")}>
              <X size={15} />
            </button>
          </div>
        ) : null}
        {error ? (
          <div className="admin-alert admin-alert-error">
            <Activity size={16} />
            {error}
            <button onClick={() => setError("")}>
              <X size={15} />
            </button>
          </div>
        ) : null}
        {loading ? <div className="admin-loading">Loading content…</div> : null}
        {!loading && section === "overview" ? (
          <Overview summary={summary} onNavigate={setSection} />
        ) : null}
        {!loading && section === "inquiries" ? (
          <Inquiries
            inquiries={inquiries}
            token={token}
            onUpdate={(updated) => {
              setInquiries((items) =>
                items.map((item) => (item.id === updated.id ? updated : item)),
              );
              setMessage("Inquiry status updated.");
            }}
          />
        ) : null}
        {!loading && section !== "overview" && section !== "inquiries" ? (
          <ResourceTable
            resource={section}
            records={records}
            onCreate={() => setEditor({ resource: section, record: {} })}
            onEdit={(record) => setEditor({ resource: section, record })}
            onDelete={async (record) => {
              if (!window.confirm(`Delete “${record.title ?? record.city ?? record.slug}”?`))
                return;
              try {
                await api(`/admin/${section}/${record.id}`, token, { method: "DELETE" });
                setRecords((items) => items.filter((item) => item.id !== record.id));
                setMessage("Record deleted.");
              } catch (reason) {
                setError((reason as Error).message);
              }
            }}
          />
        ) : null}
      </main>
      {editor ? (
        <Editor
          resource={editor.resource}
          record={editor.record}
          token={token}
          onClose={() => setEditor(null)}
          onSaved={(saved) => {
            setRecords((items) =>
              editor.record.id
                ? items.map((item) => (item.id === saved.id ? saved : item))
                : [saved, ...items],
            );
            setEditor(null);
            setMessage("Content saved successfully.");
          }}
        />
      ) : null}
    </div>
  );
}

function AdminLogin({ onLogin }: { onLogin: (token: string, user: AdminRecord) => void }) {
  const [email, setEmail] = useState("admin@derivativebharat.in");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await api("/auth/login", "", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      onLogin(result.token, result.user);
    } catch (reason) {
      setError((reason as Error).message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <div className="admin-login-mark">DB</div>
        <span className="admin-kicker">Derivative Bharat</span>
        <h1>Content studio</h1>
        <p>Sign in to manage the journeys, destinations and stories on your website.</p>
        <form onSubmit={submit}>
          <label>
            Email address
            <input
              autoComplete="username"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label>
            Password
            <input
              autoComplete="current-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          {error ? <div className="admin-login-error">{error}</div> : null}
          <button className="admin-primary-button" disabled={loading}>
            {loading ? "Signing in…" : "Sign in to CMS"}
            <ArrowUpRight size={16} />
          </button>
        </form>
        <small className="admin-login-note">
          Use the admin account created by <code>npm run db:setup</code>.
        </small>
      </div>
      <div className="admin-login-art">
        <span>
          Stories have places.
          <br />
          <em>Places have memory.</em>
        </span>
      </div>
    </div>
  );
}

function Overview({
  summary,
  onNavigate,
}: {
  summary: Summary | null;
  onNavigate: (section: "overview" | ResourceName | "inquiries") => void;
}) {
  const cards = [
    {
      key: "destinations" as const,
      label: "Destinations",
      value: summary?.destinations ?? 0,
      icon: Map,
      color: "sand",
    },
    {
      key: "experiences" as const,
      label: "Experiences",
      value: summary?.experiences ?? 0,
      icon: Compass,
      color: "rose",
    },
    {
      key: "stories" as const,
      label: "Stories",
      value: summary?.stories ?? 0,
      icon: BookOpen,
      color: "gold",
    },
    {
      key: "inquiries" as const,
      label: "Total inquiries",
      value: summary?.inquiries ?? 0,
      icon: Users,
      color: "green",
    },
  ];
  return (
    <div className="admin-overview">
      <div className="admin-welcome">
        <div>
          <span className="admin-kicker">Your editorial desk</span>
          <h2>Shape how India is discovered.</h2>
          <p>Keep every city, route and field note fresh from one calm workspace.</p>
        </div>
        <div className="admin-welcome-art">
          <span>✳</span>
          <Map size={60} strokeWidth={1} />
        </div>
      </div>
      <div className="admin-stat-grid">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              className={`admin-stat-card ${card.color}`}
              key={card.key}
              onClick={() => onNavigate(card.key)}
            >
              <span className="admin-stat-icon">
                <Icon size={18} />
              </span>
              <span>
                <small>{card.label}</small>
                <strong>{card.value}</strong>
              </span>
              <ArrowUpRight size={16} />
            </button>
          );
        })}
      </div>
      <div className="admin-overview-grid">
        <div className="admin-quick-card">
          <div className="admin-card-heading">
            <span>
              <span className="admin-kicker">Quick actions</span>
              <h3>What needs your attention?</h3>
            </span>
            <Activity size={20} />
          </div>
          <button onClick={() => onNavigate("destinations")}>
            <span>
              <Map size={17} />
              <strong>Add a destination</strong>
              <small>Introduce a new city and its story.</small>
            </span>
            <Plus size={16} />
          </button>
          <button onClick={() => onNavigate("experiences")}>
            <span>
              <Compass size={17} />
              <strong>Update an experience</strong>
              <small>Refresh pricing, itinerary or status.</small>
            </span>
            <FilePenLine size={16} />
          </button>
          <button onClick={() => onNavigate("stories")}>
            <span>
              <BookOpen size={17} />
              <strong>Write a field note</strong>
              <small>Share the context behind a place.</small>
            </span>
            <Plus size={16} />
          </button>
        </div>
        <div className="admin-tips-card">
          <span className="admin-kicker">Publishing rhythm</span>
          <h3>Small updates keep the journey alive.</h3>
          <p>
            Use drafts while you edit, then publish when the page is ready. Your public site can
            continue using its curated content while the CMS grows.
          </p>
          <div className="admin-tip-line">
            <Check size={15} />
            Drafts are hidden from the public site
          </div>
          <div className="admin-tip-line">
            <Check size={15} />
            Every change records an updated time
          </div>
          <div className="admin-tip-line">
            <Check size={15} />
            Inquiries stay in one shared inbox
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourceTable({
  resource,
  records,
  onCreate,
  onEdit,
  onDelete,
}: {
  resource: ResourceName;
  records: AdminRecord[];
  onCreate: () => void;
  onEdit: (record: AdminRecord) => void;
  onDelete: (record: AdminRecord) => void;
}) {
  const config = resourceConfig[resource];
  const rows = useMemo(() => records, [records]);
  return (
    <div className="admin-resource">
      <div className="admin-resource-toolbar">
        <div>
          <span className="admin-kicker">Published content</span>
          <p>
            {rows.length} {config.label.toLowerCase()} in your database
          </p>
        </div>
        <button className="admin-primary-button" onClick={onCreate}>
          <Plus size={16} />
          Add {resource === "experiences" ? "experience" : resource.slice(0, -1)}
        </button>
      </div>
      <div className="admin-table-wrap">
        <table>
          <thead>
            <tr>
              <th>{resource === "destinations" ? "City" : "Title"}</th>
              <th>
                {resource === "stories"
                  ? "Category"
                  : resource === "destinations"
                    ? "State"
                    : "Destination"}
              </th>
              <th>Updated</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((record) => (
                <tr key={record.id}>
                  <td>
                    <strong>{record.city ?? record.title}</strong>
                    <small>{record.slug}</small>
                  </td>
                  <td>{record.state ?? record.destination ?? record.category}</td>
                  <td>
                    {record.updated_at
                      ? new Date(record.updated_at).toLocaleDateString("en-IN")
                      : "—"}
                  </td>
                  <td>
                    <span className={`admin-status ${record.status}`}>
                      {record.status ?? "published"}
                    </span>
                  </td>
                  <td>
                    <div className="admin-row-actions">
                      <button
                        aria-label={`Edit ${record.title ?? record.city ?? record.slug}`}
                        onClick={() => onEdit(record)}
                      >
                        <FilePenLine size={15} />
                      </button>
                      <button
                        aria-label={`Delete ${record.title ?? record.city ?? record.slug}`}
                        onClick={() => onDelete(record)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="admin-empty" colSpan={5}>
                  <Search size={22} />
                  No records yet. Add the first one to your CMS.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Inquiries({
  inquiries,
  token,
  onUpdate,
}: {
  inquiries: AdminRecord[];
  token: string;
  onUpdate: (record: AdminRecord) => void;
}) {
  return (
    <div className="admin-resource">
      <div className="admin-resource-toolbar">
        <div>
          <span className="admin-kicker">Planning desk</span>
          <p>{inquiries.length} inquiries from your website</p>
        </div>
      </div>
      <div className="admin-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Traveller</th>
              <th>Preferred city</th>
              <th>Message</th>
              <th>Received</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length ? (
              inquiries.map((inquiry) => (
                <tr key={inquiry.id}>
                  <td>
                    <strong>{inquiry.name}</strong>
                    <small>
                      {inquiry.email}
                      {inquiry.phone ? ` · ${inquiry.phone}` : ""}
                    </small>
                  </td>
                  <td>{inquiry.preferred_city || "—"}</td>
                  <td className="admin-message-cell">{inquiry.message}</td>
                  <td>
                    {inquiry.created_at
                      ? new Date(inquiry.created_at).toLocaleDateString("en-IN")
                      : "—"}
                  </td>
                  <td>
                    <label className="admin-status-select">
                      <select
                        value={inquiry.status}
                        onChange={async (event) => {
                          try {
                            const updated = await api(`/admin/inquiries/${inquiry.id}`, token, {
                              method: "PATCH",
                              body: JSON.stringify({ status: event.target.value }),
                            });
                            onUpdate(updated);
                          } catch {
                            /* parent surfaces the next refresh */
                          }
                        }}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                      <ChevronDown size={13} />
                    </label>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="admin-empty" colSpan={5}>
                  <Users size={22} />
                  No inquiries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Editor({
  resource,
  record,
  token,
  onClose,
  onSaved,
}: {
  resource: ResourceName;
  record: AdminRecord;
  token: string;
  onClose: () => void;
  onSaved: (record: AdminRecord) => void;
}) {
  const fields = resourceConfig[resource].fields;
  const [form, setForm] = useState<Record<string, string | boolean>>(() =>
    Object.fromEntries(
      fields.map((field) => [
        field.key,
        field.type === "checkbox"
          ? Boolean(record[field.key])
          : field.type === "json"
            ? JSON.stringify(record[field.key] ?? [], null, 2)
            : String(record[field.key] ?? (field.key === "status" ? "draft" : "")),
      ]),
    ),
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  function update(key: string, value: string | boolean) {
    setForm((current) => ({ ...current, [key]: value }));
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload: AdminRecord = { ...form };
      for (const field of fields) {
        if (field.type === "json") payload[field.key] = JSON.parse(String(form[field.key] || "[]"));
        if (field.type === "checkbox") payload[field.key] = Boolean(form[field.key]);
      }
      const saved = await api(
        record.id ? `/admin/${resource}/${record.id}` : `/admin/${resource}`,
        token,
        { method: record.id ? "PUT" : "POST", body: JSON.stringify(payload) },
      );
      onSaved(saved);
    } catch (reason) {
      setError((reason as Error).message);
    } finally {
      setSaving(false);
    }
  }
  return (
    <div
      className="admin-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="admin-editor"
        role="dialog"
        aria-modal="true"
        aria-labelledby="editor-title"
      >
        <header>
          <div>
            <span className="admin-kicker">{record.id ? "Edit record" : "New record"}</span>
            <h2 id="editor-title">
              {record.id
                ? `Update ${resourceConfig[resource].label.slice(0, -1).toLowerCase()}`
                : `Add ${resourceConfig[resource].label.slice(0, -1).toLowerCase()}`}
            </h2>
          </div>
          <button aria-label="Close editor" onClick={onClose}>
            <X size={19} />
          </button>
        </header>
        <form onSubmit={submit}>
          <div className="admin-editor-fields">
            {fields.map((field) =>
              field.type === "checkbox" ? (
                <label className="admin-checkbox" key={field.key}>
                  <input
                    checked={Boolean(form[field.key])}
                    onChange={(event) => update(field.key, event.target.checked)}
                    type="checkbox"
                  />
                  {field.label}
                </label>
              ) : (
                <label
                  className={
                    field.type === "textarea" || field.type === "json"
                      ? "admin-field admin-field-wide"
                      : "admin-field"
                  }
                  key={field.key}
                >
                  {field.label}
                  {field.type === "textarea" || field.type === "json" ? (
                    <textarea
                      placeholder={field.placeholder}
                      value={String(form[field.key] ?? "")}
                      onChange={(event) => update(field.key, event.target.value)}
                      rows={field.type === "json" ? 5 : 4}
                    />
                  ) : (
                    <input
                      placeholder={field.placeholder}
                      required={!record.id && ["slug", "title", "city"].includes(field.key)}
                      value={String(form[field.key] ?? "")}
                      onChange={(event) => update(field.key, event.target.value)}
                    />
                  )}
                </label>
              ),
            )}
          </div>
          {error ? <div className="admin-login-error">{error}</div> : null}
          <footer>
            <button className="admin-secondary-button" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="admin-primary-button" disabled={saving} type="submit">
              {saving ? "Saving…" : "Save changes"}
              <Check size={16} />
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}
