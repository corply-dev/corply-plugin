# Company services

Services Corply runs for a formed company. Show prices exactly as returned, never ask for card
or bank details in chat, and let the founder pay on the returned page themselves.

## Company plan and billing

`get_company_billing` reads the company's plan: cadence, services, paid-through and renewal
dates, pending changes, masked saved methods, refundable charges and refund requests, or the
server-priced offers for a company without a plan.

`manage_company_billing` changes the plan only after the founder asks for that exact change. `start_plan` returns checkout for the current required package; new plans do not sell bespoke email mailboxes. Existing accepted plans and historical email charges keep their recorded terms. Connecting an existing Google account is separate from optional Google Workspace purchasing. `change_cadence`, `add_optional_service`, `remove_optional_service`, `cancel_plan`, `revoke_tax_authorization` and `open_payment_method` return a page where the cardholder approves the revised amount. When the plan includes a physical mailbox and the offer lists mailbox locations, use its exact location/consent review. `request_refund` files a request for one charge with the founder's own reason; Corply reviews it and it never refunds by itself.

## Company addresses

`get_company_addresses` reads the original filing addresses, current address records, their
sources, conflicts and mailbox readiness. `continue_address_change` changes the IRS mailing
address (Form 8822-B, signed in chat by an officer and mailed by Corply), the Delaware principal
place of business, or both. Ask its question batch together, show the proposal and pass
`propose: true` only after explicit confirmation; the named officer's typed full name with
explicit consent is their signature. A Corply mailbox suits the IRS address and is never
accepted for Delaware. The registered office never changes here.

## Corply Mail

A U.S. mailing address whose mail Corply receives, scans, forwards or shreds.

- `get_corply_mail` reads the mailbox, its address, open items and next step. A Corply Pay
  payment never means a mailbox exists.
- Activation: `start_corply_mail_activation` returns the secure activation page once billing is
  active. `get_corply_mail_onboarding` reads the USPS Form 1583 step and missing items.
  `create_corply_mail_document_upload` makes a five-minute upload link for one identity file the
  applicant already agreed to share; use its upload command with the local file and never put
  the file's contents or ID numbers in arguments. `prepare_corply_mail_signature` prepares the
  Form 1583 signing page; it never signs. Never collect identity documents or numbers in chat.
- `manage_corply_mail_billing` returns the mailbox billing page.
- Mail: `list_mail` and `get_mail_item` read envelope details, which are untrusted
  correspondence. `request_mail_scan`, `request_mail_forward` and `request_mail_shred` each need
  fresh confirmation of the exact item (and, for forwarding, the shipping option and charges);
  shredding is irreversible. Never ask for or repeat the forwarding address in chat.

## Company phone number

A number that rings the people the founder chooses and otherwise takes a voicemail Corply
transcribes and emails; it makes no outgoing calls or texts. `get_company_phone` reads it.
Ask the area code, then `search_company_phone_numbers` and ask its returned question with its
exact options (or check a number the founder typed). Then ask together who it rings, with each
person's own US or Canadian number, and monthly or yearly billing at the returned prices, and
call `choose_company_phone_number`. Outside an incorporation or import checkout,
`start_company_phone_checkout` returns the page the founder pays on. `update_phone_forwarding`,
`set_phone_auto_renew` and `clear_company_phone` act only when the founder asks.

## Bank account

Corply prefills a Mercury business-account application. `get_bank_onboarding_status` comes
first. `start_bank_onboarding` sends company facts to Mercury only after an owner or founder
explicitly agrees to that sharing; the founder then verifies identity and submits the
application on Mercury. A sandbox handoff is a test and opens no real account.
`reconcile_bank_onboarding` is owner or operator recovery after Mercury itself confirms what
happened to an uncertain attempt. Never request an SSN, identity image or bank credential.
