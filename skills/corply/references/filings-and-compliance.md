# Filings and compliance

Use connected results for filing stage, EIN, founder-stock documents, 83(b) work, deadlines,
evidence and the next responsible person. Do not reconstruct private rules or infer a completed
filing from a generated document. Corply files through a human-reviewed pipeline; submission,
mailing and agency acceptance are different states.

## Formation filing

`submit_for_formation` hands a signed, paid formation to Corply's filing pipeline. That is not
state acceptance. Preserve operator-review holds and explain whether the founder has an action.
Report the company as formed only when canonical state confirms acceptance.

## EIN and post-incorporation tasks

Follow live results for EIN preparation: Delaware formations receive an unsigned SS-4 after
acceptance; Florida LLCs receive LLC-aware EIN preparation. When a founder finishes one of their
own assigned tasks, such as opening a bank account, `mark_task_done` reports it; the status
becomes pending review until Corply's team verifies it.

## 83(b) elections

Each founder with restricted stock has their own choice, returned by the server:

- **Managed filing:** the standard pre-filing Founder Formation Authorization covers the
  election. Do not ask for a second signature. The taxpayer enters any SSN/ITIN only in the
  one-time secure browser field; `prepare_83b_tin_input` refreshes that link without another
  confirmation. Corply Ops prints, mails and records evidence.
- **Self-filing:** the founder signs and files their own election. Corply generates no executed
  election for them, sends deadline reminders and accepts private proof for review.
- **Declined:** respect the founder's decision and report it accurately.

Fully vested founders have no 83(b) election. Use the returned actual stock-transfer date, not
the company's acceptance date. If a secure taxpayer link expired, `resend_taxpayer_link` sends a
fresh one directly to the person; the agent never sees it. Never ask for SSNs or ITINs in chat
or claim mailing without canonical evidence. Follow a legacy path only when returned.

## Delaware annual report and franchise tax

`get_delaware_annual_service` returns one company's annual report or estimated-tax installment
for an exact reporting year: deadline, billing eligibility, facts, calculation methods and the
reviewed quote. `prepare_delaware_annual_report` prepares it from confirmed facts after the
current director and officer roster is reviewed. It requires the recurring service with a
verified payment method or a prepayment; the officer personally certifies on the secure page,
and Corply Ops reviews state charges. Each installment is separate and never completes the
annual report.

## Charter amendments

1. `get_current_charter` reads the latest accepted charter and its source hash.
2. `propose_charter_amendment` proposes a name change or an increase in authorized common
   shares. Board approval opens first; stockholder written consent follows only after it passes.
3. `get_charter_filing_quote` returns the state charge, Corply's fee and funding status.
   `checkout_charter_filing` returns a checkout link that a company manager pays personally.
4. `queue_corporate_action_filing` queues the approved, funded amendment for operator filing.
   Company facts change only after Corply records state acceptance.

## IRS business changes

`list_business_irs_changes` shows the current EIN responsible party and pending changes.
`request_business_irs_change` starts a Form 8822-B change of business address or responsible
party. Any taxpayer number is collected only through a personal secure browser link. Corply Ops
reviews and mails the form; recording submission never claims IRS acceptance.

## Ongoing operating work

`resolve_company_plan` returns the company's current obligations and questions. The lifecycle
is always running: never report a company as globally done. Ask only the returned questions,
treat unknown facts as unknown, and never infer immigration, work-authorization, tax or legal
conclusions. Read [evidence-and-existing-work.md](evidence-and-existing-work.md) for evidence.

For professional legal, tax, accounting or immigration determinations, explain the specific
question that needs qualified review and continue independent steps. Do not promise universal
compliance, banking, payment processing or unrelated operating services.
