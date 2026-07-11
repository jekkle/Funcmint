const containerStyle = { maxWidth: 720, margin: '0 auto', padding: '48px 20px', lineHeight: 1.6 }
const codeBlockStyle = {
    background: '#f4f4f4',
    padding: '12px 16px',
    borderRadius: 6,
    overflowX: 'auto' as const,
    fontSize: '0.85rem',
}

export default function HomePage() {
    return (
        <main style={containerStyle}>
            <h1>FuncMint</h1>
            <p>
                12 pure, tested TypeScript functions for financial math, parsing, validation, and unit
                conversion — sold as a one-time license, and callable per-request by AI agents over the{' '}
                <a href="https://x402.org/" target="_blank" rel="noopener noreferrer">
                    x402 payment protocol
                </a>
                .
            </p>

            <h2>What&apos;s included</h2>
            <ul>
                <li>
                    <strong>Financial:</strong> compound interest, loan monthly payments, full amortization
                    schedules
                </li>
                <li>
                    <strong>Parsers:</strong> quoted-field-safe CSV line parsing, currency string parsing,
                    duration string parsing
                </li>
                <li>
                    <strong>Validators:</strong> email shape, credit-card Luhn checksum, IBAN checksum
                </li>
                <li>
                    <strong>Converters:</strong> temperature (C/F/K), human-readable byte sizes, URL slugs
                </li>
            </ul>
            <p>Every function is pure — no side effects, no network calls, no PII storage.</p>

            <h2>Get the source (one-time license)</h2>
            <p>Buy the full library, a category bundle, or a single function on Gumroad. Use forever, no subscription.</p>

            <h2>Call it directly (AI agents)</h2>
            <p>
                Every function is live at <code>POST /api/call/&#123;functionName&#125;</code>, gated by
                x402. No signup, no API key — pay a small USDC micropayment per call and get the result
                back inline.
            </p>
            <pre style={codeBlockStyle}>
                {`curl -X POST https://funcmint.dev/api/call/slugify \\
  -H "Content-Type: application/json" \\
  -d '{"args": ["Hello World"]}'`}
            </pre>
            <p>An unpaid request returns an HTTP 402 with machine-readable payment instructions per the x402 spec.</p>
        </main>
    )
}
