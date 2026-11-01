# Corply OpenAI directory submission — 0.8.6

**Submitted October 14, 2026. Portal status: Version 1.0.0 · In review; MCP Configured.** The uploaded package is 0.8.6. The portal assigns a separate submitted-release version.

The operator permanently deleted the old rejected app `asdk_app_6a5b273b257081918f0563555e9d576a`, freeing its MCP URL. The replacement app then saved the same `https://corply.dev/mcp/openai` endpoint, completed fresh OAuth using the original reviewer account, and discovered all 59 tools. No authentication code or credential changes were needed. Private reviewer credentials and sign-in instructions were saved through the secured portal form. All six attestations were accepted with explicit operator authorization.

Submission: `plugin_asdk_app_6abf57dd3cd481918e6501b8ba98cf6c`. The completed scan has one get_status finding: “This tool update needs further review before it can go live.” Submission succeeded; approval/publication remains pending.

The original document-and-lightning Corply logo replaces the placeholder C and was visually verified after refreshing Safari. Build packages with `node scripts/package-openai-plugin.mjs`; the three archives pass byte verification, and six package/readiness tests pass.

The review video is https://corply.dev/openai-plugin-review-20261014.mp4 (3:51), supplied and approved by the operator, joined and trimmed before the unsuccessful Mercury section. It is actual ChatGPT Work footage. Native cases passed in the existing private 0.8.3 installation; portal OAuth and discovery were separately verified today. See `review-evidence.json` for precise evidence and limitations.

Production remains commit `4cc3a5a547340e3307f088009ea25249ab94fe79`, successful GitHub-triggered build `0846c198-4ec8-47a5-8ecb-ddab542a8c53`, revision `corply-site-01260-tot`. The logo-only package update requires no production release.

## General plugin release and prepared review candidate

General plugin 0.9.14 and its unsubmitted Anthropic candidate describe private Google mail and retirement of the bespoke inbox. The OpenAI 0.8.6 reviewed package and its 59-tool inventory remain a historical submitted snapshot. The live OpenAI profile intentionally has 63 tools, including four additions beyond that snapshot: `get_company_ein`, `disconnect_google_documents`, `get_gmail_connection` and `manage_gmail`. Personal Google mail is supported on both current profiles; the frozen review package has not been resubmitted to cover the additions. The packaging script rebuilds and byte-verifies the separate directory, skill and full-plugin archives. A local build or GitHub push is not a portal submission or directory approval.

## General plugin 0.9.14 release evidence

Published general plugin commit: `70f154e07059bf8970bda2bce1fb8630662724cd` on `main`, after core release `042404d9` completed its configured production pipeline. Scoped read-only live checks observed HTTP 200 and 241 universal tools: `get_gmail_connection`, `manage_gmail`, `get_company_google_workspace` and `manage_company_google_workspace` were present with titles, OAuth and required annotations; all 13 retired inbox tools were absent. An unauthenticated `get_gmail_connection` call returned HTTP 401. The plugin and prepared Anthropic candidate retain the universal endpoint. Frozen OpenAI sources and inventory were unchanged. Local sync checks, byte-verified archive generation and six package/readiness tests passed.

The broader legacy live checker did not pass: it reported 447 failures across stale receipt-schema shape expectations, unrelated general-tool documentation coverage, and differences between current directory metadata/runtime and the historical 59-tool submission (the live profile has 63). These failures are recorded rather than presented as an all-green release check. No new OpenAI or Anthropic portal submission, legal attestation or directory approval occurred; installed-host updating and external directory review remain separate steps.

## Historical submitted scope

The candidate supports Delaware C-Corp preparation, company names, saved applications, documents, revision review, imports, cap-table records, operating evidence and consented Mercury **sandbox** prefills, status and provider-confirmed recovery. The deployed service was inspected as `corply-site-01257-vah`: Mercury provider mode and the explicit MCP gate are enabled, and the environment is sandbox. A sandbox handoff cannot open a real bank account. Real-bank activation is a separate release decision.

Signing execution, state filing, service purchases, subscriptions, real account opening, money movement and investment execution remain unavailable. Government identifiers, raw identity documents and credentials are not collected in chat. The server owns workflow state, eligibility, exact consent requirements and retry/recovery rules. The bank recovery tool replaces attempt status and therefore declares destructive effects in this candidate's OpenAI profile.


## History

Review cases 16263922 and 16268005 document the prior rejection and URL conflict. Historical evidence remains under `review-history/`. The failed preflight returned connection null and unknown before the old app was removed. After removal, the same endpoint and credentials worked.

- **MCP metadata version:** 0.11.1
