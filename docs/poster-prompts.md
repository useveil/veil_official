# Veil 海报 · AI 生图 Prompts（精简版）

每张海报一段 prompt，直接复制粘贴到任何模型（Midjourney v6+ / Flux / Stable Diffusion / DALL-E 3 / Imagen / Gemini）都能用。生成完成后把文件放到 `public/images/posters/` 覆盖同名 SVG（或改后缀为 `.png` 并更新 `src/content/posters.ts` 中的 `src`/`width`/`height`）。

**通用约束**（每段 prompt 都已包含，但生成时若工具有"风格预设"也请保持）：
- 视觉系统：Architectural Minimal（Linear / Vercel / Anthropic 谱系）
- 不要：人物、真实物体、真实摄影、Apple Liquid Glass、卡通、3D 真实材质、**任何文字 / logo / 品牌名**
- 主色：深海军蓝 `#07111f` / 米白 `#fafbfc`，强调色 Teal `#14b8a6` / `#5eead4`
- 输出：PNG 或 WebP（不要 JPG），建议 retina 2× 分辨率上传

---

## 1 · `poster-encryption-stack.svg` · 600×750（4:5 竖向）

> 用于首页 Hero 右侧。

```
A minimalist vertical poster in 4:5 aspect ratio (1200x1500 px) depicting an abstract layered encryption stack. Four horizontal isometric panels stacked vertically with slight 3D perspective — the largest panel at the bottom and progressively smaller panels above. The bottom three panels are deep navy gradients (#1a2533 / #15202e / #101b29) with subtle inner shadows. The topmost panel is filled with a muted teal-to-cyan gradient (#14b8a6 to #5eead4) and is slightly smaller, creating a pyramid-like silhouette. Each panel has a hairline edge highlight in soft cream (#fafbfc at 12% opacity). Thin teal connector arrows (#5eead4) flow downward between adjacent panels along the center axis, indicating data direction. Background is a deep navy gradient (#07111f to #050b14) with a barely-visible technical grid overlay and a soft teal radial glow concentrated at the top. Four tiny corner registration marks. Generous negative space. No text, no labels, no logos, no people, no photography. Style: Massimo Vignelli grid posters meets Linear product illustration meets Vercel design system. Engineering blueprint aesthetic, premium minimalism, ultra clean vector look.
```

---

## 2 · `poster-fingerprint.svg` · 640×400（16:10 横向）

> 用于首页 PosterGallery 第 1 位。

```
A minimalist horizontal poster in 16:10 aspect ratio (1280x800 px) depicting an abstract deterministic fingerprint pattern. On the left two-thirds of the canvas, draw a stylized fingerprint composed of fine concentric arcs and asymmetric loops, rendered as single-weight teal lines (#14b8a6) about 2px wide, on a soft cream background (#fafbfc to #eef2f4 gradient). The arcs should evoke a real fingerprint's flow but remain purely geometric — not a scan or photograph. A barely-visible square grid (1px lines at 4.5% opacity) sits behind the pattern. Three small solid dark dots (#07111f) mark ridge endpoint signature points. The right one-third of the canvas is mostly empty negative space, decorated only with a faint 3x3 grid of tiny teal dots and three or four thin horizontal cream guide lines — like a data sheet placeholder. Soft radial teal wash (#5eead4 at 12% opacity) centered on the fingerprint. No text, no labels, no logos, no real finger or hand, no biometric scanner UI. Style: Edward Tufte data visualization meets Linear product illustration meets Otl Aicher infographics. Ultra-clean vector aesthetic, monochromatic with single teal accent.
```

---

## 3 · `poster-network-audit.svg` · 640×400（16:10 横向）

> 用于首页 PosterGallery 第 2 位。

```
A minimalist horizontal poster in 16:10 aspect ratio (1280x800 px) showing an abstract network audit diagram on a deep navy background (#07111f to #050b14 gradient) with a faint technical grid (1px lines at 4% opacity). On the left side, place one large origin circle — a 9px solid teal core (#5eead4) wrapped by two softly glowing concentric teal rings (#14b8a6 with low opacity), plus a wider radial glow halo. On the right side, place four smaller destination nodes (5.5px solid teal core with single ring) at staggered vertical positions. Connect the origin to each destination with thin smooth curved lines (1.4px). Three connections are solid teal lines (#5eead4 at ~50% opacity) indicating trusted traffic. One connection — the third one going to a slightly highlighted node — is rendered as a dashed amber line (#f4b860, 1.55px, dash pattern 7-8) indicating a flagged outbound connection; that destination node is amber (#f4b860) with an amber glow instead of teal. Scattered tiny cream dots (#fafbfc at 12% opacity) suggest background data points. Subtle corner registration marks in soft teal at very low opacity. No text, no labels, no logos, no real servers or fiber optics, no people. Style: Vercel observability dashboard meets Tron geometric minimalism meets Otl Aicher infographics. Ultra-clean engineering visualization, premium dark aesthetic.
```

---

## 4 · `poster-isolation.svg` · 640×400（16:10 横向）

> 用于首页 PosterGallery 第 3 位。

```
A minimalist horizontal poster in 16:10 aspect ratio (1280x800 px) depicting four isolated chambers side by side, on a soft cream background (#fafbfc to #eef2f4 gradient) with a barely-visible square grid (1px at 4.5% opacity). Four rounded rectangles (112x212 px each, 8px radius) sit in a row with equal generous spacing between them, each rendered as an isolated "chamber". Each chamber has a unique muted pastel fill and matching border color at low opacity:
1) Leftmost chamber: pale teal fill (#d8f4ef) with teal border (#14b8a6 at 48% opacity)
2) Second chamber: pale sky-blue fill (#d9eff8) with blue border (#38bdf8 at 48% opacity)
3) Third chamber: pale amber fill (#f7e5c5) with amber border (#f4b860 at 55% opacity)
4) Rightmost chamber: pale rose fill (#f5dce2) with rose border (#e8798b at 50% opacity)
Inside each chamber, place a few small abstract geometric markers in the chamber's accent color at varying opacities — combinations of small circles, small rounded rectangles, short horizontal lines (suggesting data rows), and one accent shape per chamber (a rectangle, a plus, a triangle, a square frame). The chambers cast a very soft dark shadow downward (#07111f at 9% opacity). Thin nearly-invisible vertical guide lines (#07111f at 9% opacity) sit between chambers to emphasize separation, plus a faint outer rectangle frame surrounding all four. Generous whitespace. No text, no labels, no logos, no people, no photographic content, no glass or 3D rendering. Style: Massimo Vignelli grid posters meets Linear design system meets Swiss modernist info graphics. Premium engineering illustration, ultra-clean vector look.
```

---

## 替换流程

1. 用上面任意一段 prompt 在你的 AI 工具里生成图
2. 选满意版本导出为 PNG（首选）或 WebP
3. 把文件放到 `public/images/posters/` 下覆盖同名 SVG，**或**改名为 `.png`/`.webp` 并更新 `src/content/posters.ts` 里对应条目的 `src` 字段（同时把 `width`/`height` 改成新图尺寸）
4. 运行 `pnpm build` 验证图片正确加载
5. `git add -A && git commit -m "feat(posters): 替换 hero/gallery 海报"`

## 调优提示

- **AI 总想加文字**：在 prompt 结尾追加 "absolutely no text, no typography, no lettering, no glyphs, no watermark"
- **颜色偏差**：在结尾追加 "strict color palette: exactly #07111f / #fafbfc / #14b8a6 / #5eead4"
- **图太满**：在结尾追加 "extreme negative space, sparse composition, 70% empty canvas"
- **想要纯暗色版**：把背景替换为 `#050308`，accent 改为 `#5eead4` 全部、移除任何米白色
