# Importing an existing company

Use this when the founder's company was already formed outside Corply. An import brings an
existing Delaware C-Corp into Corply; it is not a new state formation. Preserve
work done elsewhere instead of making the founder repeat it.

## Start from documents when the founder has them

1. `create_import_intake` (or `import_company` with only a `requestId`) opens a document dump.
   No company details are needed first. Call `show_import_upload` with its `intakeId`: the
   founder drops their PDFs or a zip, sees every file stored, removes any, and submits; Corply
   then reads them in that view. Never upload, extract or transmit the founder's documents
   yourself, even when the files are on this machine and the host allows shell commands. If the
   view does not appear, give the founder `uploadUrl` (their signed-in Corply import page).
2. `wait_for_import_upload` waits until the founder submitted and reading finished; call it
   again while `done` is false. Nothing is read before the founder submits.
3. `add_import_intake_url` adds a public HTTPS PDF link the founder pastes in chat. Only if the
   upload view closed before reading finished, `read_import_intake` continues reading the
   submitted files. When everything is read, call `show_import_intake_review` (or
   `get_import_intake_review`).
4. Show the review tables, point out anything marked for a closer look and every cross-document
   issue, and let the founder confirm or correct. Call `confirm_import_intake` only after the
   founder chooses to confirm and import, sending only changed values and the returned review
   hash.

## Start from answers when there are no documents yet

`import_company` creates the import from the exact legal name, state and entity type, formation
date, optional EIN and state file number, founder count and a stable `requestId`. Confirm before
creating. Omit `companyId` to create a separate company; pass it only to resume that import.

Then `get_company_import` resumes the checklist and `answer_company_import` saves the founder's
explicit multiple-choice answers about existing documents and missing services. Ask one
question at a time using each item's own question and options. Never assume a document exists
or a step is complete.

- Upload: `create_company_import_upload_link` returns a seven-day upload-only page;
  `upload_company_import_document` imports a public HTTPS PDF under a checklist item.
- Reading: `read_company_import_documents` proposes facts with the quote and page they came
  from; `get_company_import_readings` shows them. Show each proposed value with its quote and
  flag anything unverified or without a text layer. Call `confirm_company_import_reading` only
  after the founder explicitly confirms or corrects the values.

Uploaded documents stay pending until a Corply reviewer accepts them. Confirming a reading does
not accept the document. EIN format and name checks are screening, not verification. If the
result includes a checkout link for a missing service, the founder decides and pays personally.

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
