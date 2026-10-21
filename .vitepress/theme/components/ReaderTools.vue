<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useData, useRoute } from "vitepress";

const { frontmatter, page } = useData();
const route = useRoute();
const size = ref("normal");
const progress = ref(0);
const viewer = ref({ open: false, src: "", alt: "" });
let timer;

const sizes = [
  ["small", "小"],
  ["normal", "标准"],
  ["large", "大"],
];

function applySize(value) {
  size.value = value;
  document.documentElement.dataset.readingSize = value;
  try {
    localStorage.setItem("agentic-guide:size", value);
  } catch {
    /* private mode */
  }
}

function currentHref() {
  const doc = document.querySelector(".vp-doc");
  if (!doc) return location.pathname;
  const headings = [...doc.querySelectorAll("h2[id], h3[id]")];
  const current = headings.filter((heading) => heading.getBoundingClientRect().top < 140).at(-1);
  return location.pathname + (current ? `#${current.id}` : "");
}

function saveProgress() {
  const range = document.documentElement.scrollHeight - innerHeight;
  progress.value = range > 0 ? Math.min(100, Math.round((scrollY / range) * 100)) : 0;
  if (!frontmatter.value.reader) return;
  try {
    localStorage.setItem(
      "agentic-guide:last",
      JSON.stringify({ href: currentHref(), title: page.value.title }),
    );
  } catch {
    /* private mode */
  }
}

function onScroll() {
  clearTimeout(timer);
  timer = setTimeout(saveProgress, 150);
}

function openImage(event) {
  const img = event.target.closest?.(".vp-doc img");
  if (!img || img.closest("a")) return;
  viewer.value = { open: true, src: img.currentSrc || img.src, alt: img.alt || "正文插图" };
  document.documentElement.style.overflow = "hidden";
}

function closeImage() {
  viewer.value = { open: false, src: "", alt: "" };
  document.documentElement.style.overflow = "";
}

function onKey(event) {
  if (event.key === "Escape") closeImage();
}

function printPage() {
  closeImage();
  window.print();
}

async function prepare() {
  await nextTick();
  saveProgress();
}

onMounted(() => {
  const saved = localStorage.getItem("agentic-guide:size");
  if (saved) applySize(saved);
  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("click", openImage);
  document.addEventListener("keydown", onKey);
  prepare();
});

onBeforeUnmount(() => {
  clearTimeout(timer);
  document.documentElement.style.overflow = "";
  window.removeEventListener("scroll", onScroll);
  document.removeEventListener("click", openImage);
  document.removeEventListener("keydown", onKey);
});

watch(() => route.path, () => {
  closeImage();
  prepare();
});
</script>

<template>
  <div v-if="frontmatter.reader" class="reader-tools">
    <p class="where">
      <span v-if="frontmatter.bookPart">{{ frontmatter.bookPart }}</span>
      <span v-if="frontmatter.readingMinutes">约 {{ frontmatter.readingMinutes }} 分钟</span>
      <span class="progress">{{ progress }}%</span>
    </p>
    <div class="controls">
      <div class="sizes" role="group" aria-label="字号">
        <button
          v-for="[value, label] in sizes"
          :key="value"
          type="button"
          :aria-pressed="size === value"
          @click="applySize(value)"
        >
          {{ label }}
        </button>
      </div>
      <button type="button" @click="printPage">打印本章</button>
    </div>
  </div>
  <div v-if="frontmatter.reader" class="reading-progress" aria-hidden="true">
    <span :style="{ width: progress + '%' }" />
  </div>

  <Teleport to="body">
    <div
      v-if="viewer.open"
      class="lightbox"
      role="dialog"
      aria-modal="true"
      :aria-label="viewer.alt"
      @click="closeImage"
    >
      <img :src="viewer.src" :alt="viewer.alt" @click.stop />
      <button type="button" @click="closeImage">关闭</button>
    </div>
  </Teleport>
</template>
