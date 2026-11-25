// Roast Your Own Agent — one line, at most 140 characters.
// Writes the roast to /output/entry.txt (the harness output path).
//
// Structure: the entry text lives in one constant, validation is split
// into small single-purpose checks, and writing is isolated so the
// entry point (main) reads as a short sequence of steps.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "My agent made 40 tool calls, read everything twice, then answered a question I never asked \u2014 with total confidence.";

const OUTPUT_PATH = "/output/entry.txt";

// Gate limits from the bounty spec: UTF-8 text of 1 to 140 characters.
// Kept as named constants so a limit change touches one place only.
const MIN_CHARS = 1;
const MAX_CHARS = 140;

/** Count characters as Unicode code points, so multi-byte glyphs count once. */
function countChars(text: string): number {
  return [...text].length;
}

/** Reject entries outside the 1-140 character window. */
function validateLength(text: string): number {
  const chars = countChars(text);
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(
      `Entry is ${chars} characters; must be ${MIN_CHARS}-${MAX_CHARS}.`,
    );
  }
  return chars;
}

/** Reject entries that are only whitespace. */
function assertNotBlank(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("Entry must not be only whitespace.");
  }
}

/** Reject entries that span more than one line. */
function assertSingleLine(text: string): void {
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("Entry must be a single line.");
  }
}

/** Run every gate check and return the validated character count. */
function validateLine(text: string): number {
  assertNotBlank(text);
  assertSingleLine(text);
  return validateLength(text);
}

/** Create the output directory if needed, then write the entry as UTF-8. */
function writeEntry(path: string, text: string): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text, "utf8");
}

function main(): void {
  // Validate first so a bad entry fails before any file is created.
  const chars = validateLine(ENTRY);
  writeEntry(OUTPUT_PATH, ENTRY);
  console.log(`Wrote ${chars} characters to ${OUTPUT_PATH}`);
}

main();
