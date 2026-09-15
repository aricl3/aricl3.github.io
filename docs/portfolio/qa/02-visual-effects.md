# Portfolio Experience: QA（3D 卡片、开发者票券与站点宠物）

- Title: Portfolio Experience: QA（3D 卡片、开发者票券与站点宠物）
- Doc Type: Split Topic QA
- Domain: personal-site-portfolio
- Status: active-design-reference
- Audience: Engineers implementing or reviewing the portfolio
- Last Updated: 2026-09-14
- Related Docs: [../README.md](../README.md), [./README.md](./README.md), [./01-project-presentation.md](./01-project-presentation.md)
- Keywords: qa, spike, css-3d, developer-ticket, hover, mascot, accessibility, reduced-motion

---

[返回 QA 索引](./README.md)

## Questions

### Q1. Uiverse 风格的 3D 玻璃卡片能否用于项目展示？

- Question:
  能否将提供的透视、玻璃层和多层圆形悬浮效果用于项目卡片？
- Short Answer:
  技术上可行，但不应原样移植。保留透视、分层和柔和倾斜的交互语言，重新实现为符合当前暖色极简视觉的原创版本。
- Current Evidence:
  - `src/styles/global.css` 当前项目卡只有 `translateY(-3px)` 和阴影过渡。
  - 当前色彩由 `--paper`、`--accent`、`--warm` 等设计变量控制，并同时支持深色模式。
  - `src/components/ProjectCard.astro` 承载真实文本、指标、标签和链接，需要保持清晰阅读与点击能力。
- Design Interpretation:
  示例中的固定 290×300 尺寸、50px 圆角、霓虹绿色、30 度旋转和长延迟装饰动画会与现有风格冲突，也可能让文字变形或越界。项目卡应响应式布局，最大倾斜约 3–5 度，正文层只做轻微 Z 轴位移。
- Impact:
  纯 CSS 可完成基础效果，不需要后端。需要处理深色模式、键盘焦点、触屏、减少动画偏好、卡片点击区域和网格溢出。
- Implementation Status:
  本地原型已实现：`CasePassCard.astro` 只强化首页第一个精选项目，并提供桌面轻量 3D、键盘焦点和 reduced-motion 降级。
- Decision:
  不直接复制第三方代码；实现一个“Rocky 3D Case Card”适配版本。核心痛点与指标始终可见，装饰层和倾斜只在支持精确指针的桌面设备启用。
- Follow-up:
  - 使用 `perspective`、`transform-style: preserve-3d` 和伪元素实现原创分层效果。
  - 将 hover 限制在 `@media (hover: hover) and (pointer: fine)`。
  - 为 `:focus-visible` 提供等价但静态的视觉反馈。
  - 在 `prefers-reduced-motion: reduce` 下禁用倾斜与漂移动画。
  - 先用一个项目卡制作原型并验证浅色、深色、手机和键盘操作。

### Q2. 是否可以加入类似 Buy Me a Coffee 的小宠物？

- Question:
  网站是否可以增加一个像素小宠物，并在点击后提供轻量互动或支持入口？
- Short Answer:
  可以，适合做成网站个性化记忆点，但应是可关闭、低频动画、无第三方脚本的增强功能，而不是持续闪烁或遮挡正文的固定广告。
- Current Evidence:
  - 当前网站没有客户端状态或后端依赖，适合使用一个 Astro 组件和少量原生 JavaScript。
  - 移动端底部已有固定导航，宠物若固定在右下角会发生空间竞争。
  - 提供的幽灵示例使用 0.5 秒跳动和闪烁，对长时间阅读和减少动画偏好不友好。
- Design Interpretation:
  可以保留像素宠物概念，但应重新绘制为符合 Rocky 品牌的绿色/暖橙小幽灵或机器人。点击后打开小气泡，提供“看项目”“读笔记”“联系我”以及可选支持链接。
- Impact:
  需要管理移动端位置、层级、关闭状态、键盘操作、ARIA 文案和动画偏好。若接入 Buy Me a Coffee，只使用普通外链，避免引入第三方追踪脚本。
- Implementation Status:
  第一版本地原型已实现为 `RockySprite.astro`，依附在首页 3D 身份卡上；当前只承担装饰作用，不伪装成按钮。
- Decision:
  作为第二阶段增强项。只在首页和项目页出现；文章阅读页默认隐藏。动画周期放慢，不使用高频 flicker，移动端放在底部导航上方或改为页面内元素。
- Follow-up:
  - 确认宠物形象：像素幽灵、机器人或其他角色。
  - 确认点击后的主要动作：站内导航、联系方式或支持链接。
  - 如需要支持功能，提供正式的 Buy Me a Coffee 或其他收款页面 URL。
  - 添加关闭按钮，并考虑用 `localStorage` 记住关闭状态。

### Q3. 开发者通行证票券能否融入项目展示？

- Question:
  提供的 Uiverse 开发者通行证卡片能否融入个人网站？
- Short Answer:
  可以，并且它比身份介绍更适合承载精选项目；推荐提取“票根、编号、网格和轻微 3D 高光”四个特征，重构为 Rocky 的 `Case Pass`，不要直接沿用会议票的虚构字段和紫色赛博皮肤。
- Current Evidence:
  - `src/components/ProjectCard.astro` 已有项目名称、摘要、角色、技术栈、亮点和外链，可映射为票券的信息层级。
  - `src/content.config.ts` 暂无 `period`、`status`、`metrics` 等字段，因此无法真实填写示例中的日期、席位或通行等级。
  - 首页使用三列项目网格，项目页使用两列网格；示例固定 `22em` 的窄长尺寸若原样采用，会导致中文标题和摘要拥挤。
  - 当前站点以暖纸色、墨色、墨绿和陶土色为主，同时支持深色模式；示例的黑紫霓虹只适合作为结构参考。
- Design Interpretation:
  - 卡片主区依次展示 `CASE / 01`、项目名、单句价值主张，以及 `ROLE`、`DOMAIN` 两组事实字段。
  - 票根区展示 2–3 个核心技术标签、项目编号和“查看案例”入口；条形码仅作装饰，并对辅助技术隐藏。
  - 首页三张精选项目统一使用票券结构；每张只保留轻微 hover 抬升与一次高光位移，不加入持续滚动网格。
  - 浅色模式采用纸张底色与墨绿网格，深色模式才使用接近示例的深色票面；陶土色作为编号和状态强调色。
- Impact:
  会让作品集更像经过策展的工程案例，而不是普通博客卡片。若要让票券真正表达项目可信度，需要补充真实项目周期、状态、领域与可公开指标；否则只能先使用现有字段制作信息精简版。
- Implementation Status:
  已实现并应用到首页全部三个精选项目，中英文、深色模式和移动端共用同一组件。
- Decision:
  将票券定义为项目展示的候选视觉方向，而不是首页身份卡。它与现有 3D 玻璃卡属于二选一的主要动态语言：推荐项目区采用 `Case Pass`，首页右侧个人原则继续保持纸卡或非常轻的 3D，不同时使用两套强动效。
- Follow-up:
  - 在实现前确认每个项目可公开的 `period`、`status`、`domain` 和一项核心成果。
  - 先为 `Smart Agent Detector` 制作单卡原型，验证中英文长标题、浅色、深色与移动端。
  - 将票面宽度改为容器自适应，桌面三列最小宽度建议约 300px；移动端宽度为 100%。
  - 网格滚动、高光扫过和 3D 倾斜只保留一种常驻运动；在减少动画模式下全部静止。

## Decisions

- 借鉴 3D 分层机制，但不原样复制示例的视觉和代码。
- 开发者票券可作为精选项目的 `Case Pass`，不使用虚构会议字段。
- `Case Pass` 与强 3D 身份卡不同时作为主视觉；每个页面只保留一个主要动态焦点。
- 项目信息可读性优先于炫技；30 度倾斜降低为 3–5 度。
- 小宠物可以加入，但延后到项目详情体验完成之后。
- 所有动画必须覆盖触屏、键盘和 `prefers-reduced-motion`。

## Test Index

| 场景 | 预期行为 |
| --- | --- |
| 桌面鼠标 | 卡片轻微 3D 倾斜，内容不溢出，点击可进入详情 |
| 键盘 | Tab 可聚焦卡片，回车可打开详情，焦点清晰 |
| 手机触屏 | 不依赖 hover，卡片可正常点击，宠物不遮挡底部导航 |
| 深色模式 | 玻璃层、文字和装饰保持足够对比度 |
| 减少动画 | 卡片和宠物停止倾斜、跳动与闪烁 |

## Code Index

| 文件 | 原型职责 |
| --- | --- |
| `src/components/ProfileDepthCard.astro` | 3D 身份卡、链接和指针倾斜 |
| `src/components/RockySprite.astro` | 陶土色像素站点精灵 |
| `src/components/CasePassCard.astro` | 可复用的票券式项目卡 |
| `src/components/HomePage.astro` | 首页三张统一票券网格 |
| `src/content.config.ts` | 周期、领域、状态与指标字段 |
| 中英文长标题 | 票面不截断关键信息，卡片高度和票根位置保持稳定 |
| 浅色模式 | 票券延续纸张与墨绿体系，不出现突兀的黑紫色块 |

## Follow-up Actions

- 先完成单张 3D 项目卡原型，再决定是否应用到全部卡片。
- 首页全部精选项目已统一为 `Case Pass`，后续只补充经验证的项目事实与指标。
- 项目详情字段和正文准备完成后，实现详情路由。
- 小宠物在项目体验稳定后作为独立组件实施。
