# ladyikeya.com

Personal academic portfolio for **Lady Ikeya** — Ph.D. candidate in public affairs,
O'Neill School of Public and Environmental Affairs, Indiana University Bloomington.

Static HTML/CSS/JS. No build tooling, no dependencies, no framework. It deploys to
GitHub Pages, Netlify, Vercel, or any static host by serving the repo root.

---

## Structure

```
index.html          generated  ← Home
research.html       generated  ← Working papers, works in progress
teaching.html       generated  ← Courses, student feedback
cv.html             generated  ← Web CV

build.sh                       ← Assembles the four pages above
src/partials/                  ← Shared <head>, header/nav, footer
src/pages/                     ← Per-page <main> content  ← EDIT THESE
assets/css/main.css            ← Design system + all styling
assets/js/main.js              ← Theme toggle, mobile nav, scroll reveal
assets/img/portrait.jpg        ← Hero portrait (add this file)
assets/files/lady-ikeya-cv.pdf ← CV download (add this file)
```

> **Important:** the four `.html` files in the repo root are *generated*. Editing them
> directly works until the next build, then the changes are lost. Edit
> `src/pages/*.html` and `src/partials/*.html` instead, then run `./build.sh`.

## Editing

```bash
./build.sh          # regenerate index/research/teaching/cv .html
python3 -m http.server 8000   # preview at http://localhost:8000
```

### Adding a student comment

In `src/pages/teaching.html`, inside `<div class="quote-grid">`, add:

```html
<figure class="quote reveal">
  <blockquote>The comment text, verbatim.</blockquote>
  <figcaption>SPEA V186 &middot; Course evaluation</figcaption>
</figure>
```

The grid reflows on its own — any number of comments lays out cleanly.

### Adding a fellowship or award

In `src/pages/cv.html`, inside `<ol class="timeline" id="awards-list">`. The list is in
**descending order — newest first**, so new entries go at the **top**:

```html
<li class="award">
  <span class="award-year">2026</span>
  <div>
    <h4 class="award-name">Name of the award</h4>
    <p class="award-org">Granting institution</p>
  </div>
</li>
```

### Adding a paper

In `src/pages/research.html`, copy an existing `<li class="paper">` block. Renumber the
`paper-num` spans, and mirror the entry into `src/pages/cv.html`.

## Files that still need to be added

These are referenced by the site but not yet in the repo:

| Path | What it is |
| --- | --- |
| `assets/img/portrait.jpg` | Hero portrait. Roughly 4:5 portrait crop, ~1200px wide. Falls back to a monogram if missing. |
| `assets/files/lady-ikeya-cv.pdf` | The downloadable CV. |

## Design notes

- **Type** — Newsreader (display serif) for headings, Inter for body, IBM Plex Mono for
  years and course codes. Loaded from Google Fonts with system-serif/sans fallbacks.
- **Colour** — warm paper ground, near-black ink, deep garnet accent (`#8c1d21`),
  a quiet nod to Indiana crimson.
- **Theme** — follows the OS setting by default; the header toggle overrides it and the
  choice persists in `localStorage`. An inline script in `<head>` applies the stored
  theme before first paint, so there is no flash.
- **Accessibility** — skip link, visible focus rings, `aria-current` on the active nav
  item, honours `prefers-reduced-motion`, and all interactive controls are labelled.
- **Print** — `cv.html` prints cleanly; chrome and decoration are stripped.

## Deploying to GitHub Pages

Settings → Pages → Build and deployment → Deploy from a branch → `main` / `/ (root)`.
Add a `CNAME` file containing `www.ladyikeya.com` to serve the custom domain.
