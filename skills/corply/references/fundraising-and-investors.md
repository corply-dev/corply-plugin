# Fundraising and investors

Corply runs SAFE rounds on Y Combinator's post-money SAFE, common stock sales under a Common
Stock Purchase Agreement, and a private investor pipeline with a read-only data room. Corply
does not decide whether an investor is accredited, whether an offering is exempt or whether a
state notice is owed; say where a qualified professional must confirm and continue the rest.

## SAFE rounds

1. `list_fundraising_rounds` reads every round with its SAFE register, SAFEs awaiting
   signatures or payment, what remains to raise, the Form D due date and the answers Corply can
   fill in, state notices by investor state and the officers who can sign.
2. `propose_fundraising_round` proposes one round: the form (a valuation cap or MFN), cap,
   most it raises, smallest SAFE, end date, pro rata rule, governing law and the officers who
   sign. Then send its board consent with `request_governed_signatures` (step `board_consent`);
   the round opens when every director signs. One round may be proposed or open at a time.
3. `issue_safe` issues a SAFE inside the open round to an accredited investor. Corply emails
   both signers at once, so confirm the investor, amount and signing officer first. The
   investor confirms an accredited category before signing, then pays by ACH on the company's
   Corply Pay page; the SAFE enters the register when the payment clears. A SAFE for a director
   or officer still needs its own board consent.
4. `update_fundraising_round` closes a round (`close_round`) or records what the founder filed:
   the SEC filer number (`record_cik`), each Form D (`record_form_d`), state notices
   (`record_state_notice`) and reports owed under a signed Common Stock Purchase Agreement
   (`record_cspa_report`). The founder files Form D on EDGAR themselves; recording it is not
   filing it.

`import_fundraising_round` records a SAFE round raised before Corply as a closed round with its
SAFEs, exactly as the founder's records show them.

## Common stock sales

`get_common_stock_sale_options` reads what the agreement would state now: the founders who
would sign, available shares, par value, officers, default terms and anything blocking a sale.
`propose_common_stock_sale` proposes selling common stock to a company buyer such as an
accelerator, by share count or target percentage. Board approval comes first; then the
officer, the buyer's signer and every founder holding shares sign one agreement, and the shares
issue only after verified payment.

After the last signature Corply sends the purchase price request itself. If that failed,
`send_purchase_payment_request` sends it again; see [corply-pay.md](corply-pay.md).

## Investor pipeline

The pipeline is the founders' private working notes. Never repeat one investor's notes, stage
or terms to another investor, and never put them in the data room. Record only what the founder
told you or a source you can cite; never estimate a fund size, check size or portfolio from
memory. Amounts are whole US cents.

- `list_investors` reads the pipeline with stages, next steps and due dates, plus the open
  round's totals. Answer "who should I follow up with" from overdue and due-today steps first.
  `get_investor` reads one investor's full history.
- `add_investor` adds one (only the name is required; one card per email, so read the list
  first). `update_investor` changes fields. `move_investor` sets the stage; it sends nothing
  and issues no SAFE. `log_investor_activity` records something that already happened, with an
  optional next step.
- `import_investors` adds many from a CSV the founder supplied: run it with `dryRun: true`,
  report how many would be added and skipped, and import only after they confirm. Never build a
  CSV from your own knowledge.
- `set_investor_photo` uses a public image link the founder gave or one on the investor's or
  firm's own site, never LinkedIn and never a guess at who a picture shows.

## Data room

`invite_investor_to_data_room` emails an investor read-only access to the company's final
formation, governance, IP and cap table records for 30 or 90 days or until a founder ends it.
Investors never see individual stock agreements, 83(b) elections or the SS-4. It sends an
email, so confirm the investor and the access length first. Only the owner or a founder may
share it.
