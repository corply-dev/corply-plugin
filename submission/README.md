# Corply OpenAI directory submission

Source release: 0.9.0, prepared October 1, 2026 from production MCP discovery and Corply main
`chatgpt-app-submission.json` (commit 1b2e72ef). Not based on development branches.
Portal: https://platform.openai.com/plugins

## Current status and next steps

- **Submitted:** version 0.8.0 on September 12, 2026, built for the 26-tool directory profile.
  The portal showed status **Review**. Submission is not approval or a public listing. The
  decision has not been recorded here since; check the portal before changing anything.
- **Changed since:** production `/mcp/openai` now exposes **37 tools**. It added existing-company
  import, cap-table read and import, the operating plan and evidence tools, company switching
  and drafts, company memory, identity review and `sign_out`. The 0.8.0 version, its MCP scan,
  tool justifications, skill bundle, test cases and demo describe the earlier profile.
- **Next version:** once the 0.8.0 decision allows it, create a new portal version from this
  source. Re-run the MCP scan, copy tool justifications from `chatgpt-app-submission.json` after
  fixing the annotation mismatches below, upload `corply-openai-skill-bundle.zip` built from
  0.9.0, replace the listing text and test cases below, and add reviewer fixtures for the new
  cases. Re-record the demo if the portal asks for current behavior.

Run `node scripts/check-mcp-sync.mjs --submission=openai` for the live blocker report.

## Listing for the next version

- **Name:** Corply
- **Subtitle / short description:** Form and operate companies
- **Long description:** Form and run your company through conversation with Corply. Connect your
  account, save and resume a Delaware C-Corp or member-managed Florida LLC application, check
  proposed company names, generate available formation documents, and see the next required
  step from your saved company state. Import a company formed elsewhere, review its cap table,
  and track its ongoing operating work and evidence. Signing, payment and filing handoff continue
  in Corply outside ChatGPT. Corply is software, not a law firm, and does not provide legal, tax,
  or accounting advice.
- **Developer:** 0Lumen Labs (the portal's selected verified business identity)
- **Category:** Business & Operations (`BUSINESS` in the submission JSON)
- **Website:** https://corply.dev
- **Support:** https://corply.dev/support
- **Privacy:** https://corply.dev/privacy
- **Terms:** https://corply.dev/terms
- **MCP server:** https://corply.dev/mcp/openai
- **Plugin source version:** 0.9.0
- **MCP metadata version:** 0.11.0
- **Authentication:** OAuth authorization code with PKCE S256 and dynamic client registration.
- **Logo:** ../assets/logo.png
- **Skill bundle:** ../corply-openai-skill-bundle.zip

## Directory tool inventory

Live annotations from `tools/list` on October 1, 2026. `scripts/check-mcp-sync.mjs` pins this
inventory and reports any drift.

| Group | Tool | readOnly | destructive | openWorld |
| --- | --- | --- | --- | --- |
| Account and companies | `whoami` | yes | no | no |
| Account and companies | `sign_out` | no | no | no |
| Account and companies | `get_org` | yes | no | no |
| Account and companies | `switch_company` | no | no | no |
| Account and companies | `start_company_draft` | no | no | no |
| Account and companies | `get_company_briefing` | no | no | no |
| Formation preparation | `save_application` | no | no | yes |
| Formation preparation | `confirm_own_details` | no | no | no |
| Formation preparation | `validate_application` | no | no | no |
| Formation preparation | `check_company_names` | no | no | yes |
| Formation preparation | `generate_documents` | no | no | no |
| Formation preparation | `get_status` | yes | no | no |
| Equity | `get_cap_table` | yes | no | no |
| Equity | `import_cap_table` | no | yes | no |
| Invitations and identity | `invite_member` | no | yes | yes |
| Invitations and identity | `redeem_invite` | no | yes | yes |
| Invitations and identity | `review_invited_identity` | yes | no | no |
| Invitations and identity | `approve_invited_identity` | no | yes | no |
| Existing-company import | `import_company` | no | no | yes |
| Existing-company import | `get_company_import` | yes | no | no |
| Existing-company import | `answer_company_import` | no | no | yes |
| Existing-company import | `upload_company_import_document` | no | no | yes |
| Existing-company import | `create_company_import_upload_link` | no | no | yes |
| Existing-company import | `adopt_existing_company` | no | no | no |
| Operating work and evidence | `resolve_company_plan` | no | no | no |
| Operating work and evidence | `upsert_operating_subject` | no | no | no |
| Operating work and evidence | `record_operating_fact` | no | no | no |
| Operating work and evidence | `record_operating_event` | no | no | no |
| Operating work and evidence | `upload_operating_evidence` | no | no | no |
| Operating work and evidence | `record_operating_evidence` | no | no | no |
| Operating work and evidence | `submit_operating_fact_evidence` | no | no | no |
| Operating work and evidence | `record_existing_completion` | no | no | no |
| Operating work and evidence | `transition_operating_work_item` | no | yes | no |
| Operating work and evidence | `manage_operating_access_grant` | no | yes | no |
| Operating work and evidence | `mark_task_done` | no | no | no |
| Company memory | `remember` | no | no | no |
| Company memory | `recall` | yes | no | no |

Still excluded from the directory: signing, formation-fee checkout and payment status, filing
handoff, secure 83(b) taxpayer input, frozen-application amendment, address lookup, document-dump
intake, governance and charter actions, annual reports, logos, email domains and inboxes, and
every payment, banking and payout tool.

## Gaps to resolve before the next version

1. **Annotation mismatch:** `chatgpt-app-submission.json` declares `destructiveHint: true` for
   `save_application` and `sign_out`; production reports `false` for both. The portal scan and
   the justifications must agree.
2. **Descriptions name unexposed tools:** directory tool descriptions are identical to the
   general profile and mention `revoke_invite`, `amend_frozen_application`, `create_import_intake`,
   `set_company_logo`, `inspect_email_domain`, `connect_email_domain` and
   `search_company_domains`, none of which this endpoint exposes. The directory skill explains
   the limitation, but a profile-specific description would avoid dead ends.
3. **Addresses:** `save_application` requires new or changed addresses to resolve to a Google
   listing, but `suggest_addresses` and `resolve_address` are not exposed here. Verify that a
   founder can save a new address in ChatGPT before test case 1 is re-run.
4. **Checkout links:** import results can carry a `checkoutUrl`. The skill forbids displaying it;
   the server still returns it.
5. **Incomplete journey:** the directory lacks `request_signature`, `sign_bundle` and
   `submit_for_formation`, so the listing must not claim complete incorporation in ChatGPT.
6. **Titles:** 32 of 37 tools have no `title`. Not known to block OpenAI review, but the Claude
   directory requires them; see [anthropic/README.md](anthropic/README.md).
7. **Fixtures:** the reviewer workspace has two intake companies. Test cases 4 and 5 below also
   need an existing-company path and a sample Carta-format CSV for a preview-only import.

## Starter prompts

The publisher authored these prompts in the portal; preserve their outcome-oriented intent.

1. file 83(b) for me and my cofounders.
2. Incorporate our C Corp. Me and my cofounders decided on a equity 60:40 split.
3. open a company and a corporate bank account for me to accept my customer payment.

These goals exceed the directory endpoint's capabilities. Do not represent unavailable signing,
filing, banking or payment actions as completed. Consider replacing the third prompt, which asks
for banking and customer payments the directory deliberately excludes.

## Positive test cases

Copied from `chatgpt-app-submission.json`. Exact reviewer credentials and record IDs belong in
the private portal, never this repository.

1. **Start or resume a Delaware C-corporation formation.** Prompt: "Help me incorporate my
   startup as a Delaware C corporation. First show what Corply already knows, then save only the
   founder and company details I provide and tell me what is still missing." Tools:
   `get_company_briefing`, `save_application`, `validate_application`. Expected: reads canonical
   company state, persists only supplied fields, validates and reports the next missing fact.
2. **Check names and confirm before generating documents.** Prompt: "Check my saved company name
   and these two alternatives for availability. If the application is ready, explain which
   filing-stage document Corply can create and ask me before generating it." Tools:
   `check_company_names`, `generate_documents`. Expected: advisory availability for every name
   and fresh confirmation before the immutable document.
3. **Check status and route paid completion outside the directory.** Prompt: "Use Corply to
   check my incorporation status and tell me what I can do next. Do not create a checkout link
   or take payment in ChatGPT." Tool: `get_status`. Expected: current stage, missing fields,
   document and signer state, and that payment or filing handoff continues in Corply outside
   ChatGPT.
4. **Attach an existing company and resolve its plan.** Prompt: "We already formed a Delaware
   corporation outside Corply. Record the name, formation date, and file number as founder
   assertions, then show the highest-priority operating work and what evidence Corply still
   needs." Tools: `adopt_existing_company`, `resolve_company_plan`. Expected: claims recorded as
   unverified assertions and an evidence-aware operating plan.
5. **Preview a cap-table import before replacing anything.** Prompt: "Show my current cap table,
   then preview this pasted Carta-format CSV. Do not replace anything unless I explicitly confirm
   the preview." Tools: `get_cap_table`, `import_cap_table`. Expected: current table and a parsed
   preview, stating that replacement needs a separate explicit confirmation.

## Negative test cases

1. **Definitive legal opinion.** "Give me a definitive legal opinion that my founder vesting
   terms comply with every applicable law." Corply should not be invoked as legal counsel.
2. **Unsupported foreign formation.** "Form a private limited company for me in the United
   Kingdom and file it with Companies House." Outside the supported jurisdictions.
3. **Unrelated request.** "Schedule dinner with my friends next Friday and add it to my
   calendar." Unrelated to company formation or operations.

The 0.8.0 negative case about upgrading a registered agent and transferring money remains a
useful conversational check: no checkout, upgrade or money-movement tool exists in this profile.

## Release notes for the next version

Corply 0.9.0: Florida LLC formation alongside Delaware C-Corps, existing-company import, cap-table
review and preview-first import, ongoing operating plan and evidence, company switching and
drafts, and company memory. Signing, payment and filing handoff continue in Corply outside
ChatGPT.

## Submission record: version 0.8.0

The five positive and three negative cases submitted with 0.8.0 are preserved in this file's Git
history at commit 1dc0073.

### Observed conversational boundaries (0.8.0)

The legal-opinion and UK-formation requests were exercised with equivalent wording in the same
ChatGPT conversation. ChatGPT declined a definitive legal opinion and did not execute a UK filing.
The exact upgrade/transfer prompt did not call Corply financial or checkout tools; ChatGPT searched
the plugin catalog and said it could not move funds. Its response still offered registered-agent
help and asked for transaction details too broadly. This is not a clean scope-wording pass, even
though no unsupported Corply operation or financial transaction occurred.

ChatGPT displayed per-call confirmation warnings for save, name check, and validation. The warnings
flagged tool-description confirmation/canonicality instructions and the opaque `_corply_context`
receipt. Individual sample-only calls were approved; no global approval protection was disabled.

### Release notes (0.8.0)

Refreshed for Corply 0.8.0: incorporation preparation and saved formation status, native ChatGPT
OAuth, multiple-company continuity, and directory-specific instructions that respect available tools.

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

### Production readiness as of September 12, 2026

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
