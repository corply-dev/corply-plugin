# Corply Claude directory submission

Source release: 0.9.1, prepared October 2, 2026 from production MCP discovery.
Portal: https://claude.ai/directory/manage (opened to paid-plan developers on September 25, 2026)

- **Plugin source version:** 0.9.2
- **MCP metadata version:** 0.11.1
- **Status:** not submitted. Nothing in this repository records a Claude directory submission.

Anthropic's directory takes two related submissions, and its documentation asks for both when a
plugin points at a server you run:

1. **Plugin bundle:** this repository. The listing is read from `.claude-plugin/plugin.json` and
   `README.md`. Installed from claude.ai, it works in chat, Cowork and Claude Code.
2. **MCP connector:** the remote server the plugin declares. The connector listing carries the
   server's authentication setup and health dashboard and is paired with the plugin.

Requirements come from Anthropic's
[plugin submission guide](https://claude.com/docs/plugins/submit),
[plugin pre-submission checklist](https://claude.com/docs/plugins/pre-submission-checklist),
[connector submission guide](https://claude.com/docs/connectors/building/submission),
[connector review criteria](https://claude.com/docs/connectors/building/review-criteria) and the
[Software Directory Policy](https://support.claude.com/en/articles/13145358-anthropic-software-directory-policy).

Run `node scripts/check-mcp-sync.mjs --submission=anthropic` for the live blocker report.

## Server status

Resolved in Corply `5ecf420f`, deployed through the GitHub-triggered pipeline on October 2, 2026
(build `1eed83ed`) and verified live:

1. **Tool titles.** Every tool on every endpoint has a `title`, and all declare boolean
   `readOnlyHint` and `destructiveHint`. Live: 124 of 124 on `/mcp/claude`.
2. **Money movement on the declared endpoint.** `.mcp.json` now declares
   `https://corply.dev/mcp/claude`, the `claude-directory` profile. It keeps the full `/mcp`
   experience, including signing, Corply's own checkout links and filing handoff, and exposes no
   revenue, payment-route, payout, payment-portal, banking, card or Corply Pay tool. Live: 124
   tools, none of them money-movement tools. Its OAuth challenge points at
   `/.well-known/oauth-protected-resource/mcp/claude`.

Remaining review risks, not automated blockers:

3. **Behavioral text in tool descriptions.** Review rejects descriptions that tell Claude how to
   behave beyond the tool, call tools the user did not request, or override instructions.
   Descriptions still append shared canonicality, idempotency and confirmation-boundary
   directives, and some ask for unrequested calls, for example `get_cap_table` ("call it
   proactively... without waiting for the founder to ask"). Rewrite each description to state
   what the tool does and when to use it.
4. **Size.** The `/mcp/claude` `tools/list` response is about 322 KB, and descriptions average
   about 1,090 characters (maximum 5,023). The policy asks for frugal token use proportional to
   the task.
5. **Server-authored instructions in results.** `context_engineering.prompt` and `nextStep`
   steer the model from tool results. The plugin skill treats them as workflow guidance that
   never overrides the founder, the host or consent rules. Expect reviewers to read them against
   the rule against pulling behavioral instructions from external sources.

## Plugin bundle readiness

| Check | State |
| --- | --- |
| `.claude-plugin/plugin.json` at the repository root; `claude plugin validate .` | Passes on Claude Code 2.1.282 |
| Name `corply`, display name and author `Corply`; no reserved words | Pass |
| `description`, `author`, `version` set; version raised each release | Pass (0.9.1) |
| README of 40+ words; `LICENSE` file and `license` field | Pass (BUSL-1.1) |
| Directory listing fields `icon`, `documentationUrl`, `supportUrl`, `privacyPolicyUrl`, `termsOfServiceUrl` | Set |
| No system files, symlinks, submodules or LFS; non-image files under 256 KiB; 512 files or fewer | Pass, checked by `check-mcp-sync.mjs` |
| `.mcp.json`: one `http` server, `https://corply.dev/mcp/claude`; no credentials in headers | Pass |
| No hooks, commands, `bin/`, launchers, lockfiles or package-manager config | Pass |
| README discloses every destination the plugin sends data to | Pass ("What this plugin connects to") |
| Skills link only to corply.dev and do not tell Claude to fetch remote instructions | Pass, checked by `check-mcp-sync.mjs` |

The plugin folder is the repository root, so the scan also reads `scripts/` and `submission/`.
Both are plain text that installs never execute. `submission/openai/` is the separate OpenAI
directory package, with its own manifest and an `.mcp.json` for `https://corply.dev/mcp/openai`;
Claude Code loads neither, because only the root `.mcp.json` and `skills/` are plugin components.
The README's "What this plugin connects to" section says so for reviewers.

### Source step

- **Repository:** `corply-dev/corply-plugin`
- **Plugin path:** leave empty (repository root)
- **Branch or tag:** `main`, or a release tag if the directory should not follow every push

### Data handling answers (draft for the publisher to confirm)

- **Reads or stores personal data:** yes, through the declared Corply connector: founder names,
  emails, addresses, date of birth where a formation requires it, ownership and documents the
  founder supplies. The plugin itself stores nothing locally.
- **Sends data to services other than its declared connectors:** no.
- **Retention:** as described in the [Corply privacy policy](https://corply.dev/privacy).
- **Intended for people under 18:** no.

### Compliance step

Contact email: founders@corply.dev. The publisher selects the four acknowledgements personally.

## MCP connector fields (draft)

- **Connection:** `https://corply.dev/mcp/claude`, the Claude directory profile. One URL for all users.
- **Server name:** Corply
- **One-liner (200 max):** Form Delaware C-Corps, import existing companies, and manage
  equity, governance and compliance through conversation.
- **Description (2,000 max):** Corply connects Claude to your company's saved state. Form a
  Delaware C-Corp: save the application, check proposed names,
  generate formation documents, review and sign them, pay Corply's fee on Corply's own checkout
  page, and hand the packet to Corply's human-reviewed filing pipeline. Import a company formed
  elsewhere from its documents, review the cap table, and keep governance, EIN, 83(b), Delaware
  annual report and other obligations on track. Each founder signs only for themselves, and
  Corply never files directly with a state without human review. Corply is software, not a law
  firm, and does not provide legal, tax or accounting advice.
- **Categories:** choose one to five from the portal list that fit business operations and
  legal work.
- **Documentation:** https://corply.dev/setup
- **Privacy policy:** https://corply.dev/privacy
- **Support:** https://corply.dev/support
- **Icon:** the Corply logo set as `icon` in `.claude-plugin/plugin.json` (512 x 512 PNG)
- **Slug:** `corply` (permanent once published)
- **Use cases:** company formation, existing-company import, cap-table review, governance and
  compliance tracking. Prerequisite: a Corply account, created during the first OAuth sign-in.
  Reads and writes data.
- **Company:** 0Lumen Labs Corp. d/b/a Corply, https://corply.dev
- **Authentication:** OAuth with dynamic client registration. Production metadata at
  `/.well-known/oauth-authorization-server` advertises a registration endpoint, S256 PKCE and
  public clients, and registration accepts any HTTPS redirect URI, so Claude's callback can
  register itself. Each protected tool returns a `WWW-Authenticate` challenge with
  `resource_metadata`.
- **Data handling:** first-party API; no personal health data; no sponsored content.
- **Test and launch:** provision a dedicated Claude reviewer account populated with an
  in-progress Delaware formation, an imported company and a cap table.
  Credentials go only in the portal. Confirm every tool was run through MCP Inspector or as a
  custom connector in Claude.
- **Compliance:** the publisher selects all seven acknowledgements personally, including
  financial transactions and prompt injection. Blockers 2 and 3 bear directly on those two.

### MCP Apps listing

On `/mcp`, sessions that advertise MCP Apps receive Corply's welcome card, cap-table chart and
address picker. A listing as an MCP App needs 3 to 5 PNG carousel screenshots at least 1000 px
wide, cropped to the app response without the prompt, each with its prompt text. Video and GIF
are not accepted. If the server opens links with `ui/open-link`, declare `https://corply.dev`
as an allowed link URI.

## After approval

Choose the GitHub push webhook so new commits on the tracked branch are scanned, and raise
`version` in every manifest with each release. A passing version goes live according to the
plugin's publish setting; the listing keeps serving the last published version until then.
