# Revenue and payments

Use this workflow when a founder wants to accept customer payments, launch checkout, configure what
they sell, generate an integration, or verify that their product is ready to collect revenue. This
is separate from Corply's own incorporation fee: never use `request_payment` or `await_payment` to
collect the founder's customer payments.

Start with `get_company_briefing`. Use only Corply Pay actions that the refreshed briefing or tool
discovery actually exposes; the server's returned prerequisites, fields, and next action are
canonical. Do not invent provider eligibility, approval, pricing, settlement timing, supported
countries, tax treatment, or tool payloads.

These five tools are deterministic Corply-side planning, configuration, artifact-generation, and
technical-verification actions. They make zero payment-provider calls, accept no secrets, credentials,
bank details, or raw payment data, and cannot approve an account, accept partner terms, attach a
payout bank, enable production, refund, pay out, or otherwise move money. Never ask the founder to
paste a provider API key, password, bank number, card number, or identity credential into chat or a
tool argument.

## Revenue-launch sequence

Before the first Corply Pay call, inspect the repository yourself: framework, package manager, app
root, source root, and existing test/build commands are agent-owned technical facts. Never ask the
founder for them. Generate stable project/product/price/environment/entitlement keys from the
repository and founder-approved commercial labels; never ask the founder to invent implementation
identifiers.

1. **Prepare.** Call `prepare_revenue_launch` with that inspected repository profile to resolve the company's current readiness, missing
   facts, partner requirements, and safest next action. Ask only for a returned fact that changes the
   path. Unknown beneficial-owner, control-person, business, tax, or bank information stays unknown.
2. **Create the project.** Use `create_payment_project` only when the canonical action makes it
   available. The tool creates no hosted state: its integrity-hashed repository manifest is the reviewable
   technical configuration snapshot, not an authority record. Inspect the returned destination: identical content is a no-op; a reviewed older
   manifest for the same project is replaced wholesale with the newly returned manifest; an unrelated
   project/file is a stop. Never merge integrity-hashed JSON field by field. This is not partner onboarding, approval, terms
   acceptance, bank attachment, or authorization to go live.
3. **Configure the catalog.** Use `configure_payment_catalog` for the exact products, prices,
   currencies, billing behavior, and customer-facing access the founder supplies or confirms. The
   agent derives `productKey`, `priceKey`, `entitlementKeys`, and `providerReferenceEnv`, and maps the
   already-approved `saas` model to the same catalog category. Digital goods and one-time, mixed, or
   usage billing remain blocked until their fulfillment/entitlement paths exist. Do not ask the
   founder for technical identifiers or a tax code. Treat saved catalog work as a reversible draft
   until canonical state says otherwise. Persist the newly returned integrity-hashed
   manifest at the same repository path after checking for drift. The hash is not a signature,
   provider approval, or evidence that a human gate was completed. Any future live automation must
   require a separately stored, server-authenticated approval bound to the exact manifest hash. Do
   not infer tax codes, refund policy, or regulated-product eligibility.
4. **Create the integration bundle.** Use `create_payment_integration_bundle` for the current project
   and catalog. The tool itself writes nothing; the coding agent should inspect the founder's
   repository, apply every safe create-only file, deliberately merge collisions, and follow the
   returned SDK availability exactly. If the package is marked unpublished, build/pack-test it only
   when its local source is present; otherwise report the publication blocker. Never fabricate or
   execute a registry install command that the tool returned as unavailable. Preserve the
   agent-inspected Next.js `basePath` in the browser checkout endpoint, checkout page, and externally
   registered webhook URL; never assume the app is mounted at the origin root. Then
   follow the returned structured provider-setup handoff. After the founder authenticates the
   company's Paddle sandbox, the agent should create/bind the exact sandbox product and prices,
   least-privilege API/client credentials through the secret manager, approved checkout URL, and
   signed webhook destination. For every Paddle price, explicitly set `quantity.minimum: 1` and
   `quantity.maximum: 1`; never accept Paddle's wider default. Map the manifest trial exactly: when
   `trialDays > 0`, set `trial_period` to `{ interval: "day", frequency: trialDays,
   requires_payment_method: true, unit_price: null }`; when `trialDays === 0`, set
   `trial_period: null`. Do not claim `sandbox_checkout` or `webhook_signature` before that evidence
   exists. Then connect the generated fail-closed seams to existing auth and storage, and run the required checks.
   The checkout endpoint must accept only an allowlisted local price key. A durable authenticated
   host seam—not browser input—must issue a bounded stable order/cart attempt, enforce one active
   attempt and abuse limits, and authorize any restart explicitly. The storage implementation must
   atomically create/reuse an opaque checkout intent with one
   short-lived permission to create a provider transaction; consume that permission at most once;
   make every retry recovery-only after it is consumed; keep the exact attached transaction
   recoverable and bindable after the provisioning deadline so a slow response or later payment is not stranded;
   bound provider recovery to the original provisioning window plus small clock skew; accept only
   API-origin transactions; reconcile provider-returned price ID, quantity, unit amount, currency,
   cadence, interval count, and trial before checkout opens; bind it once using provider-signed
   occurrence time to the exact tenant, provider account, environment, transaction, customer,
   subscription, and commercial terms; enforce global subscription
   uniqueness before tenant/customer assertions; receipt ignored verified events; and combine lifecycle-event receipt with projection CAS.
   Subscription access must require current request time, explicit billing-period bounds, and exact
   amount/currency/cadence/trial reconciliation against the local catalog. Direct provider
   entitlement snapshots never grant access.
   Do all ordinary code/test repair autonomously. Pause only for a returned commercial fact, secret
   entry through the founder's secret manager, provider-controlled verification, a consequential
   migration/deployment, or another explicit human boundary. Never expose secrets or claim the bundle
   was installed, deployed, or connected unless repository and test evidence proves that exact outcome.
5. **Verify and repair.** After the bundle is actually integrated, run every returned check and call
   `verify_payment_integration` with truthful pass, failure, or `not_run` status—even when the first
   run is not green. Every passed/failed result includes the exact command and a SHA-256 reference to
   captured local evidence. The tool checks caller-reported completeness; it does not independently
   run or attest the commands. Use its canonical failed/missing lists and next action to repair
   ordinary code autonomously, rerun, and verify again until the evidence set is complete or the work
   is genuinely human-blocked. A passing software check is not partner KYB/KYC approval, bank verification, production
   enablement, successful settlement, or a compliance guarantee.
6. **Refresh.** After every mutation, human handoff, partner result, or verification run, refresh
   `get_company_briefing` for canonical company identity and facts. Resume payment-project state from
   the repository's verify-exact `.corply/payments.json`; these tools do not persist a hosted payment
   project. Do not recreate a project, catalog, or bundle merely because the conversation is new.

## Human and partner boundaries

- **KYB/KYC.** An authorized human supplies and reviews beneficial-owner, control-person, identity,
  business, and supporting-document information. Never guess, reuse unrelated company data, upload
  identity evidence without authority, or describe a pending partner review as approved. Obtain fresh
  confirmation immediately before any submission to a payment partner.
- **Terms.** Show the partner, documents or links, and practical effect. The authorized human must
  personally accept provider terms or attestations in the partner's browser flow; an agent must never
  accept them, synthesize acceptance, or treat earlier blanket permission as acceptance.
- **Bank and payouts.** Never ask for credentials or expose full account numbers. The authorized human
  completes the returned secure bank flow. Obtain fresh confirmation before attaching, replacing, or
  removing a payout account, changing payout destination or schedule, or initiating a payout.
- **Go-live.** Test-mode configuration and verification are not permission to enable live payments.
  Before a provider submission or production enablement, summarize the project, selling entity,
  catalog, currencies, customer-facing identity, partner status, unresolved warnings, and exact effect;
  then obtain fresh confirmation. Report live only when refreshed canonical state confirms it.
- **Refunds and money movement.** Before any refund, charge, transfer, or payout, identify the exact
  transaction, amount, currency, recipient or destination, and effect, then obtain fresh confirmation.
  These five Corply Pay actions do not themselves authorize a refund or payout; if no canonical action
  is exposed, return the provider or human path instead of pretending the money moved.

Provider rejection, review, reserve, dispute, payout delay, or account limitation is external state.
Report it accurately with the returned next step; never promise approval or bypass a partner control.
