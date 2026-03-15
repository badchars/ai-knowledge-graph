**🌐 [English](README.md) · [Türkçe](README.tr.md) · Français · [中文](README.zh.md) · [العربية](README.ar.md) · [Русский](README.ru.md)**

<div align="center">

<br/>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/badchars/ai-knowledge-graph/main/.github/banner-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/badchars/ai-knowledge-graph/main/.github/banner-light.svg">
  <img alt="AI/ML Knowledge Graph" src="https://raw.githubusercontent.com/badchars/ai-knowledge-graph/main/.github/banner-dark.svg" width="700">
</picture>

<br/><br/>

<br/>

**132 termes &middot; 531 relations &middot; 11 catégories &middot; 6 langues**

<br/>

[![License: MIT](https://img.shields.io/badge/license-MIT-000000?style=flat-square)](LICENSE)
[![Terms](https://img.shields.io/badge/termes-132-007aff?style=flat-square)](data/terms/)
[![Relationships](https://img.shields.io/badge/relations-531-34c759?style=flat-square)](data/relationships.yaml)
[![Categories](https://img.shields.io/badge/catégories-11-ff9500?style=flat-square)](data/categories.yaml)
[![Languages](https://img.shields.io/badge/langues-6-ff3b30?style=flat-square)](#-langues-supportées)
[![PRs Welcome](https://img.shields.io/badge/PRs-bienvenue-007aff?style=flat-square)](CONTRIBUTING.md)
[![Built with Bun](https://img.shields.io/badge/bun-1.0+-f9f1e1?style=flat-square&logo=bun)](https://bun.sh)
[![D3.js](https://img.shields.io/badge/d3.js-v7-f9a03c?style=flat-square&logo=d3dotjs)](https://d3js.org)
[![GitHub Pages](https://img.shields.io/badge/déployer-GitHub%20Pages-24292e?style=flat-square&logo=github)](https://pages.github.com)

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

## Pourquoi Ce Projet Existe

La révolution de l'IA a introduit **des centaines de nouveaux termes techniques** dans notre vocabulaire en seulement quelques années. Des _architectures de transformers_ aux _attaques par injection de prompts_, des _formats de quantification_ aux _frameworks d'IA agentique_ — le paysage terminologique s'élargit plus vite qu'aucun manuel, cours ou documentation ne peut suivre.

**C'est un véritable problème pour tous les rôles techniques :**

- Un **développeur** intégrant une API LLM rencontre des termes comme _KV-cache_, _temperature_, _top-p_, _system prompt_ — mais comment sont-ils connectés ? Quelles sont les implications de sécurité de chacun ?
- Un **professionnel de la cybersécurité** auditant un système d'IA doit comprendre _l'injection de prompt indirecte_, _l'empoisonnement RAG_, _le déni de service de modèle_ — mais où est la carte ?
- Un **ingénieur DevSecOps** déployant vLLM sur Kubernetes doit connaître le _parallélisme tensoriel_, _le batching continu_, _PagedAttention_, _le détournement de flux CUDA_ — tout en contexte, tout connecté.
- Un **chercheur** doit voir comment _la confidentialité différentielle_ se rapporte à _l'extraction de données d'entraînement_, comment _RLHF_ se connecte à _l'alignement_, comment _MoE_ change le paysage de l'inférence.

**Les ressources existantes sont éparpillées.** Les articles de blog couvrent des sujets individuels. La documentation vit en silos. Aucune ressource unique ne cartographie les connexions entre les concepts d'IA/ML, leurs implications de sécurité et les configurations pratiques — dans plusieurs langues.

**Ce projet comble cette lacune.** Un graphe de connaissances interactif à force dirigée qui visualise comment 132 concepts d'IA/ML se relient les uns aux autres, avec un contenu approfondi sur les vulnérabilités de sécurité, les configurations de durcissement, les articles de recherche et des conseils pratiques — en 6 langues.

<br/>

---

<br/>

## Que Contient Chaque Terme

Chaque nœud du graphe ouvre une carte de connaissances riche et structurée :

| Section | Contenu | Exemple (`RAG`) |
|---------|---------|-----------------|
| **Description** | Explication en 2-3 paragraphes avec liens intégrés | Comment fonctionne la génération augmentée par récupération, composants clés, pourquoi cela réduit les hallucinations |
| **Analogie** | Comparaison du monde réel pour l'intuition | _"Comme un examen à livre ouvert — le modèle recherche des réponses au lieu de tout mémoriser"_ |
| **Sécurité** | Vulnérabilités spécifiques au mécanisme avec gravité | Empoisonnement de documents (élevé), manipulation de récupération (élevé), injection de contexte (moyen) |
| **Configuration** | Exemples de code fonctionnels pour le durcissement | Python : limites de taille de chunk, validation d'embedding, filtrage de récupération |
| **Recherche** | Articles, docs officielles, guides OWASP | Liens arXiv, documentation fournisseur, avis de sécurité |
| **Conseils** | Recommandations rapides et pratiques | _"Validez toujours les documents récupérés avant de les injecter dans le prompt"_ |

<br/>

### Contenu Axé sur la Sécurité

La section sécurité de chaque terme est **liée à son propre mécanisme** — pas des conseils génériques.

| Terme | Focus Sécurité |
|------|---------------|
| **GPU** | Vulnérabilités d'isolation mémoire, attaques par canal auxiliaire, détournement de flux CUDA |
| **Transformer** | Mémorisation de l'auto-attention, manipulation de l'encodage positionnel |
| **KV-Cache** | Empoisonnement de cache inter-locataires, fuite d'état d'attention |
| **Tokenizer** | Attaques par homoglyphes, contrebande de tokens BPE, manipulation Unicode |
| **RAG** | Empoisonnement de documents, manipulation de récupération, injection de contexte |
| **LoRA** | Empoisonnement d'adaptateur, injection d'adaptateur malveillant sur des hubs partagés |
| **vLLM** | Accès API non autorisé, vol de modèle via des points de terminaison de service |
| **HuggingFace** | RCE par désérialisation Pickle, attaques de la chaîne d'approvisionnement de modèles |
| **Prompt Injection** | Attaques basées sur RAG, détournement d'utilisation d'outils, manipulation d'agents |
| **Chat Template** | Exploitation du tokenizer, contournement de la limite du prompt système |

<br/>

---

<br/>

## Design

Le graphe utilise un langage visuel **minimal inspiré d'Apple** appelé **Snow** :

- Cercles propres avec remplissage de catégorie à faible opacité et un point central subtil
- Courbes de Bézier quadratiques pour les liens de relation — presque invisibles, illuminés lors de l'interaction
- Famille de polices `Inter` avec espacement et hiérarchie de poids Apple HIG
- Mode clair : fond blanc pur `#fff`, cartes de surface `#f5f5f7`
- Mode sombre : fond `#1c1c1e`, surfaces `#2c2c2e` — palette sombre native Apple
- Pas de dégradés, pas d'effets de lueur, pas d'animations sur les nœuds — clarté pure

| Fonctionnalité | Détails |
|---------|---------|
| **Thème** | Clair et sombre avec transition douce |
| **Dimensionnement des nœuds** | Proportionnel au nombre de connexions |
| **Comportement des liens** | Transparent par défaut, mis en évidence au survol/sélection |
| **Surbrillance persistante** | Le nœud sélectionné garde les connexions visibles tant que le panneau est ouvert |
| **Recherche Spotlight** | `Cmd+K` / `Ctrl+K` pour rechercher dans tous les termes |
| **Responsive** | Mises en page desktop, tablette et mobile |

<br/>

---

<br/>

## 11 Catégories

| Catégorie | Couleur | Termes Exemples |
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

## Langues Supportées

| Langue | Code | Direction |
|----------|------|-----------|
| Anglais | `en` | LTR |
| Turc | `tr` | LTR |
| Français | `fr` | LTR |
| Chinois | `zh` | LTR |
| Arabe | `ar` | **RTL** |
| Russe | `ru` | LTR |

Toutes les descriptions, analogies, découvertes de sécurité, conseils et étiquettes de relation sont disponibles dans les 6 langues. L'interface utilisateur bascule dynamiquement, y compris la prise en charge complète de RTL pour l'arabe.

<br/>

---

<br/>

## Démarrage

### Prérequis

- [Bun](https://bun.sh) v1.0+

### Installation et Build

```bash
git clone https://github.com/badchars/ai-knowledge-graph.git
cd ai-knowledge-graph
bun install
bun run build
```

### Aperçu Local

```bash
bun run dev          # construit et ouvre dans le navigateur
```

### Validation des Données

```bash
bun run validate     # vérifie tous les fichiers YAML par rapport au schéma
```

<br/>

---

<br/>

## Déployer sur GitHub Pages

### Automatique (Recommandé)

Le dépôt inclut des workflows CI/CD qui gèrent tout :

1. **Forkez** ou poussez ce dépôt vers votre compte GitHub
2. Allez dans **Settings > Pages**
3. Sous "Build and deployment", sélectionnez **Source: GitHub Actions**
4. Terminé — chaque push vers `main` déclenche le build et le déploiement

```
push vers main → bun install → build → upload dist/ → déployer sur Pages
```

### Manuel

```bash
bun run build
# Uploadez dist/ vers n'importe quel hébergeur statique :
# GitHub Pages, Netlify, Vercel, Cloudflare Pages, etc.
```

### Validation des PR

Chaque pull request qui touche `data/**` exécute automatiquement :
- `bun run validate` — vérification du schéma YAML
- `bun run build` — garantit que le site se construit
- Si l'un échoue, la PR ne peut pas être fusionnée

<br/>

---

<br/>

## Comment Utiliser

| Action | Comment |
|--------|-----|
| **Ouvrir les détails du terme** | Cliquez sur n'importe quel nœud |
| **Voir les connexions** | Survolez un nœud |
| **Rechercher** | `Cmd+K` ou `Ctrl+K` ou cliquez sur la barre de recherche |
| **Zoomer** | Molette de défilement |
| **Déplacer** | Cliquez et faites glisser l'arrière-plan |
| **Réorganiser** | Faites glisser les nœuds individuels |
| **Changer de langue** | Sélecteur de langue dans l'en-tête |
| **Basculer le thème** | Icône soleil/lune dans l'en-tête |
| **Fermer le panneau** | Touche `ESC` |
| **Naviguer parmi les termes associés** | Cliquez sur les termes associés dans le panneau de détails |

<br/>

---

<br/>

## Contribuer

Nous accueillons les contributions de tous — chercheurs en IA, professionnels de la sécurité, développeurs, étudiants.

### Démarrage Rapide

```bash
# 1. Forkez et clonez
git clone https://github.com/VOTRE_NOM_UTILISATEUR/ai-knowledge-graph.git
cd ai-knowledge-graph && bun install

# 2. Créez un nouveau terme
cp data/terms/_template.yaml data/terms/mon-nouveau-terme.yaml

# 3. Éditez le fichier YAML

# 4. Ajoutez des relations dans data/relationships.yaml

# 5. Validez et testez
bun run validate && bun run build

# 6. Soumettez une PR
```

### Types de Contributions

| Type | Difficulté | Impact |
|------|-----------|--------|
| Ajouter un nouveau terme | Moyen | Élevé |
| Ajouter des traductions | Facile | Élevé |
| Corriger les descriptions | Facile | Moyen |
| Ajouter des découvertes de sécurité | Moyen | Très Élevé |
| Ajouter des liens de recherche | Facile | Moyen |
| Ajouter des exemples de configuration | Moyen | Élevé |
| Signaler des inexactitudes | Facile | Élevé |

### Format de Fichier de Terme

Chaque terme est un fichier YAML autonome dans `data/terms/` :

```yaml
id: mon-nouveau-terme              # doit correspondre au nom de fichier
name: MonTerme                     # nom d'affichage court
fullName: Mon Nom Complet de Terme # nom étendu
category: architecture             # l'une des 11 catégories

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

### Ajout de Relations

```yaml
# data/relationships.yaml
- source: mon-nouveau-terme
  target: transformer
  label:
    en: uses
    tr: kullanir
    fr: utilise
    zh: 使用
    ar: يستخدم
    ru: использует
```

### Modèles d'Issues

Aucun code requis — utilisez nos formulaires :

- **[Suggérer un Nouveau Terme](../../issues/new?template=new-term.yml)**
- **[Mettre à Jour un Terme](../../issues/new?template=update-term.yml)**
- **[Ajouter une Traduction](../../issues/new?template=add-translation.yml)**

Voir **[CONTRIBUTING.md](CONTRIBUTING.md)** pour le guide complet.

<br/>

---

<br/>

## Structure du Projet

```
ai-knowledge-graph/
├── build.ts                      # générateur de site statique YAML →
├── package.json                  # scripts build, dev, validate
├── CONTRIBUTING.md
├── LICENSE                       # MIT
│
├── data/
│   ├── terms/                    # 132 fichiers YAML individuels
│   │   ├── _template.yaml        #   modèle contributeur
│   │   ├── gpu.yaml
│   │   ├── transformer.yaml
│   │   ├── prompt-injection.yaml
│   │   └── ...
│   ├── relationships.yaml        # 531 arêtes (étiquettes 6 langues)
│   ├── categories.yaml           # 11 catégories avec couleurs
│   └── ui.json                   # Chaînes UI (6 langues)
│
├── public/
│   ├── css/style.css             #   Thème Snow (clair + sombre)
│   └── js/
│       ├── graph.js              #   Simulation de force D3.js
│       ├── i18n.js               #   Changement de langue
│       └── theme.js              #   Bascule clair/sombre
│
├── templates/
│   ├── index.html                # Modèle de page de graphe
│   └── term.html                 # Modèle de page de détails de terme
│
├── scripts/
│   ├── validate.ts               # Validateur de schéma YAML
│   └── migrate-to-yaml.ts       # Migration unique JSON → YAML
│
└── .github/
    ├── workflows/
    │   ├── validate.yml           # Validation PR
    │   └── deploy.yml             # Déploiement GitHub Pages
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
│                   Couche de Données (YAML)               │
│                                                         │
│  data/terms/*.yaml    132 fichiers de termes individuels│
│  data/relationships   531 arêtes avec étiquettes 6 langues│
│  data/categories      11 catégories avec couleurs       │
│  data/ui.json         Chaînes UI pour 6 langues         │
└────────────────────────────┬────────────────────────────┘
                             │
                      bun run build
                             │
┌────────────────────────────▼────────────────────────────┐
│                 Sortie de Build (dist/)                  │
│                                                         │
│  index.html          Page de graphe (données intégrées) │
│  term/*.html         132 pages de termes individuelles  │
│  data/graph.json     Données agrégées pour usage API    │
│  css/, js/           Ressources statiques               │
└────────────────────────────┬────────────────────────────┘
                             │
                      GitHub Actions
                             │
┌────────────────────────────▼────────────────────────────┐
│                    GitHub Pages                          │
│                                                         │
│  Hébergement statique — zéro backend, zéro base de données│
│  Déploiement automatique à chaque push vers main        │
└─────────────────────────────────────────────────────────┘
```

<br/>

---

<br/>

## À Qui S'adresse Ce Projet

| Rôle | Comment Cela Aide |
|------|---------------|
| **Développeurs** | Comprendre les termes IA/ML que vous rencontrez quotidiennement — ce qu'ils signifient, comment ils se connectent, implications de sécurité |
| **Professionnels de la Sécurité** | Cartographier la surface d'attaque de l'IA — de l'injection de prompt au vol de modèle, avec des vulnérabilités spécifiques au mécanisme |
| **Ingénieurs DevSecOps** | Guides de durcissement avec du vrai code — chaque découverte de sécurité inclut des exemples de configuration |
| **Pentesters** | La connaissance de l'architecture révèle les vecteurs d'attaque — comprendre les systèmes d'IA assez profondément pour les tester |
| **Ingénieurs IA/ML** | Référence rapide pour l'écosystème — outils, frameworks et techniques en contexte |
| **Étudiants et Chercheurs** | Les analogies rendent les concepts intuitifs, les liens de recherche pointent vers les sources primaires |

<br/>

---

<br/>

## Stack Technique

| Composant | Technologie |
|-----------|-----------|
| Runtime | [Bun](https://bun.sh) |
| Visualisation | [D3.js v7](https://d3js.org) |
| Données | YAML (fichiers individuels par terme) |
| Dépendance de build | [js-yaml](https://github.com/nodeca/js-yaml) |
| Hébergement | GitHub Pages |
| Frontend | HTML / CSS / JS vanille |
| CI/CD | GitHub Actions |

<br/>

---

<br/>

## Feuille de Route

- [ ] Déploiement en direct sur GitHub Pages
- [ ] Recherche floue dans tout le contenu des termes
- [ ] Comparaison de termes côte à côte
- [ ] Exportation vers PDF / Markdown
- [ ] Widget intégrable pour blogs et docs
- [ ] Point de terminaison API pour accès programmatique
- [ ] Vote de la communauté sur l'exactitude des termes
- [ ] Termes générés automatiquement à partir des bases de données OWASP / MITRE
- [ ] Support des langues japonaise et coréenne

<br/>

---

<br/>

## License

[MIT](LICENSE)

<br/>

---

<br/>

<div align="center">

**Construit avec curiosité et un esprit orienté sécurité.**

<br/>

[Signaler un Problème](../../issues) &middot; [Contribuer](CONTRIBUTING.md) &middot; [Voir le Graphe](#)

<br/><br/>

</div>
