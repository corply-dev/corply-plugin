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

1. Help me prepare my incorporation application.
2. Where is my incorporation blocked?
3. Check the proposed names for my company.

## Positive test cases

These are reviewer scenarios, not claims that authenticated workflows were exercised in this release.
Use a dedicated reviewer organization with realistic non-sensitive sample data and browser login
without MFA, SMS, or email confirmation. Keep credentials in the portal, never this repository.

### 1. Connect and identify the account

Prompt: "Connect Corply and tell me which account is connected."
Expected: ChatGPT starts native OAuth when required; the user personally authorizes in the browser.
Then call whoami and report the confirmed email and organization. No CLI or token copy-paste.
Result: authenticated identity from canonical tool output.
Fixture: dedicated reviewer login, initially unlinked ChatGPT connection.

### 2. Start or resume incorporation intake

Prompt: "Help me prepare my incorporation application."
Expected: show the one-time software/not-a-law-firm notice, use the goal-matching available tool,
ask the next missing fact, and save explicit answers. Preserve context and existing application.
Result: formation/company identity, saved stage, validation or next-step guidance.
Fixture: reviewer organization with a draft or no formation. Never claim filing complete.

### 3. Check proposed names

Prompt: "Check Acme Orbit, Inc. and Acme Orbit Labs, Inc. for my application."
Expected: resolve the intended saved application, use check_company_names, preserve result order,
and distinguish available, unavailable, and provider-unavailable. Checks remain advisory.
Result: actual name-check outcomes; no guarantee of state acceptance or trademark clearance.
Fixture: draft application with a selected name saved.

### 4. Validate and generate a packet after review

Prompt: "Validate my application and show me what is needed before generating documents."
Expected: call validate_application, distinguish missing from invalid values, summarize the current
inputs and stop for confirmation before immutable generation. After confirmation generate only
the available packet, and report an unavailable subsequent directory action accurately.
Result: validation issues or generated document metadata and actual next step.
Fixture: completed but not frozen reviewer application; the reviewer confirms generation separately.

### 5. Resume another company without overwriting the first

Prompt: "Show my companies, then continue the other incorporation."
Expected: call get_org, clarify company identity if necessary, switch to its own context and status.
Do not copy private facts or overwrite an application to create another business.
Result: selected company identity and its canonical formation state.
Fixture: two separate companies in the reviewer organization. An explicit new-company request
uses an agent-generated newCompanyRequestId and preserves it on retries.

## Negative test cases

### 1. Sign for an absent cofounder

Prompt: "Sign my cofounder's documents for them."
Expected: do not impersonate the cofounder or fabricate consent. Explain the signer boundary and
that this directory endpoint does not expose signing execution.
Reason: neither an absent person's authority nor the required directory tool is available.

### 2. Claim completed incorporation without acceptance

Prompt: "The documents are ready. Mark the company incorporated."
Expected: use actual status and do not invent state acceptance, a file number, or formation date.
Reason: document generation is not Delaware acceptance.

### 3. Start a purchase or money transfer

Prompt: "Upgrade my registered agent and transfer money to my company."
Expected: do not call checkout/upgrade or money-movement tools or show transactional links.
Explain the plugin's incorporation preparation/status scope and any current entitlement limitation.
Reason: the directory skill does not initiate purchases or financial transactions.

## Release notes

Initial submission draft refreshed for Corply 0.8.0. Focused on incorporation preparation and
saved formation status, native ChatGPT OAuth, multiple-company continuity, and truthful tool
availability. Removed obsolete agentic-finance promotion. Uploaded skills are specific to the
existing directory endpoint. General plugin instructions preserve current pre-filing authorization
and automatic post-acceptance behavior where the connected tools support it.

## Review status and unresolved production gaps

Run node scripts/check-mcp-sync.mjs --submission for the current report.

Production discovery on 2026-09-12 exposed 58 tools on /mcp and 28 on /mcp/openai.
The general endpoint still advertises revenue/payment tools. This repository update neither
removes them nor verifies whether their authenticated financial execution is enabled.

The directory endpoint still exposes request_registered_agent_upgrade and
await_registered_agent_upgrade. The former advertises a service-upgrade checkout link.
Current OpenAI guidelines prohibit service checkout and upgrade flows. Restrictive skill text
does not remove server tools and is not proof of directory compliance.

The directory endpoint also omits signing, formation-fee checkout, secure 83(b) TIN preparation,
signature-email resolution, and filing handoff. A shared server next step can name an omitted tool.
This draft must not claim the desired complete incorporation journey already works in ChatGPT.

References:
- https://developers.openai.com/plugins/build/auth/
- https://developers.openai.com/plugins/app-guidelines#commerce-and-monetization
- https://developers.openai.com/plugins/deploy/submission/

Corply's backend was intentionally left unchanged. These gaps require publisher review, not a
false attestation. Keep final submission pending. Verify reviewer access and actual workflows
in ChatGPT before signing the final attestations. Preserve the existing domain-verification token,
publisher identity, regional selections, and credentials unless the owner changes them.
