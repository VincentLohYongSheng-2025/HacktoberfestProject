# HopAsean — Product Requirements Document

Version: 1.0 | Updated: 31 October 2026, Asia/Kuala_Lumpur
Status: Build specification; implementation and validation are not yet confirmed.
Companion: `development_plan.md`

## 1. Product decision

Build a website that helps Malaysian consumer-product startups discover and assess an Indonesian OEM manufacturer and a sales/distribution agency, select both, and track a bounded market pilot. Start with one corridor: Malaysia → Greater Jakarta, Indonesia; one product category: powdered coffee premix; one fictional startup: Kopi Harimau.

**Value proposition:** Turn fragmented partner discovery into a coordinated production-and-sales pilot, with visible assessment evidence, progress and measurable results before a founder decides whether to expand.

The latest agreed model is DeepSeek V4.1 Flash. DeepSeek interprets requirements, analyses supplied evidence, calls assessment tools and explains results. Backend functions enforce eligibility and calculate rankings and KPIs. Supabase stores records; Next.js provides the website.

This is an independent hackathon prototype proposed for the Startup ASEAN challenge. Do not imply an official partnership, endorsement or access to Startup ASEAN systems.

## 2. Challenge alignment and delivery constraints

The hacker pack lists two problem statements. The user's selected framing is **Problem Statement 2**: addressing ecosystem fragmentation and becoming a single gateway for discovering opportunities, programmes, funding, talent and partners across ASEAN. HopAsean demonstrates the **cross-border partner discovery and coordination slice** of that gateway. It does not implement the entire ecosystem gateway.

Its measurable pilot outcomes also support Problem Statement 1, which concerns converting connections into investments, partnerships, expansion and cross-border POCs. Keep PS2 consistent in submission fields unless the team explicitly changes it; explain the outcome linkage without claiming to solve every category.

| Constraint | Source-grounded requirement |
|---|---|
| Event | Hacktoberfest Hack Day KL, 31 October 2026 |
| Build sprint | 11:00 AM–3:00 PM MYT; substantially develop the project during the event |
| Team | Four people; follow organiser instructions for team formation |
| Category | Category B: Best Open-Source AI Project for the DeepSeek implementation |
| Submission | MLH OrganizerHQ by 3:00 PM MYT |
| Required assets | Public GitHub repo, root open-source licence, README/setup/run instructions, live demo or local evaluation instructions, project description, video within three minutes |
| Finalist format | Four-minute demo plus three-minute Q&A |
| Tech choice | Hacker pack permits any technologies; tools listed in it are recommendations |

DeepSeek publishes V4.1 Flash model weights under MIT. Hosted inference must still be documented with the actual provider, model ID and deployment configuration. Category choice is based on the pack, not a guarantee of judging eligibility. No numerical judging weights were provided in the reviewed pack; do not invent them. Replit use and Apache 2.0 specifically are not requirements of this event; those belonged to another hackathon.

## 3. Problem, users and evidence status

**Problem statement:** A Malaysian consumer-product founder considering Jakarta needs both a capable manufacturer and a local sales partner. Separate directories and introductions do not establish whether these partners can execute the same small pilot, how their capabilities compare, or whether the eventual pilot validates demand.

This is a product hypothesis supported by the challenge framing and supplied specification, not a completed customer study. Do not repeat the PDF's claims of 12–18 months, USD100,000 entry costs, guaranteed liability avoidance or regulatory shortcuts as verified market facts.

| User | Need | MVP access |
|---|---|---|
| Startup founder | Define pilot, compare evidence and costs, select partners, monitor results | Primary end-to-end workflow |
| Platform operator | Review partner evidence and pilot updates, resolve gaps | Compact protected operator view |
| OEM manufacturer | Understand specifications; report sampling, production and delivery | Represented by operator-entered demo updates |
| Sales/distribution agency | Confirm channels and terms; report sales, inventory and feedback | Represented by operator-entered demo updates |

An agency is a sales, distribution or market-entry partner, not automatically a legal importer or licensed distributor. Store its actual role. Separate OEM and agency eligibility; trading companies must not be assessed against factory machinery requirements.

## 4. Scope and priorities

### P0 — required working vertical slice

1. Product brief form with AI extraction and founder confirmation.
2. Separate OEM and sales-agency candidate lists, seeded from synthetic records.
3. Six-gate OEM evidence assessment, agency-specific assessment, and mandatory pilot feasibility checks.
4. Exact backend scoring, component breakdown, visible exclusions and grounded AI recommendation.
5. Selection of one OEM and one agency, followed by creation of a demo pilot.
6. Persistent pilot dashboard: production, deliveries, sales, inventory, milestones and issues.
7. Operator update form that changes data and recalculates the founder dashboard after refresh.
8. A separate simulated Day-180 snapshot, deterministic KPI verdict and AI-assisted report.
9. Transparent live/cached AI status, synthetic-data labels and reproducible test evidence.

### P1 — only after P0 is integrated

Evidence attachment preview, structured CSV sales import, simple feedback-entry form, report download as Markdown, improved partner filters and polling refresh. A demo-mode snapshot selector is P0; a historical chart is P1.

### Deferred production scope

Government registry integrations; whole-website crawling; general ASEAN coverage; automated document authenticity verification; OCR/vision pipeline; live marketplace APIs; supplier self-service onboarding; partner-specific portals; real contracts, escrow, payments, equity or royalty execution; encrypted recipe sharing; legal approvals; automated profit prediction; notifications and chat.

Do not build a general chatbot, funding directory or investor marketplace during this sprint. External website links may be stored as references; the MVP does not claim to have scanned or authenticated their contents.

## 5. Founder journey and screens

| Step / route | Screen and action | Required outcome |
|---|---|---|
| `/` | Product promise, Malaysia → Jakarta corridor, Start demo | Clear scope and demo-data notice |
| `/brief` | Paste requirements or load Kopi Harimau example; Analyse; confirm extracted fields | Saved, validated brief; missing fields highlighted |
| `/matches/[briefId]` | OEM and Agency tabs/columns; inspect gates, evidence and scores | Eligible candidates ranked independently; review/blocked candidates separated |
| Same screen | Select one eligible OEM and one eligible agency | Combined cost and responsibilities summary; launch remains disabled for missing prerequisites |
| `/pilots/[id]` | Launch Market Test; see timeline and current snapshot | Stored pilot, selections and frozen targets |
| `/operator/pilots/[id]` | Add production/delivery/sales update or issue | Validated update with source, author and timestamp |
| `/pilots/[id]/report` | Load simulated completed snapshot; generate report | Computed verdict, cited internal records, AI narrative and founder next action |

Use **“Select Partners & Launch Pilot”** and **“Track Production, Sales & Pilot Progress”**. “Sandbox” means a controlled business test, not a regulatory exemption or software runtime.

## 6. Functional requirements and acceptance criteria

| ID | Requirement | Acceptance criterion |
|---|---|---|
| FR-01 | Brief intake | Record origin/destination, category, packaging, volume, unit basis, channels, hub, budget/currency, deadline and thresholds; quantity 2,000–5,000 for this demo policy; validation errors are actionable |
| FR-02 | AI requirements analysis | DeepSeek returns structured suggested fields; founder confirms before matching; absent values remain null, never invented |
| FR-03 | Evidence visibility | Each gate shows status, supporting evidence ID, source type, reviewed time, expiry if known, and missing information |
| FR-04 | Eligibility | Required FAIL blocks; required UNKNOWN/expired/conflicting evidence requires review; only all required PASS yields eligible |
| FR-05 | OEM scoring | Implement Section 8 formulas exactly with full precision; show factors and algorithm version; rank only eligible, feasible candidates with complete scoring inputs |
| FR-06 | Agency scoring | Implement the explicitly proposed Section 9 model; factory-only gates never appear as agency prerequisites |
| FR-07 | Matching explanation | AI refers only to supplied IDs, factors and evidence; numerical values come from backend; invalid explanations are rejected or replaced with a deterministic summary |
| FR-08 | Pair selection and launch | Recheck eligibility, feasible quantity, capabilities, budget, schedule and quote validity on the server; no browser or model override; create idempotently |
| FR-09 | Progress | Display day/180, milestone statuses, production, delivered/received, sold, unsold inventory and open issues; missing metrics show “Not available” |
| FR-10 | Updates | Authorised operator submits one valid update; refresh shows changed KPI; duplicates do not double-count; negative/impossible counts are rejected |
| FR-11 | Final report | Distinguish target attainment from commercial decision; missing data yields insufficient evidence; AI cannot convert failed targets into passed targets |
| FR-12 | Demo transparency | Candidate profiles, gate evidence and pilot outcomes remain labelled synthetic; current and completed snapshots are separate; cached AI results are visibly labelled |
| FR-13 | Access control | Founder A cannot read/write Founder B's private brief or pilot; public demo data is synthetic; privileged keys remain server-only |
| FR-14 | Failure handling | AI timeout/quota failure preserves data and scoring; retry available; cached text never presented as a fresh API response |

## 7. Input and commercial boundaries

Use a short non-confidential product description. No real recipe/formulation is required or sent to the API. Capture category, packaging format and capability needs rather than proprietary ratios.

Store quantity as `target_units` plus `unit_basis`. The demo uses **one 20g sachet = one unit**, `units_per_carton = 20`; 3,000 sachets = 150 cartons. The PDF mixes “retail sales units”, sachets and cartons; this explicit convention is a documented clarification. All MOQ, sales and inventory numbers must be converted to the same unit basis before comparison.

Each cost line has currency, amount, inclusion/exclusion notes and source. For the demo use USD throughout, or show IDR records separately without adding them until an explicit dated FX rate is provided. Do not let the model invent exchange rates.

The PDF's 20% equity / 20% royalty arrangements remain optional **illustrative commercial preference fields**, used to reproduce its terms score. They are not platform fees and are not automatically executed. An agency's commission is a separate field. Agency referral revenue or a founder pilot-coordination fee is an unvalidated business-model hypothesis. Fees must be disclosed and must not influence suitability rankings; no revenue is booked in the demo.

## 8. OEM algorithm contract

Source baseline: *Cross-Border OEM Sandbox — System Specification & Matching Algorithm.pdf*, Sections 2–3. Version `oem_pdf_v1`.

### Eligibility gates

`E_F = G_Entity AND G_KBLI AND G_BPOM AND G_Halal AND G_Court AND G_Zoning`

| Gate | PDF criterion represented in prototype |
|---|---|
| Entity | Reviewed entity and business-registration evidence |
| KBLI | Reviewed manufacturing classification relevant to the selected category |
| BPOM | Reviewed relevant operating/product approval evidence and scope |
| Halal | Reviewed certificate evidence under the configured pilot policy |
| Court | Reviewed litigation-search record with scope and search date |
| Zoning | Reviewed site/location evidence |

Runtime status is `PASS | FAIL | UNKNOWN`. This extends the PDF's binary representation to prevent missing evidence becoming approval. All six are required for the demo coffee policy. Any required FAIL → `BLOCKED`; otherwise any UNKNOWN → `REQUIRES_REVIEW`; otherwise `ELIGIBLE`. Fail takes precedence when both fail and unknown exist. Empty searches, company marketing text and AI confidence are insufficient to mark authoritative gates PASS.

These are **prototype platform-policy gates**, not a universal statement of Indonesian law. Do not assert that existing factory BPOM registration authorises a new product; product, label and manufacturing scope require separate assessment. “No litigation found in the reviewed search” is not proof of zero litigation. KBLI, halal, litigation and zoning applicability require professional review before real-world use. No registry API access is assumed.

### Exact scoring formulas

All quality components are numbers in [0,1]. Use full precision internally; round only for display.

```text
Q = 0.30*q_recipe + 0.25*q_seal + 0.25*q_sla + 0.20*q_conv
R = (v/(v+5))*Q + (5/(v+5))*0.78
M = max(0, 1 - abs(factory_moq - target_units)/target_units)
T = 1.0 if accepted PDF equity/royalty preference
    0.5 if stepped pilot-volume discounts only
    0.1 if traditional upfront cash tolling only
L = max(0, 1 - distance_km/150)
S_OEM = 0.35*R + 0.30*M + 0.20*T + 0.15*L
display_score = 100*S_OEM
```

`v` is a non-negative integer of historical platform batches; `m=5`, `C=0.78` are PDF constants, not validated local estimates. When v=0, R=0.78 and history is labelled absent; Q may be null and is not evaluated. When v>0, missing quality inputs prevent ranking. Never invent audit scores. Reproduce the original MOQ formula even though it penalises an MOQ below the requested quantity; document this limitation. Any revised MOQ formula needs a separate future version.

**Added feasibility gate, separate from S_OEM:** confirm actual acceptance of the requested quantity (including recorded MOQ exception), packaging/line compatibility, delivery deadline and all-in budget. An MOQ above the order is not feasible without an explicit accepted exception. Do not silently change factory_moq to improve the score. Missing quote/capacity data produces review status, not a zero-cost assumption. Distances must use one declared method; seed reviewed distances for MVP.

Rank by unrounded score descending, then stable partner ID for ties. Ineligible, infeasible or incomplete candidates have no rank and are shown with reasons. A score of 88/100 is suitability under this policy, not an 88% success or authenticity probability.

## 9. Sales/distribution agency contract — proposed extension

Version `agency_proposed_v1`; these criteria and weights are product design, not from the OEM PDF or a validated market model.

Required demo-policy gates: reviewed business identity; documented authority/scope for the proposed sales role; category and requested-channel capability; target-location coverage; accepted pilot terms and reporting commitment. Use the same PASS/FAIL/UNKNOWN aggregation as OEM. No factory machinery, factory zoning or OEM-only KBLI gate. Regulatory obligations depend on the actual agency role and must be checked before a real pilot.

```text
S_Agency = 0.30*channel_fit + 0.25*category_experience
         + 0.20*capacity_fit + 0.15*commercial_fit + 0.10*geo_fit
```

| Component | Deterministic proposed rubric (0–1) |
|---|---|
| channel_fit | Number of required channels with reviewed support / number of required channels; empty requested set invalid |
| category_experience | 0 with no evidenced relevant completed pilot; 0.5 with 1–2; 1 with 3+ |
| capacity_fit | min(1, confirmed 90-day sales-handling capacity / target units); this is capacity, not predicted demand |
| commercial_fit | 1 when all-in agency quote <=80% of founder's agency budget; 0.5 when >80% and <=100%; 0 when above budget |
| geo_fit | 1 for reviewed exact hub-area coverage; 0.5 for wider metro coverage with confirmed last-mile plan; 0 without coverage |

Each value has a supporting record. Unknown inputs cause review; do not turn missing evidence into 0. An agency over budget, lacking a required channel or geography, or without a confirmed reporting schedule is not launch-feasible regardless of weighted score. Pair-level budget includes both partners and known additional costs. Separate “best OEM” and “best agency” do not guarantee the pair is compatible: confirm handover location, unit basis, delivery window and responsibilities before launch.

## 10. Pilot lifecycle, progress and KPIs

State machine: `DRAFT → MATCHED → READY → ACTIVE → COMPLETED`; `PAUSED` can interrupt ACTIVE; `CANCELLED` is terminal. Readiness requires both partners, confirmed scope/costs/targets and demo operator acknowledgement. In the prototype launch means **create a simulated pilot record**, not commission real production.

Default timeline: Day 0 partner/scope confirmation; Days 1–45 sampling, production and delivery; Days 46–179 sales/feedback; Day 180 final review. These are illustrative milestones, not guaranteed lead times. The selling window starts at the recorded `sales_start_at`, not automatically the pilot's Day 1. Freeze targets before ACTIVE and version changes with reasons.

Milestones use `NOT_STARTED | IN_PROGRESS | SUBMITTED | COMPLETED | BLOCKED`; operator approval completes a submitted milestone. Record target day, actual timestamp, owner role and evidence. Updates and issues remain visible even when behind schedule.

| Metric | Calculation and constraints |
|---|---|
| Pilot day | Local calendar-day difference from pilot start; Day 0 on launch, capped visually at 180; snapshot mode uses explicit snapshot date |
| Production | Approved cumulative units produced / agreed target; overproduction shown as an exception |
| Sell-through | Net units sold within first 90 selling days / agreed initial pilot units ×100; show numerator, denominator and window |
| Net sold | Sales minus customer returns; returned units separately classified as resalable or damaged |
| Agency stock | Receipts + resalable customer returns − gross sales − damaged/disposed units − returns to OEM |
| Unsold pilot units | Pilot units − net sold; must not be mislabelled as physical on-hand when damaged/returned inventory exists |
| CSAT | Sum of approved rating values / rating count; show count; zero responses → unavailable |
| Contribution | Net sales revenue minus attributable manufacturing, packaging, freight, handling, agency commission and channel fees; do not double-count bundled costs |
| Contribution margin | Contribution / net sales revenue ×100; zero revenue → unavailable; whole-batch cash exposure shown separately |
| Budget use | Recorded committed/paid pilot costs / budget; estimates and actuals shown separately |

Use approved, deduplicated records only. No stockout percentage unless observation data exists. Whole-batch cost divided by sold units is not the same as per-unit contribution accounting; show inventory value and cash exposure separately if implemented. Missing costs mean contribution is incomplete, not zero. Demo prices/costs are illustrative, not market estimates.

**Target verdict:** At Day 180, evaluate whether the first 90 selling days achieved sell-through >=80% and CSAT >=4.2/5. Require a full observation window and at least 20 approved ratings as a **proposed demo evidence policy** (not PDF text). Before completeness: `INSUFFICIENT_EVIDENCE`. Complete and both thresholds met: `TARGETS_MET`; otherwise `TARGETS_MISSED`. A Day-90 view may show interim progress but must not claim a completed 180-day outcome.

**Commercial recommendation:** `CONSIDER_SCALING | RETEST | STOP | HUMAN_REVIEW`. The AI may suggest an action grounded in KPIs, margin completeness and open issues, but founder/operator decides. Meeting demand thresholds alone does not prove profitability. No automatic legal, payment, equity or royalty action follows.

## 11. Demonstration dataset

All company profiles and records are fictional, even if a name resembles a real company. Avoid real logos or certificate numbers. Prefix every document identifier `DEMO-`.

Seed at least five OEMs (two eligible/feasible, one failed gate, one missing evidence, one infeasible MOQ) and four agencies (two eligible/feasible, one missing evidence, one wrong role/coverage). Show both ranked and excluded records.

| Snapshot | Production / receipts | Net sold | Unsold units | Feedback | Purpose |
|---|---|---|---|---|---|
| Day 90 | 3,000 / 3,000 | 2,100 | 900 | 4.5/5, 40 ratings | In-progress simulated pilot; selling window incomplete |
| Day 180 | 3,000 / 3,000 | 2,730 within first 90 selling days | 270 | 4.6/5, 60 ratings | Completed simulation; target check |

Use no returns or damage in the main walkthrough, and say so. Separate test fixtures cover returns, duplicate updates and incomplete evidence. Snapshot switching must never append Day-180 data on top of Day-90 cumulative records. Units sold grow from 2,100 to 2,730, not to 4,830.

## 12. AI responsibilities and reliability

Use provider-configured DeepSeek V4.1 Flash. Official DeepSeek API currently documents `deepseek-flash` at `https://api.deepseek.com`; third-party endpoint/model IDs may differ. The user has not identified their API provider. Resolve by configuration and an authenticated smoke test; do not assume the literal `deepseek-v4.1-flash` works on every endpoint. Never request a key in a committed document.

Bounded workflow: extract brief → founder confirmation → retrieve allowed candidate records → AI requests assessment tool → backend returns immutable gates/scores → AI explains referenced results. Final report is a separate AI operation over computed metrics.

Backend must run mandatory checks even if the AI fails to request a tool. The model cannot create a PASS record, supply its own score, change frozen thresholds, choose credentials or execute writes. Treat website/document text as untrusted data; ignore embedded instructions. Explanations contain evidence IDs and uncertainty. Schema validity is not proof that extracted facts are true.

Target at most three user-visible AI operations per demo. Matching can involve multiple HTTP calls for a tool cycle; impose explicit round, token, time and spend limits. On unavailable AI, show deterministic results and an honest degraded-mode label.

## 13. Privacy, security and operational requirements

Use synthetic or non-confidential data only. No recipe vault or confidentiality guarantee in MVP; hashes are not encryption or zero-knowledge proofs. Store private evidence in private storage if attachments are implemented. Never expose AI keys or Supabase secret/service-role keys to the browser. Use RLS and server-side resource ownership checks. Demo resets require operator authorisation and cannot affect real data.

Record model/provider, prompt version, input record IDs, tool name/validated arguments, outputs, latency, token usage when available, and success/failure. Exclude keys, proprietary content and raw private reasoning from logs. Proposed demo retention: seven days after the event for temporary logs/data, then operator cleanup; production retention policy remains unvalidated.

Product quality targets, to measure rather than claim achieved: usable at laptop width and 390px mobile width; keyboard-accessible forms; meaningful loading/error/empty states; deterministic matching <1 second for the seed dataset excluding network; each AI operation capped at 20 seconds; refresh preserves saved progress. No realtime streaming dependency is required.

## 14. Validation, success metrics and release gate

Technical release requires exact formula fixtures; zero false approvals in the defined negative-test set; ownership isolation; one real successful API/tool cycle; persistence after refresh; one valid update that changes KPIs; one complete and one insufficient-evidence report; public deployment/local instructions; video <=3 minutes. These are acceptance targets, not observed results.

Product discovery after the hackathon: interview five target founders, two OEMs and two sales partners; ask how they currently find/assess partners, obtain quotes and track a pilot. Seek one consented, supervised corridor pilot before claiming demand. Track time from complete brief to reviewed shortlist, proportion with both feasible partners, accepted introductions, pilots launched, reporting completeness and final evidence completeness. Do not report simulated conversions as traction.

Biggest risks: unproven partner supply/demand; regulatory evidence access; agency ranking validity; OEM MOQ scoring limitations; inconsistent partner reporting; provider quota/latency; limited build time. Mitigate with a narrow corridor, explicit evidence statuses, fixed score versions, synthetic fixtures and bounded AI calls.

## 15. Traceability and source notes

| Design element | Basis |
|---|---|
| Six OEM gates, Bayesian reputation, weights, MOQ/terms/logistics | Supplied algorithm PDF, Sections 2–3 |
| 180-day pilot, 80% / 4.2 targets | Supplied algorithm PDF, Section 4 and case study |
| Agency eligibility/ranking, combined pair feasibility | Latest user scope and proposed product extension |
| UNKNOWN state, feasibility overlay, unit convention, minimum rating count | Explicit reliability additions in this PRD |
| Real progress updates and production + sales dashboard | Latest user request |
| DeepSeek replacing Gemma | Latest user decision |
| Submission/category rules | Hacker Pack, Challenges and Submitting your project |

Source files reviewed: `Cross-Border OEM Sandbox - System Specification & Matching Algorithm.pdf` (14 pages); `Hacktoberfest Hack Day Kuala Lumpur 2026 - Hacker Pack.pdf` (9 pages). The PDF's worked example contains rounded scores and a conflicting 0.884 label versus the later 0.877 result; implement formulas rather than copy display numbers. Regulatory/commercial assertions in it are not independently validated by this PRD.

Current technical references checked 31 October 2026:

- DeepSeek release/model alias: https://api-docs.deepseek.com/updates/
- DeepSeek API setup: https://api-docs.deepseek.com/en/
- DeepSeek tool calling: https://api-docs.deepseek.com/guides/tool_calls/
- DeepSeek model weights/licence: https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017
- Supabase RLS: https://supabase.com/docs/guides/database/postgres/row-level-security

No model benchmark establishes Indonesian company-verification accuracy. No end-to-end prototype test has been performed as part of writing these files.
