# Derivative Bharat CMS

The CMS has two parts:

- `server/` contains the Express API, MySQL connection, schema, authentication, and CRUD endpoints.
- `/admin` is the protected content studio inside the React app.

## Local setup

1. Make sure MySQL is running and the `root` account can connect.
2. Copy `.env.example` to `.env` and set a strong `JWT_SECRET` and `ADMIN_PASSWORD`.
3. Create the database and tables with `npm run db:setup`.
4. Start the API and Vite app together with `npm run dev:full`.

Open `http://localhost:8080/admin` to sign in. The setup command creates the database named by `DB_NAME` and seeds the admin account once. It does not overwrite an existing admin password on later runs.

## Content managed

The studio includes dashboard counts, destinations, experience categories, tours, stories, and inquiry status tracking. Tour forms cover pricing, duration, languages, images, highlights, itinerary, inclusions, travel notes, FAQs, and featured placement. Records support `draft` and `published` states. Draft records remain available in the admin API but are excluded from the public content endpoints.

The first `npm run db:setup` seeds the site's existing six tours, six destinations, five experience categories, and three stories into MySQL. It uses insert-if-missing behavior, so later setup runs do not overwrite edits made in the CMS. Published tours, destinations, categories, and stories are loaded from the database by the public site.

The API runs on port `8787` by default. The Vite development server proxies `/api` to it. Useful endpoints include `GET /api/health`, `POST /api/auth/login`, authenticated CRUD under `/api/admin/*`, and published content under `/api/content/*` (`tours`, `destinations`, `categories`, and `stories`).

## Google Sheets enquiries

Booking enquiries submitted from `/plan` are saved to MySQL and appended to the configured Google Sheet. The destination selects the tab. The default mapping covers all six tours and retains the Hampi and Delhi aliases:

| Tour or destination | Spreadsheet tab |
| --- | --- |
| Hampi Heritage Trail / Hampi | Sheet1 |
| Delhi | Sheet2 |
| South Goa Temple Run | Sheet3 |
| Coastal Karnataka Heritage | Sheet4 |
| Marathwada Heritage Trail | Sheet5 |
| Western Maharashtra Heritage | Sheet6 |
| Northern Karnataka Heritage | Sheet7 |

Create these tabs in the spreadsheet with the exact names above, or change the values in `GOOGLE_SHEETS_TAB_MAP` to match your existing tab names. Headers are added automatically to an empty tab. Unmapped destinations use `GOOGLE_SHEETS_DEFAULT_TAB`.

1. In Google Cloud, enable the Google Sheets API and create a service account.
2. Share the spreadsheet with the service account email as an Editor.
3. Add the service account email and private key to `.env` using the `GOOGLE_SHEETS_*` variables from `.env.example`.
4. Change `GOOGLE_SHEETS_TAB_MAP` if the spreadsheet uses different tab names, then restart `npm run dev:full`.

The spreadsheet ID is already set to the ID from the supplied Google Sheets URL. The private key must remain server-side and must never be added to frontend code or committed to git.
