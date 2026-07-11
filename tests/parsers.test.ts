import { describe, expect, it } from "vitest";
import { parseCsvLine, parseCurrency, parseDuration } from "../src/functions/parsers.js";

describe("parseCsvLine", () => {
  it("splits simple fields", () => {
    expect(parseCsvLine("a,b,c")).toEqual(["a", "b", "c"]);
  });
  it("honors quoted fields containing commas", () => {
    expect(parseCsvLine('a,"b,c",d')).toEqual(["a", "b,c", "d"]);
  });
  it("unescapes doubled quotes inside a quoted field", () => {
    expect(parseCsvLine('"say ""hi"""')).toEqual(['say "hi"']);
  });
});

describe("parseCurrency", () => {
  it("parses a leading-symbol amount", () => {
    expect(parseCurrency("$1,234.56")).toEqual({ amount: 1234.56, currency: "USD" });
  });
  it("parses a trailing ISO code", () => {
    expect(parseCurrency("99.99 EUR")).toEqual({ amount: 99.99, currency: "EUR" });
  });
  it("throws on unrecognized formats", () => {
    expect(() => parseCurrency("not money")).toThrow();
  });
});

describe("parseDuration", () => {
  it("parses combined units", () => {
    expect(parseDuration("2h30m")).toBe(2 * 3600 + 30 * 60);
  });
  it("parses a single unit", () => {
    expect(parseDuration("45s")).toBe(45);
  });
  it("parses days", () => {
    expect(parseDuration("1d")).toBe(86400);
  });
  it("throws on unrecognized formats", () => {
    expect(() => parseDuration("banana")).toThrow();
  });
});
