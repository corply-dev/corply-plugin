# Corply

![Corply](https://corply.dev/brand/weaverbird-avatar-256.png)

Form and run your company through conversation. Corply connects the AI client you use to your
saved company: formation of Delaware C-Corps and member-managed Florida LLCs, founder documents
and signatures, human-reviewed state filing, import of companies formed elsewhere, cap tables,
governance actions, EIN and 83(b) follow-through, Delaware annual reports and other ongoing
company obligations.

This repository is the cross-agent plugin: a skill plus the connection to Corply's hosted MCP
server. Company state and execution live on that server. Corply is software, not a law firm,
and does not provide legal, tax or accounting advice.

## What this plugin connects to

- **One remote MCP server:** `https://corply.dev/mcp/claude`, declared in [.mcp.json](.mcp.json)
  and operated by Corply (0Lumen Labs Corp. d/b/a Corply). It is Corply's directory profile:
  everything on the general server except payment-processing, banking, payout and card tools.
  The separate OpenAI directory package in `submission/openai/` declares
  `https://corply.dev/mcp/openai` for ChatGPT; Claude never loads it. The plugin runs no local code, hooks
  or package installs; `scripts/` holds maintainer checks that installs never execute.
- **Data sent:** what the founder asks the agent to save or do in Corply, such as company and
  founder details, addresses, ownership, documents the founder supplies and answers to filing
  questions, plus the OAuth access token the client obtains. Data goes only to that server.
- **Sign-in:** standard OAuth 2.0 with PKCE and dynamic client registration on corply.dev. The
  client stores and refreshes credentials. The skill never asks for passwords, tokens, SSNs or
  ITINs in chat; taxpayer numbers are entered only on Corply's secure browser page.
- **Links shown to the founder:** Corply pages for review, signing, uploads, checkout, terms and
  support, all on corply.dev. Founders pay any Corply fee themselves on Corply's checkout page;
  the plugin never pays, transfers money or enters card or bank details.

Privacy policy: [corply.dev/privacy](https://corply.dev/privacy). Terms:
[corply.dev/terms](https://corply.dev/terms). Security: [corply.dev/security](https://corply.dev/security).

## Install

**Claude Code:**

```bash
claude plugin marketplace add corply-dev/corply-plugin
claude plugin install corply@corply
```

Then open `/mcp`, select Corply and choose **Authenticate**, or run `claude mcp login` with the
server name `claude mcp list` shows. Codex, Cursor and other marketplace hosts use their
**Connect** or **Reconnect** control. After linking, the agent verifies your email and company
through `whoami`.

**ChatGPT on the web:** enable Corply in ChatGPT, choose **Connect**, sign in on Corply's page
and return to the conversation. The ChatGPT directory listing uses
`https://corply.dev/mcp/openai`, a narrower profile than the general server. Directory
availability requires OpenAI review and publication; see
[submission status](submission/README.md).

**Any other MCP client:** add a remote Streamable HTTP server at `https://corply.dev/mcp` and
authenticate with the client's native control. The [setup guide](https://corply.dev/setup)
covers each client. To connect Claude Code directly, without this plugin, Corply's
[Claude Code guide](https://corply.dev/setup/claude-code.md) provides a sign-in helper you can
inspect before running. The plugin itself never downloads or runs that helper.

## Just ask

- "Incorporate our startup. My cofounder and I want a 60/40 split."
- "Form a Florida LLC for my consulting business."
- "Import my existing Delaware company into Corply from its documents."
- "Show our cap table and what the company needs to do next."

The agent asks for the next relevant fact, saves progress and follows Corply's canonical results.
It never invents signatures, payments, filing acceptance or deadlines. Each founder reviews and
signs as themselves, and a new conversation resumes the saved company instead of starting over.

Not included: customer-payment processing, banking, payouts and other money movement. The
plugin's endpoint does not expose those tools, and its skill does not use them.

The standard flow records disclosed pre-filing authority for enumerated automatic post-acceptance
work. Secure identity fields stay in the browser. Each restricted-stock founder chooses managed
83(b) mail or self-filing. Managed mail includes standard certified mailing and a prepaid return
envelope; self-filing has no Corply mailing fee and requires the founder's own IRS submission.
Both routes track deadlines and reviewed evidence. See the [83(b) guide](https://corply.dev/guides/83b-election).

Founders can also start a Delaware C-Corp in the [browser](https://corply.dev/signup?next=/welcome).
Florida LLC intake currently uses a connected agent. Current supported prices are shown in the
[formation calculator](https://corply.dev/pricing); live checkout controls the exact quote.
Owners, founders and operators can export available company records from Documents or Settings.
The [records download page](https://corply.dev/records) is accessible without accepting revised
service terms; personal founder documents remain scoped to their owner.

## Version 0.9.1

The Claude plugin connects to `https://corply.dev/mcp/claude`, Corply's directory profile, and
its instructions now cover Florida LLCs, existing-company import, cap tables, governed company
actions, annual reports, IRS changes, the company workspace and address lookup. Every Corply
tool now has a title.

## Version 0.8.2

Updated the founder workflow instructions for optional managed 83(b) mail, direct self-filing,
private proof review, browser formation, records export, and reviewed imported-company role actions.
Installed clients need their normal plugin update or reinstall to receive this snapshot.

## Distribution

- General plugin: `skills/corply/`, the Claude, Codex and Cursor manifests, and `.mcp.json`.
- OpenAI directory package: `submission/openai/`, bound to `/mcp/openai`, with its own manifest,
  MCP configuration, skill and review cases.
- Claude directory packet: [submission/anthropic/README.md](submission/anthropic/README.md).
- Registry metadata: `server.json`, versioned independently of the plugin.
- No company data, credentials, backend code or private workflow catalog belongs here.

The server owns schemas and business state. Plugin instructions are snapshots: installed copies
update through each client's plugin update mechanism. A GitHub push does not publish an OpenAI
listing, and the Claude directory publishes only versions that pass its checks.

## Validation and packaging

```bash
CORPLY_SKIP_LIVE_MCP=1 node scripts/check-mcp-sync.mjs
node scripts/check-mcp-sync.mjs
node scripts/check-mcp-sync.mjs --submission=openai
node scripts/check-mcp-sync.mjs --submission=anthropic
node --test scripts/package-openai-plugin.test.mjs
node scripts/package-openai-plugin.mjs
claude plugin validate .
```

Ordinary checks verify manifests, skill links and tool references, and live OAuth and discovery
without business mutations. The submission checks report directory blockers for each target and
fail until they are resolved. The packager builds `corply-openai-directory.zip`, the current
OpenAI portal upload, plus `corply-openai-skill-bundle.zip` and `corply-openai-plugin-full.zip`
for inspection, from explicit inventories, and byte-validates each.

More: [Corply](https://corply.dev) · [Setup](https://corply.dev/setup) ·
[Security](https://corply.dev/security) · [Support](https://corply.dev/support)

## License

Source-available under the [Business Source License 1.1](LICENSE). Production use is not granted.
Each version converts to the Apache License 2.0 four years after that version is first publicly
distributed. The license grants no rights to Corply trademarks or logos. Commercial-license
inquiries: [founders@0lumens.com](mailto:founders@0lumens.com).
