**🌐 [English](README.md) · [Türkçe](README.tr.md) · [Français](README.fr.md) · [中文](README.zh.md) · العربية · [Русский](README.ru.md)**

<div align="center">

<br/>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/badchars/ai-knowledge-graph/main/.github/banner-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/badchars/ai-knowledge-graph/main/.github/banner-light.svg">
  <img alt="AI/ML Knowledge Graph" src="https://raw.githubusercontent.com/badchars/ai-knowledge-graph/main/.github/banner-dark.svg" width="700">
</picture>

<br/><br/>

<br/>

**132 مصطلح &middot; 531 علاقة &middot; 11 فئة &middot; 6 لغات**

<br/>

[![License: MIT](https://img.shields.io/badge/license-MIT-000000?style=flat-square)](LICENSE)
[![Terms](https://img.shields.io/badge/terms-132-007aff?style=flat-square)](data/terms/)
[![Relationships](https://img.shields.io/badge/relationships-531-34c759?style=flat-square)](data/relationships.yaml)
[![Categories](https://img.shields.io/badge/categories-11-ff9500?style=flat-square)](data/categories.yaml)
[![Languages](https://img.shields.io/badge/languages-6-ff3b30?style=flat-square)](#-اللغات-المدعومة)
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

## لماذا هذا المشروع موجود

أدخلت ثورة الذكاء الاصطناعي **مئات المصطلحات التقنية الجديدة** إلى مفرداتنا في السنوات القليلة الماضية فقط. من _بنية المحولات (Transformer)_ إلى _هجمات حقن الأوامر (Prompt Injection)_، ومن _صيغ التكميم (Quantization)_ إلى _أطر الذكاء الاصطناعي الوكيل (Agentic AI)_ — مشهد المصطلحات يتوسع بسرعة أكبر من أي كتاب مدرسي أو دورة أو وثائق يمكنها مواكبته.

**هذه مشكلة حقيقية عبر كل دور تقني:**

- **مطور** يدمج واجهة برمجة تطبيقات نموذج لغوي كبير يواجه مصطلحات مثل _KV-cache_، _temperature_، _top-p_، _system prompt_ — لكن كيف ترتبط؟ ما هي الآثار الأمنية لكل منها؟
- **محترف أمن سيبراني** يدقق في نظام ذكاء اصطناعي يحتاج إلى فهم _حقن الأوامر غير المباشر_، _تسميم RAG_، _حرمان الخدمة للنموذج_ — لكن أين الخريطة؟
- **مهندس DevSecOps** ينشر vLLM على Kubernetes يحتاج إلى معرفة _tensor parallelism_، _continuous batching_، _PagedAttention_، _CUDA stream hijacking_ — كلها في السياق، كلها متصلة.
- **باحث** يحتاج إلى رؤية كيف ترتبط _الخصوصية التفاضلية (Differential Privacy)_ بـ _استخراج بيانات التدريب_، كيف يتصل _RLHF_ بـ _المحاذاة (Alignment)_، كيف يغير _MoE_ مشهد الاستنتاج.

**الموارد الحالية مبعثرة.** منشورات المدونات تغطي موضوعات فردية. الوثائق تعيش في صوامع. لا يوجد مورد واحد يرسم الاتصالات بين مفاهيم الذكاء الاصطناعي/التعلم الآلي، وآثارها الأمنية، والتكوينات العملية — عبر لغات متعددة.

**هذا المشروع يسد تلك الفجوة.** رسم بياني معرفي تفاعلي موجه بالقوة يصور كيف ترتبط 132 مفهومًا من مفاهيم الذكاء الاصطناعي/التعلم الآلي ببعضها البعض، مع محتوى متعمق عن الثغرات الأمنية، وتكوينات التقوية، والأوراق البحثية، والنصائح القابلة للتنفيذ — بـ 6 لغات.

<br/>

---

<br/>

## ماذا يحتوي كل مصطلح

كل عقدة في الرسم البياني تفتح بطاقة معرفية غنية ومنظمة:

| القسم | المحتوى | مثال (`RAG`) |
|---------|---------|-----------------|
| **الوصف** | شرح من 2-3 فقرات مع روابط مضمنة | كيف يعمل التوليد المعزز بالاسترجاع، المكونات الرئيسية، لماذا يقلل من الهلوسة |
| **التشبيه** | مقارنة من العالم الحقيقي للبديهة | _"مثل امتحان الكتاب المفتوح — النموذج يبحث عن الإجابات بدلاً من حفظ كل شيء"_ |
| **الأمان** | ثغرات خاصة بالآلية مع درجة الخطورة | تسميم الوثائق (عالية)، تلاعب الاسترجاع (عالية)، حقن السياق (متوسطة) |
| **التكوين** | أمثلة كود عملية للتقوية | Python: حدود حجم القطع، التحقق من التضمين، تصفية الاسترجاع |
| **البحث** | أوراق، وثائق رسمية، أدلة OWASP | روابط arXiv، وثائق البائعين، تنبيهات أمنية |
| **نصائح** | توصيات سريعة قابلة للتنفيذ | _"تحقق دائمًا من الوثائق المستردة قبل حقنها في الأمر"_ |

<br/>

### محتوى يركز على الأمان

قسم الأمان لكل مصطلح **مرتبط بآليته الخاصة** — وليس نصائح عامة.

| المصطلح | التركيز الأمني |
|------|---------------|
| **GPU** | ثغرات عزل الذاكرة، هجمات القناة الجانبية، اختطاف تدفق CUDA |
| **Transformer** | حفظ الانتباه الذاتي، تلاعب الترميز الموضعي |
| **KV-Cache** | تسميم الذاكرة المؤقتة عبر المستأجرين، تسرب حالة الانتباه |
| **Tokenizer** | هجمات الرموز المتشابهة، تهريب رموز BPE، تلاعب Unicode |
| **RAG** | تسميم الوثائق، تلاعب الاسترجاع، حقن السياق |
| **LoRA** | تسميم المحول، حقن محول ضار على المراكز المشتركة |
| **vLLM** | وصول غير مصرح به لواجهة برمجة التطبيقات، سرقة النموذج عبر نقاط الخدمة |
| **HuggingFace** | تنفيذ كود عن بعد عبر إلغاء تسلسل Pickle، هجمات سلسلة التوريد للنماذج |
| **Prompt Injection** | هجمات قائمة على RAG، اختطاف استخدام الأدوات، تلاعب الوكيل |
| **Chat Template** | استغلال المحلل اللغوي، تجاوز حدود أمر النظام |

<br/>

---

<br/>

## التصميم

يستخدم الرسم البياني لغة بصرية **دنيا مستوحاة من Apple** تسمى **Snow**:

- دوائر نظيفة مع تعبئة فئة منخفضة الشفافية ونقطة مركزية خفية
- منحنيات بيزير تربيعية لروابط العلاقات — غير مرئية تقريبًا، مضيئة عند التفاعل
- عائلة خطوط `Inter` مع تسلسل هرمي للمسافات والأوزان من Apple HIG
- الوضع الفاتح: خلفية بيضاء نقية `#fff`، بطاقات سطح `#f5f5f7`
- الوضع الداكن: خلفية `#1c1c1e`، أسطح `#2c2c2e` — لوحة Apple الداكنة الأصلية
- لا تدرجات، لا تأثيرات توهج، لا رسوم متحركة على العقد — وضوح نقي

| الميزة | التفاصيل |
|---------|---------|
| **السمة** | فاتح وداكن مع انتقال سلس |
| **حجم العقدة** | متناسب مع عدد الاتصالات |
| **سلوك الرابط** | شفاف بشكل افتراضي، مميز عند التمرير/التحديد |
| **تمييز مستمر** | العقدة المحددة تحافظ على الاتصالات مرئية أثناء فتح اللوحة |
| **بحث سريع** | `Cmd+K` / `Ctrl+K` للبحث عبر جميع المصطلحات |
| **متجاوب** | تخطيطات سطح المكتب والجهاز اللوحي والجوال |

<br/>

---

<br/>

## 11 فئة

| الفئة | اللون | أمثلة المصطلحات |
|----------|-------|--------------|
| **الأجهزة** | `#f87171` | GPU, CUDA, VRAM, TPU, DGX Spark |
| **البنية المعمارية** | `#60a5fa` | Transformer, Attention, Encoder-Decoder, MoE |
| **التدريب** | `#a78bfa` | Pretraining, Fine-tuning, RLHF, LoRA, DPO |
| **التكميم** | `#34d399` | FP16, INT4, GPTQ, AWQ, GGUF |
| **الاستنتاج** | `#fbbf24` | vLLM, KV-Cache, PagedAttention, Speculative Decoding |
| **الأوامر** | `#f472b6` | System Prompt, RAG, Few-Shot, Chain-of-Thought |
| **الأدوات والوكلاء** | `#a3e635` | MCP, Tool Use, Function Calling, Agent, Agentic AI |
| **أنواع النماذج** | `#22d3ee` | LLM, VLM, Foundation Model, SLM |
| **أمن الذكاء الاصطناعي** | `#ef4444` | Prompt Injection, Jailbreak, Data Poisoning, AI Firewall |
| **الأساسيات** | `#8b5cf6` | Neural Network, Deep Learning, Gradient, Backpropagation |
| **النظام البيئي** | `#f59e0b` | HuggingFace, Ollama, LangChain, Gradio |

<br/>

---

<br/>

## اللغات المدعومة

| اللغة | الرمز | الاتجاه |
|----------|------|-----------|
| الإنجليزية | `en` | LTR |
| التركية | `tr` | LTR |
| الفرنسية | `fr` | LTR |
| الصينية | `zh` | LTR |
| العربية | `ar` | **RTL** |
| الروسية | `ru` | LTR |

جميع الأوصاف والتشبيهات والنتائج الأمنية والنصائح وتسميات العلاقات متاحة بجميع اللغات الـ 6. تتبدل واجهة المستخدم ديناميكيًا، بما في ذلك الدعم الكامل لـ RTL للعربية.

<br/>

---

<br/>

## البداية

### المتطلبات الأساسية

- [Bun](https://bun.sh) v1.0+

### التثبيت والبناء

```bash
git clone https://github.com/badchars/ai-knowledge-graph.git
cd ai-knowledge-graph
bun install
bun run build
```

### المعاينة محليًا

```bash
bun run dev          # يبني ويفتح في المتصفح
```

### التحقق من البيانات

```bash
bun run validate     # يفحص جميع ملفات YAML مقابل المخطط
```

<br/>

---

<br/>

## النشر على GitHub Pages

### تلقائي (موصى به)

يتضمن المستودع سير عمل CI/CD الذي يتعامل مع كل شيء:

1. **قم بالتفريع** أو ادفع هذا المستودع إلى حساب GitHub الخاص بك
2. اذهب إلى **Settings > Pages**
3. تحت "Build and deployment"، اختر **Source: GitHub Actions**
4. تم — كل دفعة إلى `main` تؤدي إلى البناء والنشر

```
push to main → bun install → build → upload dist/ → deploy to Pages
```

### يدوي

```bash
bun run build
# ارفع dist/ إلى أي مضيف ثابت:
# GitHub Pages، Netlify، Vercel، Cloudflare Pages، إلخ.
```

### التحقق من PR

كل طلب سحب يمس `data/**` يُشغل تلقائيًا:
- `bun run validate` — فحص مخطط YAML
- `bun run build` — يضمن بناء الموقع
- إذا فشل أي منهما، لا يمكن دمج PR

<br/>

---

<br/>

## كيفية الاستخدام

| الإجراء | كيف |
|--------|-----|
| **فتح تفاصيل المصطلح** | انقر على أي عقدة |
| **رؤية الاتصالات** | مرر فوق عقدة |
| **البحث** | `Cmd+K` أو `Ctrl+K` أو انقر على شريط البحث |
| **التكبير** | عجلة التمرير |
| **التحريك** | انقر واسحب الخلفية |
| **إعادة الترتيب** | اسحب العقد الفردية |
| **تبديل اللغة** | محدد اللغة في الترويسة |
| **تبديل السمة** | أيقونة الشمس/القمر في الترويسة |
| **إغلاق اللوحة** | مفتاح `ESC` |
| **التنقل بين المصطلحات ذات الصلة** | انقر على المصطلحات ذات الصلة في لوحة التفاصيل |

<br/>

---

<br/>

## المساهمة

نرحب بالمساهمات من أي شخص — باحثو الذكاء الاصطناعي، محترفو الأمن، المطورون، الطلاب.

### بداية سريعة

```bash
# 1. التفريع والاستنساخ
git clone https://github.com/YOUR_USERNAME/ai-knowledge-graph.git
cd ai-knowledge-graph && bun install

# 2. إنشاء مصطلح جديد
cp data/terms/_template.yaml data/terms/my-new-term.yaml

# 3. تحرير ملف YAML

# 4. إضافة علاقات في data/relationships.yaml

# 5. التحقق والاختبار
bun run validate && bun run build

# 6. إرسال PR
```

### أنواع المساهمة

| النوع | الصعوبة | التأثير |
|------|-----------|--------|
| إضافة مصطلح جديد | متوسط | عالي |
| إضافة ترجمات | سهل | عالي |
| إصلاح الأوصاف | سهل | متوسط |
| إضافة نتائج أمنية | متوسط | عالي جدًا |
| إضافة روابط بحثية | سهل | متوسط |
| إضافة أمثلة تكوين | متوسط | عالي |
| الإبلاغ عن عدم دقة | سهل | عالي |

### تنسيق ملف المصطلح

كل مصطلح هو ملف YAML مستقل في `data/terms/`:

```yaml
id: my-new-term              # يجب أن يطابق اسم الملف
name: MyTerm                  # اسم عرض قصير
fullName: My Full Term Name   # اسم موسع
category: architecture        # واحدة من 11 فئة

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

### إضافة العلاقات

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

### قوالب المشاكل

لا حاجة للكود — استخدم نماذجنا:

- **[اقترح مصطلحًا جديدًا](../../issues/new?template=new-term.yml)**
- **[تحديث مصطلح](../../issues/new?template=update-term.yml)**
- **[إضافة ترجمة](../../issues/new?template=add-translation.yml)**

انظر **[CONTRIBUTING.md](CONTRIBUTING.md)** للدليل الكامل.

<br/>

---

<br/>

## هيكل المشروع

```
ai-knowledge-graph/
├── build.ts                      # YAML → مولد موقع ثابت
├── package.json                  # سكريبتات البناء والتطوير والتحقق
├── CONTRIBUTING.md
├── LICENSE                       # MIT
│
├── data/
│   ├── terms/                    # 132 ملف YAML فردي
│   │   ├── _template.yaml        #   قالب المساهم
│   │   ├── gpu.yaml
│   │   ├── transformer.yaml
│   │   ├── prompt-injection.yaml
│   │   └── ...
│   ├── relationships.yaml        # 531 حافة (تسميات 6 لغات)
│   ├── categories.yaml           # 11 فئة مع الألوان
│   └── ui.json                   # سلاسل واجهة المستخدم (6 لغات)
│
├── public/
│   ├── css/style.css             #   سمة Snow (فاتح + داكن)
│   └── js/
│       ├── graph.js              #   محاكاة قوة D3.js
│       ├── i18n.js               #   تبديل اللغة
│       └── theme.js              #   تبديل فاتح/داكن
│
├── templates/
│   ├── index.html                # قالب صفحة الرسم البياني
│   └── term.html                 # قالب صفحة تفاصيل المصطلح
│
├── scripts/
│   ├── validate.ts               # مدقق مخطط YAML
│   └── migrate-to-yaml.ts       # ترحيل JSON → YAML لمرة واحدة
│
└── .github/
    ├── workflows/
    │   ├── validate.yml           # التحقق من PR
    │   └── deploy.yml             # نشر GitHub Pages
    └── ISSUE_TEMPLATE/
        ├── new-term.yml
        ├── update-term.yml
        └── add-translation.yml
```

<br/>

---

<br/>

## البنية المعمارية

```
┌─────────────────────────────────────────────────────────┐
│                    طبقة البيانات (YAML)                 │
│                                                         │
│  data/terms/*.yaml    132 ملف مصطلح فردي                │
│  data/relationships   531 حافة مع تسميات 6 لغات         │
│  data/categories      11 فئة مع الألوان                 │
│  data/ui.json         سلاسل واجهة المستخدم لـ 6 لغات    │
└────────────────────────────┬────────────────────────────┘
                             │
                      bun run build
                             │
┌────────────────────────────▼────────────────────────────┐
│                   مخرجات البناء (dist/)                 │
│                                                         │
│  index.html          صفحة الرسم البياني (البيانات مضمنة) │
│  term/*.html         132 صفحة مصطلح فردية                │
│  data/graph.json     بيانات مجمعة لاستخدام API          │
│  css/, js/           أصول ثابتة                         │
└────────────────────────────┬────────────────────────────┘
                             │
                      GitHub Actions
                             │
┌────────────────────────────▼────────────────────────────┐
│                    GitHub Pages                          │
│                                                         │
│  استضافة ثابتة — لا خادم خلفي، لا قاعدة بيانات          │
│  نشر تلقائي مع كل دفعة إلى main                          │
└─────────────────────────────────────────────────────────┘
```

<br/>

---

<br/>

## لمن هذا المشروع

| الدور | كيف يساعد هذا |
|------|---------------|
| **المطورون** | فهم مصطلحات الذكاء الاصطناعي/التعلم الآلي التي تواجهها يوميًا — ما تعنيه، كيف تتصل، الآثار الأمنية |
| **محترفو الأمن** | رسم سطح هجوم الذكاء الاصطناعي — من حقن الأوامر إلى سرقة النموذج، مع ثغرات خاصة بالآلية |
| **مهندسو DevSecOps** | أدلة التقوية مع كود حقيقي — كل نتيجة أمنية تتضمن أمثلة تكوين |
| **مختبرو الاختراق** | معرفة البنية تكشف عن نواقل الهجوم — فهم أنظمة الذكاء الاصطناعي بعمق كافٍ لاختبارها |
| **مهندسو الذكاء الاصطناعي/التعلم الآلي** | مرجع سريع للنظام البيئي — الأدوات والأطر والتقنيات في السياق |
| **الطلاب والباحثون** | التشبيهات تجعل المفاهيم بديهية، الروابط البحثية تشير إلى المصادر الأولية |

<br/>

---

<br/>

## التقنيات المستخدمة

| المكون | التقنية |
|-----------|-----------|
| وقت التشغيل | [Bun](https://bun.sh) |
| التصور | [D3.js v7](https://d3js.org) |
| البيانات | YAML (ملفات فردية لكل مصطلح) |
| تبعية البناء | [js-yaml](https://github.com/nodeca/js-yaml) |
| الاستضافة | GitHub Pages |
| الواجهة الأمامية | HTML / CSS / JS فانيلا |
| CI/CD | GitHub Actions |

<br/>

---

<br/>

## خارطة الطريق

- [ ] نشر مباشر على GitHub Pages
- [ ] بحث غامض عبر كل محتوى المصطلحات
- [ ] مقارنة المصطلحات جنبًا إلى جنب
- [ ] التصدير إلى PDF / Markdown
- [ ] ودجة قابلة للتضمين للمدونات والوثائق
- [ ] نقطة API للوصول البرمجي
- [ ] تصويت المجتمع على دقة المصطلحات
- [ ] مصطلحات مولدة تلقائيًا من قواعد بيانات OWASP / MITRE
- [ ] دعم اللغتين اليابانية والكورية

<br/>

---

<br/>

## الترخيص

[MIT](LICENSE)

<br/>

---

<br/>

<div align="center">

**بُني بفضول وعقلية أمنية.**

<br/>

[الإبلاغ عن مشكلة](../../issues) &middot; [المساهمة](CONTRIBUTING.md) &middot; [عرض الرسم البياني](#)

<br/><br/>

</div>
