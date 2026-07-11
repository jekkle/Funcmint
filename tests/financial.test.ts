import { describe, expect, it } from "vitest";
import { amortizationSchedule, compoundInterest, loanMonthlyPayment } from "../src/functions/financial.js";

describe("compoundInterest", () => {
  it("matches the textbook formula", () => {
    expect(compoundInterest(1000, 5, 12, 10)).toBeCloseTo(1647.01, 1);
  });
  it("returns principal unchanged at 0 years", () => {
    expect(compoundInterest(1000, 5, 12, 0)).toBeCloseTo(1000, 5);
  });
  it("rejects non-positive principal", () => {
    expect(() => compoundInterest(0, 5, 12, 1)).toThrow();
  });
});

describe("loanMonthlyPayment", () => {
  it("matches a known amortization payment", () => {
    expect(loanMonthlyPayment(200000, 6, 360)).toBeCloseTo(1199.1, 1);
  });
  it("divides evenly at 0% interest", () => {
    expect(loanMonthlyPayment(1200, 0, 12)).toBeCloseTo(100, 5);
  });
});

describe("amortizationSchedule", () => {
  it("fully pays off the loan by the last row", () => {
    const rows = amortizationSchedule(10000, 5, 12);
    expect(rows).toHaveLength(12);
    expect(rows[11].balance).toBe(0);
  });
  it("has decreasing interest and increasing principal over time", () => {
    const rows = amortizationSchedule(10000, 5, 12);
    expect(rows[0].interestPaid).toBeGreaterThan(rows[11].interestPaid);
    expect(rows[0].principalPaid).toBeLessThan(rows[11].principalPaid);
  });
});
