<script setup>
import { withBase } from "vitepress";
import { chapterRoute, hrefFor, opening, parts } from "../../catalog.mjs";

const openingLinks = opening.map(([route, , title]) => ({
  title,
  href: withBase(hrefFor(route)),
}));

const partLinks = parts.map((part) => ({
  ...part,
  chapters: part.chapters.map(([number, , title]) => ({
    title,
    href: withBase(hrefFor(chapterRoute(part.id, number))),
  })),
}));
</script>

<template>
  <div class="book-contents">
    <h1>全书目录</h1>
    <p class="note">地址按篇固定。章节改标题时，公开链接仍是 <code>/篇/chapter-编号.html</code>。</p>

    <section>
      <h2>开篇</h2>
      <ol>
        <li v-for="item in openingLinks" :key="item.href">
          <a :href="item.href">{{ item.title }}</a>
        </li>
      </ol>
    </section>

    <section v-for="part in partLinks" :key="part.id">
      <h2>
        <span>{{ part.title }}</span>
        <small>{{ part.english }} · {{ part.range }}</small>
      </h2>
      <p>{{ part.description }}</p>
      <ol>
        <li v-for="chapter in part.chapters" :key="chapter.href">
          <a :href="chapter.href">{{ chapter.title }}</a>
        </li>
      </ol>
    </section>
  </div>
</template>
