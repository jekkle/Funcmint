# FuncMint — Listing Copy Drafts

## Gumroad / Stripe storefront

**Product name:** FuncMint — Vetted Utility Functions for Developers & AI Agents

**One-liner:** 12 pure, tested, drop-in functions for financial math, parsing, validation, and unit conversion — no dependencies, no surprises, MIT-licensed for your codebase.

**Description:**

> Stop rewriting the same loan-amortization formula or IBAN checksum for the tenth time. FuncMint is a small, rigorously tested library of pure utility functions you can drop straight into a TypeScript/JavaScript project:
>
> - **Financial:** compound interest, loan monthly payments, full amortization schedules
> - **Parsers:** CSV line parsing (quoted-field safe), currency string parsing, duration string parsing ("2h30m" → seconds)
> - **Validators:** email shape, credit-card Luhn checksum, IBAN checksum
> - **Converters:** temperature (C/F/K), human-readable byte sizes, URL slugs
>
> Every function is pure (no side effects, no network calls, no PII storage) and ships with a full unit test suite so you can trust the edge cases. One-time purchase, use forever, no subscription.
>
> **Bonus:** the same functions are live behind a pay-per-call API for AI agents (x402 protocol) — if you're building an agent that needs these calculations on demand rather than as installed code, see the API docs.

**Pricing tiers:**
- Single function: $9
- Category bundle (3 functions): $19
- Full library (all 12): $79 *(primary offer — biggest margin lever per the financial model)*

## Show HN draft

**Title:** FuncMint — 12 pure, tested utility functions, sold once or pay-per-call via x402

**URL to submit:** https://funcmint.vercel.app

> I got tired of rewriting loan amortization and IBAN validation from scratch, so I built a small library of pure, unit-tested functions (financial math, parsing, validation, unit conversion) and I'm selling it two ways: a one-time license for developers (https://jekkle.gumroad.com/l/jxnkvc), and a pay-per-call x402 endpoint for AI agents that just need the calculation once and don't want to install anything — live on Base mainnet at funcmint.vercel.app/api/call/{fn}.
>
> Everything is stateless and PII-free by design. Tests + source included. Curious what functions people would want added next.

## dev.to / Indie Hackers draft

**Title:** I sold the same 12 functions twice — once to humans, once to AI agents

> Built a tiny utility-function library (financial calcs, parsers, validators, converters) and shipped it on two rails at once: a traditional one-time Gumroad license (https://jekkle.gumroad.com/l/jxnkvc), and an x402 pay-per-call HTTP endpoint so an AI agent can pay $0.02 in real USDC on Base and get the result back with zero signup (funcmint.vercel.app). Same code, two customer types. Happy to share what worked and what I'd change.
>
> Example call for anyone who wants to poke at it:
> ```
> curl -X POST https://funcmint.vercel.app/api/call/slugify \
>   -H "Content-Type: application/json" \
>   -d '{"args": ["Hello World"]}'
> ```
> (Returns an HTTP 402 with payment instructions — that's the x402 protocol working as intended, not a bug.)

## Reddit r/programming or r/SideProject draft (optional extra channel)

**Title:** Built a utility-function library that AI agents can pay for per-call (x402), sold the same code as a normal Gumroad product too

> Same pitch as above, slightly more casual — good for a subreddit audience. Reuse the dev.to body, drop the code block if the sub doesn't like inline commands.

---

*Post these from your own accounts, in your own voice — feel free to edit before posting. Bot-posted content on HN/Indie Hackers/dev.to tends to get filtered or read as inauthentic, so treat these as a starting draft, not a final copy-paste.*
