import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  const notes = (await getCollection("notes", ({ data }) => data.lang === "en" && !data.draft))
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
  return rss({
    title: "Rocky's Notes",
    description: "Writing on AI engineering, product building, and problem solving.",
    site: context.site!,
    items: notes.map((note) => ({
      title: note.data.title,
      description: note.data.description,
      pubDate: note.data.publishedAt,
      link: `/en/notes/${note.id.split("/").at(-1)}/`
    })),
    customData: "<language>en-US</language>"
  });
};
