# 智能体 AI 指南

《The Hitchhiker's Guide to Agentic AI: From Foundations to Systems》的简体中文阅读站。正文沿用 [luckinbyte/agentic-ai-zh](https://github.com/luckinbyte/agentic-ai-zh) 的 v1.2.2 译文，许可为 [CC BY-SA 4.0](LICENSE)。原作者是 Haggai Roitman，原文见 [arXiv:2606.24937](https://arxiv.org/abs/2606.24937)。

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

推送到 `main` 后，GitHub Actions 构建并发布到 GitHub Pages。仓库是私有的，站点地址对公网开放：<https://brandonding.github.io/agentic-ai-zh/>。

给私有仓库开启 Pages 需要 GitHub Pro、Team 或 Enterprise。
