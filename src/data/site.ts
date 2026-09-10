export type Lang = "zh" | "en";

export const site = {
  name: "Rocky",
  author: { zh: "夏睿", en: "Rui Xia" },
  domain: "https://rocky-mr.com",
  email: "ruixia4976@gmail.com",
  github: "https://github.com/aricl3"
} as const;

export const copy = {
  zh: {
    locale: "zh-CN",
    nav: { home: "首页", notes: "笔记", projects: "项目", about: "关于", search: "搜索" },
    heroEyebrow: "AI Agent 工程师 · 上海 / 香港",
    heroTitle: "把模糊的 AI 想法，变成可靠的产品系统。",
    heroSummary: "我专注于 AI Agent、RAG、LLM 评测与 Web3 安全，喜欢把研究、工程和产品判断连接起来。这里记录我的项目、技术笔记与持续思考。",
    projectsTitle: "精选项目",
    projectsIntro: "围绕生成式 AI、智能体工作流与安全分析的实践。",
    notesTitle: "近期笔记",
    notesIntro: "关于 AI 工程、产品构建和问题求解的记录。",
    allProjects: "查看全部项目",
    allNotes: "查看全部笔记",
    readMore: "阅读全文",
    contact: "联系我",
    aboutTitle: "关于我",
    aboutLead: "我是夏睿，一名关注可靠 AI 系统的工程师与产品构建者。",
    aboutBody: "我拥有香港大学人工智能硕士学位，参与过法律科技、企业自动化和 Web3 安全方向的 AI 产品建设。我的工作重点是智能体工作流、检索质量、结构化评测，以及让复杂系统能够被解释、验证和持续改进。",
    experience: "经历摘要",
    education: "教育",
    values: "工作方式",
    valueItems: ["先定义可验证的结果，再选择技术。", "让证据、评测和可观测性进入产品闭环。", "在快速迭代和长期可维护性之间寻找平衡。"],
    searchTitle: "搜索",
    searchPlaceholder: "搜索笔记与项目…",
    searchHint: "输入关键词开始搜索。",
    noResults: "没有找到相关内容。",
    tags: "标签",
    updated: "更新于",
    published: "发布于",
    toc: "本文目录",
    backToNotes: "返回笔记",
    notFoundTitle: "页面不存在",
    notFoundBody: "这个链接可能已移动，或者从未存在。",
    backHome: "返回首页",
    languageLabel: "English",
    footer: "独立思考，持续构建。"
  },
  en: {
    locale: "en-US",
    nav: { home: "Home", notes: "Notes", projects: "Projects", about: "About", search: "Search" },
    heroEyebrow: "AI Agent Engineer · Shanghai / Hong Kong",
    heroTitle: "Turning ambiguous AI ideas into reliable product systems.",
    heroSummary: "I work across AI agents, RAG, LLM evaluation, and Web3 security—connecting research, engineering, and product judgment. This is where I share projects, technical notes, and evolving ideas.",
    projectsTitle: "Selected projects",
    projectsIntro: "Practical work across generative AI, agent workflows, and security analysis.",
    notesTitle: "Recent notes",
    notesIntro: "Writing on AI engineering, product building, and problem solving.",
    allProjects: "View all projects",
    allNotes: "View all notes",
    readMore: "Read note",
    contact: "Get in touch",
    aboutTitle: "About",
    aboutLead: "I'm Rui Xia, an engineer and product builder focused on dependable AI systems.",
    aboutBody: "I hold an M.Sc. in Artificial Intelligence from The University of Hong Kong and have built AI products across legal technology, enterprise automation, and Web3 security. I focus on agent workflows, retrieval quality, structured evaluation, and making complex systems explainable, testable, and continuously improvable.",
    experience: "Selected experience",
    education: "Education",
    values: "How I work",
    valueItems: ["Define verifiable outcomes before choosing technology.", "Put evidence, evaluation, and observability into the product loop.", "Balance fast iteration with long-term maintainability."],
    searchTitle: "Search",
    searchPlaceholder: "Search notes and projects…",
    searchHint: "Type a keyword to begin.",
    noResults: "No matching content found.",
    tags: "Tags",
    updated: "Updated",
    published: "Published",
    toc: "On this page",
    backToNotes: "Back to notes",
    notFoundTitle: "Page not found",
    notFoundBody: "This link may have moved, or perhaps it never existed.",
    backHome: "Back home",
    languageLabel: "中文",
    footer: "Think independently. Keep building."
  }
} as const;

export function pathFor(lang: Lang, path = "") {
  const suffix = path ? `/${path.replace(/^\//, "")}` : "";
  return lang === "zh" ? suffix || "/" : `/en${suffix || "/"}`;
}

export function formatDate(date: Date, lang: Lang) {
  return new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: lang === "zh" ? "numeric" : "short",
    day: "numeric"
  }).format(date);
}
