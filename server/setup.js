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
  const email = process.env.ADMIN_EMAIL || "admin@derivativebharat.in";
  const password = process.env.ADMIN_PASSWORD || "change-me-before-production";
  const hash = await bcrypt.hash(password, 12);
  await connection.execute(
    `INSERT IGNORE INTO admin_users (email, password_hash, role) VALUES (?, ?, 'admin')`,
    [email, hash],
  );
  console.log(`Database ready: ${dbName}`);
  console.log(`Admin account seeded: ${email}`);
  console.log("Change ADMIN_PASSWORD in .env before production.");
} finally {
  await connection.end();
}
