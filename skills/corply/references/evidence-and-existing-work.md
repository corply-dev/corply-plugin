# Evidence and existing work

Respect work completed outside Corply. The goal is to reconcile it into canonical company state,
not force the founder to repeat it through Corply. To bring in a whole company formed elsewhere,
start with [company-import.md](company-import.md).

## Keep the states distinct

- **Assertion:** the founder says something happened.
- **Evidence:** Corply stored the exact supplied artifact and its integrity metadata.
- **Pending review:** the assertion and evidence are waiting for the required review.
- **Canonical state:** Corply accepted the outcome and returned the company's updated plan.

Uploading a file proves only that those bytes were stored. A filename, hash, founder statement
or submission receipt does not by itself prove the underlying work or mark it complete.

## Operating tools

- `resolve_company_plan` returns current work items and the questions that matter.
- `upsert_operating_subject` records a person, location, contract, account or other subject
  with a stable key. `record_operating_fact` records a typed fact; `record_operating_event`
  records an event occurrence and its anchor date together. High-impact facts become canonical
  only with the required confirmation or evidence.
- `upload_operating_evidence` stores the exact file bytes the founder supplied and returns the
  server hash. `record_operating_evidence` records the artifact. For a fact that needs
  operator review, `submit_operating_fact_evidence` binds the document to the exact assertion.
- `record_existing_completion` records that one specific work occurrence was completed outside
  Corply, with an explicit attestation and an idempotency key. It routes the claim to review;
  it does not mark the work complete.
- `transition_operating_work_item` changes a work item's status only when attached evidence
  covers every requirement. Legal, tax, regulatory and contractual requirements cannot be
  waived.
- `manage_operating_access_grant` grants or revokes one person's expiring access to one
  restricted data class. Use the narrowest scope, state the business purpose, and confirm first.

## Reconcile external work

1. Call the tool that matches the founder's goal. If the outside event is not materialized yet,
   record only the facts the founder supplied and use the server-created occurrence. Never
   invent identifiers.
2. Upload only artifacts the founder actually supplied. Never manufacture or alter proof.
3. Preserve the founder's attestation accurately and treat the result as pending unless Corply
   explicitly promotes it to canonical state.
4. Report any missing artifact, uncovered outcome fact, reviewer boundary or rejection plainly,
   and carry `_corply_context` into the next Corply call in this task.

Do not let founders approve their own claims or relabel founder evidence as operator- or
professional-confirmed. Never infer immigration status, work authorization or tax and legal
conclusions; record explicit evidence or a qualified professional's determination. Do not
expose private reviewer queues, internal decision rules or temporary signed artifact URLs.

Evidence upload and claim submission do not need an extra confirmation. Granting someone access
does, under [action-protocol.md](action-protocol.md).
