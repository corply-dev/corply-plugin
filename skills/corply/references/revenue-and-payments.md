# Revenue and payments

Use this workflow when a founder wants Corply to accept customer payments, launch a payment portal,
configure products or prices, inspect settlement or payouts, or prepare revenue infrastructure.
Customer payments are separate from Corply's incorporation fee: never use `request_payment` or
`await_payment` for a founder's customers.

Start with `get_company_briefing`, then call `get_payment_pipeline_status`. The hosted backend is
canonical for route, payment, journal, reconciliation, and blocker state. Do not restart from chat
memory or infer that code, a provider dashboard, or a passing test means money moved.

Corply owns the server-priced order, merchant route, authorization-to-payout state, immutable
double-entry journal, recovery, reconciliation, and plugin control plane. The first licensed
transport is Moov; it is an external card/bank rail, not Corply's catalog, ledger, checkout authority,
or source of business truth. Never describe Corply as an independently approved processor, payment
facilitator, merchant of record, bank, or money transmitter unless current evidence says so.

## Corply payment-pipeline sequence

1. **Inspect.** Call `get_payment_pipeline_status` for the exact company. Report whether a sandbox or
   production route is active, recent lifecycle totals, reconciliation state, and returned blockers.
   This read makes zero provider calls and moves no money.
2. **Create the route draft.** If no route exists and the founder wants Corply's pipeline, call
   `create_payment_route_draft` with a stable agent-generated `routeKey`, `currencies: ["USD"]`, and
   a stable idempotency key. This is a reversible local backend save only. It cannot accept or store
   provider credentials, provider IDs, identity documents, bank/card data, terms acceptance, or a
   production setting; it does not create or activate an external account.
3. **Refresh.** Call `get_payment_pipeline_status` again. Trust its blockers. Do not create a second
   route merely because the conversation is new.
4. **Build and verify the host integration.** The coding agent owns repository inspection and uses
   the local `@corply/payments` package. The server must create an integrity-verified catalog and
   checkout order, accept only an opaque hosted payment-method token from the browser, resolve the
   exact server-owned route, and derive amount, currency, tenant, merchant, reserve, and payout
   destination without browser authority. Use durable implementations of payment state and ledger
   contracts; in-memory stores are test fixtures only.
5. **Exercise sandbox transport.** After the founder authenticates the company's provider account
   and gives fresh confirmation for provider onboarding, connect the Moov sandbox account, merchant
   wallet, hosted payment method, and exact payout destination through the secret manager and secure
   provider UI. Run authorization, ambiguous-response recovery, capture observation, settlement,
   reserve, payout, refund, dispute, and reconciliation tests. HTTP 202, timeouts, and delayed events
   stay ambiguous until provider recovery proves the result. Do not claim a charge or payout from a
   simulator or mocked HTTP test.
6. **Go live only through a later canonical action.** The current route-draft action cannot submit
   KYB/KYC, accept terms, attach a bank, activate a route, deploy, or enable live charging. If no
   canonical action exists for the next external step, return the exact blocker instead of operating
   the provider manually or pretending completion.

## Legacy integration planner

`prepare_revenue_launch`, `create_payment_project`, `configure_payment_catalog`,
`create_payment_integration_bundle`, and `verify_payment_integration` belong to the older
Paddle-based subscription prototype. Do not start that path for a new Corply-controlled payment
portal. Use it only when the founder explicitly asks to inspect, maintain, or migrate an existing
legacy manifest, and state that it is a separate migration path.

## Non-negotiable controls

- Browser input may choose only allowlisted price keys, quantity within server bounds, and an opaque
  hosted payment-method token. It never supplies amount, currency, tenant, merchant, fee, reserve,
  or payout route.
- Every monetary value is an integer minor-unit amount with an explicit currency.
- Every journal entry is immutable, exactly replayable, and sums to zero in one currency.
- Duplicate, delayed, conflicting, and ambiguous provider outcomes recover before retrying; never
  issue a second charge or payout merely because the first response was lost.
- A payout cannot exceed settled, available, non-reserved merchant payable. Refunds, disputes,
  chargebacks, payout returns, and reversals are compensating entries, never edited history.
- Provider webhooks use exact raw bytes, authenticated signatures, global event identities, and
  tenant-bound processing before they can change payment or ledger state.
- Never ask the founder to paste an API key, password, bank number, card number, identity credential,
  or full provider token into chat or a tool argument.

## Human and provider boundaries

- **KYB/KYC and underwriting.** An authorized human reviews and submits beneficial-owner,
  control-person, business, and identity material. Obtain fresh confirmation immediately before
  submission and never describe pending review as approval.
- **Terms.** Show the provider, documents or links, and practical effect. The authorized human
  personally accepts provider and commercial terms.
- **Bank and payouts.** The authorized human uses the secure provider flow. Obtain fresh confirmation
  before attaching, replacing, or removing a payout account, changing destination or schedule, or
  initiating an agent-directed payout.
- **Refunds and money movement.** Before an agent initiates a refund, charge, transfer, or payout,
  identify the exact transaction, amount, currency, destination, and effect, then obtain fresh
  confirmation. Normal customer checkout may operate only under a separately approved live policy.
- **Go-live.** Sandbox configuration and passing tests are not permission to deploy or enable
  live money. Obtain fresh confirmation bound to the exact route/configuration after all provider,
  bank, security, reconciliation, refund, dispute, and operational-owner evidence is current.

Provider rejection, reserve, dispute, payout delay, or account limitation is external state. Report
it accurately with the returned next step; never promise approval or bypass a provider control.
