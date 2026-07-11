# FuncMint — Pay-Per-Call AI Function Library

12 vetted, pure, stateless utility functions across 4 categories, each tested with unit tests. Sold as a one-time developer license (Gumroad/Stripe) and callable per-request by AI agents via the x402 protocol.

## Catalog

**Financial** (`src/functions/financial.ts`): `compoundInterest`, `loanMonthlyPayment`, `amortizationSchedule`
**Parsers** (`src/functions/parsers.ts`): `parseCsvLine`, `parseCurrency`, `parseDuration`
**Validators** (`src/functions/validators.ts`): `isValidEmail`, `isValidLuhn`, `isValidIban`
**Converters** (`src/functions/converters.ts`): `convertTemperature`, `bytesToHuman`, `slugify`

Every function is pure (no side effects), stateless, and never touches PII or persistent storage — this keeps liability low, per the financial model's risk assessment.

## Running locally

```bash
npm install
npm test          # 36 unit tests across the 4 modules
npm run dev        # starts the x402-gated HTTP server on :3000 (or $PORT)
```

## The x402 endpoint (`src/server.ts`)

Each function is exposed at `POST /call/<functionName>` behind `@x402/express` payment middleware — a request without a valid payment gets back an HTTP 402 with machine-readable payment instructions; a request with a valid signed payment gets the function's result as JSON.

```bash
curl -X POST http://localhost:3000/call/slugify \
  -H "Content-Type: application/json" \
  -d '{"args": ["Hello World"]}'
```

**Defaults to base-sepolia (testnet)** and the public `https://x402.org/facilitator` — nothing charges real money until you deliberately switch to mainnet. Environment variables:

| Variable | Default | Purpose |
|---|---|---|
| `PAY_TO_ADDRESS` | *(none — server warns and rejects all payments)* | Your receiving wallet address |
| `X402_NETWORK` | `eip155:84532` (base-sepolia) | Set to `eip155:8453` for Base mainnet |
| `X402_FACILITATOR_URL` | `https://x402.org/facilitator` | Swap for a different facilitator if desired |
| `PRICE_PER_CALL` | `$0.02` | Per-call price for every function |
| `PORT` | `3000` | HTTP port |

**Before going to mainnet:** you (human) need to (1) create/fund a wallet you control and set `PAY_TO_ADDRESS` to it — private key custody cannot be delegated to Claude, (2) review `X402_NETWORK`/facilitator choice, (3) deploy behind a domain with TLS (Vercel/Railway/Fly.io all work with this Express app).

## What's human-required vs. Claude-automatable going forward

**Claude can:** write new functions + tests + docs, propose the next batch based on demand, draft Gumroad/marketplace listing copy, draft launch posts for Show HN/Indie Hackers/dev.to, draft support replies, monitor server logs/error rates if given read access, analyze sales data and propose pricing/bundle changes.

**Human-required:** Gumroad/Stripe KYC (already done), wallet creation and funding, deployment/hosting account and billing, posting to community platforms under your account (bot-posted content reads worse there), final review before publishing new functions publicly, handling refunds/disputes.

## Next steps

1. Deploy `src/server.ts` behind a real domain (Vercel/Railway/Fly.io).
2. Create the Gumroad listing(s) — see `docs/funcmint/listing-copy.md` for drafted copy and bundle pricing.
3. Fund a wallet and set `PAY_TO_ADDRESS` + switch `X402_NETWORK` to `eip155:8453` once ready to accept real payments.
4. List the x402 endpoint on Agent.market / x402 Bazaar for agent-side discovery.
5. Launch: Show HN, Indie Hackers, r/programming, dev.to — using the drafted posts as a starting point, posted from your own account.
