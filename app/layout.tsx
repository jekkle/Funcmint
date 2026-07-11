import type { ReactNode } from 'react'

export const metadata = {
    title: 'FuncMint — Vetted Utility Functions',
    description: 'Pure, tested TypeScript utility functions. One-time license or pay-per-call via x402.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif' }}>
                {children}
            </body>
        </html>
    )
}
