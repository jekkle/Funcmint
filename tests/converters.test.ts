import { describe, expect, it } from "vitest";
import { bytesToHuman, convertTemperature, slugify } from "../src/functions/converters.js";

describe("convertTemperature", () => {
  it("converts C to F", () => {
    expect(convertTemperature(0, "C", "F")).toBeCloseTo(32, 5);
  });
  it("converts F to C", () => {
    expect(convertTemperature(212, "F", "C")).toBeCloseTo(100, 5);
  });
  it("converts C to K", () => {
    expect(convertTemperature(0, "C", "K")).toBeCloseTo(273.15, 2);
  });
  it("is a no-op for same-unit conversion", () => {
    expect(convertTemperature(42, "C", "C")).toBe(42);
  });
});

describe("bytesToHuman", () => {
  it("formats zero", () => {
    expect(bytesToHuman(0)).toBe("0 B");
  });
  it("formats kilobytes", () => {
    expect(bytesToHuman(1536)).toBe("1.5 KB");
  });
  it("formats megabytes", () => {
    expect(bytesToHuman(5 * 1024 * 1024)).toBe("5 MB");
  });
});

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });
  it("strips punctuation", () => {
    expect(slugify("What's Up, Doc?!")).toBe("what-s-up-doc");
  });
  it("trims leading/trailing hyphens", () => {
    expect(slugify("  --Edge Case--  ")).toBe("edge-case");
  });
});
