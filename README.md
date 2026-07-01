# Corply — incorporate your startup from Claude Code

Corply is your startup's AI **general counsel**. Install the plugin, sign in once, and form a
Delaware C-corp end-to-end — guided application, generated documents, conversational e-signature,
and filing handoff — without leaving Claude Code.

## Install

```
claude plugin marketplace add corply-dev/corply
claude plugin install corply
```

Then run `/incorporate`. On the first MCP tool call your browser opens once to sign in with Google
(OAuth); after that Claude is authorized into your organization.

## What it does

- **Guided application** — the agent gathers structure, name, founders, ownership, equity terms,
  roles, 83(b), and tax info in one pass, and advises on standard choices.
- **Documents** — Certificate of Incorporation, Bylaws, Action of Incorporator, Board Consent.
- **Conversational e-signature** — you review each PDF via a magic link, then sign in-chat under
  ESIGN/UETA with a full audit trail. The only thing that happens on the web is reviewing the PDF.
- **Cofounders** — invite them by email; they sign from their own Claude Code and land in the same
  org automatically.
- **Filing** — Corply's team files with Delaware after everyone signs.

## Configuration

`.mcp.json` points at the Corply MCP server. For local development this is
`http://localhost:8787/mcp`; production distribution uses `https://corply.dev/mcp`.

**Corply is not a law firm and does not provide legal advice.**
