/** Financial calculation functions. Pure, stateless, no external I/O. */

/** Future value of a principal compounded at a periodic rate. */
export function compoundInterest(
  principal: number,
  annualRatePercent: number,
  compoundsPerYear: number,
  years: number,
): number {
  if (principal <= 0) throw new Error("principal must be > 0");
  if (compoundsPerYear <= 0) throw new Error("compoundsPerYear must be > 0");
  if (years < 0) throw new Error("years must be >= 0");
  const r = annualRatePercent / 100;
  const n = compoundsPerYear;
  return principal * Math.pow(1 + r / n, n * years);
}

/** Fixed monthly payment for a fully-amortizing loan. */
export function loanMonthlyPayment(
  principal: number,
  annualRatePercent: number,
  months: number,
): number {
  if (principal <= 0) throw new Error("principal must be > 0");
  if (months <= 0) throw new Error("months must be > 0");
  const monthlyRate = annualRatePercent / 100 / 12;
  if (monthlyRate === 0) return principal / months;
  const factor = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * factor) / (factor - 1);
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  balance: number;
}

/** Full month-by-month amortization schedule for a fixed-rate loan. */
export function amortizationSchedule(
  principal: number,
  annualRatePercent: number,
  months: number,
): AmortizationRow[] {
  const payment = loanMonthlyPayment(principal, annualRatePercent, months);
  const monthlyRate = annualRatePercent / 100 / 12;
  let balance = principal;
  const rows: AmortizationRow[] = [];
  for (let month = 1; month <= months; month++) {
    const interestPaid = balance * monthlyRate;
    let principalPaid = payment - interestPaid;
    if (month === months) principalPaid = balance; // absorb rounding on final row
    balance = Math.max(0, balance - principalPaid);
    rows.push({
      month,
      payment: round2(principalPaid + interestPaid),
      principalPaid: round2(principalPaid),
      interestPaid: round2(interestPaid),
      balance: round2(balance),
    });
  }
  return rows;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
