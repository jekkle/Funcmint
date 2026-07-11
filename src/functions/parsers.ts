/** Parsing functions. Pure, stateless, no external I/O. */

/** Parse one CSV line into fields, honoring double-quoted fields with embedded commas and escaped quotes ("" -> "). */
export function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"') {
        if (line[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      fields.push(field);
      field = "";
    } else {
      field += char;
    }
  }
  fields.push(field);
  return fields;
}

export interface ParsedCurrency {
  amount: number;
  currency: string;
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  "$": "USD",
  "€": "EUR",
  "£": "GBP",
  "¥": "JPY",
};

/** Parse a currency string like "$1,234.56", "1234.56 USD", or "€99.99" into amount + ISO code. */
export function parseCurrency(input: string): ParsedCurrency {
  const trimmed = input.trim();
  const symbolMatch = trimmed.match(/^([$€£¥])\s*([\d,]+(?:\.\d+)?)$/);
  if (symbolMatch) {
    return { amount: Number(symbolMatch[2].replace(/,/g, "")), currency: CURRENCY_SYMBOLS[symbolMatch[1]] };
  }
  const codeMatch = trimmed.match(/^([\d,]+(?:\.\d+)?)\s*([A-Z]{3})$/);
  if (codeMatch) {
    return { amount: Number(codeMatch[1].replace(/,/g, "")), currency: codeMatch[2] };
  }
  throw new Error(`Unrecognized currency format: "${input}"`);
}

const DURATION_UNIT_SECONDS: Record<string, number> = {
  d: 86400,
  h: 3600,
  m: 60,
  s: 1,
};

/** Parse a compact duration string like "2h30m", "1d", or "45s" into total seconds. */
export function parseDuration(input: string): number {
  const trimmed = input.trim();
  const pattern = /(\d+)(d|h|m|s)/g;
  let match: RegExpExecArray | null;
  let total = 0;
  let matched = false;
  while ((match = pattern.exec(trimmed)) !== null) {
    matched = true;
    total += Number(match[1]) * DURATION_UNIT_SECONDS[match[2]];
  }
  if (!matched) throw new Error(`Unrecognized duration format: "${input}"`);
  return total;
}
