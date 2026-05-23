# Veil 海报 · AI 生图 Prompts（自包含版）

每段 prompt 都是自包含的——已内置全部通用约束（视觉系统、配色、禁用项、输出格式），可以直接复制粘贴到任何模型（Midjourney v6+ / Flux / Stable Diffusion / DALL-E 3 / Imagen / Gemini）使用，不需要额外读上下文。

生成完成后把文件放到 `public/images/posters/` 覆盖同名 SVG（或改后缀为 `.png`/`.webp` 并同步更新 `src/content/posters.ts` 的 `src`/`width`/`height`）。

---

## 1 · `poster-encryption-stack` · 600×750（4:5 竖向，Hero 右侧）

```
A minimalist vertical poster in 4:5 aspect ratio (export at 1200x1500 px PNG or WebP for retina, no JPG to avoid gradient banding). The poster depicts an abstract layered encryption stack — four horizontal isometric panels stacked vertically with slight 3D perspective, the largest panel at the bottom and progressively smaller panels above forming a pyramid silhouette. The bottom three panels are deep navy gradients (#1a2533 to #15202e to #101b29) with subtle inner shadows. The topmost smallest panel is filled with a muted teal-to-cyan gradient (#14b8a6 to #5eead4). Each panel has a hairline edge highlight in soft cream (#fafbfc at ~12% opacity). Thin teal connector arrows (#5eead4) flow downward between adjacent panels along the central vertical axis to indicate data direction. Background: a deep navy gradient (#07111f at top to #050b14 at bottom) with a barely-visible 30px square technical grid overlay (1px lines at ~3.5% opacity) and a soft teal radial glow concentrated at the top. Four small registration corner marks in soft teal at very low opacity. Generous negative space around the entire stack.

Visual system: Architectural Minimal — Linear / Vercel / Anthropic / Stripe design lineage. Engineering blueprint aesthetic, premium minimalism, ultra-clean vector illustration look, Massimo Vignelli grid poster sensibility, Edward Tufte data-visualization restraint.

Strict color palette: deep navy #07111f / #050b14 / #1a2533 / #15202e / #101b29, accent teal #14b8a6 and #5eead4, soft cream highlights #fafbfc at low opacity. No other hues.

ABSOLUTELY DO NOT include: any text, typography, lettering, words, characters, glyphs, numbers, watermarks, logos, brand names, signatures. No people, faces, hands, fingers, or body parts. No photographs, photorealism, real-world materials, plastic sheen, metal reflections, fabric, paper texture, dust, scratches, noise. No glass, Apple Liquid Glass, glossy reflections, mirror finishes, lens flares. No 3D rendering style, no chrome, no skeuomorphism. No cartoon, anime, illustration of people, character art. No real encryption keys, real locks, real safes, real chains, real hardware. No bright neon glow that screams "AI image", keep glow soft and engineering-restrained. No gradient banding, JPEG artifacts, low-resolution noise.
```

---

## 2 · `poster-fingerprint` · 640×400（16:10 横向，Gallery 1）

```
A minimalist horizontal poster in 16:10 aspect ratio (export at 1280x800 px PNG or WebP for retina, no JPG). On the left two-thirds of the canvas, draw a stylized abstract fingerprint pattern composed of fine concentric arcs and asymmetric loops — rendered as single-weight teal lines (#14b8a6) about 2 to 2.5 px wide, on a soft cream background (#fafbfc to #eef2f4 gradient). The arcs should evoke a real fingerprint's flow but remain purely geometric vector lines — never resemble a photograph or scan. A barely-visible 20px square grid (1px lines at ~4.5% opacity) sits behind the pattern. Three small solid dark dots (#07111f, ~3.4px radius) mark ridge endpoint signature points. The right one-third of the canvas is mostly empty negative space, decorated only with a faint 3x3 grid of tiny teal dots (~2px each at ~22% opacity) plus three or four thin horizontal cream guide lines suggesting a data-sheet placeholder layout. A soft radial teal wash (#5eead4 at ~12% opacity) is centered behind the fingerprint pattern. Generous whitespace overall.

Visual system: Architectural Minimal — Linear / Vercel / Anthropic / Stripe design lineage. Edward Tufte data visualization meets Otl Aicher infographics meets Swiss modernism. Ultra-clean vector aesthetic, monochromatic with single teal accent.

Strict color palette: soft cream #fafbfc and #eef2f4, accent teal #14b8a6 and #5eead4, signature dots in deep navy #07111f. No other hues.

ABSOLUTELY DO NOT include: any text, typography, lettering, words, characters, glyphs, numbers, watermarks, logos, brand names. No people, no real finger, no real hand, no thumb, no biometric scanner UI, no fingerprint photograph, no skin texture, no realistic fingerprint scan. No photographs, photorealism, real materials, plastic, metal, glossy reflection. No glass, Apple Liquid Glass, mirror, lens flare. No 3D rendering, chrome, skeuomorphism. No cartoon, anime, character art. No gradient mesh that creates banding, no JPEG artifacts, no noise, no dust, no scratches.
```

---

## 3 · `poster-network-audit` · 640×400（16:10 横向，Gallery 2）

```
A minimalist horizontal poster in 16:10 aspect ratio (export at 1280x800 px PNG or WebP for retina, no JPG). The composition shows an abstract outbound network audit diagram on a deep navy background (#07111f to #050b14 gradient) with a faint 24px square technical grid (1px lines at ~4% opacity). On the left side, place one large origin node — a 9px solid teal core (#5eead4) wrapped by two softly glowing concentric teal rings (#14b8a6 at low opacity) plus a wider radial glow halo. On the right side, place four smaller destination nodes (~5.5px solid teal cores wrapped by a single 17px ring at ~58% opacity) at staggered vertical positions. Connect the origin to each destination with thin smooth curved bezier lines (~1.4 px). Three of the four connections are solid teal (#5eead4 at ~50% opacity) indicating trusted traffic. The remaining connection (the third one) is rendered as a dashed amber line (#f4b860, ~1.55 px, dash pattern roughly 7-8) indicating a flagged outbound — and that destination node is recolored amber (#f4b860) with an amber glow instead of teal. Scattered tiny cream dots (#fafbfc at ~12% opacity) suggest faint background data points. Subtle small corner registration marks in soft teal at very low opacity.

Visual system: Architectural Minimal — Linear / Vercel / Anthropic / Stripe design lineage. Vercel observability dashboard meets Tron geometric minimalism meets Otl Aicher infographics. Ultra-clean engineering visualization, premium dark aesthetic.

Strict color palette: deep navy #07111f / #050b14 background, accent teal #14b8a6 and #5eead4, single amber warning accent #f4b860, soft cream #fafbfc only as low-opacity dust. No other hues.

ABSOLUTELY DO NOT include: any text, typography, lettering, words, characters, glyphs, numbers, IP addresses, hostnames, watermarks, logos, brand names. No people, no faces, no hands. No real servers, server racks, fiber optics, ethernet cables, router photographs, data-center photography. No photographs, photorealism, real materials, plastic sheen, metal. No glass, Apple Liquid Glass, glossy reflection, lens flare. No 3D rendering, chrome, skeuomorphism. No cartoon, anime, character art. Keep neon glow soft and restrained — no bright unrealistic neon. No gradient banding, JPEG artifacts, noise.
```

---

## 4 · `poster-isolation` · 640×400（16:10 横向，Gallery 3）

```
A minimalist horizontal poster in 16:10 aspect ratio (export at 1280x800 px PNG or WebP for retina, no JPG). Depict four isolated chambers arranged side by side, on a soft cream background (#fafbfc to #eef2f4 gradient) with a barely-visible 20px square grid (1px at ~4.5% opacity). Four rounded rectangles roughly 112x212 px each with 8px corner radius sit in a row with equal generous spacing between them, each rendered as an isolated "chamber". Each chamber has a unique muted pastel fill and matching border color at low opacity:
- Leftmost chamber: pale teal fill (#d8f4ef) with teal border (#14b8a6 at ~48% opacity)
- Second chamber: pale sky-blue fill (#d9eff8) with blue border (#38bdf8 at ~48% opacity)
- Third chamber: pale amber fill (#f7e5c5) with amber border (#f4b860 at ~55% opacity)
- Rightmost chamber: pale rose fill (#f5dce2) with rose border (#e8798b at ~50% opacity)
Inside each chamber, place a few small abstract geometric markers in the chamber's accent color at varying opacities — combinations of small circles, small rounded rectangles, short horizontal lines (suggesting data rows), and one distinctive accent shape per chamber (e.g., a rectangle, a triangle, a square frame, a circle inside a frame). Each chamber casts a very soft dark shadow downward (#07111f at ~9% opacity). Thin nearly-invisible vertical guide lines (#07111f at ~9% opacity) sit between chambers to emphasize separation, plus a faint outer rectangle frame surrounding all four chambers. Generous whitespace overall.

Visual system: Architectural Minimal — Linear / Vercel / Anthropic / Stripe design lineage. Massimo Vignelli grid posters meets Swiss modernist info graphics meets Linear design system. Premium engineering illustration, ultra-clean vector look.

Strict color palette: soft cream #fafbfc and #eef2f4 background, four muted pastel chamber fills (pale teal #d8f4ef, pale sky-blue #d9eff8, pale amber #f7e5c5, pale rose #f5dce2), matching low-opacity accent borders (teal #14b8a6, sky-blue #38bdf8, amber #f4b860, rose #e8798b), dark navy #07111f only as very low-opacity guide lines and shadows. No other hues.

ABSOLUTELY DO NOT include: any text, typography, lettering, words, characters, glyphs, numbers, labels, watermarks, logos, brand names. No people, no faces, no hands. No real objects inside chambers — no phones, computers, files, folders, or any real-world items. No photographs, photorealism, real materials, plastic, metal, fabric, glass texture. No Apple Liquid Glass, glossy reflection, mirror finish, lens flare. No 3D rendering, chrome, skeuomorphism. No cartoon, anime, character illustration. Keep composition sparse and architectural — no clutter, no ornate detail. No gradient banding, JPEG artifacts, noise, dust, scratches.
```

---

## 替换流程

1. 复制上面任意一段 prompt 到 AI 工具，生成图
2. 选满意版本，导出为 PNG（首选）或 WebP
3. 文件放到 `public/images/posters/`：
   - 直接覆盖同名 SVG（保留 `.svg` 后缀，但内容已经是位图）— 简单但有点 hacky
   - **推荐**：改后缀为 `.png` 或 `.webp`，同步修改 `src/content/posters.ts` 里对应条目的 `src` / `width` / `height`
4. 运行 `pnpm build` 验证
5. `git add -A && git commit -m "feat(posters): 替换为 AI 生成海报"`

## 调优提示

- **AI 还是想加文字**：在 prompt 末尾追加 `"absolutely no text under any circumstance — if you generate even a single letter or symbol, the image fails the brief"`
- **颜色跑偏**：在 prompt 末尾追加 `"reject any output where the dominant hue is not the specified palette; do not introduce orange, red, purple, green other than the specified teal"`
- **画面太满**：在 prompt 末尾追加 `"target 60-70% empty canvas, extreme negative space, single focal element with breathing room"`
- **想要纯暗色版本**：把背景替换为 `#050308`，accent 全部用 `#5eead4`，移除任何米白色或浅色
- **不同模型偏好**：Midjourney 偏向具象、需要更强的 "abstract vector" 强调；DALL-E 3 / Imagen 偏向忠实复现描述，可直接用；Flux 在配色还原上最好
