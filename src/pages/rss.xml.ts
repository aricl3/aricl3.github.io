import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  const notes = (await getCollection("notes", ({ data }) => data.lang === "zh" && !data.draft))
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
  return rss({
    title: "Rocky 的笔记",
    description: "关于 AI 工程、产品构建和问题求解的记录。",
    site: context.site!,
    items: notes.map((note) => ({
      title: note.data.title,
      description: note.data.description,
      pubDate: note.data.publishedAt,
      link: `/notes/${note.id.split("/").at(-1)}/`
    })),
    customData: "<language>zh-CN</language>"
  });
};
