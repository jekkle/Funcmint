import "dotenv/config";
import express from "express";
import { paymentMiddleware, x402ResourceServer } from "@x402/express";
import { ExactEvmScheme } from "@x402/evm/exact/server";
import { HTTPFacilitatorClient } from "@x402/core/server";
import type { RouteConfig } from "@x402/core/server";
import * as fn from "./index.js";

/** CAIP-2 chain identifier, e.g. "eip155:84532" (base-sepolia) or "eip155:8453" (base). */
type ChainNetwork = `${string}:${string}`;

/**
 * Testnet by default (base-sepolia via the public x402.org facilitator) so nothing
 * charges real money until PAY_TO_ADDRESS / X402_NETWORK are deliberately set for
 * mainnet. Switch network to "eip155:8453" (Base) only once the wallet and
 * facilitator choice have been reviewed — see docs/funcmint/README.md.
 */
const PAY_TO_ADDRESS = process.env.PAY_TO_ADDRESS;
const NETWORK = (process.env.X402_NETWORK ?? "eip155:84532") as ChainNetwork; // base-sepolia testnet
const FACILITATOR_URL = process.env.X402_FACILITATOR_URL ?? "https://x402.org/facilitator";
const PORT = Number(process.env.PORT ?? 3000);
const PRICE_PER_CALL = process.env.PRICE_PER_CALL ?? "$0.02";

if (!PAY_TO_ADDRESS) {
  console.warn(
    "[funcmint] PAY_TO_ADDRESS is not set — the x402 endpoints will reject all payments. " +
      "Set it to your receiving wallet address before deploying.",
  );
}

const app = express();
app.use(express.json());

const facilitatorClient = new HTTPFacilitatorClient({ url: FACILITATOR_URL });
const resourceServer = new x402ResourceServer(facilitatorClient).register(NETWORK, new ExactEvmScheme());

/** One paid route per function so an agent can price-discover and pay per call. */
const FUNCTION_NAMES = [
  "compoundInterest",
  "loanMonthlyPayment",
  "amortizationSchedule",
  "parseCsvLine",
  "parseCurrency",
  "parseDuration",
  "isValidEmail",
  "isValidLuhn",
  "isValidIban",
  "convertTemperature",
  "bytesToHuman",
  "slugify",
] as const;

const routes: Record<string, RouteConfig> = {};
for (const name of FUNCTION_NAMES) {
  routes[`POST /call/${name}`] = {
    accepts: {
      scheme: "exact",
      price: PRICE_PER_CALL,
      network: NETWORK,
      payTo: (PAY_TO_ADDRESS ?? "0x0000000000000000000000000000000000000000") as `0x${string}`,
    },
    description: `Call the ${name} function`,
  };
}

app.use(paymentMiddleware(routes, resourceServer));

for (const name of FUNCTION_NAMES) {
  app.post(`/call/${name}`, (req, res) => {
    try {
      const args = Array.isArray(req.body?.args) ? req.body.args : [];
      const result = (fn as Record<string, (...a: unknown[]) => unknown>)[name](...args);
      res.json({ result });
    } catch (err) {
      res.status(400).json({ error: err instanceof Error ? err.message : "Invalid arguments" });
    }
  });
}

app.get("/health", (_req, res) => res.json({ status: "ok", network: NETWORK }));

app.listen(PORT, () => {
  console.log(`[funcmint] listening on :${PORT} (network=${NETWORK}, price=${PRICE_PER_CALL}/call)`);
});
