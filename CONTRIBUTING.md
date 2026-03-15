# Contributing to AI/ML Knowledge Graph

Thank you for your interest in contributing! This project is a multilingual, interactive knowledge graph covering AI/ML concepts, security, and infrastructure.

## How to Contribute

### Adding a New Term

1. **Fork** this repository
2. **Copy** the template: `cp data/terms/_template.yaml data/terms/your-term-id.yaml`
3. **Fill in** the fields (see below for details)
4. **Add relationships** in `data/relationships.yaml` connecting your term to existing terms
5. **Submit a PR** — our CI will validate your changes automatically

### Updating an Existing Term

1. Find the term file in `data/terms/` (e.g., `data/terms/gpu.yaml`)
2. Edit the relevant fields
3. Submit a PR

### Adding a Translation

1. Open the term file (e.g., `data/terms/gpu.yaml`)
2. Fill in the empty language fields (`fr`, `zh`, `ar`, `ru`)
3. Submit a PR

## Term File Structure

Each term is a YAML file in `data/terms/`. Required fields:

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Lowercase, hyphenated. Must match filename |
| `name` | Yes | Short display name (e.g., "GPU") |
| `fullName` | Yes | Full name (e.g., "Graphics Processing Unit") |
| `category` | Yes | One of the categories listed below |
| `desc.en` | Yes | English description (2-3 paragraphs) |
| `desc.tr` | Encouraged | Turkish description |
| `analogy` | Optional | Real-world comparison |
| `security` | Optional | Security findings with severity |
| `config` | Optional | Configuration tips with code examples |
| `research` | Optional | Links to papers and resources |
| `tips` | Optional | Quick tips |

### Categories

`hardware` `architecture` `training` `quantization` `inference` `prompting` `tools` `models` `ai-security` `fundamentals` `ecosystem`

### Severity Levels

For security findings: `critical` `high` `medium` `low`

### Languages

We support 6 languages: `tr` (Turkish), `en` (English), `fr` (French), `zh` (Chinese), `ar` (Arabic), `ru` (Russian).

English is required. Other languages are strongly encouraged.

## Adding Relationships

Relationships connect terms in the graph. Edit `data/relationships.yaml`:

```yaml
- source: your-term-id
  target: existing-term-id
  label:
    tr: iliskili
    en: related to
    fr: lié à
    zh: 相关
    ar: مرتبط بـ
    ru: связан с
```

Common relationship labels:
- `uses` / `kullanir` — one term uses another
- `variant of` / `turevi` — a specialization
- `enables` / `saglar` — one enables the other
- `targets` / `hedef alir` — attacks/targets
- `defends against` / `savunur` — defensive measure
- `related to` / `iliskili` — general relation

## Validation

Before submitting, run locally:

```bash
bun install
bun run validate    # check YAML structure
bun run build       # test build
```

The CI pipeline runs these checks automatically on every PR.

## Development

```bash
bun install         # install dependencies
bun run build       # build static site → dist/
bun run dev         # build and open in browser
```

## Code of Conduct

Be respectful, accurate, and constructive. Security findings should be educational, not instructional for attacks.
