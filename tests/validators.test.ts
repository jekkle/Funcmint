import { describe, expect, it } from "vitest";
import { isValidEmail, isValidIban, isValidLuhn } from "../src/functions/validators.js";

describe("isValidEmail", () => {
  it("accepts a normal address", () => {
    expect(isValidEmail("a@b.com")).toBe(true);
  });
  it("rejects a missing @", () => {
    expect(isValidEmail("a-b.com")).toBe(false);
  });
  it("rejects a missing domain dot", () => {
    expect(isValidEmail("a@b")).toBe(false);
  });
});

describe("isValidLuhn", () => {
  it("accepts a known-valid test card number", () => {
    expect(isValidLuhn("4111111111111111")).toBe(true);
  });
  it("rejects a single-digit-altered number", () => {
    expect(isValidLuhn("4111111111111112")).toBe(false);
  });
  it("rejects non-numeric input", () => {
    expect(isValidLuhn("not-a-card")).toBe(false);
  });
});

describe("isValidIban", () => {
  it("accepts a known-valid IBAN", () => {
    expect(isValidIban("GB29 NWBK 6016 1331 9268 19")).toBe(true);
  });
  it("rejects an altered IBAN", () => {
    expect(isValidIban("GB29 NWBK 6016 1331 9268 18")).toBe(false);
  });
  it("rejects malformed input", () => {
    expect(isValidIban("not-an-iban")).toBe(false);
  });
});
