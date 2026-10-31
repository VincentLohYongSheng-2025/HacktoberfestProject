# HopAsean

Independent prototype for the Malaysia Ã¢â€ â€™ Greater Jakarta partner-discovery slice of Startup ASEAN Problem Statement 2. No official endorsement or systems access. Existing root licence is preserved.

## Run locally

Requires Node.js 22+ (developed with 24) and npm.

```powershell
npm.cmd ci
Copy-Item .env.example .env.local
# Configure AI_API_KEY privately; never commit it.
npm.cmd run dev
```

Open http://127.0.0.1:3000. Click **Start a market pilot**, load Kopi Harimau, confirm the brief, choose an OEM and agency, acknowledge scope and launch. In development only, the default operator code is `pilotbridge-local`; set `OPERATOR_ACCESS_CODE` in `.env.local` to override. Production demo requires an explicit code and `DEMO_MODE=true`.

The app binds to loopback. This is an isolated synthetic demo, not production authentication. Signed HTTP-only session cookies isolate each browser workspace. Local records and signing key are persisted under ignored `.data/`. Clearing cookies creates a new workspace; old records are not deleted. Local writes are serialised and replaced atomically in one process. Do not run multiple instances against one folder, or deploy this disk adapter to serverless hosting. Supabase Auth/database wiring is deferred per user choice; `supabase/schema.sql` is a proposed RLS schema, not an applied migration.

## What works / what is simulated

| Feature | Implementation | Boundary |
|---|---|---|
| Brief | Validated manual intake, example loader, founder confirmation | Only powdered coffee premix / 20g sachets / USD / MYÃ¢â€ â€™Jakarta |
| AI | Server-only configurable DeepSeek extraction and bounded assessment/report tools, cache, quota, timeout | LIVE only on actual API success; CACHED and DEGRADED explicit; supplied key/provider must pass live check |
| Matching | Exact server formulas, separate gates, feasible pair check | Nine fictional companies; all DEMO evidence synthetic |
| Launch | Server recomputation, idempotent saved pilot, frozen targets | No actual production order or commercial execution |
| Progress | Separate Day-90/Day-180 event histories, source ledger, approved deltas, stock checks | No real 180-day elapsed trial; milestones in seed are illustrative |
| Reports | Deterministic demand/CSAT verdict, AI factor interpretation | No profitability claim; attributable cost data incomplete |
| Operator | Separate server-validated code and signed role cookie | Local demo access, not production operator identity |
| Supabase | Proposed owner RLS schema | Cloud integration not active; no project created |

## Rules & accounting

`oem_pdf_v1`: Q=.30recipe+.25seal+.25sla+.20conv; R=v/(v+5)Q+5/(v+5)*.78; M=max(0,1-abs(MOQ-target)/target); T=1/.5/.1; L=max(0,1-distance/150); S=.35R+.30M+.20T+.15L. v=0 uses prior .78 without invented quality. The source MOQ formula penalises low MOQ too; retained intentionally. Ranks use full precision, then stable ID. Suitability is not success probability.

`agency_proposed_v1`: .30 channels + .25 category experience + .20 capacity + .15 commercial fit + .10 geography. Proposed rubric, not validated market science. `pilot_feasibility_v1` separately enforces gates, quantities, packaging, deadlines, quotes, role, channels, handover and combined USD budget. Six OEM gates represent prototype policy, not Indonesian legal advice. All unknown/expired/conflicting evidence requires review; FAIL takes priority.

One unit = one 20g sachet; 20 per carton. Example target 3,000. Snapshots contain independent histories: Day90 = 2,100 net sold, 40 ratings at 4.5; Day180 = 2,730, 60 at 4.6. No seeded returns/damage. Sell-through is within the first 90 selling days from recorded Day46. Full observation at Day180 and Ã¢â€°Â¥20 ratings are required. Thresholds Ã¢â€°Â¥80% and Ã¢â€°Â¥4.2 are inclusive. Missing cost data leaves contribution unavailable. Demo dates are fixed and visible; new operator events explicitly acknowledge backdating. Seed milestones are not operational approvals.

## AI configuration

Default official endpoint https://api.deepseek.com, model alias `deepseek-flash` (DeepSeek V4.1 Flash in supplied specification). Set `AI_BASE_URL`, `AI_MODEL`, `AI_PROVIDER` explicitly for another provider. Never silently switches providers. Chat completion tools follow official docs; non-thinking mode. At most 4 model requests, 8 tool executions, 20 seconds overall, 1,200 output tokens, bounded input and default 30 model requests/session. Provider spending controls must enforce your monetary budget; app quota is not a USD5 spending guarantee. Generated explanations use only validated factor enums, partner IDs and evidence IDs; backend numbers cannot be replaced by model text. Cache keys include complete inputs, evidence/rules/model/prompt version. No hidden reasoning stored. No key sent to client. DeepSeek failure preserves deterministic workflow. No automatic retry loop beyond bounded tool rounds.

## Validation

```powershell
npm.cmd test
npm.cmd run typecheck
npm.cmd run build
# With dev server running:
npm.cmd run test:e2e
```

See `docs/test_results.md` for observed results and remaining gates. Browser tests require Playwright Chromium (`npx.cmd playwright install chromium`).

## Architecture

Next.js App Router + TypeScript + React + Zod. UI calls `/api` routes, which authorise signed sessions, validate schemas, run `lib/rules.ts`, optionally invoke `lib/ai.ts`, and persist through `lib/store.ts`. The browser never computes authoritative rankings or KPI verdicts. Source PRD and development plan are in `docs/`. Future work: Supabase adapter/auth and full table model, production operator assignment, real registry/document evidence, commercial validation, deployment and demo video. No external publication or submission is performed by setup.

Sources: supplied PRD/development plan (their PDF source documents were not independently reviewed in this build); [DeepSeek tools](https://api-docs.deepseek.com/guides/tool_calls/), [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [Next.js installation](https://nextjs.org/docs/app/getting-started/installation). PS2 / Category B are the supplied submission framing, not a guarantee of event eligibility.

## OEM and sales agency portals

OEMs and sales agencies register and sign in with independent accounts. Operator-reviewed organisation assignment controls pilot access. Founder-generated partner invitations have been removed. See `docs/partner_accounts.md` for the current flow.

## PDF outcome reports

Generate grounded assessment now also downloads a PDF of the selected snapshot. Download PDF again retrieves the saved report without another model call. See `docs/pdf_reports.md` for content, ownership and evidence rules.

## Independent OEM and sales accounts

The invitation-based partner prototype is superseded by independent registration and sign-in. OEM: `/oem/register`, `/oem/login`, `/oem/dashboard`. Sales agency: `/sales/register`, `/sales/login`, `/sales/dashboard`. Operators review registrations at `/operator/partners`. Founder sessions cannot open partner dashboards or generate impersonation links. See `docs/partner_accounts.md`.

## Hosted demo
Vercel demo mode uses temporary instance-local storage. Accounts and pilot history can reset or differ across instances; use synthetic details. Durable multi-user storage is not configured. SESSION_SECRET must be set privately on Vercel.
