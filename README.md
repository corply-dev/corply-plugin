# Corply — your corporate operating partner

Corply helps founders form, run, and prepare a U.S. startup's revenue launch from their AI agent. Speak
normally: Corply starts from canonical company state, recommends a standard choice with a short
business reason, completes the available action, and refreshes the state before reporting the result.

Corply supports Delaware C-corporation formation and ongoing work across governance, equity,
deadlines, good standing, hiring, banking, financing, evidence for work completed elsewhere, and a
Corply Pay workflow for preparing, configuring, generating, and verifying a customer-payment
integration. Corply is not a law firm and does not provide legal, tax, accounting, or immigration
advice.

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
- “Prepare my startup's first-payment integration in sandbox.”
- “Set up our products and prices, then generate the payment integration.”
- “Verify whether our payment integration is ready for launch.”
- “We already completed this filing elsewhere—record the evidence.”
- “Can we issue equity to our first engineer?”

## How Corply works

1. **State first** — reads the current company briefing instead of restarting intake or relying on
   chat memory.
2. **Decisive recommendation** — gives the standard product choice and a concise first-principles
   reason when a decision is missing.
3. **Canonical action** — uses the action available for the current company state and asks only for
   the fact that changes what happens next.
4. **Focused confirmation** — pauses only before immutable document generation, payments,
   signatures or certifications, invitations, messages or other external sends, filings or
   government or provider submissions, partner terms, payout-bank changes, production go-live,
   refunds or money movement, access grants, and destructive cap-table replacement.
5. **State refresh** — verifies the canonical outcome after every change and surfaces only critical
   deadlines or blockers after completing the requested goal.

## Formation

Corply guides the founder from a persisted application through standard venture-startup choices,
document generation, payment, signer-specific review and consent, cofounder coordination, and a
human-reviewed Delaware filing handoff. Corply never signs for an absent founder, never confuses a
submission with acceptance, and reports formation only after canonical state contains Delaware's
accepted result.

## Existing companies

Corply prioritizes the work that unlocks or protects revenue, good standing, equity, hiring,
banking, payments, financing, and transaction readiness. Recurring work remains recurring; an empty
frontier means steady state until the next returned check, not permanent completion or a universal
compliance guarantee.

Work completed outside Corply is respected. A founder assertion, uploaded evidence, pending review,
and verified company state remain distinct so diligence records are useful rather than merely tidy.

## Corply Pay

Corply Pay's founder workflow starts by resolving revenue readiness, then creates a payment project,
configures the products and prices, creates an integration bundle for the startup's software, and
verifies the installed integration. The company briefing is canonical for company identity and
facts; payment-project work resumes from the repository's exact `.corply/payments.json` manifest.
The current payment tools do not persist a hosted payment project.

These Corply-side tools make no payment-provider calls and never accept secrets, bank details, or raw
payment data. The workflow does not blur software readiness with financial approval. An authorized
human still completes payment-partner KYB/KYC, accepts partner terms, connects or changes the payout
bank, and confirms production go-live. Refunds, payouts, and other money movement always require a
fresh, transaction-specific confirmation. Corply never fabricates approval or treats a passing
software test as permission to process live money.

The current SDK is an unpublished local alpha. The generated integration is sandbox-only and
fail-closed until the agent implements the host application's atomic identity/receipt/projection
stores, recovery-before-create provider transaction gateway, and official Paddle verification boundary. It reconciles signed subscription price, currency,
cadence, trial, and billing window against the approved catalog before granting access; it does not
claim that a startup can accept live payments merely because code generation or tests passed.

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
fails if the deployed MCP version, required public tools, tool metadata, or bootstrap prompt does not
match this bundle. Rebuild and byte-validate both ignored submission archives with
`node scripts/package-openai-plugin.mjs`. Do not publish the updated plugin until the full check
passes.

More: [corply.dev](https://corply.dev) · [llms.txt](https://corply.dev/llms.txt) ·
[Security](https://corply.dev/security) · [Support](https://corply.dev/support)
