// Funniest Time Machine Warning Label — R1 entry.
// Reads entry.txt, validates it against the competition gate
// (UTF-8 text, 1–120 characters, not only whitespace, single line),
// and writes it to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Node stdlib only.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(join(here, "entry.txt"), "utf8");

// The entry is a single line; a trailing newline in the file is not part of it.
const line = raw.replace(/\r?\n$/, "");

if (line.length < 1 || line.length > 120) {
  throw new Error(`entry must be 1-120 characters, got ${line.length}`);
}
if (line.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (/[\r\n]/.test(line)) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
mkdirSync(outDir, { recursive: true });
const outText = line + "\n";
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, outText, "utf8");
console.log(`Entry saved (${line.length} characters) at ${outPath}`);
