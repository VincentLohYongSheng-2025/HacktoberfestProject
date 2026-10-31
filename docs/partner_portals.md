> Superseded: the invitation flow below is historical. Use partner_accounts.md for the current independent registration and sign-in workflow.

# Partner portal extension — 31 October 2026

The original PRD sections 3–4 represented OEM and sales agency work through operator-entered records and deferred partner portals. This extension follows the user's later request for both dashboards.

Founder flow: launch or open a pilot → Partner workspaces → Create OEM/sales access → Open dashboard or copy invitation. An invitation expires in 24 hours and is bound to the selected partner, role and pilot. It can be opened in a separate browser session without founder credentials. Invitations are bearer access links: share only with the intended synthetic-demo participant. This is a local prototype access mechanism, not production organization authentication or supplier onboarding. Each browser holds one partner session at a time.

OEM flow: accept assigned specifications → submit production deltas and sampling/production/dispatch milestones → track pending/approved reports → flag issues. OEMs cannot submit sales or assert agency stock receipt.

Sales flow: accept assigned channels and hub → acknowledge stock receipt → submit sales, stock returns/damage and ratings → track pending/approved reports → flag issues. Sales partners cannot change production or frozen targets.

All submitted progress events are initially unapproved. Operator flow: unlock existing operator access → Partner submissions awaiting review → approve a source-backed event. Server validation runs again at approval; duplicates do not count twice and impossible inventory is rejected. Only approved events affect founder KPIs. Issues are shared immediately as unverified participant reports. Day-90 and Day-180 histories stay separate.

No external message is sent when creating or copying an invitation. No real production, sale, contract or payment is executed. Supabase/production identity remains deferred.
