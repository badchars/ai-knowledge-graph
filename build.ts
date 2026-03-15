// build.ts — Bun build script for AI/ML Knowledge Graph
// Reads data/terms/*.yaml + data/*.yaml + data/ui.json + templates/ → generates dist/
// Usage: bun run build.ts

import { readdir, readFile, writeFile, mkdir, cp } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
import yaml from "js-yaml";

const ROOT = import.meta.dir;
const DIST = join(ROOT, "dist");
const DATA = join(ROOT, "data");

async function readJSON(path: string) {
  return JSON.parse(await readFile(path, "utf-8"));
}

async function readYAML(path: string) {
  return yaml.load(await readFile(path, "utf-8"));
}

async function loadTerms(): Promise<any[]> {
  const termsDir = join(DATA, "terms");
  const files = (await readdir(termsDir)).filter(f => f.endsWith(".yaml") && !f.startsWith("_"));
  const terms: any[] = [];
  for (const file of files.sort()) {
    terms.push(await readYAML(join(termsDir, file)));
  }
  return terms;
}

async function build() {
  console.log("Building AI/ML Knowledge Graph...\n");

  // 1. Read data from YAML (terms, relationships, categories) + JSON (ui)
  const categories = await readYAML(join(DATA, "categories.yaml")) as Record<string, any>;
  const relationships = await readYAML(join(DATA, "relationships.yaml")) as any[];
  const uiStrings = await readJSON(join(DATA, "ui.json"));
  const terms = await loadTerms();

  console.log(`  ${terms.length} terms`);
  console.log(`  ${relationships.length} relationships`);
  console.log(`  ${Object.keys(categories).length} categories`);
  console.log(`  ${Object.keys(uiStrings).length} languages\n`);

  // 2. Create dist dirs
  await mkdir(join(DIST, "term"), { recursive: true });
  await mkdir(join(DIST, "css"), { recursive: true });
  await mkdir(join(DIST, "js"), { recursive: true });
  await mkdir(join(DIST, "data"), { recursive: true });
  await mkdir(join(DIST, "data/term"), { recursive: true });

  // 3. Copy static assets
  const publicDir = join(ROOT, "public");
  for (const sub of ["css", "js", "img"]) {
    const src = join(publicDir, sub);
    if (existsSync(src)) {
      await cp(src, join(DIST, sub), { recursive: true });
    }
  }
  console.log("  Copied public/ → dist/");

  // 4. Write aggregated graph data (includes full term data for inline detail)
  const graphData = {
    terms: terms.map((t: any) => ({
      id: t.id,
      name: t.name,
      fullName: t.fullName,
      category: t.category,
      desc: t.desc,
      analogy: t.analogy,
      security: t.security,
      config: t.config,
      research: t.research,
      tips: t.tips,
    })),
    relationships,
    categories,
  };
  await writeFile(join(DIST, "data/graph.json"), JSON.stringify(graphData));
  console.log("  Generated data/graph.json");

  // 5. Build term lookup for related terms
  const termMap: Record<string, any> = {};
  terms.forEach((t: any) => (termMap[t.id] = t));

  // 6. Generate index.html
  const indexTemplate = await readFile(join(ROOT, "templates/index.html"), "utf-8");
  // Escape < as \u003c to prevent </script> from closing the script tag
  const safeJSON = (obj: any) =>
    JSON.stringify(obj).replace(/</g, '\\u003c');
  // Use function replacer to avoid $' $` $& special patterns in replacement strings
  const safeSub = (tpl: string, key: string, val: string) =>
    tpl.replace(key, () => val);
  const indexHtml = safeSub(safeSub(indexTemplate,
    "{{UI_STRINGS}}", safeJSON(uiStrings)),
    "{{GRAPH_DATA}}", safeJSON(graphData));
  await writeFile(join(DIST, "index.html"), indexHtml);
  console.log("  Generated index.html");

  // 7. Generate term detail pages
  const termTemplate = await readFile(join(ROOT, "templates/term.html"), "utf-8");

  for (const term of terms) {
    const cat = categories[term.category];
    const catColor = cat?.color || "#888";

    // Find related terms via relationships
    const related: any[] = [];
    relationships.forEach((r: any) => {
      if (r.source === term.id && termMap[r.target]) {
        const other = termMap[r.target];
        related.push({
          id: other.id,
          name: other.name,
          color: categories[other.category]?.color || "#888",
          relLabel: r.label,
        });
      }
      if (r.target === term.id && termMap[r.source]) {
        const other = termMap[r.source];
        related.push({
          id: other.id,
          name: other.name,
          color: categories[other.category]?.color || "#888",
          relLabel: r.label,
        });
      }
    });

    // Term data with category label added
    const termData = {
      ...term,
      _catLabel: cat?.label || {},
    };

    // Write per-term JSON for inline detail expansion
    const termDetail = { ...termData, _catColor: catColor, _related: related };
    await writeFile(join(DIST, `data/term/${term.id}.json`), JSON.stringify(termDetail));

    let html = termTemplate
      .replace(/\{\{TERM_NAME\}\}/g, term.name)
      .replace(/\{\{TERM_FULLNAME\}\}/g, term.fullName)
      .replace(/\{\{CAT_COLOR\}\}/g, catColor);
    html = safeSub(html, "{{UI_STRINGS}}", safeJSON(uiStrings));
    html = safeSub(html, "{{TERM_DATA}}", safeJSON(termData));
    html = safeSub(html, "{{RELATED_DATA}}", safeJSON(related));

    await writeFile(join(DIST, `term/${term.id}.html`), html);
  }
  console.log(`  Generated ${terms.length} term pages + JSON files`);

  console.log("\nBuild complete! Open dist/index.html to preview.");
}

build().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
