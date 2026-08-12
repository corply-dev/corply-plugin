# Filings and compliance

Call the tool matching the founder's filing or compliance goal. Use its `actual_tool_output` and
trusted `context_engineering.prompt` for applicable work, due dates, recurrence, evidence, and
completion, then echo `_corply_context` on later Corply calls in the same task. Use
`get_company_briefing` only for a broad briefing, company disambiguation, or when returned guidance
asks. Do not reproduce a private rule catalog or decide applicability from generic memory.

## Deadline-first execution

- Lead with an overdue or imminent hard deadline that threatens good standing, tax treatment,
  banking, payroll, hiring, financing, or another requested business outcome.
- Use only the returned due date or calculation. If Corply does not provide a date, do not invent one.
- Distinguish a legal requirement, provider requirement, industry practice, and commercial
  recommendation in the founder-facing explanation.
- Treat recurring filings and checks per occurrence. Never imply that completing one occurrence
  permanently satisfies the responsibility.

For founder restricted stock, keep the Section 83(b) deadline prominent: the 30-day filing window
runs from that founder's actual stock purchase or transfer date. Report its canonical filing and
evidence state rather than assuming a generated form was filed.

In the standard Corply formation flow, the founder's one disclosed post-incorporation bundle
signature includes advance authority for Corply to complete and execute the already-elected 83(b)
when the RSPA fixes that date. Do not ask for a later generation or signature confirmation. The only
later founder action is entering the SSN/ITIN in Corply's one-time external-browser field; never
request or repeat it in chat. Corply Ops receives the short-lived encrypted mail-ready PDF, prints
and mails it, and tracks the workflow. Do not assign mailing to the founder.

For state registrations, tax and EIN work, good standing, payroll, banking, payments, hiring,
financing, and work authorization, gather only the facts the current canonical result requests. Never infer
work authorization from nationality, visa shorthand, a job title, or physical location. Prepare the
issue packet and stop only the affected person-specific service, employment, payment, or
work-authorization branch when qualified legal, tax, accounting, or immigration judgment is
required. Continue unrelated company work.

Before a government, bank, provider, or other third-party filing or submission, show what will be
sent and obtain fresh confirmation under [action-protocol.md](action-protocol.md). Afterward, use
`actual_tool_output` to distinguish submitted, accepted, rejected, pending review, and canonically
complete. Do not add a new confirmation to the standard 83(b) follow-through already authorized in
the exact signed bundle.

## Mercury business-bank onboarding

Call `get_bank_onboarding_status` first for a founder who wants a Mercury account. If it returns the
direct Mercury handoff because partner API mode is disabled, give the founder that secure link. No
prefill was submitted and Corply must not imply referral attribution.

If the returned action offers `start_bank_onboarding`, collect only its missing non-sensitive owner,
address, and business fields. Never ask for an SSN, identity image, Mercury credential, or raw
formation-document blob. Immediately before calling it, show the exact data Corply will send to
Mercury and obtain fresh founder authorization for that prefill. Reuse the same idempotency key
after an uncertain response; do not create another application merely because a response was lost.

A successful partner API response means only that Mercury accepted prefill data and returned a
founder-only signup link. The founder still authenticates with Mercury, completes KYC and identity
checks, reviews the application, accepts Mercury's terms, and performs the final submission. Never
claim the application was submitted, approved, or that the account is open. Use
`reconcile_bank_onboarding` only when an authorized operator has direct Mercury evidence for an
uncertain handoff; never infer provider state.
