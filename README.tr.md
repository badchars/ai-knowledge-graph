**🌐 [English](README.md) · Turkish · [Français](README.fr.md) · [中文](README.zh.md) · [العربية](README.ar.md) · [Русский](README.ru.md)**

<div align="center">

<br/>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/badchars/ai-knowledge-graph/main/.github/banner-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/badchars/ai-knowledge-graph/main/.github/banner-light.svg">
  <img alt="AI/ML Knowledge Graph" src="https://raw.githubusercontent.com/badchars/ai-knowledge-graph/main/.github/banner-dark.svg" width="700">
</picture>

<br/><br/>

<br/>

**132 terim &middot; 531 ilişki &middot; 11 kategori &middot; 6 dil**

<br/>

[![License: MIT](https://img.shields.io/badge/license-MIT-000000?style=flat-square)](LICENSE)
[![Terms](https://img.shields.io/badge/terms-132-007aff?style=flat-square)](data/terms/)
[![Relationships](https://img.shields.io/badge/relationships-531-34c759?style=flat-square)](data/relationships.yaml)
[![Categories](https://img.shields.io/badge/categories-11-ff9500?style=flat-square)](data/categories.yaml)
[![Languages](https://img.shields.io/badge/languages-6-ff3b30?style=flat-square)](#-desteklenen-diller)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-007aff?style=flat-square)](CONTRIBUTING.md)
[![Built with Bun](https://img.shields.io/badge/bun-1.0+-f9f1e1?style=flat-square&logo=bun)](https://bun.sh)
[![D3.js](https://img.shields.io/badge/d3.js-v7-f9a03c?style=flat-square&logo=d3dotjs)](https://d3js.org)
[![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-24292e?style=flat-square&logo=github)](https://pages.github.com)

</div>

<br/>

---

<br/>

## Bu Proje Neden Var

Yapay zeka devrimi, son birkaç yılda kelime dağarcığımıza **yüzlerce yeni teknik terim** ekledi. _Transformer mimarileri_'nden _prompt injection saldırıları_'na, _quantization formatları_'ndan _agentic AI framework_leri_'ne kadar — terminoloji manzarası hiçbir ders kitabı, kurs veya dokümentasyonun yetişebileceğinden daha hızlı genişliyor.

**Bu, her teknik rol için gerçek bir problem:**

- Bir LLM API'sini entegre eden bir **geliştirici**, _KV-cache_, _temperature_, _top-p_, _system prompt_ gibi terimlerle karşılaşıyor — ama bunlar nasıl bağlantılı? Her birinin güvenlik etkileri neler?
- Bir AI sistemini denetleyen **siber güvenlik uzmanı**, _indirect prompt injection_, _RAG poisoning_, _model denial-of-service_ kavramlarını anlamalı — ama harita nerede?
- Kubernetes üzerinde vLLM deploy eden bir **DevSecOps mühendisi**, _tensor parallelism_, _continuous batching_, _PagedAttention_, _CUDA stream hijacking_ hakkında bilgi sahibi olmalı — hepsi bağlamında, hepsi bağlantılı.
- Bir **araştırmacı**, _differential privacy_'nin _training data extraction_ ile nasıl ilişkili olduğunu, _RLHF_'nin _alignment_ ile nasıl bağlantılı olduğunu, _MoE_'nin inference manzarasını nasıl değiştirdiğini görmeli.

**Mevcut kaynaklar dağınık.** Blog yazıları bireysel konuları kapsıyor. Dokümentasyonlar siloların içinde yaşıyor. AI/ML kavramları, güvenlik etkileri ve pratik konfigürasyonlar arasındaki bağlantıları birden fazla dilde haritalayan tek bir kaynak yok.

**Bu proje bu boşluğu dolduruyor.** 132 AI/ML kavramının birbirleriyle nasıl ilişkili olduğunu görselleştiren, güvenlik açıkları, güçlendirme konfigürasyonları, araştırma makaleleri ve eyleme geçirilebilir ipuçları içeren derinlemesine içerikle donatılmış interaktif, kuvvet yönelimli bir bilgi grafiği — 6 dilde.

<br/>

---

<br/>

## Her Terimde Neler Var

Grafikteki her düğüm, zengin ve yapılandırılmış bir bilgi kartı açar:

| Bölüm | İçerik | Örnek (`RAG`) |
|---------|---------|-----------------|
| **Açıklama** | Satır içi bağlantılarla 2-3 paragraf açıklama | Retrieval-augmented generation nasıl çalışır, temel bileşenler, halüsinasyonu neden azaltır |
| **Analoji** | Sezgi için gerçek dünya karşılaştırması | _"Açık kitap sınav gibi — model her şeyi ezberlemek yerine cevapları arar"_ |
| **Güvenlik** | Mekanizmaya özgü güvenlik açıkları ve önem derecesi | Document poisoning (yüksek), retrieval manipulation (yüksek), context injection (orta) |
| **Konfigürasyon** | Güçlendirme için çalışan kod örnekleri | Python: chunk size limitleri, embedding doğrulama, retrieval filtreleme |
| **Araştırma** | Makaleler, resmi dokümanlar, OWASP kılavuzları | arXiv linkleri, vendor dokümentasyonu, güvenlik tavsiyeleri |
| **İpuçları** | Hızlı eyleme geçirilebilir öneriler | _"Prompt'a enjekte etmeden önce her zaman alınan dokümanları doğrulayın"_ |

<br/>

### Güvenlik Odaklı İçerik

Her terimin güvenlik bölümü **kendi mekanizmasına bağlı** — genel tavsiye değil.

| Terim | Güvenlik Odağı |
|------|---------------|
| **GPU** | Bellek izolasyonu güvenlik açıkları, yan kanal saldırıları, CUDA stream hijacking |
| **Transformer** | Self-attention hafıza, positional encoding manipülasyonu |
| **KV-Cache** | Çapraz kiracı cache poisoning, attention state sızıntısı |
| **Tokenizer** | Homoglyph saldırıları, BPE token kaçakçılığı, Unicode manipülasyonu |
| **RAG** | Doküman zehirleme, retrieval manipülasyonu, context injection |
| **LoRA** | Adapter zehirleme, paylaşılan hub'lara kötü amaçlı adapter enjeksiyonu |
| **vLLM** | Yetkisiz API erişimi, serving endpoint'leri üzerinden model hırsızlığı |
| **HuggingFace** | Pickle deserialization RCE, model tedarik zinciri saldırıları |
| **Prompt Injection** | RAG tabanlı saldırılar, tool-use hijacking, agent manipülasyonu |
| **Chat Template** | Tokenizer istismarı, system prompt sınır aşımı |

<br/>

---

<br/>

## Tasarım

Grafik, **Snow** adlı **Apple-ilhamlı minimal** bir görsel dil kullanır:

- Düşük opaklıklı kategori dolgusu ve incelikli merkez noktası ile temiz daireler
- İlişki bağlantıları için quadratic bezier eğrileri — neredeyse görünmez, etkileşimde aydınlatılır
- `Inter` font ailesi, Apple HIG boşluk ve ağırlık hiyerarşisi ile
- Açık mod: saf beyaz `#fff` arka plan, `#f5f5f7` yüzey kartları
- Koyu mod: `#1c1c1e` arka plan, `#2c2c2e` yüzeyler — yerel Apple koyu paleti
- Gradyan yok, parlama efekti yok, düğümlerde animasyon yok — saf netlik

| Özellik | Detaylar |
|---------|---------|
| **Tema** | Açık ve Koyu, yumuşak geçiş ile |
| **Düğüm boyutlandırma** | Bağlantı sayısıyla orantılı |
| **Bağlantı davranışı** | Varsayılan olarak şeffaf, hover/seçimde vurgulanır |
| **Kalıcı vurgulama** | Seçili düğüm, panel açıkken bağlantıları görünür tutar |
| **Spotlight arama** | `Cmd+K` / `Ctrl+K` ile tüm terimlerde arama |
| **Duyarlı** | Masaüstü, tablet ve mobil düzenler |

<br/>

---

<br/>

## 11 Kategori

| Kategori | Renk | Örnek Terimler |
|----------|-------|--------------|
| **Donanım** | `#f87171` | GPU, CUDA, VRAM, TPU, DGX Spark |
| **Mimari** | `#60a5fa` | Transformer, Attention, Encoder-Decoder, MoE |
| **Eğitim** | `#a78bfa` | Pretraining, Fine-tuning, RLHF, LoRA, DPO |
| **Quantization** | `#34d399` | FP16, INT4, GPTQ, AWQ, GGUF |
| **Inference** | `#fbbf24` | vLLM, KV-Cache, PagedAttention, Speculative Decoding |
| **Prompting** | `#f472b6` | System Prompt, RAG, Few-Shot, Chain-of-Thought |
| **Araçlar ve Agentlar** | `#a3e635` | MCP, Tool Use, Function Calling, Agent, Agentic AI |
| **Model Türleri** | `#22d3ee` | LLM, VLM, Foundation Model, SLM |
| **AI Güvenliği** | `#ef4444` | Prompt Injection, Jailbreak, Data Poisoning, AI Firewall |
| **Temeller** | `#8b5cf6` | Neural Network, Deep Learning, Gradient, Backpropagation |
| **Ekosistem** | `#f59e0b` | HuggingFace, Ollama, LangChain, Gradio |

<br/>

---

<br/>

## Desteklenen Diller

| Dil | Kod | Yön |
|----------|------|-----------|
| İngilizce | `en` | LTR |
| Türkçe | `tr` | LTR |
| Fransızca | `fr` | LTR |
| Çince | `zh` | LTR |
| Arapça | `ar` | **RTL** |
| Rusça | `ru` | LTR |

Tüm açıklamalar, analojiler, güvenlik bulguları, ipuçları ve ilişki etiketleri 6 dilde mevcuttur. UI dinamik olarak değişir, Arapça için tam RTL desteği dahil.

<br/>

---

<br/>

## Başlangıç

### Ön Gereksinimler

- [Bun](https://bun.sh) v1.0+

### Kurulum ve Derleme

```bash
git clone https://github.com/badchars/ai-knowledge-graph.git
cd ai-knowledge-graph
bun install
bun run build
```

### Yerel Olarak Önizleme

```bash
bun run dev          # derler ve tarayıcıda açar
```

### Verileri Doğrula

```bash
bun run validate     # tüm YAML dosyalarını şemaya göre kontrol eder
```

<br/>

---

<br/>

## GitHub Pages'e Yayınlama

### Otomatik (Önerilen)

Repo, her şeyi halleden CI/CD iş akışlarını içerir:

1. Bu repo'yu GitHub hesabınıza **fork** edin veya push edin
2. **Settings > Pages** bölümüne gidin
3. "Build and deployment" altında, **Source: GitHub Actions** seçin
4. Bitti — `main`'e her push, derleme ve deploy tetikler

```
main'e push → bun install → build → dist/ yükle → Pages'e deploy
```

### Manuel

```bash
bun run build
# dist/ klasörünü herhangi bir statik host'a yükleyin:
# GitHub Pages, Netlify, Vercel, Cloudflare Pages, vb.
```

### PR Doğrulama

`data/**` dosyalarına dokunan her pull request otomatik olarak çalıştırır:
- `bun run validate` — YAML şema kontrolü
- `bun run build` — sitenin derlendiğinden emin olur
- Herhangi biri başarısız olursa, PR birleştirilemez

<br/>

---

<br/>

## Nasıl Kullanılır

| Eylem | Nasıl |
|--------|-----|
| **Terim detaylarını aç** | Herhangi bir düğüme tıkla |
| **Bağlantıları gör** | Düğümün üzerine gel |
| **Ara** | `Cmd+K` veya `Ctrl+K` veya arama çubuğuna tıkla |
| **Yakınlaştır** | Fare tekerleği |
| **Kaydır** | Arka plana tıkla ve sürükle |
| **Yeniden düzenle** | Bireysel düğümleri sürükle |
| **Dil değiştir** | Üst bilgideki dil seçici |
| **Temayı değiştir** | Üst bilgideki güneş/ay ikonu |
| **Paneli kapat** | `ESC` tuşu |
| **İlgili terimlerde gezin** | Detay panelindeki ilgili terimlere tıkla |

<br/>

---

<br/>

## Katkıda Bulunma

AI araştırmacıları, güvenlik profesyonelleri, geliştiriciler, öğrenciler — herkesten katkıyı memnuniyetle karşılıyoruz.

### Hızlı Başlangıç

```bash
# 1. Fork et ve klonla
git clone https://github.com/YOUR_USERNAME/ai-knowledge-graph.git
cd ai-knowledge-graph && bun install

# 2. Yeni bir terim oluştur
cp data/terms/_template.yaml data/terms/my-new-term.yaml

# 3. YAML dosyasını düzenle

# 4. data/relationships.yaml dosyasına ilişkiler ekle

# 5. Doğrula ve test et
bun run validate && bun run build

# 6. PR gönder
```

### Katkı Türleri

| Tür | Zorluk | Etki |
|------|-----------|--------|
| Yeni terim ekle | Orta | Yüksek |
| Çeviri ekle | Kolay | Yüksek |
| Açıklamaları düzelt | Kolay | Orta |
| Güvenlik bulguları ekle | Orta | Çok Yüksek |
| Araştırma linkleri ekle | Kolay | Orta |
| Konfigürasyon örnekleri ekle | Orta | Yüksek |
| Yanlışlıkları bildir | Kolay | Yüksek |

### Terim Dosya Formatı

Her terim, `data/terms/` içinde bağımsız bir YAML dosyasıdır:

```yaml
id: my-new-term              # dosya adıyla eşleşmeli
name: MyTerm                  # kısa görüntüleme adı
fullName: My Full Term Name   # genişletilmiş ad
category: architecture        # 11 kategoriden biri

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

### İlişki Ekleme

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

### Issue Şablonları

Kod gerekmez — formlarımızı kullanın:

- **[Yeni Terim Öner](../../issues/new?template=new-term.yml)**
- **[Terim Güncelle](../../issues/new?template=update-term.yml)**
- **[Çeviri Ekle](../../issues/new?template=add-translation.yml)**

Tam kılavuz için **[CONTRIBUTING.md](CONTRIBUTING.md)** dosyasına bakın.

<br/>

---

<br/>

## Proje Yapısı

```
ai-knowledge-graph/
├── build.ts                      # YAML → statik site üretici
├── package.json                  # build, dev, validate scriptleri
├── CONTRIBUTING.md
├── LICENSE                       # MIT
│
├── data/
│   ├── terms/                    # 132 bireysel YAML dosyası
│   │   ├── _template.yaml        #   katkıda bulunan şablonu
│   │   ├── gpu.yaml
│   │   ├── transformer.yaml
│   │   ├── prompt-injection.yaml
│   │   └── ...
│   ├── relationships.yaml        # 531 kenar (6 dilli etiketler)
│   ├── categories.yaml           # 11 kategori renklerle
│   └── ui.json                   # UI string'leri (6 dil)
│
├── public/
│   ├── css/style.css             #   Snow teması (açık + koyu)
│   └── js/
│       ├── graph.js              #   D3.js kuvvet simülasyonu
│       ├── i18n.js               #   Dil değiştirme
│       └── theme.js              #   Açık/koyu geçiş
│
├── templates/
│   ├── index.html                # Grafik sayfası şablonu
│   └── term.html                 # Terim detay sayfası şablonu
│
├── scripts/
│   ├── validate.ts               # YAML şema doğrulayıcı
│   └── migrate-to-yaml.ts       # Tek seferlik JSON → YAML migrasyonu
│
└── .github/
    ├── workflows/
    │   ├── validate.yml           # PR doğrulama
    │   └── deploy.yml             # GitHub Pages deploy
    └── ISSUE_TEMPLATE/
        ├── new-term.yml
        ├── update-term.yml
        └── add-translation.yml
```

<br/>

---

<br/>

## Mimari

```
┌─────────────────────────────────────────────────────────┐
│                    Veri Katmanı (YAML)                   │
│                                                         │
│  data/terms/*.yaml    132 bireysel terim dosyası         │
│  data/relationships   531 kenar, 6 dilli etiketler       │
│  data/categories      11 kategori renklerle              │
│  data/ui.json         6 dil için UI string'leri          │
└────────────────────────────┬────────────────────────────┘
                             │
                      bun run build
                             │
┌────────────────────────────▼────────────────────────────┐
│                   Derleme Çıktısı (dist/)                │
│                                                         │
│  index.html          Grafik sayfası (veri inline)        │
│  term/*.html         132 bireysel terim sayfası          │
│  data/graph.json     API kullanımı için toplanmış veri   │
│  css/, js/           Statik varlıklar                    │
└────────────────────────────┬────────────────────────────┘
                             │
                      GitHub Actions
                             │
┌────────────────────────────▼────────────────────────────┐
│                    GitHub Pages                          │
│                                                         │
│  Statik barındırma — backend yok, veritabanı yok        │
│  Main'e her push'ta otomatik deploy                      │
└─────────────────────────────────────────────────────────┘
```

<br/>

---

<br/>

## Bu Proje Kimin İçin

| Rol | Nasıl Yardımcı Olur |
|------|---------------|
| **Geliştiriciler** | Günlük karşılaştığınız AI/ML terimlerini anlayın — ne anlama geldiklerini, nasıl bağlantılı olduklarını, güvenlik etkilerini |
| **Güvenlik Profesyonelleri** | AI saldırı yüzeyini haritalayın — prompt injection'dan model hırsızlığına, mekanizmaya özgü güvenlik açıklarıyla |
| **DevSecOps Mühendisleri** | Gerçek kodla güçlendirme kılavuzları — her güvenlik bulgusu konfigürasyon örnekleri içerir |
| **Penetrasyon Testçileri** | Mimari bilgi saldırı vektörlerini ortaya çıkarır — AI sistemlerini test edecek kadar derinlemesine anlayın |
| **AI/ML Mühendisleri** | Ekosistem için hızlı referans — araçlar, framework'ler ve teknikler bağlamda |
| **Öğrenciler ve Araştırmacılar** | Analojiler kavramları sezgisel yapar, araştırma linkleri birincil kaynaklara işaret eder |

<br/>

---

<br/>

## Teknoloji Yığını

| Bileşen | Teknoloji |
|-----------|-----------|
| Runtime | [Bun](https://bun.sh) |
| Görselleştirme | [D3.js v7](https://d3js.org) |
| Veri | YAML (her terim için bireysel dosyalar) |
| Derleme bağımlılığı | [js-yaml](https://github.com/nodeca/js-yaml) |
| Barındırma | GitHub Pages |
| Frontend | Vanilla HTML / CSS / JS |
| CI/CD | GitHub Actions |

<br/>

---

<br/>

## Yol Haritası

- [ ] GitHub Pages üzerinde canlı yayın
- [ ] Tüm terim içeriğinde fuzzy arama
- [ ] Yan yana terim karşılaştırma
- [ ] PDF / Markdown'a export
- [ ] Blog ve dokümanlar için gömülebilir widget
- [ ] Programatik erişim için API endpoint'i
- [ ] Terim doğruluğu üzerine topluluk oylaması
- [ ] OWASP / MITRE veritabanlarından otomatik oluşturulan terimler
- [ ] Japonca ve Korece dil desteği

<br/>

---

<br/>

## Lisans

[MIT](LICENSE)

<br/>

---

<br/>

<div align="center">

**Merak ve güvenlik odaklı düşünceyle geliştirildi.**

<br/>

[Sorun Bildir](../../issues) &middot; [Katkıda Bulun](CONTRIBUTING.md) &middot; [Grafiği Görüntüle](#)

<br/><br/>

</div>
