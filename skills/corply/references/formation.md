# Formation

Start with `get_company_briefing`. Resume the persisted formation, signer, payment, and filing state;
never create a duplicate application or replay a completed stage because the conversation is new.

## Work from the current stage

1. **Fit and missing facts.** Confirm that a Delaware C corporation matches a venture-oriented
   company. Ask only for facts the briefing says are missing, using natural conversation rather
   than a giant legal intake form. Read [governance-and-equity.md](governance-and-equity.md) before
   recommending ownership, vesting, board, officer, stock-plan, or IP terms.
2. **Reversible application work.** Save explicit answers and validate until the server says the
   application is ready. Reversible saves do not need a separate confirmation.
3. **Name check.** Read [company-naming.md](company-naming.md) when the founder needs help choosing
   or replacing a name. Call `check_company_names` with the exact saved legal name and up to five
   agent-created alternatives in the same call. Use its `true`, `false`, and `null` results directly.
   Treat the result as advisory: explain a `false` conflict or `null` provider failure, but never
   block document generation or repeatedly retry because of it. Corply operations performs the
   controlling Delaware check immediately before filing.
4. **Immutable packet.** Summarize the frozen inputs and obtain fresh confirmation under
   [action-protocol.md](action-protocol.md). Generate only through the current canonical action,
   then summarize the packet Corply actually returned. Do not invent documents or review links.
5. **Payment.** Explain the amount and effect, then call `request_payment` without another
   confirmation: it only creates or reuses a checkout link and cannot charge the founder. Present
   the link so the founder can choose whether to pay in the external browser, then follow the
   returned payment state. Do not create duplicate charges. Only report payment complete when the
   refreshed briefing confirms it.
6. **Review and signatures.** Call `request_signature` without another confirmation: it only
   prepares or reuses the live signer's exact private bundle and review link, and sends no message.
   Surface the disclaimer, exact document list, any Section 83(b) authorization disclosure, and the
   signer-specific review link. Then apply the one signature boundary in
   [action-protocol.md](action-protocol.md) immediately before `sign_bundle`. Each named signer signs
   only the documents currently assigned to them.
7. **Cofounders.** Once cofounder emails are saved, use the briefing's invitation status to identify
   anyone who has not been invited. Ask once to invite the named emails, then on confirmation call
   `invite_member` for each of them immediately; do not wait for name checking, documents, payment,
   or signatures. Report delivery failures and returned manual invite links. Later signing requests
   must not create a second membership invitation. Multi-party signing may remain pending while
   other founders work asynchronously.
8. **Filing handoff.** When every required signature is canonically complete, summarize the exact
   submission and confirm before sending it. Submission hands the packet to the returned filing or
   human-review path; it does not prove Delaware accepted the filing.
9. **Delaware acceptance.** Treat submission, pending review, filing, acceptance, and rejection as
   different states. Report formation only after `get_company_briefing` confirms Delaware
   acceptance and returns the actual formation date and file number.
10. **Post-acceptance packet.** Use the same phase-aware `generate_documents` action only when the
    refreshed briefing makes it available. It generates the returned post-incorporation packet
    using the accepted formation date; it does not retroactively change the separate founder stock
    purchase or transfer date that controls the 83(b) deadline. Confirm once before immutable
    generation, refresh the briefing, then call `request_signature` without another confirmation to
    prepare the exact private bundle and review link.

    For an eligible founder who already elected Section 83(b), the bundle's disclosed `sign_bundle`
    act also grants scoped advance authority for Corply to complete and execute that election
    automatically when the RSPA establishes the actual stock-transfer date. That one bundle consent
    is the only signature or confirmation: do not later ask to generate, request, approve, or sign
    the 83(b) again.

    After execution, immediately show or open the returned one-time external-browser TIN link. If it
    is missing or expired and the briefing offers `prepare_83b_tin_input`, call it without another
    confirmation. The founder enters the SSN/ITIN only in that secure browser field; never ask for,
    accept, repeat, or store it in chat. Corply does not retain it as a database field. Corply Ops
    receives the short-lived encrypted mail-ready PDF, prints and mails the election, and tracks the
    workflow. Do not tell the founder to print or mail it themselves. Refresh the briefing after the
    secure handoff and report the canonical prepared, executed, TIN-required, mailed, and evidence
    states without inventing completion.

## Joining as an invited cofounder

When `whoami` or the refreshed briefing shows a pending invitation for the current user, offer it
by organization name and role and ask whether they want to join. Call `redeem_invite` only after an
explicit yes in this session; never auto-join. If the user already has a company of their own, say
first that joining switches their active organization. After joining, refresh `get_company_briefing`
and surface only that user's own pending work — typically reviewing and signing their assigned
documents, under the same signature boundary in [action-protocol.md](action-protocol.md).

## Signing progress and nudges

When the lead asks how signing is going, report each signer's canonical status from the briefing or
`get_status` in plain language. A reminder is an external send under
[action-protocol.md](action-protocol.md): call `nudge_signer` only when the lead explicitly asks to
remind a named cofounder, never unprompted.

If answers change after the packet is frozen, explain what will be superseded. Treat regeneration
as a new immutable-document action and reconfirm; every affected signer must review the current
version.

Do not force the standard flow when the founder has a prior entity, existing funding or securities,
material assets or revenue, contested or registered IP, employer/university claims, a foreign parent,
or an advanced stock structure. Prepare the issue and stop only the affected decision or execution
branch at the appropriate professional boundary. Continue independent formation work that does not
depend on that determination.
