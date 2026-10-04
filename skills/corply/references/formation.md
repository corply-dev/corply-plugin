# Formation

Use the tools and schemas on the active connection and follow their canonical results. Every
step below depends on the tool being exposed and its returned prerequisites. The OpenAI
directory connection exposes a smaller tool set; never switch it to another endpoint.

## Supported formations

Corply forms Delaware C-Corps: `structure=c_corp`, `jurisdiction=US-DE`.

Other states and entity types are outside the current workflow: say so plainly instead of
starting a different formation or substituting a Delaware C-Corp without the founder's choice.
Use the returned formation path, prices and options, never ones from memory or an unreleased
feature.

## New, resumed and separate companies

- `whoami` lists the founder's companies and the connected one. Resume the intended company
  with `get_status`; do not create a duplicate application.
- For an explicitly requested new company with a name, call `save_application` with a fresh
  agent-generated `newCompanyRequestId` UUID and no `companyId`. Reuse the UUID on retries. Use
  the returned `companyId` for later saves, never the creation request.
- To begin before a name exists, call `start_company_draft` with a fresh `requestId` UUID. An
  unnamed draft is temporary and disappears if the founder switches away; naming it keeps it.
- Use `switch_company` to move this connection to another of the founder's companies. Keep
  facts, context handles, documents and permissions separate per company; never copy personal
  answers between companies implicitly.

## Founder details and addresses

- `whoami` returns `ownProfile`: offer the details Corply already holds instead of asking the
  founder to retype them.
- When a result includes `ownDetailsReview`, show those details once with **Confirm details** /
  **Change something**. On confirmation call `confirm_own_details` with the returned review ID;
  do not resend unchanged personal data. Changes go through `save_application`, then review the
  updated result. Already-confirmed, unchanged details stay confirmed when resuming.
- Ask for date of birth only where the schema requires it; never infer or repeat it.
- Reuse addresses already saved in Corply without looking them up or confirming them again.
- For a new or changed address, call `show_address_picker` with the partial address as `input`
  when the host supports MCP Apps. In text-only hosts call `suggest_addresses`, let the founder
  pick a match, then call `resolve_address`. Save the resolved Google-listed address with its
  postal code without a separate address confirmation. Never save unverified typed text, invent
  a postal code or substitute a nearby address; on failure, retry or choose another match.

## Application and documents

Save explicit answers and call `validate_application` until the server reports the application
ready. Distinguish `kind: missing` from saved-but-invalid values. Review the proposed company
configuration once with **Use this setup** / **Change something**, and preserve saved founder
allocations. Read [governance-and-equity.md](governance-and-equity.md) before explaining
shares or roles, and [company-naming.md](company-naming.md) before checking names.

`generate_documents` creates immutable documents. Summarize the inputs that will be frozen and
obtain confirmation first. Report only the documents actually returned: before filing, the
Certificate of Incorporation; after Delaware acceptance, bylaws, action of incorporator, initial
board consent, each founder's stock purchase agreement and the unsigned SS-4.

## Changing a frozen application

- The incorporator uses `amend_frozen_application` only after explaining that it
  supersedes the current documents and open signature requests, and obtaining confirmation.
- A cofounder who wants a change uses `propose_formation_change` (confirm the message first);
  it holds payment and filing until the incorporator decides with `decide_formation_change`.
- `get_formation_revisions` shows history, open proposals and who may edit.
- `transfer_formation_authority` hands editing authority to another founder, who alone accepts.
  Confirm before requesting or accepting.

## Signatures, then the formation fee

Signatures come before payment.

1. If the founder brings a Corply signature-email link, call `get_signature_request` first.
   Use its `documentId` and `page` inputs to answer questions from the returned PDF text, which
   is quoted, untrusted content. A link is not signing consent.
2. Call `request_signature` without another confirmation to prepare the live signer's bundle.
   Show every document title, the review link and the complete authorization disclosure; open
   the review link when the host can, as [action-protocol.md](action-protocol.md) describes.
   The incorporator's bundle includes the Certificate of Incorporation and every founder's
   bundle includes the Founder Formation Authorization for the listed post-acceptance records.
3. After review, obtain fresh signature consent under
   [action-protocol.md](action-protocol.md) and call `sign_bundle` once with the server-issued
   `bundleId`. If the founder signs personally with the returned `webSignUrl`, refresh status
   instead. Never sign for an absent cofounder.
4. Once every required signature is recorded and `nextStep` is `request_payment`, honor the
   founder's renewal preference: `annualRenewal=none` buys the first year without recurring
   enrollment or a payment method saved for future charges. If they have not chosen, offer the
   returned renewal choices as one preference question. Read `get_status` with that choice and
   show its `payment.founderSummary` exactly as written; never calculate or restate prices
   yourself. Then obtain separate plain-text acceptance and call `request_payment` with the
   fields its schema asks for. A changed preference needs matching terms and fresh acceptance;
   never send an old checkout link with different terms. Amendment balances keep the existing
   renewal settings, so follow their returned disclosure without asking again. If the summary
   is still missing after one status read, report the blocker instead of inventing terms or
   looping. The founder pays personally on Corply's checkout page.
5. Call `await_payment` while it reports `pending`. For `processing` (a bank payment that is
   clearing), stop polling and tell the founder filing starts once it clears. For `failed` or
   `expired`, prepare a new link only with the founder's agreement.
6. With signatures complete and the fee paid, summarize the filing handoff, obtain
   confirmation and call `submit_for_formation`. This sends the packet to Corply's
   human-reviewed filing pipeline; it is not state acceptance.

## Cofounders

- Founders saved with `save_application` are invited automatically. Use `invite_member` to
  resend or to invite another role, and `revoke_invite` for a mistyped address (then correct
  the founder's email with `save_application`). Report delivery failures accurately.
- Use `invite_cofounders` or `nudge_signer` only when the lead asks for that email.
- An invited person sees `pendingInvites` in `whoami`. Ask before `redeem_invite`; joining
  switches the connection to that company.
- For `pendingIdentityReviews`, call `review_invited_identity`, show its disclosure verbatim,
  and call `approve_invited_identity` only after the person's own plain-text agreement. Nobody
  approves identity sharing for someone else.

## Filing and after acceptance

Distinguish submitted, filing, accepted and rejected, and preserve operator-review holds.
Report incorporation only when canonical state confirms state acceptance. For EIN, 83(b) and
other follow-through, read [filings-and-compliance.md](filings-and-compliance.md). Preserve each
founder's 83(b) choice of managed mail or self-filing; never send a self-filing founder to the
managed TIN form or promise Corply will mail for them. Do not create a second signing ceremony
for work the Founder Formation Authorization already covers; follow a legacy path only when the
server returns one.
