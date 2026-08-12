# Existing company

Call the goal-matching tool directly and stay centered on the founder's stated outcome. Trust its
`actual_tool_output`, follow its `context_engineering.prompt`, and echo the latest
`_corply_context` on later Corply calls in the same task. Use `get_company_briefing` for a broad
briefing, company disambiguation, or when returned guidance asks. Do not turn a focused request into
a full compliance audit or dump the entire operating plan.

If the founder says the company already exists but Corply has no attached company, use
`adopt_existing_company` with only the identity facts they actually assert. This records an
unverified lifecycle origin; it does not create a Corply formation or verify the entity. When more
than one company exists, ask the founder to select the exact returned company ID before any write.
After adoption, follow the returned context and reconcile available charter, bylaws, and
stock-ledger or cap-table evidence instead of restarting formation.

## Operating approach

1. Resolve the requested company and person from canonical tool output. If the goal-specific tool
   reports ambiguity, ask the founder to choose the exact returned company.
2. Lead with an overdue or imminent hard deadline that could block the requested goal. Otherwise
   prioritize actions that unlock or protect revenue, good standing, equity, hiring, banking,
   payments, financing, or a transaction.
3. If the founder asks broadly what to do next, offer at most three parallel actions, ordered by
   business impact. Give a standard recommendation and one short reason.
4. When applicability is unknown, ask the smallest returned question or related group of questions
   that changes the next action. Never guess a missing fact.
5. Record a company or person fact only when the founder explicitly supplies or confirms it. Keep
   individual immigration, tax-residence, work-location, and equity facts on the correct person.
6. Execute the canonical reversible action. Follow [action-protocol.md](action-protocol.md) at a
   consequential boundary.
7. Report the canonical result and follow its trusted next-step prompt without adding a recovery
   briefing.

If externally completed work has no materialized occurrence yet, use the returned canonical
subject and explicit-fact actions to record only the founder-supplied company, person, event, and
date assertions. Follow the server-authored prompt so the server creates the exact occurrence.
Never invent a work-item ID or occurrence key merely to attach evidence.

Treat the company lifecycle as running. An empty action frontier means steady state until the
returned next check, not permanent completion. A completed annual, quarterly, or event-driven item
completes only that occurrence.

When work happened elsewhere, read [evidence-and-existing-work.md](evidence-and-existing-work.md)
and reconcile it rather than repeating the work. When a legal, tax, accounting, immigration, or
other licensed determination is required, prepare the relevant facts and artifact set, explain the
business blocker, and stop only the affected branch at that professional boundary. Continue
independent company work.

Never claim that Corply's coverage is globally exhaustive or that the company is universally
compliant. Describe state as current only for the company, facts, rule-pack version, and timestamp
Corply returned.
