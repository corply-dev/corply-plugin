# Authentication

Corply needs only its hosted MCP connection, which this plugin declares. Reuse the installed
connection and its configured name; do not add a second Corply connection.

Use the client's native OAuth flow. The client owns PKCE, callbacks, token storage and refresh.
The founder chooses the intended account and accepts current terms personally in the browser.

- **Claude Code:** sign-in needs a real terminal, so never run `claude mcp login` in your own
  shell. On Windows, once the founder agrees, start it yourself in its own console window with
  the PowerShell tool:
  `Start-Process claude -ArgumentList 'mcp','login','<server name>' -WorkingDirectory (Get-Location) -PassThru | Wait-Process -Timeout 280`,
  using the server name `claude mcp list` shows for this plugin, then check that
  `claude mcp get <server name>` shows Connected. The founder only approves Corply in their
  browser. Elsewhere, ask the founder to run `claude mcp login <server name>` in their own
  terminal.
- **Claude apps and Cowork:** use the **Connect** control for Corply in the connector or plugin
  settings, sign in on Corply's page, then return to the conversation.
- **ChatGPT on the web:** use ChatGPT's native **Connect** or **Reconnect** flow for the enabled
  Corply plugin. An authentication-required tool result lets ChatGPT offer account linking.
  The founder signs in on Corply's authorization page, then returns to this conversation.
  Never ask a ChatGPT user to install a CLI, run a terminal command or paste credentials.
  If Corply is not enabled, direct them to the host's plugin connection control; a pasted
  website or setup prompt alone does not install an MCP connection.
- **Codex:** run `codex mcp login corply` with the actual configured server name.
- **OpenCode 1.x:** run `opencode mcp auth corply` with the actual configured server name.
- **Other marketplace hosts:** use the host's **Connect** or **Reconnect** control for Corply.

After sign-in, reconnection or an account switch, call protected `whoami` through this same
connection. Report the connected email once. Pause only when it differs from an email or company
the founder explicitly requested, never because it differs from the coding host's own account
email; then report both. Otherwise resume the original goal without an extra account
confirmation question. A configured server or a browser success page does not prove usable
authentication.

Preserve the endpoint already attached to this connection. Never replace `/mcp/openai` with
`/mcp` to recover authentication or to obtain a tool the directory connection does not expose.

## Waiting for sign-in

Start OAuth once and let it open the browser. While it is pending, wait on the same process or
session; a wait timeout is not a failure and not permission to open another page. Never run
diagnostic logins or stop a waiting login. Do not start authenticated work while it is pending.
Cancellation, expiry or failure needs the founder's explicit request before another attempt.

## Errors

- `AUTH_REQUIRED`, `INVALID_TOKEN`, `TOKEN_EXPIRED`, `TOKEN_REVOKED`: allow native refresh and
  make one native sign-in attempt if needed.
- `TERMS_ACCEPTANCE_REQUIRED`: reconnect so the founder reviews and accepts the current terms in
  the browser.
- `ACCOUNT_DENIED`: the founder needs [Corply support](https://corply.dev/support).
- `MEMBERSHIP_INACTIVE`: select a company the founder still belongs to.
- `AUTH_SERVICE_UNAVAILABLE`, network failures and 5xx errors: retry later without clearing
  credentials.

Missing or stale tools after a successful sign-in do not mean authentication failed, so do not
restart sign-in. Use the host's supported tool refresh: in Claude Code, a running conversation
can't load a server signed in mid-session, so reopen it with Corply's tools loaded (on Windows,
`Start-Process claude -ArgumentList '--resume', $env:CLAUDE_CODE_SESSION_ID -WorkingDirectory (Get-Location)`;
elsewhere the founder runs `claude --continue`) and tell the founder to continue there; in Codex,
use the relay of Corply's native setup helper when it is installed. Preserve
the current context receipt. If nothing restores the tools, report the client version and the
sanitized error code, and share [Corply setup](https://corply.dev/setup) with the founder.

Never improvise PKCE or OAuth exchanges, add token headers as a workaround, read or write
credential files, or request tokens, codes or callback URLs in chat. Do not create a company or
perform business actions to test authentication.
