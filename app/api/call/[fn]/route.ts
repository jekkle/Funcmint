import { NextRequest, NextResponse } from 'next/server'
import { withX402 } from '@x402/next'
import * as financial from '@/src/functions/financial'
import * as parsers from '@/src/functions/parsers'
import * as validators from '@/src/functions/validators'
import * as converters from '@/src/functions/converters'
import { resourceServer, NETWORK, PRICE_PER_CALL, PAY_TO } from '@/lib/x402'

// Cast at the boundary: each function has specific typed params, but dynamic
// dispatch by name needs a uniform signature. Args are validated by each
// function's own runtime checks, and invalid calls are caught below.
const FUNCTIONS = {
    ...financial,
    ...parsers,
    ...validators,
    ...converters,
} as unknown as Record<string, (...args: unknown[]) => unknown>

// withX402 only forwards `request`, not route params — read the function name from the path instead.
const handler = async (request: NextRequest): Promise<NextResponse> => {
    const fn = request.nextUrl.pathname.split('/').pop() ?? ''
    const impl = FUNCTIONS[fn]

    if (!impl) {
        return NextResponse.json({ error: `Unknown function: ${fn}` }, { status: 404 })
    }

    try {
        const body = await request.json().catch(() => ({}))
        const args = Array.isArray(body?.args) ? body.args : []
        const result = impl(...args)
        return NextResponse.json({ result })
    } catch (err) {
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Invalid arguments' },
            { status: 400 }
        )
    }
}

export const POST = withX402(
    handler,
    {
        accepts: {
            scheme: 'exact',
            price: PRICE_PER_CALL,
            network: NETWORK,
            payTo: PAY_TO ?? '0x0000000000000000000000000000000000000000',
        },
        description: 'FuncMint utility function call',
    },
    resourceServer
)
