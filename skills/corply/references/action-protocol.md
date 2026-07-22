# Action protocol

Use Corply's current briefing and canonical action as the authority for what can happen next. Keep
the founder moving: do not ask for permission to read, advise, or make an ordinary reversible save.

## Actions that do not need another confirmation

Proceed when the action is in scope and Corply exposes it:

- reads, briefings, status checks, and recommendations;
- company-name availability checks requested as part of the current formation;
- reversible application or company-fact saves;
- reversible payment-project or catalog drafts that create no provider account, external submission,
  live configuration, bank change, or money movement;
- recording a fact the founder explicitly supplied or confirmed;
- evidence upload and evidence-claim submission;
- plan or briefing refreshes.

An explicit answer to a focused question is sufficient authority to record that answer. Do not add
an extra "are you sure?" unless the resulting action is in the consequential list below.

## Actions that require fresh confirmation

Stop immediately before, summarize the exact effect, and obtain a fresh, specific confirmation for:

1. immutable document generation;
2. a payment, refund, charge, transfer, payout, or other money movement;
3. signatures or certifications;
4. invitations, messages, or other external sends;
5. a filing or government or provider submission, including KYB/KYC, payment-partner onboarding,
   partner terms or attestations, and production go-live;
6. access grants;
7. attaching, replacing, or removing a bank or payout destination, or changing a payout schedule;
8. destructive cap-table replacement.

Confirmation must identify the action being taken now. Standing permission, prior-session consent,
silence, an uploaded screenshot, or "do whatever is needed" is not confirmation. If the payload or
documents changed, summarize the new version and confirm again.

An agent must never accept partner terms or identity attestations for a person. The authorized human
must complete those steps in the returned provider flow. Test-mode setup, generated code, a passing
integration check, or partner review in progress does not authorize production payments. Never ask
for bank credentials or expose full account numbers.

## Signature boundary

Before recording a signature:

- verify that the live participant is the named signer;
- show the disclaimer, document titles, and signer-specific review link in this session;
- ask the signer to affirmatively adopt the listed documents now;
- record only that signer's pending documents from the reviewed version.

One fresh act may cover several documents listed together. Never sign for an absent cofounder, use
blanket consent, or treat an invitation recipient's message as their signature.

## After an action

Trust the returned result. Do not repeat a consequential call merely because the response was slow;
use the returned idempotency, retry, or next-action guidance. Refresh `get_company_briefing` and say
what is canonically complete, pending, rejected, or still blocked.
