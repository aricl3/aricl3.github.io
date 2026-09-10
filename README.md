# Rocky Personal Site

A bilingual personal website for Rui Xia / 夏睿, built with Astro and deployed to GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run check
npm run build
```

## Content

- Notes live in `src/content/notes/{zh,en}`.
- Projects live in `src/content/projects/{zh,en}`.
- Set `draft: true` to exclude a note from production pages and RSS.
- Use the same `translationKey` for translated content.

The public repository must contain curated website content only. Never copy personal documents, credentials, recovery codes, contracts, or complete CV files into this repository.
