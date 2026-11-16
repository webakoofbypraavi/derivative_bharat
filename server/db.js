import "dotenv/config";
import mysql from "mysql2/promise";

const dbName = process.env.DB_NAME || "derivative_bharat";

export const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: dbName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: "utf8mb4",
  dateStrings: true,
});

export function jsonValue(value, fallback = []) {
  if (value === null || value === undefined || value === "") return fallback;
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function serializeJson(value, fallback = []) {
  if (value === undefined || value === null || value === "") return JSON.stringify(fallback);
  return typeof value === "string" ? value : JSON.stringify(value);
}

export function normalizeRecord(record) {
  if (!record) return record;
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => {
      if (
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
        ].includes(key)
      )
        return [key, jsonValue(value)];
      return [key, value];
    }),
  );
}
