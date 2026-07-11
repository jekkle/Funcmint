import { x402ResourceServer } from '@x402/next'
import { HTTPFacilitatorClient } from '@x402/core/server'
import { ExactEvmScheme } from '@x402/evm/exact/server'

/**
 * Defaults to base-sepolia testnet until X402_NETWORK is set to "eip155:8453"
 * for real payments. See README.md before switching to mainnet.
 */
export const NETWORK = (process.env.X402_NETWORK ?? 'eip155:84532') as `${string}:${string}`
export const PRICE_PER_CALL = process.env.PRICE_PER_CALL ?? '$0.02'
export const PAY_TO = process.env.PAY_TO_ADDRESS as `0x${string}` | undefined

const facilitatorClient = new HTTPFacilitatorClient({
    url: process.env.X402_FACILITATOR_URL ?? 'https://x402.org/facilitator',
})

export const resourceServer = new x402ResourceServer(facilitatorClient).register(NETWORK, new ExactEvmScheme())
