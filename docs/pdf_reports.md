# Grounded PDF report export — 31 October 2026

PRD FR-11 requires a computed verdict, internal sources, AI interpretation and founder next action. The original PRD lists Markdown download as P1; PDF export is an extension requested by the user.

Click Generate grounded assessment on the selected Day-90 or Day-180 report. The server calculates metrics and verdict, runs the bounded AI operation, stores an immutable report record and returns an authorised PDF URL. The browser downloads the PDF automatically. Download PDF again retrieves the same saved record without repeating inference. Snapshot controls are disabled while generating to prevent ambiguous selection.

PDF contents: selected snapshot/as-of date; frozen quantity and KPI targets; approved production, receipts, net-sales window, stock, unsold units and ratings; deterministic verdict; selected partner pair; quote commitment versus recorded costs; missing margin data; LIVE/CACHED/DEGRADED AI label and tool/provider metadata; unresolved issues; human-review next action; policy limits; source IDs, report ID and SHA-256 metrics/evidence hash. PDF labels are English using standard embedded PDF fonts; unsupported characters in user-entered names are substituted in page text (the original name is retained in report metadata).

POST /api/pilots/:id/report creates the report record. GET /api/pilots/:id/report/pdf?reportId=... returns application/pdf with attachment disposition and no-store caching. Both validate the founder session and resource ownership. Partner invitations cannot read founder reports. Later updates do not mutate an existing report; regenerate to capture changes. AI failure does not prevent a deterministic report and is visibly labelled degraded.

Validation: frozen-report and insufficient-evidence unit tests; actual browser download of Day-180 and Day-90 PDFs; repeat download; PDF parsing; denied access from another founder session; rendered page inspection. No real commercial outcome or regulatory verification is implied.
