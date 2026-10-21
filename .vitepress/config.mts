import { defineConfig } from "vitepress";
import { withPwa } from "@vite-pwa/vitepress";
import { getPage, pages, readSource, readingOrder, repository, sidebar } from "./book.mjs";

const base = process.env.SITE_BASE || "/agentic-ai-zh/";
if (!base.startsWith("/") || !base.endsWith("/")) {
  throw new Error("SITE_BASE must start and end with /");
}

const siteUrl = process.env.SITE_URL || "https://brandonding.github.io/agentic-ai-zh/";

function tokenize(text) {
  const normalized = text.normalize("NFKC").toLowerCase();
  const words = Array.from(
    new Intl.Segmenter("zh-CN", { granularity: "word" }).segment(normalized),
  )
    .filter((segment) => segment.isWordLike)
    .map((segment) => segment.segment);
  const characters = normalized.match(/\p{Script=Han}/gu) || [];
  return [...new Set([...words, ...characters])];
}

function linkOf(item) {
  return item ? { text: item.title, link: item.href } : false;
}

const vitepress = defineConfig({
  title: "智能体 AI 指南",
  titleTemplate: ":title · 智能体 AI 指南",
  description:
    "《The Hitchhiker's Guide to Agentic AI: From Foundations to Systems》简体中文阅读站。从模型基础到智能体系统。",
  lang: "zh-CN",
  base,
  cleanUrls: false,
  router: { prefetchLinks: false },
  lastUpdated: true,
  srcExclude: ["README.md", "scripts/**", "LICENSE"],
  rewrites: Object.fromEntries(
    pages
      .filter((item) => item.source !== `${item.route}.md`)
      .map((item) => [item.source, `${item.route}.md`]),
  ),
  ignoreDeadLinks: [
    (url) => {
      const pathOnly = decodeURIComponent(url.split("#")[0].split("?")[0]);
      if (/^https?:/i.test(pathOnly)) return false;
      if (/\.(png|jpe?g|gif|svg|webp|md|html)$/i.test(pathOnly)) return false;
      // The translation writes citation glosses as Markdown links, not pages.
      return pathOnly.startsWith("./") || pathOnly.startsWith("../");
    },
  ],
  head: [
    ["link", { rel: "icon", href: `${base}favicon.svg`, type: "image/svg+xml" }],
    ["link", { rel: "apple-touch-icon", href: `${base}icons/icon-180.png` }],
    ["meta", { name: "theme-color", content: "#f6f1e7" }],
    ["meta", { property: "og:type", content: "book" }],
    ["meta", { property: "og:site_name", content: "智能体 AI 指南" }],
  ],
  sitemap: { hostname: siteUrl },
  markdown: {
    math: true,
    image: { lazyLoading: true },
  },
  transformPageData(pageData) {
    const page = getPage(pageData.relativePath);
    if (!page) return;
    const index = readingOrder.findIndex((item) => item.source === page.source);
    const source = readSource(page.source);
    const prose = source
      .replace(/```[\s\S]*?```/g, "")
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "");
    const cjk = (prose.match(/[\u3400-\u9fff]/g) || []).length;
    const words = (prose.match(/[A-Za-z]+/g) || []).length;
    pageData.title = page.title;
    Object.assign(pageData.frontmatter, {
      title: page.title,
      bookSource: page.source,
      bookPart: page.part || "",
      bookChapter: page.chapter || "",
      reader: page.kind !== "site",
      readingMinutes: Math.max(1, Math.ceil(cjk / 450 + words / 220)),
      prev: index > 0 ? linkOf(readingOrder[index - 1]) : false,
      next: index >= 0 && index < readingOrder.length - 1 ? linkOf(readingOrder[index + 1]) : false,
    });
  },
  themeConfig: {
    logo: "/favicon.svg",
    siteTitle: "智能体 AI 指南",
    nav: [
      { text: "全书目录", link: "/contents.html", activeMatch: "/contents" },
      { text: "阅读指南", link: "/reading-guide.html" },
      { text: "术语表", link: "/GLOSSARY.html" },
      { text: "关于", link: "/about.html" },
    ],
    sidebar,
    outline: { level: [2, 3], label: "本章内容" },
    docFooter: { prev: "上一篇", next: "下一篇" },
    editLink: {
      pattern: ({ frontmatter, filePath }) =>
        `https://github.com/BrandonDing/agentic-ai-zh/edit/main/${(frontmatter.bookSource || filePath)
          .split("/")
          .map(encodeURIComponent)
          .join("/")}`,
      text: "在 GitHub 上修改本页",
    },
    lastUpdated: { text: "最后更新", formatOptions: { dateStyle: "medium" } },
    socialLinks: [{ icon: "github", link: repository, ariaLabel: "GitHub 仓库" }],
    darkModeSwitchLabel: "阅读主题",
    lightModeSwitchTitle: "切换浅色",
    darkModeSwitchTitle: "切换深色",
    sidebarMenuLabel: "全书目录",
    returnToTopLabel: "回到顶部",
    skipToContentLabel: "跳到正文",
    notFound: {
      title: "没有这一页",
      quote: "可以从全书目录接着读，或搜索一个术语。",
      linkLabel: "返回首页",
      linkText: "返回首页",
    },
    search: {
      provider: "local",
      options: {
        miniSearch: {
          options: { tokenize },
          searchOptions: {
            combineWith: "AND",
            prefix: true,
            fuzzy: false,
            boost: { title: 5, titles: 3, text: 1 },
          },
        },
        translations: {
          button: { buttonText: "搜索全书", buttonAriaLabel: "搜索全书" },
          modal: {
            displayDetails: "显示摘要",
            resetButtonTitle: "清空",
            backButtonTitle: "返回",
            noResultsText: "没有找到相关内容",
            footer: { selectText: "选择", navigateText: "切换", closeText: "关闭" },
          },
        },
      },
    },
    footer: {
      message: "Haggai Roitman 原著 · luckinbyte 译本 · 本站重新编排阅读结构",
      copyright: "CC BY-SA 4.0",
    },
  },
});

export default withPwa({
  ...vitepress,
  pwa: {
    registerType: "autoUpdate",
    includeAssets: ["favicon.svg", "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png"],
    manifest: {
      name: "智能体 AI 指南：从基础到系统",
      short_name: "智能体指南",
      description: "《The Hitchhiker's Guide to Agentic AI》简体中文阅读站",
      lang: "zh-CN",
      dir: "ltr",
      start_url: base,
      scope: base,
      display: "standalone",
      background_color: "#f6f1e7",
      theme_color: "#f6f1e7",
      icons: [
        { src: `${base}icons/icon-192.png`, sizes: "192x192", type: "image/png" },
        {
          src: `${base}icons/icon-512.png`,
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,svg,png,jpg,jpeg,webp,ico,woff2}"],
      maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      navigateFallback: "index.html",
      navigateFallbackDenylist: [/\/assets\//],
      runtimeCaching: [
        {
          urlPattern: ({ request }) => request.mode === "navigate",
          handler: "NetworkFirst",
          options: {
            cacheName: "chapters",
            networkTimeoutSeconds: 4,
            expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 30 },
          },
        },
        {
          urlPattern: ({ request }) => request.destination === "image",
          handler: "CacheFirst",
          options: {
            cacheName: "figures",
            expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 30 },
          },
        },
      ],
    },
  },
});
