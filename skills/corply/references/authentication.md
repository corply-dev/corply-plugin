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
- Claude Code agents: read the complete short [Claude setup guide](https://corply.dev/setup/claude-code.md)
  and use its helper. Keep the returned sessionId; the helper owns native login and same-chat
  recovery. A person setting up interactively may use `/mcp` and **Authenticate** instead.
- Direct Codex MCP: run `codex mcp login corply` using the actual configured server name.
- OpenCode 1.x: run `opencode mcp auth corply` using the actual configured server name.
- Marketplace connections: use the host's **Connect** or **Reconnect** control for Corply.

After setup, reconnect, or account switching, call protected `whoami` through this same MCP
connection, or reuse the helper's verified `whoami` result. Report the connected email once;
pause only for a mismatch with an email/company the founder explicitly requested, never the
coding host's account email. Resume the original goal without an extra account-confirmation question.
A configured server or browser/CLI success message does not prove usable authentication.
Preserve the endpoint already attached to this connection. Never replace `/mcp/openai` with
`/mcp` to recover authentication or obtain a tool the directory connection does not expose.

For missing, invalid, expired, or revoked credentials, allow native refresh and make one native
sign-in attempt if needed. For `TERMS_ACCEPTANCE_REQUIRED`, reconnect so the founder can review
and accept the current terms in the browser. `ACCOUNT_DENIED` requires Corply support;
`MEMBERSHIP_INACTIVE` requires an authorized workspace. Do not loop through sign-in for those
access failures. `AUTH_SERVICE_UNAVAILABLE`, network failures, and 5xx errors call for a later
retry without clearing credentials. If the founder cancels, stop until they resume.

Start OAuth once. While it is pending, wait on the same process/session; a timeout is not a
failure or permission to open another page. Never run diagnostic logins or kill a waiting login.
Cancellation, expiry, or failure needs an explicit user retry request.

Missing tools after successful sign-in do not mean failed authentication. In Claude Code use
the guide's session relay; in Codex use its native setup helper's relay. Do not restart login
or require a new conversation. Preserve the current context receipt. For other hosts use their
supported tool refresh, and report a sanitized blocker when no recovery is available.

Never improvise PKCE or OAuth exchanges, guess API-key pages, add token headers as a workaround,
read or write credential files, or request tokens, codes, or callback URLs in chat. Do not create
a company or perform business mutations to test authentication.
