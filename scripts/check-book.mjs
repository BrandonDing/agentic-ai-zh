import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { pages, readSource, root } from "../.vitepress/book.mjs";

const errors = [];

function fail(message) {
  errors.push(message);
}

const routes = new Set();
for (const page of pages) {
  if (routes.has(page.route)) fail(`重复网址 ${page.route}`);
  routes.add(page.route);
  const full = path.join(root, page.source);
  if (!existsSync(full)) {
    fail(`缺少正文 ${page.source}`);
    continue;
  }
  const text = readSource(page.source);
  if (page.kind !== "site" && !/^#\s+\S/m.test(text)) fail(`${page.source} 没有一级标题`);
}

function walk(dir) {
  const found = [];
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) found.push(...walk(full));
    else if (name.endsWith(".md")) found.push(full);
  }
  return found;
}

const listed = new Set(pages.map((page) => path.join(root, page.source)));
for (const file of walk(path.join(root, "chapters"))) {
  if (!listed.has(file)) fail(`章节未登记 ${path.relative(root, file)}`);
}

const imageRe = /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
for (const page of pages) {
  const full = path.join(root, page.source);
  if (!existsSync(full)) continue;
  const text = readSource(page.source).replace(/```[\s\S]*?```/g, "");
  for (const match of text.matchAll(imageRe)) {
    const url = match[1];
    if (/^https?:\/\//.test(url)) continue;
    const target = path.resolve(path.dirname(full), decodeURIComponent(url));
    if (!existsSync(target)) fail(`${page.source} 缺少图片 ${url}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`check ok: ${pages.length} pages`);
