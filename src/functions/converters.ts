/** Format/unit conversion functions. Pure, stateless, no external I/O. */

export type TemperatureUnit = "C" | "F" | "K";

/** Convert a temperature value between Celsius, Fahrenheit, and Kelvin. */
export function convertTemperature(value: number, from: TemperatureUnit, to: TemperatureUnit): number {
  if (from === to) return value;
  const celsius = from === "C" ? value : from === "F" ? ((value - 32) * 5) / 9 : value - 273.15;
  if (to === "C") return celsius;
  if (to === "F") return (celsius * 9) / 5 + 32;
  return celsius + 273.15;
}

/** Format a byte count as a human-readable string (e.g. 1536 -> "1.5 KB"). */
export function bytesToHuman(bytes: number, decimals = 2): string {
  if (bytes < 0) throw new Error("bytes must be >= 0");
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, exponent);
  return `${value.toFixed(decimals).replace(/\.?0+$/, "")} ${units[exponent]}`;
}

/** Convert arbitrary text into a URL-safe slug. */
export function slugify(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
