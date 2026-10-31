# Independent partner accounts — 31 October 2026

This replaces the earlier founder-generated bearer invitation workflow. Existing invitation cookies and /api/partner/session links no longer grant dashboard access; founder /pilots/:id/invite requests are denied.

OEM registration: /oem/register → /oem/dashboard (pending review). Existing OEM login: /oem/login. Sales agency registration: /sales/register → /sales/dashboard (pending review). Existing sales login: /sales/login. /partner is a public role chooser.

Registration records company/contact/email/location/capabilities and the selected immutable partner role. Passwords use salted scrypt hashes; raw passwords are never saved or returned. Account cookies are HTTP-only, SameSite Strict and signed, with seven-day expiry and server-side session-version invalidation on sign-out. Sign-in replaces founder/operator cookies; partner sessions cannot enter founder APIs. A founder cookie alone never authenticates a partner.

New registrations have no catalogue organisation or assigned pilot access. Operator review at /operator/partners requires the configured operator code and a separate operator session. The operator confirms the catalogue organisation corresponding to the applicant; role/type mismatches and duplicate active organisation accounts are rejected. This is an operational access review, not certification or legal verification. Applicants cannot provide their own organisation ID or approve themselves.

After approval, a partner sees only pilots selecting its mapped organisation. Each dashboard can switch among its assigned pilots. OEM production/milestone permissions and sales/stock/feedback permissions remain separate. Reports require operator approval before they affect founder KPIs. Founders see partner participation and approved reporting, not links that impersonate partner accounts.

Local prototype boundary: credentials and audit data persist in ignored .data/partner-accounts.json. Supabase remains deferred at the user's request. Email verification, password reset, organisation-domain verification, multi-user organisation teams and production identity operations are not implemented. Use synthetic signup details and do not expose the local disk implementation publicly as a production auth service.


## Recording a demo

With DEMO_MODE=true and DEMO_AUTO_APPROVE=true, partner registration/sign-in creates an isolated synthetic pilot and opens the dashboard immediately. Existing pending accounts enter on dashboard refresh; a manual Enter demo dashboard action is also available when demo mode is enabled. DEMO ACCESS is visible. This grants a demo session, not approval of the submitted company or any real catalogue organisation. Re-entering preserves the same isolated pilot; demo writes do not touch other founders' pilots. Raw organisation review status remains separate. Set DEMO_AUTO_APPROVE=false to stop automatic entry for accounts without demo sessions; DEMO_MODE=false disables all demo access.
