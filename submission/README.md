# Corply OpenAI submission draft

Source release: 0.8.0. Based on production MCP discovery, not development branches.
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
- **Plugin source version:** 0.8.0
- **MCP metadata version:** 0.10.0
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
Conversational Developer Mode testing and a real demo recording are still pending. Exact account
credentials and record IDs belong in the private portal, never this repository.

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

## Release notes

Refreshed for Corply 0.8.0: incorporation preparation and saved formation status, native ChatGPT
OAuth, multiple-company continuity, and directory-specific instructions that respect available tools.

## Review status and unresolved production gaps

### Saved portal draft, September 12, 2026

Existing draft: https://platform.openai.com/plugins/edit/asdk_app_6a5b273b257081918f0563555e9d576a/asdk_app_v_6a5b273b96c08191aab4f5c965dac3c3?section=Submit

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
The form's remaining validation blocker is the required Demo Recording URL. The previous video was
inspected and found to be a text slideshow rather than an actual Developer Mode demonstration; its
URL was removed from the draft. ChatGPT Developer Mode is currently off and was left unchanged
pending specific approval to enable it, connect the isolated reviewer workspace, and record the demo.
No final submission was made. Enterprise domain restrictions remain unavailable (OIDC metadata
missing); ordinary OAuth and the OpenAI scanner authorization both work.

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
Finish the real Developer Mode demo, then submit the reviewed draft. Do not label submission as
approval or public listing: OpenAI review and a later publish action are separate steps.
