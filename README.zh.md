**🌐 [English](README.md) · [Türkçe](README.tr.md) · [Français](README.fr.md) · 中文 · [العربية](README.ar.md) · [Русский](README.ru.md)**

<div align="center">

<br/>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/badchars/ai-knowledge-graph/main/.github/banner-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/badchars/ai-knowledge-graph/main/.github/banner-light.svg">
  <img alt="AI/ML Knowledge Graph" src="https://raw.githubusercontent.com/badchars/ai-knowledge-graph/main/.github/banner-dark.svg" width="700">
</picture>

<br/><br/>

<br/>

**132 个术语 &middot; 531 个关系 &middot; 11 个类别 &middot; 6 种语言**

<br/>

[![License: MIT](https://img.shields.io/badge/license-MIT-000000?style=flat-square)](LICENSE)
[![Terms](https://img.shields.io/badge/terms-132-007aff?style=flat-square)](data/terms/)
[![Relationships](https://img.shields.io/badge/relationships-531-34c759?style=flat-square)](data/relationships.yaml)
[![Categories](https://img.shields.io/badge/categories-11-ff9500?style=flat-square)](data/categories.yaml)
[![Languages](https://img.shields.io/badge/languages-6-ff3b30?style=flat-square)](#-支持的语言)
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

## 为什么创建这个项目

AI 革命在短短几年内为我们的词汇库引入了**数百个新技术术语**。从_Transformer 架构_到_提示注入攻击_，从_量化格式_到_智能体 AI 框架_ —— 术语格局的扩展速度超过了任何教科书、课程或文档所能跟上的速度。

**这是每个技术角色都面临的真实问题：**

- **开发者**集成 LLM API 时会遇到 _KV-cache_、_temperature_、_top-p_、_system prompt_ 等术语 —— 但它们如何关联？每个术语的安全隐患是什么？
- **网络安全专业人员**审计 AI 系统时需要理解_间接提示注入_、_RAG 投毒_、_模型拒绝服务_ —— 但哪里有地图？
- **DevSecOps 工程师**在 Kubernetes 上部署 vLLM 时需要了解_张量并行_、_连续批处理_、_PagedAttention_、_CUDA 流劫持_ —— 所有这些都需要在上下文中理解，并且相互关联。
- **研究人员**需要看到_差分隐私_如何与_训练数据提取_相关，_RLHF_ 如何连接到_对齐_，_MoE_ 如何改变推理格局。

**现有资源分散各处。** 博客文章涵盖单个主题。文档各自为营。没有单一资源能够映射 AI/ML 概念之间的联系、它们的安全影响以及实用配置 —— 跨越多种语言。

**这个项目填补了这一空白。** 一个交互式力导向知识图谱，可视化 132 个 AI/ML 概念之间的关系，提供关于安全漏洞、加固配置、研究论文和可操作建议的深入内容 —— 支持 6 种语言。

<br/>

---

<br/>

## 每个术语包含什么

图中的每个节点都会打开一个丰富、结构化的知识卡片：

| 部分 | 内容 | 示例（`RAG`） |
|------|------|--------------|
| **描述** | 2-3 段带内联链接的解释 | 检索增强生成如何工作、关键组件、为什么能减少幻觉 |
| **类比** | 用于直观理解的现实世界比较 | _"就像开卷考试 —— 模型查找答案而不是记住所有东西"_ |
| **安全** | 特定机制的漏洞及其严重程度 | 文档投毒（高）、检索操纵（高）、上下文注入（中） |
| **配置** | 用于加固的可工作代码示例 | Python：块大小限制、嵌入验证、检索过滤 |
| **研究** | 论文、官方文档、OWASP 指南 | arXiv 链接、供应商文档、安全公告 |
| **建议** | 快速可操作的建议 | _"在将检索到的文档注入提示之前，始终验证它们"_ |

<br/>

### 安全优先的内容

每个术语的安全部分都**与其自身机制相关** —— 不是泛泛的建议。

| 术语 | 安全重点 |
|------|---------|
| **GPU** | 内存隔离漏洞、侧信道攻击、CUDA 流劫持 |
| **Transformer** | 自注意力记忆化、位置编码操纵 |
| **KV-Cache** | 跨租户缓存投毒、注意力状态泄露 |
| **Tokenizer** | 同形字攻击、BPE 令牌走私、Unicode 操纵 |
| **RAG** | 文档投毒、检索操纵、上下文注入 |
| **LoRA** | 适配器投毒、在共享中心注入恶意适配器 |
| **vLLM** | 未经授权的 API 访问、通过服务端点窃取模型 |
| **HuggingFace** | Pickle 反序列化 RCE、模型供应链攻击 |
| **Prompt Injection** | 基于 RAG 的攻击、工具使用劫持、智能体操纵 |
| **Chat Template** | 分词器利用、系统提示边界绕过 |

<br/>

---

<br/>

## 设计

该图使用名为 **Snow** 的 **Apple 风格极简**视觉语言：

- 带有低透明度类别填充和精致中心点的清晰圆圈
- 关系链接使用二次贝塞尔曲线 —— 几乎不可见，在交互时点亮
- `Inter` 字体家族，采用 Apple HIG 间距和字重层次
- 浅色模式：纯白 `#fff` 背景，`#f5f5f7` 表面卡片
- 深色模式：`#1c1c1e` 背景，`#2c2c2e` 表面 —— 原生 Apple 深色调色板
- 无渐变、无光晕效果、节点无动画 —— 纯粹的清晰

| 功能 | 详情 |
|------|------|
| **主题** | 浅色和深色，平滑过渡 |
| **节点大小** | 与连接数成正比 |
| **链接行为** | 默认透明，悬停/选择时高亮 |
| **持久高亮** | 面板打开时，选定节点保持连接可见 |
| **聚光灯搜索** | `Cmd+K` / `Ctrl+K` 搜索所有术语 |
| **响应式** | 桌面、平板和移动布局 |

<br/>

---

<br/>

## 11 个类别

| 类别 | 颜色 | 示例术语 |
|------|------|---------|
| **硬件** | `#f87171` | GPU、CUDA、VRAM、TPU、DGX Spark |
| **架构** | `#60a5fa` | Transformer、Attention、Encoder-Decoder、MoE |
| **训练** | `#a78bfa` | Pretraining、Fine-tuning、RLHF、LoRA、DPO |
| **量化** | `#34d399` | FP16、INT4、GPTQ、AWQ、GGUF |
| **推理** | `#fbbf24` | vLLM、KV-Cache、PagedAttention、Speculative Decoding |
| **提示** | `#f472b6` | System Prompt、RAG、Few-Shot、Chain-of-Thought |
| **工具和智能体** | `#a3e635` | MCP、Tool Use、Function Calling、Agent、Agentic AI |
| **模型类型** | `#22d3ee` | LLM、VLM、Foundation Model、SLM |
| **AI 安全** | `#ef4444` | Prompt Injection、Jailbreak、Data Poisoning、AI Firewall |
| **基础** | `#8b5cf6` | Neural Network、Deep Learning、Gradient、Backpropagation |
| **生态系统** | `#f59e0b` | HuggingFace、Ollama、LangChain、Gradio |

<br/>

---

<br/>

## 支持的语言

| 语言 | 代码 | 方向 |
|------|------|------|
| 英语 | `en` | LTR |
| 土耳其语 | `tr` | LTR |
| 法语 | `fr` | LTR |
| 中文 | `zh` | LTR |
| 阿拉伯语 | `ar` | **RTL** |
| 俄语 | `ru` | LTR |

所有描述、类比、安全发现、建议和关系标签均提供 6 种语言版本。UI 动态切换，包括对阿拉伯语的完整 RTL 支持。

<br/>

---

<br/>

## 快速开始

### 前置要求

- [Bun](https://bun.sh) v1.0+

### 安装和构建

```bash
git clone https://github.com/badchars/ai-knowledge-graph.git
cd ai-knowledge-graph
bun install
bun run build
```

### 本地预览

```bash
bun run dev          # 构建并在浏览器中打开
```

### 验证数据

```bash
bun run validate     # 根据模式检查所有 YAML 文件
```

<br/>

---

<br/>

## 部署到 GitHub Pages

### 自动部署（推荐）

仓库包含处理所有内容的 CI/CD 工作流：

1. **Fork** 或将此仓库推送到您的 GitHub 账户
2. 转到 **Settings > Pages**
3. 在 "Build and deployment" 下，选择 **Source: GitHub Actions**
4. 完成 —— 每次推送到 `main` 都会触发构建和部署

```
推送到 main → bun install → 构建 → 上传 dist/ → 部署到 Pages
```

### 手动部署

```bash
bun run build
# 将 dist/ 上传到任何静态主机：
# GitHub Pages、Netlify、Vercel、Cloudflare Pages 等
```

### PR 验证

每个触及 `data/**` 的拉取请求都会自动运行：
- `bun run validate` —— YAML 模式检查
- `bun run build` —— 确保网站可以构建
- 如果任一失败，PR 无法合并

<br/>

---

<br/>

## 如何使用

| 操作 | 方法 |
|------|------|
| **打开术语详情** | 点击任何节点 |
| **查看连接** | 悬停在节点上 |
| **搜索** | `Cmd+K` 或 `Ctrl+K` 或点击搜索栏 |
| **缩放** | 滚轮 |
| **平移** | 点击并拖动背景 |
| **重新排列** | 拖动单个节点 |
| **切换语言** | 标题中的语言选择器 |
| **切换主题** | 标题中的太阳/月亮图标 |
| **关闭面板** | `ESC` 键 |
| **浏览相关术语** | 点击详情面板中的相关术语 |

<br/>

---

<br/>

## 贡献

我们欢迎来自任何人的贡献 —— AI 研究人员、安全专业人员、开发者、学生。

### 快速开始

```bash
# 1. Fork 并克隆
git clone https://github.com/YOUR_USERNAME/ai-knowledge-graph.git
cd ai-knowledge-graph && bun install

# 2. 创建新术语
cp data/terms/_template.yaml data/terms/my-new-term.yaml

# 3. 编辑 YAML 文件

# 4. 在 data/relationships.yaml 中添加关系

# 5. 验证和测试
bun run validate && bun run build

# 6. 提交 PR
```

### 贡献类型

| 类型 | 难度 | 影响 |
|------|------|------|
| 添加新术语 | 中等 | 高 |
| 添加翻译 | 简单 | 高 |
| 修正描述 | 简单 | 中等 |
| 添加安全发现 | 中等 | 非常高 |
| 添加研究链接 | 简单 | 中等 |
| 添加配置示例 | 中等 | 高 |
| 报告不准确之处 | 简单 | 高 |

### 术语文件格式

每个术语是 `data/terms/` 中的独立 YAML 文件：

```yaml
id: my-new-term              # 必须与文件名匹配
name: MyTerm                  # 简短显示名称
fullName: My Full Term Name   # 展开名称
category: architecture        # 11 个类别之一

desc:
  en: |
    带有[内联链接](https://example.com)的英文描述。
    由空行分隔的多个段落。
  tr: |
    土耳其语描述...
  fr: ""
  zh: ""
  ar: ""
  ru: ""

analogy:
  en: "现实世界比较..."

security:
  - title:
      en: 漏洞名称
    description:
      en: 此漏洞如何工作。
    severity: high       # critical | high | medium | low

research:
  - url: https://arxiv.org/abs/xxxx.xxxxx
    label:
      en: 论文标题

tips:
  - en: 快速可操作的建议
```

### 添加关系

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

### 问题模板

无需代码 —— 使用我们的表单：

- **[建议新术语](../../issues/new?template=new-term.yml)**
- **[更新术语](../../issues/new?template=update-term.yml)**
- **[添加翻译](../../issues/new?template=add-translation.yml)**

查看 **[CONTRIBUTING.md](CONTRIBUTING.md)** 获取完整指南。

<br/>

---

<br/>

## 项目结构

```
ai-knowledge-graph/
├── build.ts                      # YAML → 静态站点生成器
├── package.json                  # build、dev、validate 脚本
├── CONTRIBUTING.md
├── LICENSE                       # MIT
│
├── data/
│   ├── terms/                    # 132 个独立 YAML 文件
│   │   ├── _template.yaml        #   贡献者模板
│   │   ├── gpu.yaml
│   │   ├── transformer.yaml
│   │   ├── prompt-injection.yaml
│   │   └── ...
│   ├── relationships.yaml        # 531 条边（6 种语言标签）
│   ├── categories.yaml           # 11 个类别及颜色
│   └── ui.json                   # UI 字符串（6 种语言）
│
├── public/
│   ├── css/style.css             #   Snow 主题（浅色 + 深色）
│   └── js/
│       ├── graph.js              #   D3.js 力导向模拟
│       ├── i18n.js               #   语言切换
│       └── theme.js              #   浅色/深色切换
│
├── templates/
│   ├── index.html                # 图谱页面模板
│   └── term.html                 # 术语详情页面模板
│
├── scripts/
│   ├── validate.ts               # YAML 模式验证器
│   └── migrate-to-yaml.ts       # 一次性 JSON → YAML 迁移
│
└── .github/
    ├── workflows/
    │   ├── validate.yml           # PR 验证
    │   └── deploy.yml             # GitHub Pages 部署
    └── ISSUE_TEMPLATE/
        ├── new-term.yml
        ├── update-term.yml
        └── add-translation.yml
```

<br/>

---

<br/>

## 架构

```
┌─────────────────────────────────────────────────────────┐
│                    数据层 (YAML)                         │
│                                                         │
│  data/terms/*.yaml    132 个独立术语文件                  │
│  data/relationships   531 条边，6 种语言标签               │
│  data/categories      11 个类别及颜色                     │
│  data/ui.json         6 种语言的 UI 字符串                │
└────────────────────────────┬────────────────────────────┘
                             │
                      bun run build
                             │
┌────────────────────────────▼────────────────────────────┐
│                   构建输出 (dist/)                       │
│                                                         │
│  index.html          图谱页面（内联数据）                 │
│  term/*.html         132 个独立术语页面                   │
│  data/graph.json     用于 API 使用的聚合数据              │
│  css/, js/           静态资源                            │
└────────────────────────────┬────────────────────────────┘
                             │
                      GitHub Actions
                             │
┌────────────────────────────▼────────────────────────────┐
│                    GitHub Pages                          │
│                                                         │
│  静态托管 —— 零后端，零数据库                              │
│  每次推送到 main 时自动部署                                │
└─────────────────────────────────────────────────────────┘
```

<br/>

---

<br/>

## 适用人群

| 角色 | 这如何帮助 |
|------|-----------|
| **开发者** | 理解您每天遇到的 AI/ML 术语 —— 它们的含义、如何连接、安全隐患 |
| **安全专业人员** | 映射 AI 攻击面 —— 从提示注入到模型窃取，具有特定机制的漏洞 |
| **DevSecOps 工程师** | 带有实际代码的加固指南 —— 每个安全发现都包含配置示例 |
| **渗透测试人员** | 架构知识揭示攻击向量 —— 深入理解 AI 系统以便测试它们 |
| **AI/ML 工程师** | 生态系统的快速参考 —— 在上下文中了解工具、框架和技术 |
| **学生和研究人员** | 类比使概念直观，研究链接指向主要来源 |

<br/>

---

<br/>

## 技术栈

| 组件 | 技术 |
|------|------|
| 运行时 | [Bun](https://bun.sh) |
| 可视化 | [D3.js v7](https://d3js.org) |
| 数据 | YAML（每个术语一个独立文件） |
| 构建依赖 | [js-yaml](https://github.com/nodeca/js-yaml) |
| 托管 | GitHub Pages |
| 前端 | 原生 HTML / CSS / JS |
| CI/CD | GitHub Actions |

<br/>

---

<br/>

## 路线图

- [ ] 在 GitHub Pages 上实时部署
- [ ] 跨所有术语内容的模糊搜索
- [ ] 并排术语比较
- [ ] 导出为 PDF / Markdown
- [ ] 用于博客和文档的可嵌入小部件
- [ ] 用于编程访问的 API 端点
- [ ] 社区对术语准确性的投票
- [ ] 从 OWASP / MITRE 数据库自动生成术语
- [ ] 日语和韩语支持

<br/>

---

<br/>

## 许可证

[MIT](LICENSE)

<br/>

---

<br/>

<div align="center">

**以好奇心和安全思维构建。**

<br/>

[报告问题](../../issues) &middot; [贡献](CONTRIBUTING.md) &middot; [查看图谱](#)

<br/><br/>

</div>
