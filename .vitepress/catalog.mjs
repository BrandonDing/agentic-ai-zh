/** Plain catalog shared by the Node build and the browser theme. No filesystem access. */

export const repository = "https://github.com/BrandonDing/agentic-ai-zh";

export const parts = [
  {
    id: "foundations",
    dir: "part-i-foundations",
    title: "基础",
    english: "Foundations",
    range: "01—03",
    description:
      "从 Transformer、GPU 系统到经典强化学习，把后面的方法放回第一性原理。",
    chapters: [
      [1, "llm-architecture-and-optimization-methods", "第 1 章 LLM 架构与优化方法"],
      [2, "systems-foundations-for-llms", "第 2 章 LLM 的系统基础"],
      [3, "introduction-to-reinforcement-learning", "第 3 章 强化学习导论"],
    ],
  },
  {
    id: "rl",
    dir: "part-ii-rl-methods-for-llms",
    title: "面向 LLM 的强化学习",
    english: "RL Methods",
    range: "04—12",
    description:
      "PPO、DPO、GRPO、奖励模型、SFT，以及把这些方法跑起来的大规模基础设施。",
    chapters: [
      [4, "rl-foundations-for-language-models", "第 4 章 语言模型的强化学习基础"],
      [5, "ppo-proximal-policy-optimization", "第 5 章 PPO —— 近端策略优化"],
      [6, "dpo-direct-preference-optimization", "第 6 章 DPO —— 直接偏好优化"],
      [7, "grpo-group-relative-policy-optimization", "第 7 章 GRPO —— 组相对策略优化"],
      [8, "preference-optimization-variants", "第 8 章 偏好优化变体"],
      [9, "reward-model-training", "第 9 章 奖励模型训练"],
      [10, "sft-best-practices-and-techniques", "第 10 章 SFT 最佳实践与技术"],
      [11, "system-architecture-infrastructure-at-scale", "第 11 章 大规模系统架构与基础设施"],
      [12, "llm-agentic-training", "第 12 章 LLM 智能体训练"],
    ],
  },
  {
    id: "reasoning",
    dir: "part-iii-reasoning",
    title: "推理",
    english: "Reasoning",
    range: "13",
    description: "大型推理模型如何用强化学习发现思维链，以及测试时计算如何放大能力。",
    chapters: [
      [13, "rl-for-large-reasoning-models", "第 13 章 大型推理模型的强化学习"],
    ],
  },
  {
    id: "evaluation",
    dir: "part-iv-evaluation",
    title: "评估",
    english: "Evaluation",
    range: "14",
    description: "指标、基准、污染检测，以及把 LLM 用作评判者时要守住的边界。",
    chapters: [[14, "llm-evaluation", "第 14 章 LLM 评估"]],
  },
  {
    id: "agentic",
    dir: "part-v-agentic-ai",
    title: "智能体 AI",
    english: "Agentic AI",
    range: "15—26",
    description:
      "RAG、记忆、编排、设计模式、MCP、A2A、多智能体、开发框架与界面。",
    chapters: [
      [15, "introduction-to-agentic-ai", "第 15 章 智能体 AI 导论"],
      [16, "retrieval-augmented-generation-rag", "第 16 章 检索增强生成（RAG）"],
      [17, "agentic-memory-systems", "第 17 章 智能体记忆系统"],
      [18, "agent-harness-context-management-and-orchestration", "第 18 章 智能体运行框架"],
      [19, "agent-design-patterns", "第 19 章 智能体设计模式"],
      [20, "agentic-environments-and-benchmarks", "第 20 章 智能体环境与基准"],
      [21, "model-context-protocol-mcp", "第 21 章 模型上下文协议（MCP）"],
      [22, "agent-skills", "第 22 章 智能体技能"],
      [23, "agent-to-agent-communication-a2a", "第 23 章 智能体间通信（A2A）"],
      [24, "multi-agent-systems", "第 24 章 多智能体系统"],
      [25, "agent-development-frameworks", "第 25 章 智能体开发框架"],
      [26, "agentic-ui-frameworks", "第 26 章 智能体 UI 框架"],
    ],
  },
  {
    id: "reference",
    dir: "part-vi-assessment-reference",
    title: "测评与参考",
    english: "Reference",
    range: "27—29",
    description: "覆盖全书的测验与详解、公式和失败模式速查，以及结语里的后续方向。",
    chapters: [
      [27, "quiz-questions-detailed-answers", "第 27 章 测验问答与详解"],
      [28, "quick-reference", "第 28 章 速查参考"],
      [29, "conclusion-and-future-directions", "第 29 章 结语与未来方向"],
    ],
  },
];

export const opening = [
  ["preface", "chapters/frontmatter/preface.md", "前言"],
  ["introduction", "chapters/frontmatter/introduction.md", "引言"],
  ["disclaimer", "chapters/frontmatter/disclaimer.md", "免责声明"],
  ["about-the-author", "chapters/frontmatter/about-the-author.md", "关于作者"],
];

export const guides = [
  ["index", "website/index.md", "智能体 AI 指南"],
  ["contents", "website/contents.md", "全书目录"],
  ["reading-guide", "website/reading-guide.md", "阅读指南"],
  ["about", "website/about.md", "关于"],
  ["GLOSSARY", "GLOSSARY.md", "术语对照表"],
];

export function chapterRoute(partId, number) {
  return `${partId}/chapter-${String(number).padStart(2, "0")}`;
}

export function hrefFor(route) {
  return route === "index" ? "/" : `/${route}.html`;
}
