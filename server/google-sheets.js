import { google } from "googleapis";

const headers = [
  "Timestamp",
  "Inquiry ID",
  "Name",
  "Email",
  "Phone",
  "Destination",
  "Tour",
  "Date",
  "Travellers",
  "Interests",
  "Brief",
  "Message",
];

function normalizeKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseTabMap(value) {
  const map = new Map();
  for (const entry of String(value || "").split(",")) {
    const separator = entry.includes("=") ? "=" : ":";
    const [key, ...sheetParts] = entry.split(separator);
    const sheetName = sheetParts.join(separator).trim();
    if (key?.trim() && sheetName) map.set(normalizeKey(key), sheetName);
  }
  return map;
}

function getSheetsClient() {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!spreadsheetId || !clientEmail || !privateKey) return null;

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return {
    spreadsheetId,
    sheets: google.sheets({ version: "v4", auth }),
  };
}

function getSheetName(destination) {
  const tabMap = parseTabMap(process.env.GOOGLE_SHEETS_TAB_MAP || "hampi=Sheet1,delhi=Sheet2");
  return tabMap.get(normalizeKey(destination)) || process.env.GOOGLE_SHEETS_DEFAULT_TAB || "Sheet1";
}

function quoteSheetName(sheetName) {
  return `'${sheetName.replace(/'/g, "''")}'`;
}

export async function appendInquiryToGoogleSheet({ inquiryId, inquiry }) {
  const client = getSheetsClient();
  if (!client) return { status: "not_configured" };

  const destination = inquiry.preferred_city || inquiry.tour_destination || "other";
  const sheetName = getSheetName(destination);
  const range = `${quoteSheetName(sheetName)}!A:L`;
  const values = [
    new Date().toISOString(),
    inquiryId,
    inquiry.name,
    inquiry.email,
    inquiry.phone || "",
    destination,
    inquiry.tour_title || inquiry.tour || "Custom route",
    inquiry.date || "",
    inquiry.travellers || "",
    inquiry.interests || "",
    inquiry.brief || "",
    inquiry.message,
  ];

  const existingHeader = await client.sheets.spreadsheets.values.get({
    spreadsheetId: client.spreadsheetId,
    range: `${quoteSheetName(sheetName)}!A1:L1`,
  });

  if (!existingHeader.data.values?.length) {
    await client.sheets.spreadsheets.values.update({
      spreadsheetId: client.spreadsheetId,
      range: `${quoteSheetName(sheetName)}!A1:L1`,
      valueInputOption: "RAW",
      requestBody: { values: [headers] },
    });
  }

  await client.sheets.spreadsheets.values.append({
    spreadsheetId: client.spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [values] },
  });

  return { status: "saved", sheetName };
}
