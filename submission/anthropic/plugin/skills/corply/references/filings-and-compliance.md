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
acceptance. When a founder finishes one of their
own assigned tasks, such as opening a bank account, `mark_task_done` reports it; the status
becomes pending review until Corply's team verifies it.

## 83(b) elections

Each founder with restricted stock decides whether to make an election, returned by the server:

- **Corply files it:** the specific pre-filing Founder Formation Authorization covers the
  election, so do not ask for a second signature. The taxpayer enters any SSN/ITIN only in the
  one-time secure browser field; `prepare_83b_tin_input` refreshes that link without another
  confirmation. Corply Ops sends standard certified mail with an acknowledgment copy and a
  prepaid return envelope, then records evidence.
- **The founder files it:** a founder who chose personal filing signs and files the election
  themselves. `continue_83b_self_filing` reads or resumes their direct IRS filing: the stage,
  known form fields, missing fields and next action. Pass an observation only for a screen the
  founder actually saw, with the returned `expectedRevision`; the fair market value total is the
  founder's own confirmed figure, never inferred from price or par. It never signs or submits.
  `save_83b_filing_proof` saves their redacted PDF confirmation or dated mailing receipt for
  operator review; never pass an unredacted tax form. The task closes only after that review.
- **No election:** respect the founder's decision and report it accurately.

Fully vested founders have no 83(b) election. Use the returned actual stock-transfer date and
canonical deadline, not the company's acceptance date. If a secure taxpayer link expired,
`resend_taxpayer_link` sends a fresh one directly to the person; the agent never sees it. Never
collect SSNs, ITINs or unredacted tax documents in chat, claim mailing without canonical
evidence, or treat an upload as IRS acceptance. Follow a legacy path only when returned.

## Delaware annual report and franchise tax

Delaware's annual report and franchise tax are due March 1 for the year before.

- `show_delaware_annual_report` shows Corply's card for every year still owed, the same card as
  a state registration: what Corply has (on file or said by the founder), what is missing and
  the estimate. Call it when the founder asks about annual reports, franchise tax or getting
  back into good standing. Ask every `questionBatch` group in one go, then the facts with no
  choices (each year's gross assets amount, an address or person not on file) in one message.
  Save each answer with `save_delaware_annual_answers` and, where the host lists it, pass
  `cardUpdate.arguments` to `corply_card_update`. When a result says to show the card, call
  `show_delaware_annual_report` then: the finished card's Sign and pay in Corply opens the
  signed-in page at signing and goes on to the Corply Pay checkout. Its own
  `annual_report_action` runs inside the view; agents never call it.
- `get_delaware_annual_service` reads one year's workflow (or an estimated-tax installment):
  deadline, plan coverage, registered-agent coverage, the dated `currentRoster`, the next
  action and every owed year.
- `prepare_delaware_annual_report` prepares one year from confirmed facts and
  `expectedRevision`; if the directors or certifier differ from the dated roster, review the
  records first. A year is refused while an earlier year is still owed:
  `prepare_delaware_annual_batch` prepares every owed year together for Corply Ops to quote.
- The founder supplies gross assets; never invent them. Certification and payment happen once,
  by the founder, on `reviewUrl`. Each report costs Delaware's charges plus Corply's fee unless
  the company plan covers it.

Never claim a report was filed or a tax was paid without canonical evidence.

## Delaware standing

`get_company_standing` reads what Delaware last told Corply, free and without a new request.
A company never checked is unverified, which means unknown, not bad. A reading older than about
ninety days may be stale. "Ceased good standing" means behind on tax or the annual report, not
dissolved; only void and forfeited put the company's own acts in doubt. Never say a company is
in good standing on any basis other than a reading here.

`check_company_standing` orders a new check the founder pays for on a Corply checkout: the $20
detailed status (the only tier that sets Corply's standing), or a $50 short or $175 long
certificate, plus Corply's $5. Delaware mails certificates, so a certificate needs an active
Corply Mail mailbox; without one, offer Corply Mail instead of ordering. Delaware will not issue
a certificate to a company that is behind, and a Corply operator obtains each record by hand, so
results are not instant.

Registrations, reports and standing in other states are in
[state-registrations.md](state-registrations.md).

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
compliance or a service this connection does not expose.
