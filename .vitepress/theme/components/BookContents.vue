<script setup>
import { withBase } from "vitepress";
import { chapterRoute, hrefFor, opening, parts } from "../../catalog.mjs";

const sections = [
  {
    title: "开篇",
    meta: "Preface",
    href: withBase(hrefFor(opening[0][0])),
    items: opening.map(([route, , title]) => ({
      title,
      href: withBase(hrefFor(route)),
    })),
  },
  ...parts.map((part) => ({
    title: part.title,
    meta: `${part.english} · ${part.range}`,
    href: withBase(hrefFor(chapterRoute(part.id, part.chapters[0][0]))),
    items: part.chapters.map(([number, , title]) => ({
      title,
      href: withBase(hrefFor(chapterRoute(part.id, number))),
    })),
  })),
];
</script>

<template>
  <div class="book-contents">
    <h1>全书目录</h1>
    <p class="note">点篇名进入该篇第一页，点章节名进入正文。</p>

    <section v-for="section in sections" :key="section.title">
      <a class="part-head" :href="section.href">
        <strong>{{ section.title }}</strong>
        <small>{{ section.meta }}</small>
      </a>
      <ul>
        <li v-for="item in section.items" :key="item.href">
          <a :href="item.href">{{ item.title }}</a>
        </li>
      </ul>
    </section>
  </div>
</template>
