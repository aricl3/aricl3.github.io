import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const language = z.enum(["zh", "en"]);

const notes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    lang: language,
    translationKey: z.string(),
    draft: z.boolean().default(false)
  })
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    role: z.string(),
    stack: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
    links: z.array(z.object({ label: z.string(), href: z.url() })).default([]),
    period: z.string().optional(),
    domain: z.string().optional(),
    status: z.string().optional(),
    metrics: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    lang: language,
    translationKey: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(99)
  })
});

export const collections = { notes, projects };
