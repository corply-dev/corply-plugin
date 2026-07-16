# Company naming

Help the founder choose a durable legal entity name quickly. Treat the legal company name and the
customer-facing product name as separate decisions: prefer a generic parent-company name that still
works if the product, market, or brand changes. Timebox ordinary naming work to 30–60 minutes and
make a clear recommendation rather than prolonging low-value debate.

## Suggest names

When generating new names:

1. Generate at least 20 base names before adding `Inc.` or another approved corporate ending.
2. Prefer names that are 6–8 letters, easy to hear, spell, pronounce, and remember.
3. Favor pronounceable CVCV, CVCC, or VCCV structures and invented names over descriptive English
   words when the founder has no strong naming direction.
4. Avoid `x`, `q`, and `z` unless the founder's existing brand makes one necessary.
5. Avoid names tied too narrowly to the current product, customer, geography, or business model.
6. Screen for obvious negative meanings in the founders' languages and intended markets. Never
   claim that a name has no negative meaning in every language; ask a fluent speaker when material.
7. Rank a short list by durability, pronunciation, spelling, distinctiveness, and domain options.
   Explain the recommendation in one sentence per finalist.

Prefer the exact `.com` when reasonably obtainable. If it is unavailable, test a natural `Labs`
variant before accepting a confusing spelling. Check domains live through
[Instant Domain Search](https://instantdomainsearch.com/) or another current registrar source;
never infer availability from memory. Buying or registering a domain is an external purchase and
requires fresh confirmation under [action-protocol.md](action-protocol.md).

## Check the legal name

Once the founder has selected a complete legal name:

- Build up to five strong alternatives when useful. Include the founder's chosen corporate ending
  in every complete name.
- Call `check_company_names` once with the saved `formationId`, the exact selected name, and those
  alternatives in recommendation order.
- Preserve the returned order and use every returned value directly: `true` means the name passed,
  `false` means it is unavailable, and `null` means that individual check failed and can be retried.
- Return every checked name and its result. If the selected name is `false`, recommend choosing and
  saving another name. If it is `null`, explain the provider failure. Neither result blocks document
  generation after the founder confirms that immutable action, and do not loop on retries.
- Do not send the founder through a separate manual pre-document name check. Corply operations makes
  the final Delaware portal decision immediately before filing.
- Keep entity-name availability separate from trademark clearance, domain availability, and naming
  rules in states where the company may later qualify to do business.

Use an approved corporate ending for a Delaware corporation. Avoid regulated or misleading terms
such as `bank` or `trust` unless the briefing exposes an approved path or a qualified professional
has cleared the issue. Delaware may still reject a name that is misleading, abusive, or otherwise
noncompliant even when a search reports it available.
