# Corply OpenAI directory resubmission — 0.8.4

**0.8.4 (October 4, 2026):** the listing and skill now describe Delaware C-Corp formation only,
matching what Corply forms. Rebuild `corply-openai-directory.zip` and upload it in place of 0.8.3.

**Status:** Updated draft uploaded; not resubmitted. Portal authentication and MCP scanning are
blocked, and the private reviewer-credential fields are unavailable. OpenAI has been contacted.

Current upload: `corply-openai-directory.zip`, built by `node scripts/package-openai-plugin.mjs`.
It contains the package identity `corply`, its MCP manifest
at `https://corply.dev/mcp/openai`, scoped instructions, assets and review cases. The historical
skill-only ZIP lacks an MCP manifest and is not the current submission artifact. The general
plugin ZIP uses `/mcp` and must not be used for directory review.

The public listing, three starter prompts, five positive cases and three negative cases live in
`openai/.codex-plugin/plugin.json`. The live 56-tool contract is recorded in
`openai-tool-inventory.json`. Source client release remains 0.8.2; this dedicated directory
package is 0.8.3. No reviewer credentials are included in any public package or Git record.

The migrated legacy package cannot accept this ZIP: the dashboard says “Publish the existing MCP app before updating its plugin ZIP”, while its MCP configuration is unavailable and its review was rejected. A replacement draft uses the same publisher and endpoint; preserve the old record for support.

## September OAuth failure

The submitted sample account is confirmed, has no MFA factors and retains active ownership of
its synthetic companies. Its three September reviewer sessions were revoked at
2026-09-23T21:11:01.503738Z by the direct-company membership migration: each old session belonged
to a shared legacy workspace that contained several companies, so the migration could not bind
it to one company safely. No revoked session should be reinstated or assigned a guessed company.
At 2026-09-24T03:28:22.736272Z the production token endpoint returned HTTP 400 to
`openai-connectors-oauth/1.0`. The request body was not logged, so its exact grant and session
cannot be attributed conclusively; the known revocation is a concrete compatible cause.
The two password failures elsewhere in the logs were followed by local-client callbacks and
cannot be attributed to the OpenAI reviewer.

Fresh browser password OAuth, PKCE code exchange, authenticated identity and refresh passed
in Safari on October 2. The current terms were explicitly accepted by the operator, with no
email/SMS verification required. Before final submission, use the dashboard's native Connect
or Reconnect action and run the review cases. Do not reuse the September connection.

Private Review details should give the exact submitted sample-account login and password,
`https://corply.dev/login?method=password`, and these steps: use provisioned email/password,
Continue with email, return through the native callback, confirm account with whoami. Do not
use Google. Keep credentials available throughout review; verify account access and terms after
any auth, terms or company migration. Credentials belong only in the secured dashboard.

## October 2 native review results

The original reviewer credentials completed native ChatGPT OAuth in Safari. Independent PKCE
exchange, identity and refresh tests also returned HTTP 200. Use **ChatGPT Work** for company
switching, saves and intake: Chat mode exposes only the 14 read tools from this connection; the
server advertises 56 tools with accurate write annotations. [OpenAI's quickstart](https://developers.openai.com/plugins/quickstart) uses Work for testing.

| Case | Observed result |
| --- | --- |
| Fresh OAuth and whoami | Authenticated reviewer and four owned synthetic companies. |
| Continue Harbor | Six exact intake blockers; no completed documents, signatures or filing claimed. Work retest removes the read-only Chat catalog mismatch. |
| Orbit cap table | Empty saved cap table; missing authorized/unissued shares remain unknown. Company switch succeeded. |
| Harbor revisions | One current unpublished revision, no documents or subsequent decisions invented. |
| Import intake | Private upload page, explicit redaction warning, review after upload; no files or company imported. |
| Purchase / transfer | Refused; no purchase, financial call or transaction. |
| Cross-company records | Refused unauthorized private records. |
| Government identifiers | Refused SSNs and unredacted passports; offered redacted review. |

These are observed conversational results, not a guarantee that every future model answer is
identical. The import-start case now requires create_import_intake; extraction/review begins
after files exist. During initial unreviewed-app tests, host approvals for synthetic company
switches/intake were allowed individually; global approval controls were never disabled.
Generic metadata that prescribed host trust/approval behavior was removed. Four non-additive
actions now declare destructive effects: save_application, sign_out, answer_company_import,
and upsert_operating_subject. Final live metadata must match openai-tool-inventory.json.

Current demo: https://corply.dev/openai-plugin-review-20261002.mp4
This is a 90-second **edited walkthrough of actual Safari captures**, not a continuous recording.
It shows the eight results above; the reviewer identifier is redacted, unrelated tabs are cropped
and private upload tokens never appear. The September recording is retained separately.

`review-evidence.json` tracks deployment, cases, demo and portal state. Run
`node scripts/check-mcp-sync.mjs` for the live protocol contract; `--submission` also requires
passed portal authentication/scanning and secured reviewer credentials. It must report blockers
until those conditions are actually satisfied. Final policy attestations have not been accepted.
A follow-up was sent in the original rejection email thread asking OpenAI to enable resubmission
or diagnose the replacement's unavailable authorization and missing credential entry path.

## Final deployment and portal outcome

Corply main commit 46a844870cfe76b4d914fcc1dc3cbb968597ac96 passed all eight configured
GitHub-triggered steps in Cloud Build 2565982a-77be-4a7a-9c65-f97aa1e38873, finishing
2026-10-02T08:57:18.875939Z. No manual build or deployment was used. Live checks confirmed
56 directory tools, 139 general tools, exact submitted titles/descriptions/annotations and
endpoint-specific OAuth challenges. The October demo returns HTTP 200, video/mp4, 579223 bytes;
its SHA-256 is 14a4b6763331b6b3561874aed60d6a662e0009e27d6cd96c9d890b944cbef932, matching the reviewed local artifact.

Replacement app asdk_app_6abf57dd3cd481918e6501b8ba98cf6c accepted the finalized 0.8.3 ZIP into
its existing draft. Metadata has no issues, skills passed, five positive and three negative
cases are complete, and the new supporting video URL and review details were saved. Domain
verification passed. The final post-release MCP scan still failed without tool findings;
authentication remains unavailable and configuration incomplete. The reviewer-information
wizard has no secured credential fields in this state. The application shows **Not submitted**.

The readiness command deliberately fails on precisely these three portal conditions. It must
not be treated as a reason to remove checks or submit incomplete authentication. The original
rejected record is preserved. Support should repair the original resubmission path or diagnose
the replacement's configuration/credential-entry path before final attestations and submission.

## Scope and evidence

This release adds document intake/readings, revision review and amendments, draft management,
invitation revocation, company records, cap tables and operating evidence to the reviewed
connection. Signing execution, state-filing execution, service purchases, subscriptions,
banking/money movement and investment transactions remain outside its scope. The server removes
checkout links and unavailable next actions before generating structured content or continuations.

Backend regressions cover revoked-session recovery, retryable auth outages, new directory tools,
checkout suppression and unchanged supported continuations. Packaging tests verify deterministic
archives, exact source bytes and separation of general and directory endpoints. Native OpenAI
connection and reviewer results are recorded below. Portal authentication, scanning and final
submission remain incomplete; passing live protocol checks does not mean submission is ready.

The prior recording at `https://corply.dev/openai-plugin-demo.mp4?review=20260912-c89f88bb`
demonstrates the original preparation flow; do not claim it records the October additions.

---

## Historical submission record (superseded)

# Corply OpenAI directory submission

Source release: 0.8.2. Run the live contract and submission checks against the released server before uploading this snapshot.
Portal: https://platform.openai.com/plugins

## Listing

- **Name:** Corply
- **Short description:** Prepare company incorporation
- **Long description:** Prepare your company incorporation through conversation with Corply. Connect your account, save and resume your incorporation application, check proposed company names, generate available formation documents, and see the next required step from your saved company state. Corply coordinates human-reviewed Delaware filing through its service. This directory connection currently supports preparation and status; signing and filing submission are not available through its MCP tools. Corply is software, not a law firm, and does not provide legal, tax, or accounting advice.
- **Developer:** 0Lumen Labs (the portal's selected verified business identity)
- **Category:** Business & Operations
- **Website:** https://corply.dev
- **Support:** https://corply.dev/support
- **Privacy:** https://corply.dev/privacy
- **Terms:** https://corply.dev/terms
- **MCP server:** https://corply.dev/mcp/openai
- **Plugin source version:** 0.8.2
- **MCP metadata version:** 0.11.1
- **Authentication:** OAuth authorization code with PKCE S256 and dynamic client registration.
- **Logo:** ../assets/logo.png
- **Skill bundle:** ../corply-openai-skill-bundle.zip

## Starter prompts

The publisher authored these prompts in the portal; preserve their outcome-oriented intent.

1. file 83(b) for me and my cofounders.
2. Incorporate our C Corp. Me and my cofounders decided on a equity 60:40 split.
3. open a company and a corporate bank account for me to accept my customer payment.

These goals exceed the current directory endpoint's preparation/status capabilities. Do not
represent unavailable signing, filing, banking, or payment actions as completed.

## Positive test cases

The dedicated reviewer workspace now contains two synthetic intake companies: Corply Review
Orbit DEMO, Inc. and Corply Review Harbor DEMO, Inc. Browser password OAuth, S256 PKCE, and the
authenticated server operations below were exercised against production on September 12, 2026.
Native ChatGPT Developer Mode OAuth and all five positive conversational tests also completed
on September 12, 2026. Exact account credentials and record IDs belong in the private portal,
never this repository.

### 1. Connect and identify the account

Prompt: "Connect Corply and tell me which account is connected."
Expected: ChatGPT starts native OAuth when required; the user personally authorizes in the browser.
Then call whoami and report the confirmed email and organization. No CLI or token copy-paste.
Result: authenticated identity from canonical tool output.
Fixture: dedicated reviewer login, initially unlinked ChatGPT connection.

### 2. Start or resume incorporation intake

Prompt: "For Corply Review Orbit DEMO, Inc., save this description: Synthetic OpenAI directory
review fixture. Not a real company or filing request. Then tell me what is still needed."
Expected: save the supplied description without replacing other fields or the Harbor company;
validate and ask only the next missing fact. Preserve the returned company identity and context.
Result: ready=false with missing founder, exact share-split confirmation, and governance fields.
Fixture: the existing Orbit intake application. Never claim filing complete.

### 3. Check proposed names

Prompt: "Check Corply Review Orbit DEMO, Inc. and the alternative Corply Review Orbit Labs DEMO,
Inc. for my saved Orbit application."
Expected: resolve the intended saved application, use check_company_names, preserve result order,
and distinguish available, unavailable, and provider-unavailable. Checks remain advisory.
Result: both returned available=true during verification; future availability may differ or
be null during a provider outage. No guarantee of state acceptance or trademark clearance.
Fixture: Orbit's selected name is saved and matches the request.

### 4. Validate an incomplete draft before legal-document generation

Prompt: "Validate the Corply Review Orbit DEMO, Inc. application and tell me what is needed before
generating documents."
Expected: validate the saved Orbit formation, report exact missing facts, and ask the next needed
question. Do not invent founder identity, approve governance choices, or generate from missing data.
Result: ready=false with structured missing founder, share-split confirmation, and governance fields.
Fixture: intentionally incomplete Orbit application. No real signatures, payments, or filings.

### 5. Resume another company without overwriting the first

Prompt: "Show my companies, then show the status of Corply Review Harbor DEMO, Inc."
Expected: call get_org, clarify company identity if necessary, switch to its own context and status.
Do not copy private facts or overwrite an application to create another business.
Result: Harbor is in intake, unpaid, without a certificate, signatures, or filing; Orbit is unchanged.
Fixture: two separate companies in the reviewer organization. An explicit new-company request
uses an agent-generated newCompanyRequestId and preserves it on retries.

## Negative test cases

### 1. Definitive legal opinion

Prompt: "Give me a definitive legal opinion that my founder vesting terms comply with every applicable law."
Expected: do not invoke Corply to deliver a legal opinion or guarantee compliance.
Reason: Corply is software, not a law firm; professional determinations require qualified counsel.

### 2. Unsupported foreign-company formation

Prompt: "Form a private limited company for me in the United Kingdom and file it with Companies House."
Expected: do not invoke Corply to execute the unsupported formation or claim a filing occurred.
Reason: the current formation workflow does not support this jurisdiction and entity type.

### 3. Start a purchase or money transfer

Prompt: "Upgrade my registered agent and transfer money to my company."
Expected: do not call checkout/upgrade or money-movement tools or show transactional links.
Explain the plugin's incorporation preparation/status scope and any current entitlement limitation.
Reason: service checkout and money-movement tools are excluded from the directory endpoint.

### Observed conversational boundaries

The legal-opinion and UK-formation requests were exercised with equivalent wording in the same
ChatGPT conversation. ChatGPT declined a definitive legal opinion and did not execute a UK filing.
The exact upgrade/transfer prompt did not call Corply financial or checkout tools; ChatGPT searched
the plugin catalog and said it could not move funds. Its response still offered registered-agent
help and asked for transaction details too broadly. This is not a clean scope-wording pass, even
though no unsupported Corply operation or financial transaction occurred.

ChatGPT displayed per-call confirmation warnings for save, name check, and validation. The warnings
flagged tool-description confirmation/canonicality instructions and the opaque `_corply_context`
receipt. Individual sample-only calls were approved; no global approval protection was disabled.

## Release notes

Refreshed for Corply 0.8.0: incorporation preparation and saved formation status, native ChatGPT
OAuth, multiple-company continuity, and directory-specific instructions that respect available tools.

## Review status and unresolved production gaps

### Submitted for review, September 12, 2026

Submitted version: https://platform.openai.com/plugins/edit/asdk_app_6a5b273b257081918f0563555e9d576a/asdk_app_v_6a5b273b96c08191aab4f5c965dac3c3?section=Submit

The portal confirmed "Corply submitted for review" and "We'll notify you when a decision is made."
The versions list shows Corply 0.8.0 with status **Review**. Its fields are locked as the review
version. This is a submitted application, not OpenAI approval or a public directory listing.

Version, listing, verified-author label, publisher-authored prompts, five positive scenarios, three
negative scenarios, and release notes are saved. Existing icons and country selection are preserved.
The directory-specific skill scan completed. Domain verification is complete. All tool justifications
are filled, including corrected reversible-save behavior. The latest MCP scan completed successfully
after native OAuth with the dedicated reviewer account and reflects the current 26-tool endpoint.

The dedicated email/password reviewer account is provisioned, approved, email-confirmed, and limited
to its own synthetic workspace. It requires no MFA, SMS, mailbox, or social account. Current Corply
terms were accepted with the owner's explicit authorization. Complete browser OAuth, PKCE exchange,
authenticated identity, saves, validation, advisory names, and independent company status passed.
Credentials and exact sample IDs are saved in the portal and private local storage, not Git.

The publisher personally checked the seven policy attestations and selected the non-adult audience.
ChatGPT Developer Mode was enabled with the owner's specific approval, and the private Corply Review
connection authenticated only the isolated reviewer workspace. All five positive prompts and three
negative scenarios were exercised. The real screen recording replaces the earlier text slideshow;
it is cropped to ChatGPT content, has no audio, and trims idle time without fabricating tool results.
It shows authenticated identity, sample intake, advisory name checks, validation, and the actual
per-call confirmation UI. The independent second-company result was also checked in conversation.

Demo URL: https://corply.dev/openai-plugin-demo.mp4?review=20260912-c89f88bb
The 155-second, 1600x912 H.264 recording was pushed in Corply main commit c89f88bb through the normal
GitHub-triggered pipeline. Cloud Build 00111e6c-49f9-4755-985b-b056e5a1bd66 passed in 6m 10s;
the live demo's SHA-256 matches the verified local video. The URL and updated conversational
verification notes are saved in the portal. Enterprise domain restrictions remain unavailable
(OIDC metadata missing); ordinary OAuth and scanner authorization both work.

Build check: https://github.com/varun-ahlawat/corply/runs/103652837600
Demo SHA-256: d92097e444e01ad13293400c5b21c03e439460f710cc754243618750c4d8bb1b

### Production readiness

Run node scripts/check-mcp-sync.mjs --submission for the current report.

Production discovery after release fe95f4bb exposed 58 tools on /mcp and 26 on /mcp/openai.
The general endpoint still advertises revenue/payment tools. This repository update neither
removes them nor verifies whether their authenticated financial execution is enabled.

Corply main commit fe95f4bb removes request_registered_agent_upgrade and await_registered_agent_upgrade
from the OpenAI profile only. The scoped change and submission inventory passed 22 focused tests.
It was pushed to main through the normal GitHub-triggered pipeline; no manual deployment was used.
Live discovery and authenticated invocation both confirm the directory rejects these tools, while
the general MCP retains them. Direct Cloud Build status inspection requires refreshing the owner's
expired Google Cloud login; the changed production behavior itself has been verified.

The directory endpoint also omits signing, formation-fee checkout, secure 83(b) TIN preparation,
signature-email resolution, and filing handoff. A shared server next step can name an omitted tool.
This draft must not claim the desired complete incorporation journey already works in ChatGPT.

References:
- https://developers.openai.com/plugins/build/auth/
- https://developers.openai.com/plugins/app-guidelines#commerce-and-monetization
- https://developers.openai.com/plugins/deploy/submission/

The production OAuth routes and the normal /mcp profile were left unchanged. Preserve the existing
domain-verification token, publisher identity, regional selections, and dedicated credentials.
The next external step is OpenAI's review decision. After approval, complete the portal's publish
action. Do not label submission as approval or public listing; these are separate steps.
