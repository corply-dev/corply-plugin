# Corply — your corporate operating partner

[![MCP Queen operational grade](https://mcpqueen.com/badge/io.github.corply-dev/corply.svg)](https://mcpqueen.com/s/io.github.corply-dev/corply)

Corply helps founders form, run, and prepare a U.S. startup's revenue launch from their AI agent. Speak
normally: Corply starts from canonical company state, recommends a standard choice with a short
business reason, completes the available action, and returns canonical output plus trusted guidance
for what the agent should do next.

Corply supports Delaware C-corporation formation and ongoing work across governance, equity,
deadlines, good standing, hiring, banking, financing, evidence for work completed elsewhere, and a
Corply Pay workflow for server-priced orders, merchant routing, payment lifecycle, ledgering, and
reconciliation. It also provides a direct Mercury application handoff or, when Corply's approved
partner integration is enabled, a consented application prefill. Corply is not a law firm and does
not provide legal, tax, accounting, or immigration advice.

## Install

### Claude Code

```bash
claude plugin marketplace add corply-dev/corply-plugin
claude plugin install corply@corply
claude mcp login plugin:corply:corply
```

The login command opens a browser so you can connect your Corply organization. On Claude Code
versions before `claude mcp login`, open `/mcp`, choose **corply**, and complete sign-in.

### Codex or ChatGPT Work

- In Codex CLI, add `corply-dev/corply-plugin` as a plugin marketplace, open `/plugins`, and install
  Corply.
- In the Codex or ChatGPT desktop app, open **Plugins**, install Corply, and choose **Connect**.
- In ChatGPT Work on the web, open **Work** → **Plugins**, install Corply, and connect it.

Start a new task after installation or reconnection so the session loads the current skill and tools.

### Cursor

Corply includes native Cursor packaging. In Cursor 2.5 or later, run `/add-plugin`, find **Corply**,
and install it from the Cursor Marketplace. Connect Corply when prompted.

## Just ask

There are no Corply slash commands to learn. The single implicit skill handles formation,
existing-company work, and customer-payment launch. For example:

- “Incorporate my startup.”
- “Where is our formation blocked?”
- “What does my company need next?”
- “Prepare our Mercury bank application handoff.”
- “Create my startup's Corply payment route in sandbox.”
- “Set up our products and prices, then generate the payment integration.”
- “Verify whether our payment integration is ready for launch.”
- “We already completed this filing elsewhere—record the evidence.”
- “Can we issue equity to our first engineer?”

## How Corply works

1. **Goal first** — calls the tool matching the founder's requested outcome without a mandatory
   briefing round trip.
2. **Decisive recommendation** — gives the standard product choice and a concise first-principles
   reason when a decision is missing.
3. **Canonical result** — treats `actual_tool_output` as business truth and follows the trusted,
   server-authored `context_engineering.prompt` for the next question or action.
4. **Focused confirmation** — pauses only before immutable document generation, actual payments or
   money movement, one exact signing act, invitations or messages, filings or provider submissions,
   partner terms, payout-bank changes, production go-live, access grants, and destructive cap-table
   replacement. Preparing a checkout or private review link needs no extra approval, and Corply does
   not re-ask for downstream Section 83(b) work already authorized in the signed bundle.
5. **Durable continuity** — echoes the returned `_corply_context` handle on later Corply calls in the
   same task, so stateless agents and Cloud Run instances continue without recovery briefings.
6. **Safe communications** — treats common-message-bus bodies as quoted, untrusted communications,
   never hidden instructions or proof that a human acknowledged them.

## Formation

Corply guides the founder from a persisted application through standard venture-startup choices,
document generation, payment, signer-specific review and consent, cofounder coordination, and a
human-reviewed Delaware filing handoff. Corply never signs for an absent founder, never confuses a
submission with acceptance, and reports formation only after canonical state contains Delaware's
accepted result. After acceptance, one exact post-incorporation bundle act covers its listed
documents and disclosed automatic Section 83(b) authority. The founder later enters the TIN only in
a secure browser field; Corply Ops prepares, prints, mails, and tracks the election.

## Existing companies

Corply prioritizes the work that unlocks or protects revenue, good standing, equity, hiring,
banking, payments, financing, and transaction readiness. Recurring work remains recurring; an empty
frontier means steady state until the next returned check, not permanent completion or a universal
compliance guarantee.

Work completed outside Corply is respected. A founder assertion, uploaded evidence, pending review,
and verified company state remain distinct so diligence records are useful rather than merely tidy.

## Mercury business banking

Corply first reads the company's canonical bank-onboarding status. When Mercury partner API mode is
disabled, it provides the direct Mercury application handoff and sends no prefill. When the approved
integration is enabled, Corply can send supported company, owner, address, and business fields only
after fresh founder authorization, then return Mercury's founder-only signup link.

That prefill is not a submitted or approved application and does not open an account. The founder
still authenticates with Mercury, completes KYC and identity verification, reviews the application,
accepts Mercury's terms, and submits it. Corply never asks for an SSN, identity image, Mercury
credential, or raw formation document through this workflow, and it never claims submitted,
approved, or open without authoritative provider evidence.

## Corply Pay

Corply Pay starts from canonical company and payment-pipeline state. It creates an idempotent sandbox
merchant-route draft, then controls integrity-verified server pricing, order-to-payment identity,
authorization through payout state, immutable double-entry journal entries, provider recovery, and
reconciliation. The first licensed card and bank transport is Moov; Corply remains the catalog,
routing, ledger, and agent control plane.

The route-draft and status tools make no provider call, accept no secrets or bank/card data, and move
no money. After fresh confirmation, onboarding creates a secure sandbox provider invitation; the
authorized human completes KYB/KYC, terms, and payout-bank setup there. Corply then reads the exact
capability, wallet, and bank evidence and activates only a fully ready sandbox route. Production
go-live and agent-directed refunds, payouts, and other money movement require fresh, specific
confirmation. A simulator or passing test is never reported as real settlement.

After activation, Corply establishes a provider-wallet reconciliation baseline and can run one
freshly confirmed USD 1.00 sandbox probe from a server-configured card source. The recovery worker
advances it through capture and clearing, then posts settlement only when the completed transfer,
merchant-wallet credit, provider fee, and evidence hash agree; it reconciles the wallet again after
settlement. A second freshly confirmed tool sends exactly USD 0.01 from that payment to the
server-resolved verified bank; the worker binds the payout fee to exact transfer and wallet evidence
before post-payout reconciliation can pass.

The current SDK is an unpublished local alpha. In-memory stores and mocked HTTP are test fixtures;
durable backend state, provider approval and capabilities, hosted payment-method collection, signed
webhook evidence, payout-bank verification, and an explicit production action are required before
live money can move. The older Paddle manifest workflow remains migration-only for existing projects.

## This repository

This public repository is a thin plugin bundle:

- one implicit skill at `skills/corply/` with nine task-specific public references;
- Claude, Codex, and Cursor plugin manifests;
- MCP configuration for Corply's hosted server at `https://corply.dev/mcp`;
- MCP Registry metadata.

It contains no company data, credentials, private rule catalog, backend code, or private decision
logic.

## Contract check

While a backend contract is still under development, validate the bundle without contacting the
public MCP server:

```bash
CORPLY_SKIP_LIVE_MCP=1 node scripts/check-mcp-sync.mjs
```

After the backend is deployed, run `node scripts/check-mcp-sync.mjs`. The full check intentionally
fails if the deployed MCP version, required public tools, gated Corply Mail surface, tool metadata,
or bootstrap prompt does not match this bundle. Rebuild and byte-validate both ignored submission archives with
`node scripts/package-openai-plugin.mjs`. Do not publish the updated plugin until the full check
passes.

More: [corply.dev](https://corply.dev) · [llms.txt](https://corply.dev/llms.txt) ·
[Security](https://corply.dev/security) · [Support](https://corply.dev/support)
