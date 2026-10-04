# Equity, roles and governance

Use the live `standardConfiguration`, validation issues and returned next step. Explain returned
defaults with a short business reason. Preserve confirmed founder choices; never substitute
generic capitalization numbers or infer a stock-plan reserve from unissued shares.

## Founder equity at formation

Distinguish authorized shares, founder-issued shares and authorized but unissued shares.
Use `kind: missing` to collect absent inputs and `kind: invalid` to correct saved values.
A saved invalid allocation is not a persistence failure.

Show the exact founder allocation and obtain each founder's confirmation. One founder may
propose a split but cannot agree on another founder's behalf. Keep incorporator, director,
corporate officer and ordinary job titles distinct.

Recommend the vesting, purchase, director, incorporator and officer choices returned for this
company. The live schema supports a per-founder `equityTreatment=fully_vested`: offer it
alongside the recommended vesting treatment, never infer it from zero months, and follow its
returned stock purchase agreement path with no 83(b) election. Teams may mix treatments.

## Cap table

- `get_cap_table` returns the ownership ledger. Before incorporation it is a projected table
  from saved founder equity. In hosts that support MCP Apps it also renders Corply's ownership
  chart and vesting timeline; offer it when reviewing saved founder equity or before final
  application approval. Rendering a chart is not confirmation, stock issuance or consent.
  Text-only hosts get the same ownership data.
- `get_company_stock_ledger` returns the append-only stock ledger, including opening
  balances, issuances, repurchases and treasury shares.
- `import_cap_table` imports a Carta or Pulley CSV export. Call it with `confirm: false` first
  and show the preview. Confirming **replaces the entire existing cap table**, so obtain an
  explicit confirmation of that consequence before calling it with `confirm: true`. Only an
  owner or founder can import.

Vesting shown in the timeline is a schedule, not proof of continued service or legal vesting.

## After formation: directors, officers and stock

These actions exist for Corply-formed Delaware C-Corps and, where the server reports
governance eligibility, reviewed imported companies. Call `list_governed_action_options` first;
it returns directors, officers, allocations, eligibility and any evidence gaps for imports.
An eligible imported Delaware C-Corp needs reviewed governance records and a complete
common-stock voting roster before director and officer actions. That does not make imported
share issuance, stock plans, options or charter changes available, and an uploaded document is
not a completed evidence review.

- **Departures and replacements:** `propose_governed_departure` and
  `propose_governed_replacement`, or `create_departure_package` for a departure with a staged
  replacement and eligible cliff buyback. Nothing changes until the required board,
  stockholder or subject documents are signed.
- **New people:** `create_onboarding_package` for an appointment with restricted stock and/or
  an IP agreement; `propose_restricted_stock_issuance` and `propose_ip_assignment` individually.
  `continue_linked_package` retries staged child actions after the primary change completes.
- **Founder cliff buyback:** `propose_cliff_repurchase` only after a completed departure and an
  executed Corply RSPA. `send_repurchase_exercise_notice` only after board consent and the
  manager's explicit send confirmation.
- **Signing:** `request_governed_signatures` emails each voter or contract party their own
  link after a manager confirms the live roster and asks to send. A connected recipient reads
  their document with `get_my_governed_document` and signs or declines with
  `sign_my_governed_document` only after fresh consent in their own words.
- **Records of past changes:** `record_company_director_appointment` and
  `record_company_director_resignation` record already-effective changes from company records;
  they do not legally appoint or remove anyone. `list_company_directors` shows the roster.
- **Written consents:** `request_corporate_action_consents`, `get_corporate_action_consents`
  and `remind_corporate_action_consents` manage approvals for a case. Never open or sign
  another person's emailed link.

Use `list_governed_actions` and `get_governed_action` to report status. Each child action keeps
its own consent, filing and payment gates. Charter amendments are covered in
[filings-and-compliance.md](filings-and-compliance.md).

SAFE issuance, stock-plan adoption and option grants are not available as governed actions.
Say so rather than editing a ledger to approximate them.

## Boundaries

Do not guarantee legal or tax outcomes. Identify where the actual facts need a qualified
professional and continue the independent steps. Follow
[action-protocol.md](action-protocol.md) for documents, signatures, invitations and record
changes.
