# Veil 海报 AI 生图 Prompts

这份文档收集了 4 张首页海报的 AI 生图 prompt。生成出图后请按文件名替换 `public/images/posters/` 下对应的占位 SVG。

## 全局共享规范

所有海报共享同一视觉系统（Architectural Minimal · Linear / Vercel / Anthropic 谱系）：

| 项 | 规范 |
|---|---|
| 整体调性 | 极简、克制、几何抽象、工程美学 |
| 主色 | 深海军蓝 `#07111f` / 米白 `#fafbfc` |
| 强调色 | Teal `#14b8a6` / Teal-soft `#5eead4` |
| 警示色（极少用）| Amber `#f4b860` / Rose `#e8798b` |
| 禁用 | ❌ 人物 / 真实物体 / 真实摄影 / Apple Liquid Glass / 卡通 / 3D 真实材质 / 任何文字、logo、品牌名 |
| 字体（若必须）| 等宽：JetBrains Mono / IBM Plex Mono / Geist Mono |
| 输出格式 | PNG（首选）或 WebP，**不要 JPG**（避免渐变 banding） |
| 输出分辨率 | 见各海报"输出"字段，建议 2× retina 上传 |

替换占位时把生成图的文件名改为对应 SVG 文件名（保留 `.svg` 后缀 OR 改成 `.png` 并同步修改 `src/content/posters.ts` 里的 `src` 路径与 width/height）。

---

## 1 · Hero 海报 · 加密栈层叠

**文件：** `public/images/posters/poster-encryption-stack.svg`（替换为 `.png` 时改后缀并更新 `posters.ts`）
**输出尺寸：** 600 × 750（4:5 竖向，retina 上传 1200 × 1500）
**位置：** 首页 Hero 右侧
**主题：** Veil 加密栈 4 层结构的视觉化（Master Password → Argon2id → AES-256-GCM → SQLCipher）

### Midjourney / Niji / Flux

```
A minimalist architectural diagram of a layered encryption stack, isometric flat geometric composition, four horizontal translucent panels stacked at slightly different scales, each panel a different finely tuned shade of deep navy with one panel highlighted in muted teal, ultra-clean engineering blueprint aesthetic, subtle grid background, soft inner glow, vertical 4:5 poster format, no text, no logos, no people, in the style of Linear product illustration meets Vercel design system meets Massimo Vignelli grid posters, monospace technical labels visible but unreadable, deep navy #07111f and teal accent #14b8a6, generous negative space, premium technical poster, --ar 4:5 --style raw --v 6
```

### Stable Diffusion / Flux dev

**Positive prompt:**
```
minimalist architectural diagram, four stacked translucent geometric panels representing an encryption stack, isometric flat composition, subtle grid background, deep navy background (#07111f), one teal accent layer (#14b8a6), vertical poster 4:5, engineering blueprint, generous negative space, soft volumetric glow, ultra clean, premium tech illustration style of Linear and Vercel, monochromatic with single accent color, smooth gradients, no banding
```

**Negative prompt:**
```
text, words, letters, logo, brand, watermark, signature, people, person, hands, face, photorealistic, photograph, real material, plastic, metal sheen, 3D rendering, glossy reflection, glass, liquid glass, cartoon, anime, illustration of person, low quality, jpeg artifacts, noise, dust, scratches
```

### DALL-E 3 / Imagen 3 / Gemini

```
Create a minimalist vertical poster (4:5 aspect ratio) showing four horizontal panels stacked from large at the bottom to small at the top, like an encryption stack diagram. Each panel is a translucent geometric rectangle in a different shade of deep navy blue (#07111f, #1a212d, #2f3845), with the topmost panel in muted teal (#14b8a6). Background is deep navy with a barely-visible technical grid pattern. No text, no logos, no people. Architectural minimalism, premium engineering aesthetic, generous whitespace. Style of Vercel and Linear design systems.
```

---

## 2 · 海报 1 · 指纹画像确定性

**文件：** `public/images/posters/poster-fingerprint.svg`
**输出尺寸：** 640 × 400（16:10 横向，retina 1280 × 800）
**位置：** 首页 PosterGallery 第 1 位
**主题：** 抽象指纹纹路 + 数据网格，传达"种子稳定 → 信号一致"

### Midjourney / Niji / Flux

```
An abstract minimalist poster of fingerprint ridges rendered as fine concentric arcs and asymmetric loops, drawn in single-weight teal lines on a soft cream background, accompanied by a barely-visible technical grid and 3 small dot markers at ridge endpoints, no actual fingerprint photograph, purely geometric vector aesthetic, premium engineering illustration, horizontal 16:10 poster, generous negative space on the right side, no text, no logos, no people, monochromatic cream and single teal accent #14b8a6, in the style of Edward Tufte data visualization meets Linear product illustration, --ar 16:10 --style raw --v 6
```

### Stable Diffusion / Flux dev

**Positive prompt:**
```
abstract fingerprint ridge pattern as concentric arcs and asymmetric loops, single-weight teal line drawing, soft cream background (#fafbfc), technical grid overlay barely visible, three small accent dots, horizontal 16:10 poster, premium engineering illustration, vector aesthetic, generous whitespace on the right, monochromatic with single teal accent (#14b8a6), Edward Tufte data viz style, Linear product illustration style, no real fingerprint photo
```

**Negative prompt:**
```
text, words, letters, logo, real fingerprint photo, photorealistic skin, finger, hand, biometric scanner UI, generic stock illustration, gradient mesh, glass, glossy, 3D, banding, jpeg artifacts, dust, noise, watermark
```

### DALL-E 3 / Imagen 3 / Gemini

```
Horizontal poster (16:10) on a soft cream background. On the left half, draw an abstract pattern of fine concentric arcs and asymmetric loops in muted teal (#14b8a6), resembling fingerprint ridges but stylized as a pure line drawing—not a photograph. Add a barely-visible square grid behind it. Three tiny dark dots mark ridge endpoints. Right half is mostly empty (negative space). No text, no logos. Minimalist engineering aesthetic, style of Linear and Vercel design.
```

---

## 3 · 海报 2 · 网络出站审计

**文件：** `public/images/posters/poster-network-audit.svg`
**输出尺寸：** 640 × 400（16:10 横向，retina 1280 × 800）
**位置：** 首页 PosterGallery 第 2 位
**主题：** 节点图视化出站连接，一个来源节点 → 多个目标节点，部分连接被审计标记

### Midjourney / Niji / Flux

```
A minimalist network topology diagram, single large origin node on the left connected by thin curved lines to four small destination nodes scattered on the right, each node a simple circle with a softly glowing teal ring, one of the connections drawn as a dashed amber line indicating a flagged outbound, deep navy background #07111f with a subtle technical grid, horizontal 16:10 poster, premium engineering visualization, no text on the nodes, geometric and clean, in the style of Vercel observability dashboard meets Tron geometric minimalism meets Otl Aicher infographics, single accent color teal #14b8a6, one warning amber accent #f4b860, --ar 16:10 --style raw --v 6
```

### Stable Diffusion / Flux dev

**Positive prompt:**
```
minimalist network topology diagram, one large origin circular node on the left connected by thin curved lines to four small destination nodes on the right, each node has a soft teal glowing ring, one connection is a dashed amber line indicating flagged outbound, deep navy background (#07111f), subtle technical grid, horizontal 16:10 poster, premium engineering visualization, clean geometric, monochromatic with teal accent (#14b8a6) and a single amber warning (#f4b860), style of Vercel observability dashboard
```

**Negative prompt:**
```
text on nodes, words, letters, logo, photorealistic, 3D render, glassy, glossy, liquid glass, busy composition, too many lines, chaotic, gradient mesh, banding, jpeg artifacts, watermark, real network equipment, server racks, fiber optics photo
```

### DALL-E 3 / Imagen 3 / Gemini

```
Horizontal poster (16:10) on a deep navy background (#07111f) with a barely-visible grid. On the left, draw one large circle (the origin node) with a soft teal glowing ring (#14b8a6). On the right, place four smaller circular nodes at different vertical positions, each also ringed in teal. Connect the origin to each destination with a thin curved line. Make one of those four lines dashed and amber-colored (#f4b860) to indicate a flagged connection. No text labels, no logos, no people. Style of an engineering observability dashboard reduced to its essence.
```

---

## 4 · 海报 3 · 多 Profile 隔离

**文件：** `public/images/posters/poster-isolation.svg`
**输出尺寸：** 640 × 400（16:10 横向，retina 1280 × 800）
**位置：** 首页 PosterGallery 第 3 位
**主题：** 4 个并列的几何容器，代表 4 个完全隔离的 Profile

### Midjourney / Niji / Flux

```
A minimalist diagram of four isolated chambers arranged side by side, each chamber a rounded rectangle filled with a different solid muted color (teal, soft blue, warm amber, dusty rose), the chambers separated by clean thin walls, no objects inside the chambers just abstract small geometric markers, soft cream background #fafbfc with a barely-visible grid, horizontal 16:10 poster, premium engineering illustration, generous spacing between chambers, no text, no logos, in the style of Massimo Vignelli grid posters meets Linear design system, monochromatic cream with four subtle accent fills, --ar 16:10 --style raw --v 6
```

### Stable Diffusion / Flux dev

**Positive prompt:**
```
minimalist isolation diagram, four rounded rectangular chambers arranged side by side, each chamber filled with a different muted accent color (teal #14b8a6, soft blue #38bdf8, warm amber #f4b860, dusty rose #e8798b), thin clean separating walls, abstract small geometric markers inside each chamber, soft cream background (#fafbfc), barely-visible grid overlay, horizontal 16:10 poster, premium engineering illustration, generous spacing, style of Massimo Vignelli grid posters
```

**Negative prompt:**
```
text, words, letters, logo, people, faces, real objects inside chambers, photographic content, 3D render, glassy, glossy, gradient mesh, banding, jpeg artifacts, cluttered, busy composition, ornate, watermark
```

### DALL-E 3 / Imagen 3 / Gemini

```
Horizontal poster (16:10) on a soft cream background (#fafbfc) with a barely-visible grid. Draw four rounded rectangles arranged side by side, each acting as an isolated chamber. Fill them with these muted accent colors in order: teal (#14b8a6), soft blue (#38bdf8), warm amber (#f4b860), dusty rose (#e8798b)—all at low saturation. Inside each chamber, add a few tiny abstract geometric markers (dots, short lines). Walls between chambers are thin and clean. No text, no logos, no people. Style of Massimo Vignelli grid posters meets Linear design system.
```

---

## 替换流程

1. 用上面任意一组 prompt 在你选择的 AI 工具里生成图
2. 选出你最满意的版本，导出为 PNG（首选）或 WebP
3. 放到 `public/images/posters/` 下，文件名可以是：
   - 直接覆盖 SVG 占位（用同名 `.svg` 文件）—— 适合保留矢量
   - 或改名为 `.png` / `.webp`，**同时**更新 `src/content/posters.ts` 里对应条目的 `src` 字段
4. 重新构建：`pnpm build`，确认图片正确加载
5. （可选）用 `Image.tsx` 的 `priority` 字段控制首屏加载策略——Hero 海报已经 `priority`，Gallery 海报默认 lazy load

## 调优提示

- **首次生成不满意**：换关键词强度（如把 "minimalist" 改成 "ultra-minimalist"），或降低 `--stylize` (Midjourney) / `cfg_scale` (Stable Diffusion)
- **配色偏差**：在 prompt 里强调 hex 代码，且生成后用图像编辑工具（Affinity / Figma）做最后一道色彩校正
- **AI 总想加文字**：在 negative prompt 里多列几个变体：`"text, typography, lettering, characters, glyphs, symbols, watermark"`
- **图太花、太满**：加 `"generous whitespace, lots of negative space, sparse composition, minimalist negative space poster"`
- **想要更黑暗色版本**：把背景替换为 `#050308`、accent 改为 `#5eead4`，整体氛围更"加密黑客"风
