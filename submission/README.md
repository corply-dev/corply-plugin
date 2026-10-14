# Corply OpenAI directory resubmission — 0.8.5

**Status: version 0.8.5 saved in the replacement portal draft; not submitted.** Fresh native OAuth and the recorded founder setup journey succeeded on October 14. The founder supplied and approved two recordings; their joined 231-second edit removes idle time and ends before the unsuccessful Mercury section. Production publication of the new video and the scoped sandbox guidance correction succeeded through GitHub-triggered build `0846c198-4ec8-47a5-8ecb-ddab542a8c53`, commit `4cc3a5a547340e3307f088009ea25249ab94fe79`.

Build the complete directory ZIP with `node scripts/package-openai-plugin.mjs`. Upload `corply-openai-directory.zip` to the existing Corply submission once OpenAI resolves its configuration; the general plugin ZIP points at `/mcp/claude` and is a separate distribution. The OpenAI MCP URL remains `https://corply.dev/mcp/openai`.

The listing, three starter prompts, five positive cases and three negative cases are in `openai/.codex-plugin/plugin.json`. The exact expected directory metadata is in `openai-tool-inventory.json`. No reviewer password, token or private upload link belongs in the ZIP or this repository.

## October 14 portal blocker and Support

Connect fails while saving the replacement draft, before OAuth login: “MCP details save failed: This MCP URL is already used by another app in your organization. Use a unique MCP URL for each app submission.” The replacement still shows Authentication Unavailable, Configuration incomplete and no tool findings, with its domain verified. The original rejected application shows Configuration unavailable and Endpoint unavailable.

- Original plugin: `plugin_asdk_app_6a5b273b257081918f0563555e9d576a`.
- Replacement plugin: `plugin_asdk_app_6abf57dd3cd481918e6501b8ba98cf6c`.
- Review cases: 16263922 and 16268005.

On October 12 the Review Team instructed us to contact Support in a new conversation with both IDs. On October 14 that new Support escalation was automatically closed as a duplicate and linked back to [case 16268005](https://help.openai.com/?chat=1&thread_id=500VU00001BXZ9uYAH). We sent the exact URL-ownership error there, explained the routing loop, and requested transfer to the Platform/plugin configuration team. Human assignment or a repair has not been confirmed. Preserve review history; changing the endpoint or removing an app requires a separate operator decision.

## Current scope

The candidate supports Delaware C-Corp preparation, company names, saved applications, documents, revision review, imports, cap-table records, operating evidence and consented Mercury **sandbox** prefills, status and provider-confirmed recovery. The deployed service was inspected as `corply-site-01257-vah`: Mercury provider mode and the explicit MCP gate are enabled, and the environment is sandbox. A sandbox handoff cannot open a real bank account. Real-bank activation is a separate release decision.

Signing execution, state filing, service purchases, subscriptions, real account opening, money movement and investment execution remain unavailable. Government identifiers, raw identity documents and credentials are not collected in chat. The server owns workflow state, eligibility, exact consent requirements and retry/recovery rules. The bank recovery tool replaces attempt status and therefore declares destructive effects in this candidate's OpenAI profile.

## Review evidence and remaining work

`review-evidence.json` records fresh OAuth separately from native review cases. The recorded founder conversation saved company details, 60/40 ownership, the test founder identity confirmation, standard vesting, personal 83(b) handling and officer/director roles. It ended with the proposed share structure and pending cofounder approval. A save recovered after an agent retry; the founder deferred investigation. The account, saved-company continuity, cap-table, import and three refusal scenarios were also rerun successfully on October 14. These tests used the existing private Corply Review 0.8.3 installation against the live endpoint; they do not establish that the portal draft 0.8.5 is connected or scanned.

The current video is [the October 14 walkthrough](https://corply.dev/openai-plugin-review-20261014.mp4), verified HTTP 200 with bytes matching the reviewed local edit. It uses actual Safari ChatGPT Work footage with no reconstructed results. Mercury was unavailable in the installed private test plugin and is not demonstrated or claimed as a passed native test. Banking is optional for this application. The prior evidence is preserved in [the October 2 record](review-history/2026-10-02.json) and [previous submission notes](review-history/2026-10-04.md).

The original application's reupload now requires the exact package name `app-6a5b273b257081918f0563555e9d576a`. Retrying with that name fails with “Configure the existing MCP app before updating its plugin ZIP.” The standard package successfully updates the replacement draft to 0.8.5; that does not resolve URL ownership or constitute submission.

Run `node scripts/check-mcp-sync.mjs` for metadata and protocol checks, then `node scripts/check-mcp-sync.mjs --submission=openai` for the additional native-case, demo, portal-authentication, scan and private-credential checks. The submission command must remain blocked until those conditions are actually satisfied. The directory runtime version is checked against its reviewed evidence separately from the MCP registry publication version.

- **MCP metadata version:** 0.11.1
- **Reviewed runtime version:** 0.12.3 (recheck after the scoped server release).
- **Directory package version:** 0.8.5.
- **Authentication:** native OAuth authorization code with PKCE S256 and dynamic client registration.

Reviewer access belongs in the dashboard's private Review details: use the dedicated submitted sample account and `https://corply.dev/login?method=password`, choose Continue with email, complete the native callback and verify with `whoami`. Use a fresh connection after revocation. Fresh native OAuth using the original reviewer credentials succeeded on October 14 without credential or authentication-code changes. The October 2 refresh-token test remains historical. Use ChatGPT Work for write workflows and respect the host's tool availability and approval controls.

## Final October 14 verification

Build `0846c198-4ec8-47a5-8ecb-ddab542a8c53` succeeded and revision `corply-site-01260-tot` serves 100% of production traffic. Both live MCP catalogs pass the contract check (151 general, 59 directory). Production formation discovery passes 25 rendered pages and 3 agent guides. The new video is publicly accessible as `video/mp4` and matches SHA-256 `4613ff6de387fcb54276e70f0343a5cf2967b15a70db45ba73f701f0ea137a43`.

Portal metadata and skill checks pass with no findings. The final form now labels the unresolved MCP scan as **non-blocking**, warning that unresolved findings may lead to rejection. This is not a successful MCP configuration: authentication remains unavailable and private reviewer-credential fields are absent. The final legal terms and compliance attestations remain unaccepted, and the draft is not submitted.
