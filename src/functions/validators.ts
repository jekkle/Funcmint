/** Validation functions. Pure, stateless, no external I/O. */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** RFC-5322-lite email shape check — practical, not a full grammar parser. */
export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim());
}

/** Luhn checksum validation for credit-card-style numbers. */
export function isValidLuhn(cardNumber: string): boolean {
  const digits = cardNumber.replace(/[\s-]/g, "");
  if (!/^\d{8,19}$/.test(digits)) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = Number(digits[i]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

/** IBAN validation via ISO 7064 MOD-97-10 checksum. */
export function isValidIban(iban: string): boolean {
  const cleaned = iban.replace(/\s/g, "").toUpperCase();
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/.test(cleaned)) return false;
  const rearranged = cleaned.slice(4) + cleaned.slice(0, 4);
  const numeric = rearranged.replace(/[A-Z]/g, (ch) => String(ch.charCodeAt(0) - 55));
  let remainder = 0;
  for (const chunk of numeric.match(/\d{1,7}/g) ?? []) {
    remainder = Number(`${remainder}${chunk}`) % 97;
  }
  return remainder === 1;
}
