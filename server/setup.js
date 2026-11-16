import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const dbName = process.env.DB_NAME || "derivative_bharat";
const connection = await mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  multipleStatements: true,
});

try {
  if (!/^[a-zA-Z0-9_]+$/.test(dbName))
    throw new Error("DB_NAME can only contain letters, numbers, and underscores.");
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
  );
  await connection.changeUser({ database: dbName });
  const schema = await fs.readFile(path.join(root, "schema.sql"), "utf8");
  await connection.query(schema);
  try {
    await connection.query("ALTER TABLE destinations ADD COLUMN gallery JSON NULL AFTER image_url");
  } catch (error) {
    if (error.code !== "ER_DUP_FIELDNAME") throw error;
  }
  await connection.query("UPDATE destinations SET gallery = JSON_ARRAY() WHERE gallery IS NULL");
  const catalogSeed = JSON.parse(await fs.readFile(path.join(root, "catalog-seed.json"), "utf8"));
  const defaultTours = JSON.parse(await fs.readFile(path.join(root, "tours-seed.json"), "utf8"));
  const tourFields = [
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
  ];
  const jsonFields = new Set([
    "language",
    "gallery",
    "highlights",
    "discover",
    "itinerary",
    "included",
    "excluded",
    "important",
    "faqs",
  ]);
  const placeholders = tourFields.map(() => "?").join(", ");
  for (const tour of defaultTours) {
    const values = tourFields.map((field) =>
      jsonFields.has(field) ? JSON.stringify(tour[field] ?? []) : (tour[field] ?? null),
    );
    await connection.execute(
      `INSERT IGNORE INTO tours (${tourFields.join(", ")}) VALUES (${placeholders})`,
      values,
    );
  }
  async function seedResource(table, fields, jsonFields, records) {
    const placeholders = fields.map(() => "?").join(", ");
    for (const record of records) {
      const values = fields.map((field) =>
        jsonFields.includes(field) ? JSON.stringify(record[field] ?? []) : (record[field] ?? null),
      );
      await connection.execute(
        `INSERT IGNORE INTO ${table} (${fields.join(", ")}) VALUES (${placeholders})`,
        values,
      );
    }
  }
  await seedResource(
    "destinations",
    [
      "slug", "city", "state", "tagline", "intro", "image_url", "gallery", "neighbourhoods",
      "best_time", "about", "food", "architecture", "local_stories", "status",
    ],
    ["gallery", "neighbourhoods"],
    catalogSeed.destinations,
  );
  await seedResource(
    "categories",
    ["slug", "title", "short", "description", "image_url", "status"],
    [],
    catalogSeed.categories,
  );
  await seedResource(
    "stories",
    ["slug", "category", "title", "excerpt", "body", "image_url", "read_time", "status"],
    [],
    catalogSeed.stories,
  );
  const email = process.env.ADMIN_EMAIL || "admin@derivativebharat.in";
  const password = process.env.ADMIN_PASSWORD || "change-me-before-production";
  const hash = await bcrypt.hash(password, 12);
  await connection.execute(
    `INSERT IGNORE INTO admin_users (email, password_hash, role) VALUES (?, ?, 'admin')`,
    [email, hash],
  );
  console.log(`Database ready: ${dbName}`);
  console.log(
    `Default catalog available: ${defaultTours.length} tours, ${catalogSeed.destinations.length} destinations, ${catalogSeed.categories.length} categories, and ${catalogSeed.stories.length} stories.`,
  );
  console.log(`Admin account seeded: ${email}`);
  console.log("Change ADMIN_PASSWORD in .env before production.");
} finally {
  await connection.end();
}
