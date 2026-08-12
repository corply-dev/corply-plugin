# Evidence and existing work

Respect work completed outside Corply. The goal is to reconcile it into canonical company state,
not force the founder to repeat it through Corply.

## Keep the states distinct

- **Assertion:** the founder says something happened.
- **Evidence:** Corply stored the exact supplied artifact and its integrity metadata.
- **Pending review:** the assertion and evidence are waiting for the required review.
- **Canonical state:** Corply accepted the outcome and returned the company's updated applicable plan.

Uploading a file proves only that those bytes were stored. A filename, hash, founder statement, or
submission receipt does not by itself prove the underlying work or mark it complete.

## Reconcile external work

1. Call the evidence or completion tool that matches the founder's goal and follow its trusted
   `context_engineering.prompt`. If the outside event is not materialized yet, use the returned
   canonical subject and explicit-fact actions to record only supplied assertions and obtain the
   server-created occurrence. Never invent identifiers.
2. Upload the artifact the founder actually supplied. Never manufacture or alter proof.
3. Use the canonical evidence or existing-completion action with the returned company, person,
   occurrence, and coverage context. Preserve the founder's attestation accurately.
4. Treat the result as pending unless Corply explicitly promotes it to canonical state.
5. Report any missing artifact, uncovered outcome fact, reviewer boundary, or rejection plainly.
6. Report the returned canonical state after submission or review and carry `_corply_context` into
   the next Corply call in this task.

Do not let founders approve their own claims or relabel founder evidence as operator- or
professional-confirmed. Do not expose private reviewer queues, internal decision rules, or temporary
signed artifact URLs.

Evidence upload and claim submission do not require an extra confirmation under Corply's product
protocol. Granting a reviewer access does require confirmation under
[action-protocol.md](action-protocol.md).
