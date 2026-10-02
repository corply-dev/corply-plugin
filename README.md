# Corply

![Corply](https://corply.dev/brand/weaverbird-avatar-256.png)

**Start here: [Corply agent setup](https://corply.dev/setup.md).** The live guide covers direct MCP installation, native sign-in, account verification, and continuing when tools are missing from the current chat. No marketplace plugin is required.

Incorporate your company through conversation. Corply connects the AI interface you use to your
saved application, formation documents, founder signatures, and human-reviewed filing for Delaware C-Corps and member-managed Florida LLCs.
After formation, manage company documents, equity and compliance through the same connection.

This is the cross-agent plugin wrapper. Company state and execution live on Corply's hosted MCP
server. Corply is software, not a law firm.

## ChatGPT on the web

The intended public experience is: enable Corply in ChatGPT, choose **Connect**, sign in and
authorize on Corply's page, then return to the conversation. ChatGPT handles OAuth credentials;
no CLI or local agent installation is needed.

Directory availability requires OpenAI review and publication. A public repository does not itself
make Corply searchable in ChatGPT. The draft uses `https://corply.dev/mcp/openai`, whose capabilities
are narrower than general MCP. See [submission status and review notes](https://github.com/corply-dev/corply-plugin/blob/main/submission/README.md).

## Claude, Codex, Cursor, and other MCP clients

Reuse an existing installation and its native authentication control; do not duplicate connections.
The general endpoint is:

```text
https://corply.dev/mcp
```

For a Claude marketplace installation:

```bash
claude plugin marketplace add corply-dev/corply-plugin
claude plugin install corply@corply
```

In Claude Code, open `/mcp`, select Corply, and choose **Authenticate**. Other marketplace hosts use
their available **Connect** or **Reconnect** control. Direct MCP setup remains available through
the [current setup guide](https://corply.dev/setup.md). After linking, verify email and organization
through the connected `whoami`.

## Just ask

- "Incorporate my startup."
- "Where is my incorporation blocked?"
- "Help me review my Corply formation documents."

The agent asks for the next relevant fact, saves progress, and follows canonical results. It never
invents signatures, payment, filing acceptance, or deadlines. Each founder acts as themselves.
A new conversation does not mean starting a duplicate application.

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

## Version 0.8.2

Updated the founder workflow instructions for optional managed 83(b) mail, direct self-filing,
private proof review, browser formation, records export, and reviewed imported-company role actions.
Installed clients need their normal plugin update or reinstall to receive this snapshot.

## Distribution

- General plugin: `skills/corply/`, Claude/Codex/Cursor manifests, and `.mcp.json`.
- OpenAI directory skill: `submission/openai/skills/corply/`, bound to `/mcp/openai`.
- Registry metadata: `server.json`, independently versioned from the plugin.
- No company data, credentials, backend code, or private workflow catalog belongs here.

The server owns schemas and business state. Plugin instructions are snapshots; updates require
the client's plugin update/reinstall mechanism. OpenAI uploads require a reviewed snapshot.
A GitHub push does not publish an OpenAI listing or replace its previously imported skills.

## Validation and packaging

```bash
CORPLY_SKIP_LIVE_MCP=1 node scripts/check-mcp-sync.mjs
node scripts/check-mcp-sync.mjs
node --test scripts/package-openai-plugin.test.mjs
node scripts/package-openai-plugin.mjs
node scripts/check-mcp-sync.mjs --submission
```

Ordinary checks verify formation requirements and live OAuth/discovery without business mutations.
Extra server tools are reported, not misrepresented as removed. The submission check separately
reports directory blockers and must pass before final submission.

The packager creates `corply-openai-skill-bundle.zip` for the portal and
`corply-openai-plugin-full.zip` for general cross-agent inspection. It uses explicit inventories
and byte-validates both. The full general plugin is not a substitute for the directory skill.

More: [Corply](https://corply.dev) · [Setup](https://corply.dev/setup.md) ·
[Security](https://corply.dev/security) · [Support](https://corply.dev/support)

## License

Source-available under the [Business Source License 1.1](LICENSE). Production use is not granted.
Each version converts to the Apache License 2.0 four years after that version is first publicly
distributed. The license grants no rights to Corply trademarks or logos. Commercial-license
inquiries: [founders@0lumens.com](mailto:founders@0lumens.com).
