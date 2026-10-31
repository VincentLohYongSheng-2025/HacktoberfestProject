# HopAsean

HopAsean is a web prototype that helps startup founders plan a small cross-border market pilot, compare OEM manufacturers and sales agencies, and review pilot outcomes. The current demo follows a fictional Malaysian coffee startup entering Greater Jakarta, Indonesia.

**Live demo:** https://hopasean.vercel.app  
**Repository:** https://github.com/VincentLohYongSheng-2025/HacktoberfestProject

> All partner profiles, evidence and pilot results are synthetic. This prototype does not place orders, verify regulatory compliance or execute commercial agreements.

## Features

- **Founder workspace:** describe a product, review AI-extracted requirements, compare partners and launch a simulated pilot.
- **OEM manufacturer portal:** register, review an assigned production scope, submit production and handover reports, and raise issues.
- **Sales agency portal:** register, review sales scope, report receipts, sales and customer feedback, and track inventory.
- **Pilot dashboard:** explore independent Day-90 and Day-180 snapshots with sales, stock and customer satisfaction metrics.
- **PDF reports:** generate a grounded assessment and download a saved report for the selected snapshot.
- **Operator tools:** review organisation registrations and partner submissions in the approval-based workflow.
- **Demo mode:** founders enter without account verification; partners can enter isolated, prefilled pilots immediately when automatic demo access is enabled.

AI supports extraction and explanations. Server-side rules calculate authoritative partner scores, budgets, stock movements and target verdicts.

## Technology

Next.js App Router, React, TypeScript, Zod, Lucide icons and pdf-lib. Tests use Node's test runner through tsx and Playwright.

## Prerequisites

- Node.js **24.x** (the development and deployment version).
- npm, included with Node.js.
- Git to clone the repository.
- Google Chrome for the configured browser tests.

## Installation

```bash
git clone https://github.com/VincentLohYongSheng-2025/HacktoberfestProject.git
cd HacktoberfestProject
npm ci
```

Create your local environment file:

**Windows PowerShell**

```powershell
Copy-Item .env.example .env.local
```

**macOS / Linux**

```bash
cp .env.example .env.local
```

If PowerShell blocks `npm.ps1`, use `npm.cmd` instead of `npm` in the commands below.

## Environment setup

Edit `.env.local` before starting the app. For immediate access while recording a demo, set:

```dotenv
DEMO_MODE=true
DEMO_AUTO_APPROVE=true
```

| Variable | Purpose |
| --- | --- |
| `DEMO_MODE` | Enables isolated synthetic demo use. Required for the hosted production demo. |
| `DEMO_AUTO_APPROVE` | With demo mode enabled, opens a prefilled partner pilot after registration or login. The underlying organisation review is unchanged. Set `false` to demonstrate the approval workflow. |
| `AI_PROVIDER` | Provider label; the example uses `litellm`. |
| `AI_BASE_URL` | OpenAI-compatible API base URL; the example uses `https://litellm.rapidscreen.io/v1`. |
| `AI_MODEL` | Model identifier; the example uses `deepseek-v4.1-flash`. |
| `AI_API_KEY` | Your provider key, configured privately. Leave empty to use the manual/deterministic fallback. |
| `AI_TIMEOUT_MS` | AI request timeout setting; the example uses `20000`. |
| `AI_SESSION_LIMIT` | Per-workspace AI quota; the example uses `30`. |
| `OPERATOR_ACCESS_CODE` | Private code for operator tools. Required to unlock them in a production demo. |
| `SESSION_SECRET` | Shared server-side session signing secret for hosted deployments. Local development generates an ignored signing key automatically. |

Never commit `.env.local`, API keys or signing secrets. Supabase variables in the example are placeholders: the proposed schema is included, but cloud authentication and database integration are not active.

## Run locally

```bash
npm run dev
```

Open **http://127.0.0.1:3000**. Keep the terminal running; press `Ctrl+C` to stop the server.

### Run a production build locally

Stop the development server first if it is using port 3000.

```bash
npm run build
npm start
```

Open **http://127.0.0.1:3000** again. Keep `DEMO_MODE=true` for the production demo.

## Try the demo

### Startup founder

1. Open the homepage and select **Start a market pilot**.
2. Load the **Kopi Harimau example**, or enter non-confidential product requirements and select **Analyse requirements**.
3. Review the fields, confirm them and find partners.
4. Select both an OEM manufacturer and a sales agency, acknowledge the pilot scope and launch.
5. Explore Day-90 and Day-180 progress, then generate an assessment to download the PDF report.

Founder demo entry does not require account registration or email verification. Switching from a partner session to the founder workspace starts a separate founder demo session.

### OEM manufacturer and sales agency

Visit `/partner` to choose a role, or use these routes directly:

| Role | Register | Sign in | Dashboard |
| --- | --- | --- | --- |
| OEM manufacturer | `/oem/register` | `/oem/login` | `/oem/dashboard` |
| Sales agency | `/sales/register` | `/sales/login` | `/sales/dashboard` |

Use synthetic organisation details and a password of at least 12 characters. With `DEMO_AUTO_APPROVE=true`, each account receives an isolated, prefilled 3,000-sachet pilot. These are separate demo workspaces; they are not automatically linked to a founder's newly created pilot.

With automatic demo access disabled, new accounts await operator organisation review and assignment. Email verification and password recovery are not implemented.

### Operator workflow

Organisation review is available at `/operator/partners`. Pilot operator tools are available from the founder pilot workflow. In development, the default operator code is `pilotbridge-local`; set `OPERATOR_ACCESS_CODE` to override it. Production has no default operator code. Partner submissions in the approval workflow affect approved KPIs only after review.

## Tests and checks

```bash
npm run typecheck
npm test
npm run build
```

For browser tests, run the development server in a separate terminal, ensure Google Chrome is installed, then run:

```bash
npm run test:e2e
```

Playwright currently uses the installed `chrome` channel. Partner tests depend on the selected demo configuration: use `DEMO_AUTO_APPROVE=true` for `partner-demo.spec.ts` and `false` for the approval workflow test. Some browser flows call the configured AI provider and may consume API quota.

## Project structure

```text
app/           Pages, shared styles and API routes
components/    Founder, partner and operator interfaces
lib/           Validation, matching rules, AI, reports and storage
supabase/      Proposed database schema (not applied)
tests/         Rules, storage, AI, report and browser tests
docs/          PRD, development plan and workflow documentation
```

## Data and deployment limitations

Local sessions and records are stored in the ignored `.data/` directory. Clearing browser cookies removes access to the current founder session; it does not delete saved records. Local writes are serialised within one process, so do not share this folder between multiple running app instances.

Founder pilots and PDF reports on Vercel are stored in encrypted, HTTP-only browser cookies for up to seven days. Keep the same browser and allow cookies; clearing them removes access. This bounded demo storage is not a multi-user database. Partner account records still use temporary instance-local storage. A persistent database and production authentication are future work.

The example scope is powdered coffee premix in 20g sachets, Malaysia to Greater Jakarta, with a 2,000-5,000-sachet pilot. Sell-through and customer satisfaction thresholds describe simulated demand results; missing cost evidence means profitability is not established. AI unavailability leaves manual intake and deterministic calculations available.

## Further documentation

- [Product requirements](docs/prd.md)
- [Development plan](docs/development_plan.md)
- [Partner accounts and demo access](docs/partner_accounts.md)
- [PDF reports](docs/pdf_reports.md)
- [Recorded validation notes](docs/test_results.md)

## License

See [LICENSE](LICENSE) for the repository license.
