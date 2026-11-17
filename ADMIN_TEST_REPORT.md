# Admin functionality test report

Tested on 17 November 2026 against the production build, using headless Chromium at desktop (1440 × 1000) and mobile (390 × 844) sizes, plus HTTP API checks. All 32 test scenarios passed after the fixes below. Several scenarios exercise multiple operations and resources.

## Coverage

| Area | Verified |
| --- | --- |
| Authentication | Valid login, wrong/missing credentials, session restoration, invalid and expired tokens, desktop/mobile logout, token removal |
| Access protection | Unauthenticated and invalid-token requests rejected for dashboard, profile, inquiries, and all five content sections |
| Dashboard | API counts, overview rendering, section navigation |
| Destinations, Experiences, Tours, Categories, Stories | Create, edit, publish, delete through the browser; API create/update/delete; duplicate slugs; missing required fields; missing records; empty updates |
| Publishing | Drafts excluded from public endpoints; published records returned; partial edits preserve publishing state and lists; published Experiences appear on the public listing |
| Editors | JSON/list round trips, invalid JSON errors, blank optional numeric values, cancel, backdrop dismissal, delete cancellation |
| Inquiries | Submission, list display, new/contacted/closed transitions, invalid status and missing inquiry rejection, browser status change, visible failure message |
| Navigation | Fast section changes ignore late responses from previous sections |
| Mobile | Navigation, editor fit, login fit, accessible sign-out |
| Public integration | Experience listing and detail, destination listing and detail, stories page render without JavaScript crashes |
| Request handling | Malformed JSON rejected |

## Fixes made

- Partial API updates no longer reset omitted lists to empty or change published records to drafts.
- Experience price, rating, and review fields use numeric inputs and serialization; leaving optional numeric fields blank no longer sends invalid empty strings to MySQL.
- Mobile users can access sign-out.
- Failed inquiry status changes show an error; successful changes update the new-inquiry badge.
- Late responses cannot replace the records for a newly selected section.
- Published Experiences join the public journey catalog, with existing Tours taking precedence for duplicate slugs. Duration filters are derived from experience duration text.
- Removed redundant comparisons causing TypeScript errors in the admin delete handler.

## Validation and limits

- Production build: passed.
- ESLint on changed JavaScript/TypeScript files: passed.
- Git whitespace check: passed.
- Repository-wide lint: failed with 2,361 existing formatting errors and 8 warnings on the initial run; broad formatting changes were outside this task.
- Repository-wide TypeScript check: still fails with 92 errors outside the edited admin/app components. The production build does not perform this check.
- The existing `.env` MySQL connection returns `ER_ACCESS_DENIED_ERROR`. Its credentials were not changed. End-to-end tests used a separate MySQL instance on loopback port 3307 and a dedicated test database, with a test-only admin account. The configured application database was not modified.
- Google Sheets delivery was not tested: service-account credentials are absent. Inquiry storage and admin status management were tested with Sheets disabled.
- These are local checks; the deployed website and hosting configuration were not tested. Changes are local and have not been pushed or deployed.
- Detailed local results and browser scripts are in `.output/admin-results.json`, `.output/admin-extra-results.json`, `.output/admin-check.mjs`, and `.output/admin-extra.mjs`. These temporary artifacts are ignored by Git.
