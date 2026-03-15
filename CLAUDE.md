# AI/ML Knowledge Graph — CLAUDE.md

## Project Overview
- **Path:** `/Users/orhanyildirim/Desktop/aum-pipeline/mcp/ai-knowledge-graph/`
- **Purpose:** Interactive, multilingual AI/ML knowledge graph with D3.js — 132 terms, 531 relationships, 11 categories, 6 languages
- **Runtime:** Bun 1.3.9, TypeScript 5.8
- **Build dep:** js-yaml 4.1.1 (YAML→JSON at build time)
- **Frontend:** Pure HTML/CSS/JS + D3.js v7 (zero framework)
- **License:** MIT
- **Deploy target:** GitHub Pages (Actions-based)

## Architecture
```
data/terms/*.yaml (132 individual YAML files)
data/relationships.yaml (531 edges with 6-lang labels)
data/categories.yaml (11 categories with colors)
data/ui.json (UI strings, 6 languages)
    ↓ build.ts (Bun)
dist/index.html (graph page with inline data)
dist/term/*.html (132 term detail pages)
dist/data/graph.json (aggregated data)
dist/css/, dist/js/ (static assets)
```

## Commands
```bash
bun install          # install dependencies
bun run build        # YAML → static site in dist/
bun run dev          # build + open in browser
bun run validate     # schema validation (0 errors = OK)
bun run migrate      # one-time JSON→YAML migration (already done)
```

## Data Format

### Term YAML (`data/terms/{id}.yaml`)
Each term has:
- `id` — lowercase hyphenated, matches filename
- `name` — short display name (e.g., "GPU")
- `fullName` — expanded name (e.g., "Graphics Processing Unit")
- `category` — one of: hardware, architecture, training, quantization, inference, prompting, tools, models, ai-security, fundamentals, ecosystem
- `desc` — 6-language descriptions (tr, en, fr, zh, ar, ru). en required.
- `analogy` — 6-language real-world comparisons
- `security[]` — vulnerability findings with title (6-lang), description (6-lang), severity (critical|high|medium|low)
- `config[]` — configuration tips with title (6-lang), description (6-lang), code blocks
- `research[]` — links with url + label
- `tips[]` — quick tips (6-lang)

### Relationships (`data/relationships.yaml`)
```yaml
- source: term-id-1
  target: term-id-2
  label:
    tr: iliskili
    en: related to
    fr: lié à
    zh: 相关
    ar: مرتبط بـ
    ru: связан с
```

### Categories (`data/categories.yaml`)
11 categories, each with `color` (hex) and `label` (6-lang).

## Key Files
| File | Purpose |
|------|---------|
| `build.ts` | Main build script — reads YAML, generates dist/ |
| `scripts/validate.ts` | Schema validation for all YAML files |
| `scripts/migrate-to-yaml.ts` | One-time migration from JSON (already done) |
| `public/js/graph.js` | D3.js v7 force-directed graph — synapse/neural node style |
| `public/js/i18n.js` | Client-side language switching |
| `public/js/theme.js` | Light/dark theme toggle |
| `public/css/style.css` | Theme system, glassmorphism, responsive, neural animations |
| `templates/index.html` | Graph page template ({{GRAPH_DATA}}, {{UI_STRINGS}}) |
| `templates/term.html` | Term detail page template |
| `data/terms/_template.yaml` | Contributor template for new terms |

## Visual Style
- **Synapse/Neural nodes:** soma (cell body) + nucleus (center dot) + dendrites (organic spikes)
- **Links:** quadratic bezier curves, dashed with `synfire` CSS animation (4s)
- **Default link opacity:** very low (`15`/`20` hex) — only visible on hover/selection
- **Active node:** persistent highlight when side panel is open (connected links bright, unconnected nodes dimmed)
- **Themes:** light and dark with glassmorphism panels

## Graph.js Key Implementation Details
- Gradients: 3-stop soma gradient (white center → category color → fade)
- Dendrites: max 5 per node, positioned using golden angle
- Links: `stroke-dasharray: '3 8'`, synfire animation
- Link labels: hidden by default (opacity: 0), shown on node hover/select
- `activeNode` variable tracks selected node for persistent highlighting
- `highlightNode(d)` / `clearHighlight()` functions manage link/node visibility
- `openPanel(d)` sets activeNode and calls highlightNode
- Theme observer updates soma/nucleus/dendrite fill colors on theme change

## 11 Categories
| ID | Color | EN Label |
|----|-------|----------|
| hardware | #f87171 | Hardware |
| architecture | #60a5fa | Architecture |
| training | #a78bfa | Training |
| quantization | #34d399 | Quantization |
| inference | #fbbf24 | Inference |
| prompting | #f472b6 | Prompting |
| tools | #a3e635 | Tools & Agents |
| models | #22d3ee | Model Types |
| ai-security | #ef4444 | AI Security |
| fundamentals | #8b5cf6 | Fundamentals |
| ecosystem | #f59e0b | Ecosystem |

## 6 Supported Languages
tr (Turkish), en (English), fr (French), zh (Chinese), ar (Arabic, RTL), ru (Russian)

## Contributor Workflow
1. Fork repo
2. Copy `data/terms/_template.yaml` → `data/terms/new-term.yaml`
3. Fill in fields (en required, other langs encouraged)
4. Add relationships in `data/relationships.yaml`
5. Run `bun run validate` → 0 errors
6. PR → GitHub Actions validates → merge → auto-deploy to Pages

## GitHub Actions
- `.github/workflows/validate.yml` — runs on PR when data/** changes: validate + test build
- `.github/workflows/deploy.yml` — runs on push to main: build → upload-pages-artifact → deploy-pages

## Issue Templates
- `.github/ISSUE_TEMPLATE/new-term.yml` — suggest new term
- `.github/ISSUE_TEMPLATE/update-term.yml` — update existing term
- `.github/ISSUE_TEMPLATE/add-translation.yml` — add/fix translation

## Security Content Philosophy
Every term's security section is directly tied to its own mechanism — not generic cybersecurity advice. For example:
- GPU → memory isolation, side-channel, CUDA stream hijacking
- Tokenizer → homoglyph attacks, BPE smuggling, Unicode manipulation
- RAG → document poisoning, retrieval manipulation
- Indirect Prompt Injection → RAG-based attacks, tool-use hijacking

## Critical Rules
- **YAML format:** All term data is individual YAML files. NEVER create a monolithic JSON.
- **Filename = ID:** `data/terms/gpu.yaml` must have `id: gpu` inside
- **6 languages:** Always include all 6 language keys, even if empty string
- **Severity enum:** Only `critical`, `high`, `medium`, `low`
- **lineWidth: -1** in YAML dump to prevent URL wrapping
- **_template.yaml** starts with underscore → excluded from build
- **ui.json stays JSON** (not contributor-facing, complex structure)
