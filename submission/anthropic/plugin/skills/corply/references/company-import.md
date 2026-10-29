# Importing an existing company

Use this when the founder's company was already formed outside Corply. An import brings an
existing Delaware C-Corp into Corply; it is not a new state formation. Preserve
work done elsewhere instead of making the founder repeat it.

## Start from documents when the founder has them

1. `import_company` with only a fresh `requestId` UUID (or `create_import_intake`) opens a
   document import. No company details are needed first. It returns `presentation.tool`
   `show_import_upload`: call it so the founder drops their PDFs, a zip or a folder into Corply's
   import card. Where the host shows no Corply views, give them the returned `uploadUrl`, their
   signed-in Corply import page. Never upload, extract or transmit the founder's documents
   yourself, even when the files are on this machine and the host allows shell commands. The
   card's own `import_upload_action` runs inside it; agents never call it.
2. The card reads each file as it lands and fills in the company the documents describe, then
   opens the same review the Corply web app shows. Call `wait_for_import_upload` until it reports
   done. Without the card, `read_import_intake` reads the founder's files, called again until
   reading finishes.
3. `add_import_intake_url` adds a public HTTPS PDF link the founder pastes in chat. To show the
   review again call `show_import_intake_review` where the host shows Corply's views, otherwise
   `get_import_intake_review`.
4. What the documents leave open (values they disagree on, a missing document, a check) comes
   back as `questionBatch`. Ask it through the host question tool with its exact wording and
   options, and save each answer with `save_import_answers` as given; the card fills in within
   seconds. The founder can also answer in the card or simply tell you in chat.
5. When nothing is left, ask whether to confirm and import. Call `confirm_import_intake` only
   after the founder explicitly confirms, with a fresh `requestId` and the returned review hash,
   or let the founder press Import in the card.

## When the founder has few or no documents

Still start the document import. The review asks for each checklist document no upload
contained (the founder has it, wants Corply to handle it where offered, or it does not apply)
and for any start detail no document states. Never assume a document exists or a step is
complete. Uploaded documents stay pending until a Corply reviewer accepts them; EIN format and
name checks are screening, not verification. If a result includes a checkout link for a missing
service, the founder decides and pays personally.

## After import

- `import_cap_table` brings in a Carta or Pulley CSV; preview first and confirm the full
  replacement explicitly, as [governance-and-equity.md](governance-and-equity.md) describes.
- `list_governed_action_options` reports the founder’s saved document-completeness confirmation, supported company actions and any specific document restriction with its source. A confirmed import reuses that decision; a separate manual governance review is not required. Follow the current result for any missing confirmation and each action’s own requirements.
- `resolve_company_plan` returns the company's current obligations; see
  [filings-and-compliance.md](filings-and-compliance.md).
- `adopt_existing_company` is a legacy path that records the company's name, jurisdiction, type,
  date and file number as founder assertions. Prefer the import tools above when exposed.

Optional follow-up questions, one at a time and never blocking the import: whether the company
has a logo and whether it already uses an email domain. See
[company-workspace.md](company-workspace.md).

Founder confirmation and operator acceptance remain distinct records. Read [evidence-and-existing-work.md](evidence-and-existing-work.md) before recording work completed outside Corply.
