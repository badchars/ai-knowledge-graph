<div align="center">

<br/>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/badchars/ai-knowledge-graph/main/.github/banner-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/badchars/ai-knowledge-graph/main/.github/banner-light.svg">
  <img alt="AI/ML Knowledge Graph" src="https://raw.githubusercontent.com/badchars/ai-knowledge-graph/main/.github/banner-dark.svg" width="700">
</picture>

<br/><br/>

<br/>

**132 terms &middot; 531 relationships &middot; 11 categories &middot; 6 languages**

<br/>

[![License: MIT](https://img.shields.io/badge/license-MIT-000000?style=flat-square)](LICENSE)
[![Terms](https://img.shields.io/badge/terms-132-007aff?style=flat-square)](data/terms/)
[![Relationships](https://img.shields.io/badge/relationships-531-34c759?style=flat-square)](data/relationships.yaml)
[![Categories](https://img.shields.io/badge/categories-11-ff9500?style=flat-square)](data/categories.yaml)
[![Languages](https://img.shields.io/badge/languages-6-ff3b30?style=flat-square)](#-supported-languages)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-007aff?style=flat-square)](CONTRIBUTING.md)
[![Built with Bun](https://img.shields.io/badge/bun-1.0+-f9f1e1?style=flat-square&logo=bun)](https://bun.sh)
[![D3.js](https://img.shields.io/badge/d3.js-v7-f9a03c?style=flat-square&logo=d3dotjs)](https://d3js.org)
[![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-24292e?style=flat-square&logo=github)](https://pages.github.com)

<br/>

```
         ╭──────────────────────────────────────────────────────╮
         │                                                      │
         │     GPU ──── CUDA ──── vLLM ──── KV-Cache            │
         │      │                  │           │                │
         │    VRAM    Transformer ─┤     PagedAttention         │
         │      │        │   │    │           │                 │
         │    DGX    Attention MoE │    Continuous Batch        │
         │             │         │                              │
         │        Embedding ── RAG ── Prompt Injection          │
         │             │       │          │                     │
         │        Vector DB   LLM    Jailbreak                  │
         │                     │         │                      │
         │             Fine-tuning   Guardrails                 │
         │                 │             │                      │
         │              LoRA         AI Firewall                │
         │                                                      │
         ╰──────────────────────────────────────────────────────╯
```

</div>

<br/>

---

<br/>

## Why This Project Exists

The AI revolution has introduced **hundreds of new technical terms** into our vocabulary in just the last few years. From _transformer architectures_ to _prompt injection attacks_, from _quantization formats_ to _agentic AI frameworks_ — the terminology landscape is expanding faster than any textbook, course, or documentation can keep up with.

**This is a real problem across every technical role:**

- A **developer** integrating an LLM API encounters terms like _KV-cache_, _temperature_, _top-p_, _system prompt_ — but how do they connect? What are the security implications of each?
- A **cybersecurity professional** auditing an AI system needs to understand _indirect prompt injection_, _RAG poisoning_, _model denial-of-service_ — but where is the map?
- A **DevSecOps engineer** deploying vLLM on Kubernetes needs to know about _tensor parallelism_, _continuous batching_, _PagedAttention_, _CUDA stream hijacking_ — all in context, all connected.
- A **researcher** needs to see how _differential privacy_ relates to _training data extraction_, how _RLHF_ connects to _alignment_, how _MoE_ changes the inference landscape.

**Existing resources are scattered.** Blog posts cover individual topics. Documentation lives in silos. No single resource maps the connections between AI/ML concepts, their security implications, and practical configurations — across multiple languages.

**This project fills that gap.** An interactive, force-directed knowledge graph that visualizes how 132 AI/ML concepts relate to each other, with deep-dive content on security vulnerabilities, hardening configurations, research papers, and actionable tips — in 6 languages.

<br/>

---

<br/>

## What's Inside Each Term

Every node in the graph opens a rich, structured knowledge card:

| Section | Content | Example (`RAG`) |
|---------|---------|-----------------|
| **Description** | 2-3 paragraph explanation with inline links | How retrieval-augmented generation works, key components, why it reduces hallucination |
| **Analogy** | Real-world comparison for intuition | _"Like an open-book exam — the model looks up answers instead of memorizing everything"_ |
| **Security** | Mechanism-specific vulnerabilities with severity | Document poisoning (high), retrieval manipulation (high), context injection (medium) |
| **Configuration** | Working code examples for hardening | Python: chunk size limits, embedding validation, retrieval filtering |
| **Research** | Papers, official docs, OWASP guides | arXiv links, vendor documentation, security advisories |
| **Tips** | Quick actionable recommendations | _"Always validate retrieved documents before injecting into the prompt"_ |

<br/>

### Security-First Content

Every term's security section is **tied to its own mechanism** — not generic advice.

| Term | Security Focus |
|------|---------------|
| **GPU** | Memory isolation vulnerabilities, side-channel attacks, CUDA stream hijacking |
| **Transformer** | Self-attention memorization, positional encoding manipulation |
| **KV-Cache** | Cross-tenant cache poisoning, attention state leakage |
| **Tokenizer** | Homoglyph attacks, BPE token smuggling, Unicode manipulation |
| **RAG** | Document poisoning, retrieval manipulation, context injection |
| **LoRA** | Adapter poisoning, malicious adapter injection on shared hubs |
| **vLLM** | Unauthorized API access, model theft via serving endpoints |
| **HuggingFace** | Pickle deserialization RCE, model supply chain attacks |
| **Prompt Injection** | RAG-based attacks, tool-use hijacking, agent manipulation |
| **Chat Template** | Tokenizer exploitation, system prompt boundary bypass |

<br/>

---

<br/>

## Design

The graph uses an **Apple-inspired minimal** visual language called **Snow**:

- Clean circles with low-opacity category fill and a subtle center dot
- Quadratic bezier curves for relationship links — nearly invisible, illuminated on interaction
- `Inter` font family with Apple HIG spacing and weight hierarchy
- Light mode: pure white `#fff` background, `#f5f5f7` surface cards
- Dark mode: `#1c1c1e` background, `#2c2c2e` surfaces — native Apple dark palette
- No gradients, no glow effects, no animations on nodes — pure clarity

| Feature | Details |
|---------|---------|
| **Theme** | Light & Dark with smooth transition |
| **Node sizing** | Proportional to connection count |
| **Link behavior** | Transparent by default, highlighted on hover/select |
| **Persistent highlight** | Selected node keeps connections visible while panel is open |
| **Spotlight search** | `Cmd+K` / `Ctrl+K` to search across all terms |
| **Responsive** | Desktop, tablet, and mobile layouts |

<br/>

---

<br/>

## 11 Categories

| Category | Color | Example Terms |
|----------|-------|--------------|
| **Hardware** | `#f87171` | GPU, CUDA, VRAM, TPU, DGX Spark |
| **Architecture** | `#60a5fa` | Transformer, Attention, Encoder-Decoder, MoE |
| **Training** | `#a78bfa` | Pretraining, Fine-tuning, RLHF, LoRA, DPO |
| **Quantization** | `#34d399` | FP16, INT4, GPTQ, AWQ, GGUF |
| **Inference** | `#fbbf24` | vLLM, KV-Cache, PagedAttention, Speculative Decoding |
| **Prompting** | `#f472b6` | System Prompt, RAG, Few-Shot, Chain-of-Thought |
| **Tools & Agents** | `#a3e635` | MCP, Tool Use, Function Calling, Agent, Agentic AI |
| **Model Types** | `#22d3ee` | LLM, VLM, Foundation Model, SLM |
| **AI Security** | `#ef4444` | Prompt Injection, Jailbreak, Data Poisoning, AI Firewall |
| **Fundamentals** | `#8b5cf6` | Neural Network, Deep Learning, Gradient, Backpropagation |
| **Ecosystem** | `#f59e0b` | HuggingFace, Ollama, LangChain, Gradio |

<br/>

---

<br/>

## Supported Languages

| Language | Code | Direction |
|----------|------|-----------|
| English | `en` | LTR |
| Turkish | `tr` | LTR |
| French | `fr` | LTR |
| Chinese | `zh` | LTR |
| Arabic | `ar` | **RTL** |
| Russian | `ru` | LTR |

All descriptions, analogies, security findings, tips, and relationship labels are available in all 6 languages. The UI switches dynamically, including full RTL support for Arabic.

<br/>

---

<br/>

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) v1.0+

### Install & Build

```bash
git clone https://github.com/badchars/ai-knowledge-graph.git
cd ai-knowledge-graph
bun install
bun run build
```

### Preview Locally

```bash
bun run dev          # builds and opens in browser
```

### Validate Data

```bash
bun run validate     # checks all YAML files against schema
```

<br/>

---

<br/>

## Deploy to GitHub Pages

### Automatic (Recommended)

The repo includes CI/CD workflows that handle everything:

1. **Fork** or push this repo to your GitHub account
2. Go to **Settings > Pages**
3. Under "Build and deployment", select **Source: GitHub Actions**
4. Done — every push to `main` triggers build & deploy

```
push to main → bun install → build → upload dist/ → deploy to Pages
```

### Manual

```bash
bun run build
# Upload dist/ to any static host:
# GitHub Pages, Netlify, Vercel, Cloudflare Pages, etc.
```

### PR Validation

Every pull request that touches `data/**` automatically runs:
- `bun run validate` — YAML schema check
- `bun run build` — ensures the site builds
- If either fails, the PR cannot merge

<br/>

---

<br/>

## How to Use

| Action | How |
|--------|-----|
| **Open term details** | Click any node |
| **See connections** | Hover over a node |
| **Search** | `Cmd+K` or `Ctrl+K` or click the search bar |
| **Zoom** | Scroll wheel |
| **Pan** | Click and drag the background |
| **Rearrange** | Drag individual nodes |
| **Switch language** | Language selector in the header |
| **Toggle theme** | Sun/moon icon in the header |
| **Close panel** | `ESC` key |
| **Navigate related terms** | Click related terms in the detail panel |

<br/>

---

<br/>

## Contributing

We welcome contributions from anyone — AI researchers, security professionals, developers, students.

### Quick Start

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/ai-knowledge-graph.git
cd ai-knowledge-graph && bun install

# 2. Create a new term
cp data/terms/_template.yaml data/terms/my-new-term.yaml

# 3. Edit the YAML file

# 4. Add relationships in data/relationships.yaml

# 5. Validate and test
bun run validate && bun run build

# 6. Submit a PR
```

### Contribution Types

| Type | Difficulty | Impact |
|------|-----------|--------|
| Add a new term | Medium | High |
| Add translations | Easy | High |
| Fix descriptions | Easy | Medium |
| Add security findings | Medium | Very High |
| Add research links | Easy | Medium |
| Add config examples | Medium | High |
| Report inaccuracies | Easy | High |

### Term File Format

Each term is a standalone YAML file in `data/terms/`:

```yaml
id: my-new-term              # must match filename
name: MyTerm                  # short display name
fullName: My Full Term Name   # expanded name
category: architecture        # one of 11 categories

desc:
  en: |
    English description with [inline links](https://example.com).
    Multiple paragraphs separated by blank lines.
  tr: |
    Turkish description...
  fr: ""
  zh: ""
  ar: ""
  ru: ""

analogy:
  en: "A real-world comparison..."

security:
  - title:
      en: Vulnerability Name
    description:
      en: How this vulnerability works.
    severity: high       # critical | high | medium | low

research:
  - url: https://arxiv.org/abs/xxxx.xxxxx
    label:
      en: Paper Title

tips:
  - en: A quick actionable tip
```

### Adding Relationships

```yaml
# data/relationships.yaml
- source: my-new-term
  target: transformer
  label:
    en: uses
    tr: kullanir
    fr: utilise
    zh: 使用
    ar: يستخدم
    ru: использует
```

### Issue Templates

No code required — use our forms:

- **[Suggest a New Term](../../issues/new?template=new-term.yml)**
- **[Update a Term](../../issues/new?template=update-term.yml)**
- **[Add a Translation](../../issues/new?template=add-translation.yml)**

See **[CONTRIBUTING.md](CONTRIBUTING.md)** for the full guide.

<br/>

---

<br/>

## Project Structure

```
ai-knowledge-graph/
├── build.ts                      # YAML → static site generator
├── package.json                  # build, dev, validate scripts
├── CONTRIBUTING.md
├── LICENSE                       # MIT
│
├── data/
│   ├── terms/                    # 132 individual YAML files
│   │   ├── _template.yaml        #   contributor template
│   │   ├── gpu.yaml
│   │   ├── transformer.yaml
│   │   ├── prompt-injection.yaml
│   │   └── ...
│   ├── relationships.yaml        # 531 edges (6-language labels)
│   ├── categories.yaml           # 11 categories with colors
│   └── ui.json                   # UI strings (6 languages)
│
├── public/
│   ├── css/style.css             #   Snow theme (light + dark)
│   └── js/
│       ├── graph.js              #   D3.js force simulation
│       ├── i18n.js               #   Language switching
│       └── theme.js              #   Light/dark toggle
│
├── templates/
│   ├── index.html                # Graph page template
│   └── term.html                 # Term detail page template
│
├── scripts/
│   ├── validate.ts               # YAML schema validator
│   └── migrate-to-yaml.ts       # One-time JSON → YAML migration
│
└── .github/
    ├── workflows/
    │   ├── validate.yml           # PR validation
    │   └── deploy.yml             # GitHub Pages deploy
    └── ISSUE_TEMPLATE/
        ├── new-term.yml
        ├── update-term.yml
        └── add-translation.yml
```

<br/>

---

<br/>

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Data Layer (YAML)                     │
│                                                         │
│  data/terms/*.yaml    132 individual term files          │
│  data/relationships   531 edges with 6-language labels   │
│  data/categories      11 categories with colors          │
│  data/ui.json         UI strings for 6 languages         │
└────────────────────────────┬────────────────────────────┘
                             │
                      bun run build
                             │
┌────────────────────────────▼────────────────────────────┐
│                   Build Output (dist/)                   │
│                                                         │
│  index.html          Graph page (data inlined)           │
│  term/*.html         132 individual term pages           │
│  data/graph.json     Aggregated data for API use         │
│  css/, js/           Static assets                       │
└────────────────────────────┬────────────────────────────┘
                             │
                      GitHub Actions
                             │
┌────────────────────────────▼────────────────────────────┐
│                    GitHub Pages                          │
│                                                         │
│  Static hosting — zero backend, zero database            │
│  Auto-deploys on every push to main                      │
└─────────────────────────────────────────────────────────┘
```

<br/>

---

<br/>

## Who Is This For

| Role | How This Helps |
|------|---------------|
| **Developers** | Understand AI/ML terms you encounter daily — what they mean, how they connect, security implications |
| **Security Professionals** | Map the AI attack surface — prompt injection to model theft, with mechanism-specific vulnerabilities |
| **DevSecOps Engineers** | Hardening guides with real code — every security finding includes config examples |
| **Pentesters** | Architecture knowledge reveals attack vectors — understand AI systems deeply enough to test them |
| **AI/ML Engineers** | Quick reference for the ecosystem — tools, frameworks, and techniques in context |
| **Students & Researchers** | Analogies make concepts intuitive, research links point to primary sources |

<br/>

---

<br/>

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Runtime | [Bun](https://bun.sh) |
| Visualization | [D3.js v7](https://d3js.org) |
| Data | YAML (individual files per term) |
| Build dependency | [js-yaml](https://github.com/nodeca/js-yaml) |
| Hosting | GitHub Pages |
| Frontend | Vanilla HTML / CSS / JS |
| CI/CD | GitHub Actions |

<br/>

---

<br/>

## Roadmap

- [ ] Live deployment on GitHub Pages
- [ ] Fuzzy search across all term content
- [ ] Side-by-side term comparison
- [ ] Export to PDF / Markdown
- [ ] Embeddable widget for blogs and docs
- [ ] API endpoint for programmatic access
- [ ] Community voting on term accuracy
- [ ] Auto-generated terms from OWASP / MITRE databases
- [ ] Japanese and Korean language support

<br/>

---

<br/>

## License

[MIT](LICENSE)

<br/>

---

<br/>

<div align="center">

**Built with curiosity and a security mindset.**

<br/>

[Report an Issue](../../issues) &middot; [Contribute](CONTRIBUTING.md) &middot; [View the Graph](#)

<br/><br/>

</div>
