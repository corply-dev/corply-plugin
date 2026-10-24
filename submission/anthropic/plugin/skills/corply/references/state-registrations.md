# Other states

Corply forms companies only in Delaware. A Delaware corporation that does business in another
state registers there as a foreign corporation, and Corply files that registration, the state's
recurring reports and, later, a withdrawal. Corply Ops files each one by hand after the founder
certifies and pays; a saved request is not a filing and a filing is not state acceptance.

Corply never decides whether a company must register in a state. If the founder asks, say that
depends on where its people, offices and property are and needs a qualified professional's
confirmation, then help with the registration they choose.

## Registering in another state

`show_state_registration` opens Corply's view for it: the state's fee, filing channel and
attachments, and its form pre-filled from Corply's records, where the founder confirms every
fact and saves it for the quote. Without a state it lets the founder choose one. Its own
`state_filing_action` runs inside the view; agents never call it. When the founder answers in
chat instead, save what they said with `save_state_registration_answers` and show the view
again so the form carries it; never re-ask what the form or chat already has. If the view says
it could not reach Corply, save the facts it sent with `prepare_state_registration`. When the
view does not appear, follow the steps below in chat.

1. `get_state_registration` with the state reads what that state needs: its fee, filing
   channel, attachments, the facts its form asks for, the facts Corply can already fill in and,
   when the state's fee is flat and confirmed, Corply's quote. Without a state it lists every
   request the company has opened. Fees marked third-party or unverified are not final until
   Corply quotes them.
2. Ask the founder to confirm every pre-filled fact and to supply the missing ones. Never
   invent an address, officer or date.
3. Ask who the registered agent will be. Corply's agent, through Stable, costs $10 a month:
   the first month is charged with the registration, then monthly until the company withdraws
   from the state. A company that already has an agent there gives its name and address in
   the state instead; Corply admin checks that agent before quoting, and there is no agent fee.
4. `prepare_state_registration` saves the confirmed facts, with the agent choice in
   `registeredAgent`. A flat-fee state with Corply's agent is quoted at once; otherwise the
   request goes to Corply Ops for a quote. Saving again before payment replaces the facts.
5. Give the founder the returned `reviewUrl`. An officer or director certifies and pays there,
   signed in; never ask for card details in chat.

After payment Corply Ops files the registration, and the state's reports appear on the filing
calendar. Withdrawing from the state stops Corply's agent and its monthly charge.

## State reports

- `show_state_reports` opens the same view for the reports owed now: the founder chooses the
  reports, confirms the facts once for the batch and saves them for the quote.
- `get_state_reports` reads the annual or biennial reports the company can file now in its
  registered states beyond Delaware (overdue, due soon or within 90 days), the facts Corply can
  fill in, the quote when every fee is confirmed, and the open batch.
- `prepare_state_reports` saves the founder's confirmed facts (principal office, contact email,
  officers and directors with addresses) for the chosen reports by their period keys. Every
  earlier owed report in the same state must be included. Certification and one payment happen
  on `reviewUrl`; Corply Ops then files each report.

Delaware's own annual report is separate: see [filings-and-compliance.md](filings-and-compliance.md).

## Filing calendar and standing

`get_filing_calendar` lists Delaware's annual report and franchise tax for every year since
formation, then each report owed in every other registered state for the next twelve months,
with status, due date and fee when known. An entry with no due date is a state whose rule
Corply Ops has not confirmed yet: say the date is being confirmed rather than guessing one.

Its `standing` lists each registered state beyond Delaware with an expected value from
Corply's records and the state's own confirmed reading. Only a fresh confirmed active or good
standing reading means the state considers the company in good standing; never claim that from
the schedule or the expected value.

## Withdrawing from a state

`request_state_withdrawal` asks Corply to end the company's registration in a state beyond
Delaware. Confirm the last day of business there and an address for the state's later notices
with the founder; never invent them. Corply Ops checks what the state requires first (often
every report filed, sometimes a tax clearance) and quotes the state's fee plus Corply's.
Certification and payment happen on `reviewUrl`. Once the state accepts, the registration
ends, its reports leave the calendar and the registered agent there stops.
