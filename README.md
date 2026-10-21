# 智能体 AI 指南

《The Hitchhiker's Guide to Agentic AI: From Foundations to Systems》的简体中文阅读站。

正文和插图沿用 [luckinbyte/agentic-ai-zh](https://github.com/luckinbyte/agentic-ai-zh) 的 v1.2.2 译文。原作者是 Haggai Roitman，原文 [arXiv:2606.24937](https://arxiv.org/abs/2606.24937) 为 CC BY-SA 4.0。正文许可与本站代码、第三方软件的许可彼此分开，见 [LICENSE](LICENSE)。

阅读站按六篇编排，并可以安装到设备上离线回看已打开的章节。

## 本地预览

需要 Node.js 22。

```sh
npm ci
npm run check
npm run dev
```

浏览器打开终端里的地址，路径以 `/agentic-ai-zh/` 开头。

```sh
npm run build
npm run check:build
npm run preview
```

## 发布

推送到 `main` 后，GitHub Actions 构建并发布到 GitHub Pages：<https://brandonding.github.io/agentic-ai-zh/>。仓库公开，因此 GitHub Free 可以发布这个站点。
