import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import {
  chapterRoute,
  guides,
  hrefFor,
  opening,
  parts,
  repository,
} from "./catalog.mjs";

export { repository };

export const root = fileURLToPath(new URL("../", import.meta.url));

export function readSource(relativePath) {
  return readFileSync(path.join(root, relativePath), "utf8");
}

function page(source, route, title, extra) {
  return {
    source,
    route,
    href: hrefFor(route),
    title,
    ...extra,
  };
}

const guidePages = guides.map(([route, source, title]) =>
  page(source, route, title, { kind: "site" }),
);

const openingPages = opening.map(([route, source, title]) =>
  page(source, route, title, { kind: "opening", part: "开篇" }),
);

const chapterPages = parts.flatMap((part) =>
  part.chapters.map(([number, file, title]) =>
    page(
      `chapters/${part.dir}/${file}.md`,
      chapterRoute(part.id, number),
      title,
      {
        kind: "chapter",
        part: part.title,
        partId: part.id,
        chapter: number,
      },
    ),
  ),
);

export const pages = [...guidePages, ...openingPages, ...chapterPages];

export const readingOrder = pages.filter((item) => item.kind !== "site");

export const sidebar = [
  {
    text: "开篇",
    items: openingPages.map((item) => ({ text: item.title, link: item.href })),
  },
  ...parts.map((part) => ({
    text: `${part.title}`,
    items: part.chapters.map(([number, , title]) => ({
      text: title,
      link: hrefFor(chapterRoute(part.id, number)),
    })),
  })),
  {
    text: "附录",
    items: [{ text: "术语对照表", link: "/GLOSSARY.html" }],
  },
];

const byRoute = new Map(pages.map((item) => [`${item.route}.md`, item]));
const bySource = new Map(pages.map((item) => [item.source, item]));

export function getPage(relativePath) {
  return byRoute.get(relativePath) || bySource.get(relativePath);
}
