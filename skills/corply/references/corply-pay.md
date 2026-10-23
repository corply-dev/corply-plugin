# Corply Pay

Corply Pay is Corply's payments product. The company is the merchant: payers pay it on a
secure Corply Pay link, and the money goes to the company's bank. Never ask for, repeat or
accept card or bank numbers in chat. The returned amounts, fees and net are authoritative;
never add a fee or surcharge or calculate one yourself.

## Setup

`set_up_corply_pay` creates or refreshes the company's merchant account and returns its
readiness and fee terms. Run it when the founder wants to get paid or first asks to send an
invoice. Until the company accepts the current Corply Pay Terms it returns only those terms:
show the text exactly and call again with `termsAccepted: true` and its `termsSha256` only after
the founder explicitly accepts for the company. Business, owner, bank and tax details are
entered only on the returned verification page.

## Invoices and requests

- `send_invoice` emails a customer an itemized invoice; taxes are only what the founder states.
- `request_money` asks someone to pay the company one amount, or to reimburse an expense
  (`reason: reimbursement` with a description).

Both preview first: without `previewSha256` nothing is created or sent. Show the exact
recipient, subject, text, amount, fees and net, and confirm with the same arguments, the
`previewSha256` and `sendConfirmed: true` only after the founder approves. Reuse the
`idempotencyKey` on retries. Queued email is not proof of delivery. Card payments confirm at
once; ACH clears in about four business days.

`list_payment_requests` reads invoices and requests with status, fees and net.
`manage_payment_request` reminds, cancels, refunds or relinks one request; each emails the
payer or moves money, so get fresh confirmation of the exact action first.

## Stock and SAFE purchase prices

Corply sends a signed common stock sale's, RSPA's or SAFE's purchase price request by itself
after the last signature. `send_purchase_payment_request` sends or resends it, for example
after the company finishes Corply Pay setup.

## Payments in the founder's own app

`set_up_app_payments` is for a website or app the founder is building that should take
payments; use it instead of a payment provider's own SDK. Run it inside the app's code project.
It runs the same terms and verification as setup, then the app terms, and returns the live
secret key and webhook secret once: write them straight into the app's gitignored server
environment or its host's secret settings, and never print, commit, log or use them in browser
code. Then follow the returned integration steps. Keys are live: test with a small real payment
and refund it with `manage_payment_request`.
