# Portfolio Experience: QA（项目展示方式）

- Title: Portfolio Experience: QA（项目展示方式）
- Doc Type: Split Topic QA
- Domain: personal-site-portfolio
- Status: active-design-reference
- Audience: Engineers implementing or reviewing the portfolio
- Last Updated: 2026-09-14
- Related Docs: [../README.md](../README.md), [./README.md](./README.md)
- Keywords: qa, spike, rss, portrait, hover, project-detail

---

[返回 QA 索引](./README.md)

## Questions

### Q1. 是否移除页脚中的 RSS 入口？

- Question:
  项目底部的 RSS 图标或链接是否可以去除？
- Short Answer:
  可以移除可见入口，但保留 RSS 地址和页面中的订阅发现元数据。
- Current Evidence:
  - `src/components/Footer.astro` 在 GitHub、Email 后显示 RSS 链接。
  - `src/pages/rss.xml.ts` 和 `src/pages/en/rss.xml.ts` 仍提供中英文订阅。
  - `src/layouts/BaseLayout.astro` 仍通过 `rel="alternate"` 暴露订阅地址。
- Impact:
  页脚更简洁；已有订阅者和 RSS 阅读器的自动发现能力不受影响。
- Implementation Status:
  可见 RSS 链接已移除，订阅端点保留。
- Decision:
  只移除 Footer UI，不删除 RSS 功能。

### Q2. 是否应该加入个人照片？

- Question:
  个人网站是否应该加入个人照片？
- Short Answer:
  照片不是第一版作品集可信度的必要条件。优先完善案例和成果；只有在有一张愿意长期公开、视觉质量足够的职业照片时再加入。
- Current Evidence:
  - 当前首页以项目能力和文字定位为主要识别方式。
  - 当前 `public/` 没有个人照片资产，页面也没有照片字段。
- Design Interpretation:
  如果加入，优先放在 About 页的个人简介旁；首页只使用小尺寸头像或不使用，避免照片压过项目成果。
- Impact:
  照片会增强亲近感和招聘场景中的人物识别，但会永久扩大公开个人信息范围，并增加裁切、响应式和图片优化要求。
- Implementation Status:
  尚未实现，也没有收到用户选择的照片。
- Decision:
  暂不默认加入。待用户提供并明确同意公开具体照片后再实现。
- Follow-up:
  - 如决定加入，准备至少 1200px 的竖向或方形原图、替代文本和 WebP/AVIF 版本。

### Q3. 项目能否默认简洁，悬停或点击后展示详情？

- Question:
  项目是否可以普通状态保持 brief，在鼠标悬停或点击后变成详细信息？
- Short Answer:
  可以，但不能把关键内容只放在 hover 中。推荐卡片默认展示摘要和核心指标，桌面 hover 只强化指标与“查看案例”提示，点击、触摸或键盘操作进入独立详情页。
- Current Evidence:
  - `src/components/ProjectCard.astro` 当前只显示 frontmatter 中的角色、摘要、亮点、技术栈和链接。
  - `src/components/ProjectsIndex.astro` 只渲染卡片。
  - 当前没有 `src/pages/projects/[slug].astro` 或英文对应路由，Markdown 正文没有被展示。
- Design Interpretation:
  在卡片中展开大量正文会造成网格跳动，也无法在手机上稳定表达 hover。独立案例页能容纳痛点、约束、方案、指标、证据和复盘，并保留可分享 URL。
- Impact:
  需要扩展项目内容契约、建立中英文详情路由、让整张卡片具备明确焦点状态，并测试桌面、触屏和键盘交互。
- Implementation Status:
  尚未实现；当前只有轻微的 hover 抬升效果。
- Decision:
  采用“简洁卡片 + 独立案例页”；hover 不是访问详情的唯一方式。
- Follow-up:
  - 扩展项目 schema，加入 `problem`、`metrics`、`period` 等可选字段。
  - 新增中英文 `/projects/[slug]/` 路由。
  - 为三个现有项目补充问题、约束、职责、方案、量化结果和复盘正文。
  - 测试整卡点击、键盘焦点、减少动画偏好和移动端布局。

## Decisions

- 页脚隐藏 RSS，但保留 RSS 服务。
- 暂不加入个人照片，等待具体照片与公开授权。
- 项目卡保持简洁，详情通过可点击、可触摸、可键盘访问的独立案例页承载。

## Code Index

| 文件 | 当前角色 | 后续修改 |
| --- | --- | --- |
| `src/components/ProjectCard.astro` | 项目摘要卡片 | 增加指标预览和详情入口 |
| `src/content.config.ts` | 项目数据 schema | 增加可选案例字段 |
| `src/pages/projects/[slug].astro` | 不存在 | 新增中文详情页 |
| `src/pages/en/projects/[slug].astro` | 不存在 | 新增英文详情页 |
| `src/styles/global.css` | 卡片 hover 与全局响应式 | 增加焦点、指标和详情页样式 |

## Follow-up Actions

- 用户补充每个项目的公开信息后，进入实现阶段。
