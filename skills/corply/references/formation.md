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
5. **Payment.** Explain the amount and effect, confirm immediately before payment or checkout
   creation, and follow the returned payment state. Do not create duplicate charges. Only report
   payment complete when the refreshed briefing confirms it.
6. **Review and signatures.** Surface the live signer's disclaimer, exact document list, and
   signer-specific review link. Apply the signature boundary in
   [action-protocol.md](action-protocol.md). Each named signer signs only the documents currently
   assigned to them.
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
    purchase or transfer date that controls the 83(b) deadline. Confirm before immutable generation,
    refresh the briefing, then obtain a separate fresh confirmation before `request_signature`
    creates or sends the named signers' private requests. When a founder's RSPA is fully executed,
    refresh again: Corply records that founder's actual stock-purchase date and issuance. If the
    briefing then offers an 83(b) election, separately confirm its generation and later its signature
    request. Never collapse acceptance, document generation, signature delivery, stock issuance, or
    83(b) filing into one implied transition.

If answers change after the packet is frozen, explain what will be superseded. Treat regeneration
as a new immutable-document action and reconfirm; every affected signer must review the current
version.

Do not force the standard flow when the founder has a prior entity, existing funding or securities,
material assets or revenue, contested or registered IP, employer/university claims, a foreign parent,
or an advanced stock structure. Prepare the issue and stop only the affected decision or execution
branch at the appropriate professional boundary. Continue independent formation work that does not
depend on that determination.
