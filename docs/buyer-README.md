# FuncMint — Vetted Utility Functions

Thanks for your purchase. This package contains 12 pure, dependency-free TypeScript functions across 4 categories, plus their full test suite.

## Contents

- `functions/financial.ts` — `compoundInterest`, `loanMonthlyPayment`, `amortizationSchedule`
- `functions/parsers.ts` — `parseCsvLine`, `parseCurrency`, `parseDuration`
- `functions/validators.ts` — `isValidEmail`, `isValidLuhn`, `isValidIban`
- `functions/converters.ts` — `convertTemperature`, `bytesToHuman`, `slugify`
- `tests/` — the full Vitest suite these functions ship with (36 tests)

## Using the functions

Every function is pure TypeScript with no runtime dependencies — copy the files you need directly into your project, or drop the whole `functions/` folder in and import from it:

```ts
import { loanMonthlyPayment } from "./functions/financial";

const payment = loanMonthlyPayment(200000, 6, 360); // $1,199.10
```

## Running the tests yourself

```bash
npm install vitest --save-dev
npx vitest run tests
```

## Design notes

- Every function is **pure**: same input always produces the same output, no side effects, no network calls, no logging.
- No function stores, transmits, or logs personally identifiable information.
- Financial functions use standard amortization/compounding formulas — verify independently before use in a regulated or high-stakes financial system (see `LICENSE.md`).

## Support / questions

Reply to your Gumroad purchase receipt email with any questions or bug reports.

## License

See `LICENSE.md` in this package.
