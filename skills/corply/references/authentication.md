# Authentication

Corply needs only its hosted MCP connection. Reuse the installed connection and its configured
name. A separate plugin or skill is not required. The current setup and recovery guide is
[corply.dev/skills.md](https://corply.dev/skills.md); use it for version-specific setup details.

Use the client's native OAuth flow. The client owns PKCE, callbacks, token storage, and refresh.
The founder chooses the intended account and accepts current terms personally in the browser.

- ChatGPT on the web: use ChatGPT's native **Connect** or **Reconnect** flow for the enabled
  Corply plugin. An authentication-required tool result lets ChatGPT offer account linking.
  The founder signs in on Corply's authorization page, then returns to this conversation.
  Never ask a ChatGPT user to install a CLI, run a terminal command, or paste credentials.
  If Corply is not enabled, direct them to the host's plugin connection control; a pasted
  website or setup prompt alone does not install an MCP connection.
- Claude Code: open `/mcp`, select the existing Corply connection, and choose **Authenticate**.
  This is an in-session control, not a shell command. Do not invent a CLI login command.
- Direct Codex MCP: run `codex mcp login corply` using the actual configured server name.
- OpenCode 1.x: run `opencode mcp auth corply` using the actual configured server name.
- Marketplace connections: use the host's **Connect** or **Reconnect** control for Corply.

After setup, reconnect, or account switching, call protected `whoami` through this same MCP
connection. Verify its email and organization before resuming the founder's original goal.
A configured server or browser/CLI success message does not prove usable authentication.
Preserve the endpoint already attached to this connection. Never replace `/mcp/openai` with
`/mcp` to recover authentication or obtain a tool the directory connection does not expose.

For missing, invalid, expired, or revoked credentials, allow native refresh and make one native
sign-in attempt if needed. For `TERMS_ACCEPTANCE_REQUIRED`, reconnect so the founder can review
and accept the current terms in the browser. `ACCOUNT_DENIED` requires Corply support;
`MEMBERSHIP_INACTIVE` requires an authorized workspace. Do not loop through sign-in for those
access failures. `AUTH_SERVICE_UNAVAILABLE`, network failures, and 5xx errors call for a later
retry without clearing credentials. If the founder cancels, stop until they resume.

If tools remain stale after sign-in, reload/reconnect once or start a fresh task carrying the
original goal, then retry `whoami`. If it still fails, report the client version, sanitized
error code, and setup link. Do not repeat authorization indefinitely.

Never improvise PKCE or OAuth exchanges, guess API-key pages, add token headers as a workaround,
read or write credential files, or request tokens, codes, or callback URLs in chat. Do not create
a company or perform business mutations to test authentication.
