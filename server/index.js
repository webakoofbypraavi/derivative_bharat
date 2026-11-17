import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jsonValue, normalizeRecord, pool, serializeJson } from "./db.js";
import { appendInquiryToGoogleSheet } from "./google-sheets.js";

const app = express();
const port = Number(process.env.PORT || process.env.API_PORT || 8787);
const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const clientBuild = path.join(projectRoot, "..", "dist");
const jwtSecret = process.env.JWT_SECRET || "development-only-change-this-secret";

app.use(cors({ origin: true, credentials: false }));
app.use(express.json({ limit: "2mb" }));

function sendError(response, status, message) {
  return response.status(status).json({ error: message });
}

function requireAdmin(request, response, next) {
  const token = request.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return sendError(response, 401, "Admin login required.");
  try {
    request.admin = jwt.verify(token, jwtSecret);
    return next();
  } catch {
    return sendError(response, 401, "Your admin session has expired.");
  }
}

function parseBody(body, fields, defaults = true) {
  const parsed = Object.fromEntries(
    fields
      .filter((field) => body[field] !== undefined)
      .map((field) => [
        field,
        [
          "neighbourhoods",
          "language",
          "gallery",
          "highlights",
          "discover",
          "itinerary",
          "included",
          "excluded",
          "important",
          "faqs",
        ].includes(field)
          ? serializeJson(body[field])
          : body[field],
      ]),
  );
  for (const field of [
    "neighbourhoods",
    "language",
    "gallery",
    "highlights",
    "discover",
    "itinerary",
    "included",
    "excluded",
    "important",
    "faqs",
  ]) {
    if (defaults && fields.includes(field) && parsed[field] === undefined) parsed[field] = "[]";
  }
  if (defaults && fields.includes("status") && parsed.status === undefined) parsed.status = "draft";
  return parsed;
}

async function queryRows(response, sql, params = []) {
  try {
    const [rows] = await pool.execute(sql, params);
    return response.json(rows.map(normalizeRecord));
  } catch (error) {
    console.error(error);
    return sendError(
      response,
      503,
      "The CMS database is unavailable. Run npm run db:setup and start MySQL.",
    );
  }
}

const resourceConfig = {
  destinations: {
    fields: [
      "slug",
      "city",
      "state",
      "tagline",
      "intro",
      "image_url",
      "gallery",
      "neighbourhoods",
      "best_time",
      "about",
      "food",
      "architecture",
      "local_stories",
      "status",
    ],
    required: [
      "slug",
      "city",
      "state",
      "tagline",
      "intro",
      "image_url",
      "best_time",
      "about",
      "food",
      "architecture",
      "local_stories",
    ],
  },
  experiences: {
    fields: [
      "slug",
      "title",
      "category_slug",
      "category",
      "destination_slug",
      "destination",
      "duration",
      "price",
      "rating",
      "reviews",
      "summary",
      "image_url",
      "language",
      "itinerary",
      "trending",
      "popular",
      "status",
    ],
    required: [
      "slug",
      "title",
      "category_slug",
      "category",
      "destination_slug",
      "destination",
      "duration",
      "summary",
      "image_url",
    ],
  },
  tours: {
    fields: [
      "slug",
      "title",
      "destination",
      "destination_slug",
      "category",
      "category_slug",
      "duration",
      "duration_band",
      "price",
      "rating",
      "reviews",
      "language",
      "image_url",
      "gallery",
      "summary",
      "overview",
      "highlights",
      "discover",
      "itinerary",
      "meeting_point",
      "included",
      "excluded",
      "important",
      "faqs",
      "trending",
      "seasonal",
      "popular",
      "status",
    ],
    required: [
      "slug",
      "title",
      "destination",
      "destination_slug",
      "category",
      "category_slug",
      "duration",
      "duration_band",
      "image_url",
      "summary",
      "overview",
    ],
  },
  categories: {
    fields: ["slug", "title", "short", "description", "image_url", "status"],
    required: ["slug", "title", "short", "description", "image_url"],
  },
  stories: {
    fields: ["slug", "category", "title", "excerpt", "body", "image_url", "read_time", "status"],
    required: ["slug", "category", "title", "excerpt", "body", "image_url", "read_time"],
  },
};

app.get("/api/health", async (_request, response) => {
  try {
    await pool.query("SELECT 1");
    response.json({ ok: true, database: process.env.DB_NAME || "derivative_bharat" });
  } catch {
    response.status(503).json({ ok: false, database: process.env.DB_NAME || "derivative_bharat" });
  }
});

app.post("/api/auth/login", async (request, response) => {
  const { email, password } = request.body || {};
  if (!email || !password) return sendError(response, 400, "Email and password are required.");
  try {
    const [rows] = await pool.execute(
      "SELECT id, email, password_hash, role FROM admin_users WHERE email = ? LIMIT 1",
      [email.toLowerCase().trim()],
    );
    const user = rows[0];
    if (!user || !(await bcrypt.compare(password, user.password_hash)))
      return sendError(response, 401, "Invalid admin credentials.");
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, jwtSecret, {
      expiresIn: "8h",
    });
    return response.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error(error);
    return sendError(response, 503, "The CMS database is unavailable. Run npm run db:setup first.");
  }
});

app.get("/api/admin/me", requireAdmin, (request, response) =>
  response.json({ user: request.admin }),
);

app.get("/api/admin/summary", requireAdmin, async (_request, response) => {
  try {
    const [
      [destinations],
      [experiences],
      [tours],
      [categories],
      [stories],
      [inquiries],
      [newInquiries],
    ] = await Promise.all([
      pool.query("SELECT COUNT(*) AS count FROM destinations"),
      pool.query("SELECT COUNT(*) AS count FROM experiences"),
      pool.query("SELECT COUNT(*) AS count FROM tours"),
      pool.query("SELECT COUNT(*) AS count FROM categories"),
      pool.query("SELECT COUNT(*) AS count FROM stories"),
      pool.query("SELECT COUNT(*) AS count FROM inquiries"),
      pool.query("SELECT COUNT(*) AS count FROM inquiries WHERE status = 'new'"),
    ]);
    response.json({
      destinations: destinations[0].count,
      experiences: experiences[0].count,
      tours: tours[0].count,
      categories: categories[0].count,
      stories: stories[0].count,
      inquiries: inquiries[0].count,
      newInquiries: newInquiries[0].count,
    });
  } catch (error) {
    console.error(error);
    return sendError(response, 503, "The CMS database is unavailable.");
  }
});

for (const [resource, config] of Object.entries(resourceConfig)) {
  app.get(`/api/content/${resource}`, async (_request, response) =>
    queryRows(
      response,
      `SELECT * FROM ${resource} WHERE status = 'published' ORDER BY updated_at DESC`,
    ),
  );
  app.get(`/api/content/${resource}/:slug`, async (request, response) =>
    queryRows(
      response,
      `SELECT * FROM ${resource} WHERE slug = ? AND status = 'published' LIMIT 1`,
      [request.params.slug],
    ),
  );
  app.get(`/api/admin/${resource}`, requireAdmin, (request, response) =>
    queryRows(response, `SELECT * FROM ${resource} ORDER BY updated_at DESC`),
  );

  app.post(`/api/admin/${resource}`, requireAdmin, async (request, response) => {
    const missing = config.required.find(
      (field) => request.body?.[field] === undefined || request.body[field] === "",
    );
    if (missing) return sendError(response, 400, `${missing} is required.`);
    const body = parseBody(request.body, config.fields);
    try {
      const columns = Object.keys(body);
      const placeholders = columns.map(() => "?").join(", ");
      const [result] = await pool.execute(
        `INSERT INTO ${resource} (${columns.join(", ")}) VALUES (${placeholders})`,
        Object.values(body),
      );
      const [rows] = await pool.execute(`SELECT * FROM ${resource} WHERE id = ?`, [
        result.insertId,
      ]);
      return response.status(201).json(normalizeRecord(rows[0]));
    } catch (error) {
      console.error(error);
      return sendError(
        response,
        error.code === "ER_DUP_ENTRY" ? 409 : 400,
        error.code === "ER_DUP_ENTRY"
          ? "A record with this slug already exists."
          : "Could not create this record.",
      );
    }
  });

  app.put(`/api/admin/${resource}/:id`, requireAdmin, async (request, response) => {
    const body = parseBody(request.body || {}, config.fields, false);
    const columns = Object.keys(body);
    if (!columns.length) return sendError(response, 400, "No fields to update.");
    try {
      const [result] = await pool.execute(
        `UPDATE ${resource} SET ${columns.map((column) => `${column} = ?`).join(", ")} WHERE id = ?`,
        [...Object.values(body), request.params.id],
      );
      if (!result.affectedRows) return sendError(response, 404, "Record not found.");
      const [rows] = await pool.execute(`SELECT * FROM ${resource} WHERE id = ?`, [
        request.params.id,
      ]);
      return response.json(normalizeRecord(rows[0]));
    } catch (error) {
      console.error(error);
      return sendError(
        response,
        error.code === "ER_DUP_ENTRY" ? 409 : 400,
        "Could not update this record.",
      );
    }
  });

  app.delete(`/api/admin/${resource}/:id`, requireAdmin, async (request, response) => {
    try {
      const [result] = await pool.execute(`DELETE FROM ${resource} WHERE id = ?`, [
        request.params.id,
      ]);
      if (!result.affectedRows) return sendError(response, 404, "Record not found.");
      return response.status(204).end();
    } catch (error) {
      console.error(error);
      return sendError(response, 400, "Could not delete this record.");
    }
  });
}

app.get("/api/admin/inquiries", requireAdmin, async (_request, response) =>
  queryRows(response, "SELECT * FROM inquiries ORDER BY created_at DESC"),
);
app.patch("/api/admin/inquiries/:id", requireAdmin, async (request, response) => {
  const status = request.body?.status;
  if (!["new", "contacted", "closed"].includes(status))
    return sendError(response, 400, "Invalid inquiry status.");
  try {
    const [result] = await pool.execute("UPDATE inquiries SET status = ? WHERE id = ?", [
      status,
      request.params.id,
    ]);
    if (!result.affectedRows) return sendError(response, 404, "Inquiry not found.");
    const [rows] = await pool.execute("SELECT * FROM inquiries WHERE id = ?", [request.params.id]);
    return response.json(normalizeRecord(rows[0]));
  } catch (error) {
    console.error(error);
    return sendError(response, 400, "Could not update this inquiry.");
  }
});

app.post("/api/inquiries", async (request, response) => {
  const {
    name,
    email,
    phone = null,
    preferred_city = null,
    tour = null,
    tour_title = null,
    tour_destination = null,
    date = null,
    travellers = null,
    interests = null,
    brief = null,
    message,
  } = request.body || {};
  if (!name || !email || !message)
    return sendError(response, 400, "Name, email, and message are required.");
  try {
    const [result] = await pool.execute(
      "INSERT INTO inquiries (name, email, phone, preferred_city, message) VALUES (?, ?, ?, ?, ?)",
      [name.trim(), email.trim().toLowerCase(), phone, preferred_city, message.trim()],
    );
    const inquiry = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone,
      preferred_city,
      tour,
      tour_title,
      tour_destination,
      date,
      travellers,
      interests,
      brief,
      message: message.trim(),
    };
    let sheetsResult = { status: "not_configured" };
    try {
      sheetsResult = await appendInquiryToGoogleSheet({
        inquiryId: result.insertId,
        inquiry,
      });
    } catch (sheetsError) {
      console.error("Could not append inquiry to Google Sheets:", sheetsError);
      sheetsResult = { status: "failed" };
    }
    return response.status(201).json({
      id: result.insertId,
      sheets: sheetsResult.status,
      message: "Thanks. The planning desk will be in touch.",
    });
  } catch (error) {
    console.error(error);
    return sendError(response, 503, "We could not save your inquiry right now.");
  }
});

app.use(express.static(clientBuild));
app.use((request, response, next) => {
  if (request.method !== "GET" || request.path.startsWith("/api/")) return next();
  response.sendFile(path.join(clientBuild, "index.html"), (error) => {
    if (error) next(error);
  });
});

app.use((error, _request, response, _next) => {
  if (error instanceof SyntaxError && "body" in error)
    return sendError(response, 400, "Request body must be valid JSON.");
  console.error(error);
  return sendError(response, 500, "Unexpected server error.");
});

app.listen(port, () =>
  console.log(`Derivative Bharat CMS API listening on http://localhost:${port}`),
);
