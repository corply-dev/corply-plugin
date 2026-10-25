# Importing an existing company

Use this when the founder's company was already formed outside Corply. An import brings an
existing Delaware C-Corp into Corply; it is not a new state formation. Preserve
work done elsewhere instead of making the founder repeat it.

## Start from documents when the founder has them

1. `create_import_intake` (or `import_company` with only a `requestId`) opens a document dump.
   No company details are needed first. Where the host shows Corply's views, the founder drops
   their PDFs, a zip or a folder into Corply's import card; otherwise give them the returned
   `uploadUrl`, their signed-in Corply import page. They see every file stored, remove any, and
   submit. Never upload, extract or transmit the founder's documents yourself, even when the
   files are on this machine and the host allows shell commands.
2. Nothing is read before the founder submits. The card reads each file and fills in the company
   as the documents describe it; without the card, `read_import_intake` reads the submitted
   files, called again until reading finishes.
3. `add_import_intake_url` adds a public HTTPS PDF link the founder pastes in chat. When
   everything is read, call `show_import_intake_review` where the host shows Corply's views,
   otherwise `get_import_intake_review`.
4. What the documents leave open (values they disagree on, a missing document, a check) comes
   back as numbered questions. Ask them through the host question tool with their exact wording
   and options, and save each answer as the result instructs; the card fills in as answers are
   saved. The founder can also answer in the card or simply tell you in chat.
5. When nothing is left, ask whether to confirm and import. Call `confirm_import_intake` only
   after the founder explicitly confirms, with the returned review hash.

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
- `list_governed_action_options` reports which governance actions the reviewed import supports
  and any evidence gaps.
- `resolve_company_plan` returns the company's current obligations; see
  [filings-and-compliance.md](filings-and-compliance.md).
- `adopt_existing_company` is a legacy path that records the company's name, jurisdiction, type,
  date and file number as founder assertions. Prefer the import tools above when exposed.

Optional follow-up questions, one at a time and never blocking the import: whether the company
has a logo and whether it already uses an email domain. See
[company-workspace.md](company-workspace.md).

Founder statements and uploaded files are claims until Corply's review promotes them. Read
[evidence-and-existing-work.md](evidence-and-existing-work.md) before recording completed work.
