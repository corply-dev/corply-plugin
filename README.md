# Corply — incorporate a Delaware C-Corp from Claude Code

Corply is an autonomous incorporation agent for startup founders. Install the plugin, run
`/incorporate`, and form a **Delaware C-Corp end-to-end** — guided application, generated
legal documents, cofounder e-signature, and a human-reviewed Delaware filing — without
leaving Claude Code. Same outcome as Stripe Atlas or Clerky (a venture-ready Delaware
C-Corp), driven from your terminal, with a flat fee and no hourly attorneys.

## Install

```
claude plugin marketplace add corply-dev/corply-plugin
claude plugin install corply
```

Then run `/incorporate`. On the first tool call your browser opens once to sign in with
Google; after that Claude Code is authorized into your organization.

## What it does

- **Guided application** — the agent gathers company name, founders, equity split, vesting,
  83(b) election, and EIN details in one conversational pass, and explains standard choices.
- **Legal documents** — Certificate of Incorporation, Bylaws, Action of Incorporator, and
  Board Consent, generated from your answers.
- **Conversational e-signature** — each signer reviews the PDFs via a magic link and signs
  from their own Claude Code under a binding **ESIGN/UETA** audit trail. The only thing that
  happens on the web is reading the PDF.
- **Cofounders** — invite them by email; they install the same plugin, review, sign, and land
  in the same organization automatically.
- **Human-reviewed filing** — Corply's team reviews every Delaware submission before it is
  filed. Nothing is auto-filed.
- **Post-incorporation records** — approvals, documents, deadlines, and company context stay
  in one place after formation.

## Who it's for

- First-time founders who want a venture-ready structure without guessing.
- International / non-U.S. cofounder teams incorporating a U.S. startup.
- Technical founders who would rather run one command than fill out web portals.

## FAQ

- **Is this a Stripe Atlas / Clerky alternative?** Yes — same outcome (a venture-ready
  Delaware C-Corp with EIN, founder stock, and 83(b) workflow), but driven from Claude Code
  instead of a web portal.
- **Does it file with Delaware automatically?** No. Every submission is human-reviewed
  before filing.
- **Do all cofounders have to sign?** Yes — each cofounder signs from their own Claude Code
  with a full audit trail.
- **What does it cost?** A flat fee, no hourly billing. Details at [corply.dev](https://corply.dev).
- **Is Corply a law firm?** No. Corply prepares documents and filings and does not provide
  legal advice.

## How this repo works

This repo is **just the plugin** — a thin client (a slash command, a skill, and an
`.mcp.json` pointing at Corply's hosted MCP server at `https://corply.dev/mcp`). No company
data, backend code, or credentials live here. The server exposes the incorporation tool
surface (application, validation, document generation, e-signature, invites, formation
status, and org memory) over the Model Context Protocol, so any MCP-capable agent can use
Corply; Claude Code with this plugin is the first-class experience.

More: [corply.dev](https://corply.dev) · [llms.txt](https://corply.dev/llms.txt) ·
[Security](https://corply.dev/security) · [Support](https://corply.dev/support)

---

**Corply is operated by 0Lumen Labs Corp. Corply is not a law firm and does not provide legal advice.**
