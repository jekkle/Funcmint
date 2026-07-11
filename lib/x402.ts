import { x402ResourceServer } from '@x402/next'
import { HTTPFacilitatorClient } from '@x402/core/server'
import { ExactEvmScheme } from '@x402/evm/exact/server'
import { generateJwt } from '@coinbase/cdp-sdk/auth'

/**
 * Defaults to base-sepolia testnet until X402_NETWORK is set to "eip155:8453"
 * for real payments. See README.md before switching to mainnet.
 */
export const NETWORK = (process.env.X402_NETWORK ?? 'eip155:84532') as `${string}:${string}`
export const PRICE_PER_CALL = process.env.PRICE_PER_CALL ?? '$0.02'
export const PAY_TO = process.env.PAY_TO_ADDRESS as `0x${string}` | undefined

const CDP_HOST = 'api.cdp.coinbase.com'
const CDP_BASE_PATH = '/platform/v2/x402'
const CDP_FACILITATOR_URL = `https://${CDP_HOST}${CDP_BASE_PATH}`

// Only the public x402.org facilitator (testnet-only) needs no auth. CDP's
// mainnet facilitator requires a per-request signed JWT scoped to the exact
// method + host + path being called — see docs.cdp.coinbase.com/api-reference.
async function cdpAuthHeader(method: string, path: string): Promise<Record<string, string>> {
    const token = await generateJwt({
        apiKeyId: process.env.CDP_API_KEY_ID!,
        apiKeySecret: process.env.CDP_API_KEY_SECRET!,
        requestMethod: method,
        requestHost: CDP_HOST,
        requestPath: path,
        expiresIn: 120,
    })
    return { Authorization: `Bearer ${token}` }
}

const hasCdpCredentials = Boolean(process.env.CDP_API_KEY_ID && process.env.CDP_API_KEY_SECRET)

const facilitatorClient = new HTTPFacilitatorClient(
    hasCdpCredentials
        ? {
              url: CDP_FACILITATOR_URL,
              createAuthHeaders: async () => ({
                  verify: await cdpAuthHeader('POST', `${CDP_BASE_PATH}/verify`),
                  settle: await cdpAuthHeader('POST', `${CDP_BASE_PATH}/settle`),
                  supported: await cdpAuthHeader('GET', `${CDP_BASE_PATH}/supported`),
              }),
          }
        : { url: process.env.X402_FACILITATOR_URL ?? 'https://x402.org/facilitator' }
)

export const resourceServer = new x402ResourceServer(facilitatorClient).register(NETWORK, new ExactEvmScheme())
