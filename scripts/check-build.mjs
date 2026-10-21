import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(fileURLToPath(new URL("..", import.meta.url)), ".vitepress/dist");
const errors = [];

function fail(message) {
  errors.push(message);
}

function read(relativePath) {
  const full = path.join(root, relativePath);
  if (!existsSync(full)) {
    fail(`缺少构建文件 ${relativePath}`);
    return "";
  }
  return readFileSync(full, "utf8");
}

const home = read("index.html");
if (home && !home.includes("智能体 AI 指南")) fail("首页没有书名");
if (home && !home.includes("基础")) fail("首页没有分篇");

const chapter = read("foundations/chapter-01.html");
if (chapter && !chapter.includes("LLM")) fail("第 1 章没有正文");
if (chapter && !/assets\/.*\.(png|jpg|jpeg|webp)/.test(chapter)) fail("第 1 章没有插图资源");

const manifestName = ["manifest.webmanifest", "manifest.json"].find((name) =>
  existsSync(path.join(root, name)),
);
if (!manifestName) fail("缺少 Web App Manifest");
else {
  const manifest = JSON.parse(read(manifestName));
  if (!manifest.icons?.length) fail("Manifest 没有图标");
  if (manifest.display !== "standalone") fail("Manifest 不是可安装的 standalone");
  if (!String(manifest.start_url || "").includes("agentic-ai-zh")) {
    fail(`Manifest start_url 不正确: ${manifest.start_url}`);
  }
}

const worker = ["sw.js", "service-worker.js"].find((name) => existsSync(path.join(root, name)));
if (!worker) fail("缺少 Service Worker");

function walk(dir) {
  let count = 0;
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) count += walk(full);
    else if (name.endsWith(".html")) count += 1;
  }
  return count;
}

const htmlCount = existsSync(root) ? walk(root) : 0;
if (htmlCount < 33) fail(`HTML 页面只有 ${htmlCount} 个`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`build ok: ${htmlCount} html files, ${manifestName}, ${worker}`);
