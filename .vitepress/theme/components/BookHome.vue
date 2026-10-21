<script setup>
import { onMounted, ref } from "vue";
import { withBase } from "vitepress";
import { chapterRoute, hrefFor, parts } from "../../catalog.mjs";

const last = ref(null);

function partHref(part) {
  const [number] = part.chapters[0];
  return withBase(hrefFor(chapterRoute(part.id, number)));
}

onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem("agentic-guide:last") || "null");
    if (saved?.href && saved?.title) last.value = saved;
  } catch {
    last.value = null;
  }
});
</script>

<template>
  <div class="book-home">
    <header class="cover">
      <p class="kicker">简体中文阅读站 · 译本 v1.2.2</p>
      <h1>智能体 AI 指南</h1>
      <p class="subtitle">从基础到系统</p>
      <p class="lede">
        Haggai Roitman 的 <em>The Hitchhiker's Guide to Agentic AI</em>
        中文译本。六篇，从模型底座读到能上线的智能体系统。
      </p>
      <p class="actions">
        <a class="start" :href="withBase('/preface.html')">从前言开始</a>
        <a :href="withBase('/contents.html')">全书目录</a>
        <a v-if="last" :href="last.href">继续：{{ last.title }}</a>
      </p>
    </header>

    <ol class="part-list">
      <li v-for="part in parts" :key="part.id">
        <a :href="partHref(part)">
          <span class="meta">
            <span class="range">{{ part.range }}</span>
            <span class="english">{{ part.english }}</span>
          </span>
          <span class="copy">
            <strong>{{ part.title }}</strong>
            <span>{{ part.description }}</span>
          </span>
        </a>
      </li>
    </ol>
  </div>
</template>
