// scripts/validate.ts — Validates all YAML data files
// Usage: bun run scripts/validate.ts
// Exit code: 0 = valid, 1 = errors found

import { readdir, readFile } from "fs/promises";
import { join } from "path";
import yaml from "js-yaml";

const ROOT = join(import.meta.dir, "..");
const DATA = join(ROOT, "data");

const VALID_CATEGORIES = [
  "hardware", "architecture", "training", "quantization", "inference",
  "prompting", "tools", "models", "ai-security", "fundamentals", "ecosystem",
];
const VALID_SEVERITIES = ["critical", "high", "medium", "low"];
const LANGUAGES = ["tr", "en", "fr", "zh", "ar", "ru"];

interface Result {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

async function validate(): Promise<Result> {
  const errors: string[] = [];
  const warnings: string[] = [];
  const termIds = new Set<string>();

  // 1. Validate categories.yaml
  console.log("Checking categories.yaml...");
  let categories: Record<string, any>;
  try {
    categories = yaml.load(await readFile(join(DATA, "categories.yaml"), "utf-8")) as any;
    for (const [id, cat] of Object.entries(categories)) {
      if (!cat.color) errors.push(`categories: ${id} missing color`);
      if (!cat.label?.en) errors.push(`categories: ${id} missing label.en`);
    }
    console.log(`  ${Object.keys(categories).length} categories OK`);
  } catch (e: any) {
    errors.push(`categories.yaml parse error: ${e.message}`);
    return { valid: false, errors, warnings };
  }

  // 2. Validate each term YAML
  console.log("Checking terms...");
  const termsDir = join(DATA, "terms");
  const files = (await readdir(termsDir)).filter(f => f.endsWith(".yaml") && !f.startsWith("_"));

  for (const file of files.sort()) {
    const path = join(termsDir, file);
    const expectedId = file.replace(".yaml", "");
    let term: any;

    try {
      term = yaml.load(await readFile(path, "utf-8"));
    } catch (e: any) {
      errors.push(`${file}: YAML parse error — ${e.message}`);
      continue;
    }

    // Required fields
    if (!term.id) errors.push(`${file}: missing 'id'`);
    else if (term.id !== expectedId) errors.push(`${file}: id '${term.id}' doesn't match filename`);

    if (!term.name) errors.push(`${file}: missing 'name'`);
    if (!term.fullName) errors.push(`${file}: missing 'fullName'`);

    if (!term.category) {
      errors.push(`${file}: missing 'category'`);
    } else if (!VALID_CATEGORIES.includes(term.category)) {
      errors.push(`${file}: invalid category '${term.category}'`);
    }

    // Description — en required, others warned
    if (!term.desc?.en) {
      errors.push(`${file}: missing desc.en`);
    }
    for (const lang of LANGUAGES) {
      if (lang !== "en" && !term.desc?.[lang]) {
        warnings.push(`${file}: missing desc.${lang}`);
      }
    }

    // Security findings
    if (term.security && Array.isArray(term.security)) {
      term.security.forEach((s: any, i: number) => {
        if (!s.title?.en) errors.push(`${file}: security[${i}] missing title.en`);
        if (!s.description?.en) errors.push(`${file}: security[${i}] missing description.en`);
        if (s.severity && !VALID_SEVERITIES.includes(s.severity)) {
          errors.push(`${file}: security[${i}] invalid severity '${s.severity}'`);
        }
      });
    }

    // Research URLs
    if (term.research && Array.isArray(term.research)) {
      term.research.forEach((r: any, i: number) => {
        if (!r.url) errors.push(`${file}: research[${i}] missing url`);
        if (!r.label?.en) warnings.push(`${file}: research[${i}] missing label.en`);
      });
    }

    if (term.id) {
      if (termIds.has(term.id)) errors.push(`${file}: duplicate id '${term.id}'`);
      termIds.add(term.id);
    }
  }
  console.log(`  ${files.length} term files checked`);

  // 3. Validate relationships.yaml
  console.log("Checking relationships.yaml...");
  let relationships: any[];
  try {
    relationships = yaml.load(await readFile(join(DATA, "relationships.yaml"), "utf-8")) as any[];
  } catch (e: any) {
    errors.push(`relationships.yaml parse error: ${e.message}`);
    return { valid: false, errors, warnings };
  }

  relationships.forEach((r: any, i: number) => {
    if (!r.source) errors.push(`relationship[${i}]: missing source`);
    else if (!termIds.has(r.source)) errors.push(`relationship[${i}]: source '${r.source}' not found in terms`);

    if (!r.target) errors.push(`relationship[${i}]: missing target`);
    else if (!termIds.has(r.target)) errors.push(`relationship[${i}]: target '${r.target}' not found in terms`);

    if (!r.label?.en) errors.push(`relationship[${i}]: missing label.en`);
  });
  console.log(`  ${relationships.length} relationships checked`);

  return { valid: errors.length === 0, errors, warnings };
}

async function main() {
  const result = await validate();

  console.log("\n" + "=".repeat(50));
  if (result.errors.length > 0) {
    console.log(`\nERRORS (${result.errors.length}):`);
    result.errors.forEach(e => console.log(`  ✗ ${e}`));
  }
  if (result.warnings.length > 0) {
    console.log(`\nWARNINGS (${result.warnings.length}):`);
    result.warnings.slice(0, 20).forEach(w => console.log(`  ⚠ ${w}`));
    if (result.warnings.length > 20) {
      console.log(`  ... and ${result.warnings.length - 20} more`);
    }
  }

  console.log(`\nResult: ${result.valid ? "VALID ✓" : "INVALID ✗"}`);
  console.log(JSON.stringify({ valid: result.valid, errorCount: result.errors.length, warningCount: result.warnings.length }));

  if (!result.valid) process.exit(1);
}

main().catch((err) => {
  console.error("Validation failed:", err);
  process.exit(1);
});
