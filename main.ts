// Roast Your Own Agent — a single roast line, no more than 140 chars.
// The program writes that line to /output/entry.txt, where the harness
// expects it. The roast itself is one fixed string; everything around
// it is plumbing: measuring it, checking it against the bounty gates,
// and saving it to disk. Keeping those jobs in separate small functions
// makes each gate easy to read and to test on its own.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ROAST_LINE =
  "My agent made 40 tool calls, read everything twice, then answered a question I never asked \u2014 with total confidence.";

const DESTINATION = "/output/entry.txt";

// The bounty only accepts text between 1 and 140 characters long.
// Naming the limits here means a future limit change edits one spot.
const LOWER_LIMIT = 1;
const UPPER_LIMIT = 140;

/** Measure a string in Unicode code points, so an em dash counts as one. */
function measureInCodePoints(line: string): number {
  return [...line].length;
}

/** Throw unless the measured size sits inside the allowed window. */
function checkBounds(size: number): void {
  if (size < LOWER_LIMIT || size > UPPER_LIMIT) {
    throw new Error(
      `Entry is ${size} characters; must be ${LOWER_LIMIT}-${UPPER_LIMIT}.`,
    );
  }
}

/** Measure the line, then enforce the length window; return the size. */
function checkLength(line: string): number {
  const size = measureInCodePoints(line);
  checkBounds(size);
  return size;
}

/** Throw if the line is empty or contains only spaces and tabs. */
function rejectBlank(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("Entry must not be only whitespace.");
  }
}

/** Throw if the line contains a newline or carriage return anywhere. */
function rejectMultiline(line: string): void {
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Entry must be a single line.");
  }
}

/**
 * Apply the gates in order — length, then blank, then single line —
 * and hand back the validated character count for the log message.
 */
function runGates(line: string): number {
  const size = checkLength(line);
  rejectBlank(line);
  rejectMultiline(line);
  return size;
}

/**
 * Make sure the destination folder exists, then save the roast as
 * plain UTF-8 text with no trailing newline added.
 */
function saveRoast(target: string, line: string): void {
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, line, "utf8");
}

function main(): void {
  // Check the line before touching the disk: a rejected entry should
  // fail loudly instead of leaving a stale file behind.
  const size = runGates(ROAST_LINE);
  saveRoast(DESTINATION, ROAST_LINE);
  console.log(`Wrote ${size} characters to ${DESTINATION}`);
}

main();
