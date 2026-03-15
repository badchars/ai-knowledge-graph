// scripts/migrate-to-yaml.ts — One-time migration: JSON → individual YAML files
// Usage: bun run scripts/migrate-to-yaml.ts

import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import yaml from "js-yaml";

const ROOT = join(import.meta.dir, "..");
const DATA = join(ROOT, "data");

async function readJSON(path: string) {
  return JSON.parse(await readFile(path, "utf-8"));
}

async function migrate() {
  console.log("Migrating JSON → YAML...\n");

  // 1. Migrate terms.json → data/terms/*.yaml
  const terms: any[] = await readJSON(join(DATA, "terms.json"));
  const termsDir = join(DATA, "terms");
  await mkdir(termsDir, { recursive: true });

  let count = 0;
  for (const term of terms) {
    const filename = `${term.id}.yaml`;
    const yamlStr = yaml.dump(term, {
      lineWidth: -1,       // no line wrapping (keeps URLs intact)
      noRefs: true,        // no YAML anchors/refs
      sortKeys: false,     // preserve key order
      quotingType: '"',    // use double quotes when needed
      forceQuotes: false,  // only quote when necessary
    });
    await writeFile(join(termsDir, filename), yamlStr);
    count++;
  }
  console.log(`  ✓ ${count} term YAML files → data/terms/`);

  // 2. Migrate relationships.json → data/relationships.yaml
  const relationships = await readJSON(join(DATA, "relationships.json"));
  await writeFile(
    join(DATA, "relationships.yaml"),
    yaml.dump(relationships, { lineWidth: -1, noRefs: true, sortKeys: false })
  );
  console.log(`  ✓ ${relationships.length} relationships → data/relationships.yaml`);

  // 3. Migrate categories.json → data/categories.yaml
  const categories = await readJSON(join(DATA, "categories.json"));
  await writeFile(
    join(DATA, "categories.yaml"),
    yaml.dump(categories, { lineWidth: -1, noRefs: true, sortKeys: false })
  );
  console.log(`  ✓ ${Object.keys(categories).length} categories → data/categories.yaml`);

  // 4. Roundtrip verification
  console.log("\nVerifying roundtrip...");
  const reloaded: any[] = [];
  for (const term of terms) {
    const yamlContent = await readFile(join(termsDir, `${term.id}.yaml`), "utf-8");
    reloaded.push(yaml.load(yamlContent));
  }

  const origJSON = JSON.stringify(terms);
  const reloadJSON = JSON.stringify(reloaded);
  if (origJSON === reloadJSON) {
    console.log("  ✓ Roundtrip OK — YAML ↔ JSON match perfectly");
  } else {
    console.error("  ✗ Roundtrip MISMATCH — check YAML output");
    // Find first difference
    for (let i = 0; i < terms.length; i++) {
      if (JSON.stringify(terms[i]) !== JSON.stringify(reloaded[i])) {
        console.error(`    First diff at term: ${terms[i].id}`);
        break;
      }
    }
    process.exit(1);
  }

  console.log(`\nMigration complete! ${count} YAML files created.`);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
