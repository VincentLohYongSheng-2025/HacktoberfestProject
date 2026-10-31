# Observed validation — 31 October 2026, Asia/Kuala_Lumpur

Fixture version: pb_v3 / oem_pdf_v1 / agency_proposed_v1.

- `npm.cmd test`: 12 business-rule tests and 2 mocked-provider test groups passed. These cover exact .914 score, FAIL precedence, review gates, missing history, exclusions, pair budget, invalid numbers, snapshot isolation, inclusive targets, inventory, returns, deduplication, prompt injection, milestone approval, AI timeout/invalid tools/unknown IDs, quotas and caching.
- `npm.cmd run typecheck`: passed.
- `npm.cmd run build`: passed; rerun after last adapter edit is recorded in this chat.
- `npm.cmd run test:e2e`: passed. Browser test covers founder intake, live extraction and matching, launch idempotency, owner isolation, forbidden founder writes, authenticated operator delta, duplicate update, impossible stock rejection, refresh persistence, separate snapshots, report verdicts and mobile overflow.
- Genuine provider completion succeeded through https://litellm.rapidscreen.io/v1 using deepseek-v4.1-flash. See provider_evidence.json for validated real application cycles. Usage there is the final completion in a tool cycle, not a cumulative billing estimate.
- Earlier failures exposed and corrected origin normalization, product-name extraction, numeric strings, duplicated evidence IDs, and provider tool/JSON constraint incompatibility. Degraded AI is deliberately labelled when validation fails.

Remaining boundaries: local single-process synthetic session/storage only; Supabase is deferred at user request; no deployment, video or hackathon submission performed. No real registry verification, legal approval, commercial outcomes or elapsed 180-day pilot. Production auth and cloud persistence are not verified. Monetary budget must be enforced at the provider. Cached and mocked cycles are not live evidence.


## Partner portal extension — 31 October 2026

- `npm.cmd test`: 17 existing business/storage/AI test groups passed.
- `npm.cmd run typecheck`: passed.
- `npm.cmd run build`: passed with the new scoped partner API route.
- `npm.cmd run test:e2e -- tests/browser/partner-flow.spec.ts`: passed in separate OEM and sales browser sessions. Checked invitation scope, tampering, forbidden cross-role writes, denied founder-resource access, pending report isolation, idempotent approval, founder KPI refresh and mobile overflow.
- `npm.cmd run test:e2e -- tests/browser/flow.spec.ts`: passed after correcting the new founder navigation link at mobile widths. Existing live AI/founder/operator/report flow remains working.
- Original PRD explicitly deferred portals. The new prototype scope and access boundaries are documented in `partner_portals.md`.


## PDF report export — 31 October 2026

- `npm.cmd test`: 19 tests/groups passed, including frozen report records and an insufficient-evidence export.
- `npm.cmd run typecheck`: passed after the final snapshot-control safeguard.
- `npm.cmd run build`: passed with the server PDF renderer and export route.
- `npm.cmd run test:e2e -- tests/browser/pdf-report.spec.ts`: passed; downloaded genuine Day-180 and Day-90 PDFs, parsed PDF pages, verified repeat download and rejected another founder's access.
- `pypdf` verified Day180 TARGETS MET / 91.0% / 4.6 out of 5 / final rating source, and Day90 INSUFFICIENT EVIDENCE / 70.0%.
- Poppler rendered the five-page Day180 report and Day90 summary. Visual inspection found no clipping or overlap. Local Poppler emitted unused Symbol/ArialUnicode fallback warnings; rendered Helvetica text was readable.
- A report remains available with an explicit degraded AI label when inference fails. PDF labels currently use standard English fonts; unsupported characters are substituted in page text as documented.


## Independent OEM and sales accounts — 31 October 2026

- TypeScript and production build passed.
- All 19 existing rule/storage/report/AI tests passed.
- `npm.cmd run test:e2e -- tests/browser/partner-flow.spec.ts` passed for registration, password sign-in, sign-out, pending review, operator organisation assignment, wrong-role/incorrect-password rejection, removed invitation access, denied founder APIs, pending sales reports, approved KPI change and 390px mobile overflow checks for both roles.
- UI tests confirmed account responses omit password hashes and salts. Registration uses strict input schemas; the applicant cannot assign its own catalogue organisation.
- This replaces the prior bearer invitation flow. Old invitation cookies are ignored, invitation session exchange is forbidden, and founder-generated invite requests are denied. Founder sessions do not authenticate OEM or sales workspaces.
- Account handling remains an explicitly local prototype: no email verification or password recovery. See partner_accounts.md for the current flow and review boundary.
