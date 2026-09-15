# Portfolio Experience: QA（项目详情导航）

- Title: Portfolio Experience: QA（项目详情导航）
- Doc Type: Split Topic QA
- Domain: personal-site-portfolio
- Status: active-design-reference
- Audience: Engineers implementing or reviewing the portfolio
- Last Updated: 2026-09-15
- Related Docs: [../README.md](../README.md), [./README.md](./README.md), [./02-visual-effects.md](./02-visual-effects.md)
- Keywords: qa, spike, project-detail, flip-card, pinned-state, navigation

---

[返回 QA 索引](./README.md)

## Questions

### Q1. 180° Hover 翻转卡是否适合展示项目详细信息？

- Question:
  能否将 Hover Me 翻转卡用于项目页，让背面展示项目详情？
- Short Answer:
  适合展示第二层摘要，不适合承载完整案例。背面最多放职责、核心方案、两项指标和详情入口；长篇背景、架构、证据与复盘放在独立页面。
- Current Evidence:
  - `src/components/ProjectCard.astro` 当前已包含角色、摘要、亮点和技术栈，文字密度高于参考卡。
  - `src/components/ProjectsIndex.astro` 以两列网格展示项目，没有详情路由或展开状态。
  - 项目 Markdown 已有正文，但当前没有被项目列表渲染。
- Design Interpretation:
  固定尺寸和完整 180° 翻转把两面限制在同一高度；内容一多就会出现小字号、溢出或卡片高度不一致。Hover 也不能单独覆盖触屏和键盘场景。
- Impact:
  需要显式控制状态、键盘与触屏行为、背面返回操作，以及 reduced-motion 降级。
- Implementation Status:
  三个项目均已通过 `ProjectFlipCard.astro` 接入统一的翻转与固定交互，并使用独立案例编号。
- Decision:
  借鉴正反面分层，但只用于短摘要。桌面 hover/focus 可以临时揭示背面，触屏通过按钮切换；任何关键信息都不能只存在于背面。
- Follow-up:
  - 背面限制为 3–5 行信息和一个完整案例链接。
  - 先用单张项目卡验证文字容量，再应用到全部项目。

### Q2. Hover 后能否通过按钮固定详情？

- Question:
  Hover 显示背面后，是否可以点击按钮把详情固定，方便阅读？
- Short Answer:
  可以，而且建议采用。这会形成“悬停临时预览、点击固定阅读、再次点击收起”的明确交互，也为触屏设备提供等价操作。
- Current Evidence:
  - 当前项目页没有客户端状态；固定行为需要少量原生 JavaScript。
  - 站点已有清晰的 `:focus-visible` 和 reduced-motion 基础规则。
- Design Interpretation:
  固定按钮应位于卡片外壳的固定角落，不参与 3D 翻转，避免按钮随背面旋转后位置变化或不可点击。
- Impact:
  需要维护每张卡的 `preview` 与 `pinned` 状态，并同步 `aria-pressed`、按钮文案和 CSS 类。状态只在当前页面存在，不写入 `localStorage`。
- Implementation Status:
  三张项目卡均已实现 hover 临时预览、图钉固定、再次点击或 Escape 收起，并同步 `aria-pressed` 与读屏状态。hover 由 CSS 媒体查询负责，JavaScript 只管理固定状态，避免指针事件与 3D 变换竞争。
- Decision:
  使用以下状态机：

  ```text
  默认 front
    ├─ hover/focus → 临时显示 back
    └─ 点击固定按钮 → pinned back

  临时 back
    ├─ pointer leave → front
    └─ 点击固定按钮 → pinned back

  pinned back
    ├─ pointer leave → 保持 back
    ├─ 再次点击固定按钮 → front
    └─ Escape → front
  ```

  按钮使用 `type="button"`、`aria-pressed` 和动态 `aria-label`。移动端点击该按钮直接进入或退出 pinned 状态。每张卡独立维护固定状态，方便并排比较多个项目。
- Follow-up:
  - 固定按钮使用简洁图钉图标，选中时变为陶土色实心状态。
  - 背面仍提供独立的“查看完整案例”链接。
  - `prefers-reduced-motion` 下用立即显示或淡入替代 3D 翻转。

### Q3. 完整详情应该使用弹窗、抽屉、新标签页还是独立页面？

- Question:
  项目的完整信息应该弹出一个 tab，还是采用其他策略？
- Short Answer:
  使用当前浏览器标签中的独立项目详情页。不要自动打开新标签页；弹窗或抽屉只适合快速预览，不适合完整案例。
- Current Evidence:
  - 当前 Astro 网站是静态输出，可为每个 Markdown 项目生成独立路由。
  - 站点已有笔记详情页，可复用其 SEO、目录和正文排版。
- Design Interpretation:
  独立页面具备稳定 URL、浏览器前进后退、SEO、静态搜索、分享和长内容阅读优势。弹窗需要额外处理焦点锁定、滚动锁定、历史状态和移动端高度。
- Impact:
  需要新增中英文详情路由、项目 SEO 元数据、详情布局和卡片链接，不需要后端。
- Implementation Status:
  尚未实现。
- Decision:
  主路径使用同标签页的 `/projects/[slug]/` 与 `/en/projects/[slug]/`；卡片背面只承担预览，不替代详情页。

### Q4. 项目页应该如何分层展示？

- Question:
  如何让项目页既有视觉互动，又能优雅承载详细内容？
- Short Answer:
  使用三层信息架构：正面负责识别，固定/临时背面负责筛选，详情页负责说服。
- Current Evidence:
  - 当前数据已有 `summary`、`role`、`highlights`、`stack`，本地原型新增了 `period`、`domain`、`status` 和 `metrics`。
- Decision:

  | 层级 | 内容 |
  | --- | --- |
  | 卡片正面 | 项目名称、一句话痛点、领域、1–2 个核心指标 |
  | Hover/固定背面 | 我的职责、核心方案、状态、技术栈、查看案例 |
  | 独立详情页 | 背景、约束、职责、架构、决策、量化结果、证据、复盘 |

## Decisions

- 完整详情使用当前标签页中的独立 URL，不使用自动新标签页。
- 翻转背面只展示有限摘要，不能成为访问关键信息的唯一方式。
- 加入固定按钮：hover 临时预览，点击固定，再次点击或 Escape 收起。
- 多张卡可同时固定，移动端使用各自的按钮切换。
- 实现顺序为“内容与详情页 → 卡片链接 → 翻转与固定交互”。

## Test Index

| 场景 | 预期行为 |
| --- | --- |
| 桌面鼠标 | Hover 临时揭示；固定后移开鼠标仍保持 |
| 键盘 | Tab 可到达按钮；Enter/Space 固定；Escape 收起 |
| 触屏 | 点击按钮显示/收起背面，不依赖 hover |
| 多张卡片 | 每张卡独立固定，固定新卡片不改变其他卡片 |
| 减少动画 | 不执行 3D 翻转，信息仍完整可见 |
| 搜索与分享 | 每个完整案例有独立 URL、标题和描述 |

### Prototype verification（2026-09-15）

- `astro check` 与生产构建通过，0 errors / 0 warnings。
- 桌面端通过：hover 临时翻转、点击固定、移出后保持、Escape 收起并归还焦点。
- 移动端通过：图钉按钮可独立展开与收起，页面无横向溢出。
- 深色模式通过，浏览器控制台无 error / warning。
- reduced-motion 使用两面淡入切换，不执行 3D 旋转。
- 回归修复：翻转后卡面透视收窄曾导致最右侧约 3px 的 hover 命中丢失；外壳增加稳定纸面底层，并用右边缘连续悬停测试验证不再复位。
- 多卡状态通过：任意两张卡可同时固定，收起其中一张不会改变另一张。

## Follow-up Actions

- 先补齐三个项目的详情内容。
- 实现中英文项目详情路由。
- 在补齐可信项目指标后再扩展正面指标区，不使用未经验证的数据填充卡片。
