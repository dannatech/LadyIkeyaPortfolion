# ladyikeya.com

Personal academic site for **Lady Ikeya** — Ph.D. candidate in public affairs,
O'Neill School of Public and Environmental Affairs, Indiana University Bloomington.

One page, five sections, no build step, no dependencies. Deploys to GitHub Pages,
Netlify, Vercel, or any static host by serving the repo root.

---

## Structure

```
index.html                     ← the whole site
assets/css/main.css            ← design system + all styling
assets/js/main.js              ← theme toggle, mobile nav, scroll reveal
assets/img/portrait.jpg        ← hero portrait (add this file)
assets/files/lady-ikeya-cv.pdf ← CV download (add this file)
```

The five sections, in order: **hero**, **research** (working papers + works in
progress), **teaching** (course + student comments), **awards**, **contact**.
Editing means opening `index.html` and typing — there is nothing to compile.

```bash
python3 -m http.server 8000   # preview at http://localhost:8000
```

## Editing

### Add a paper

Copy an existing `<li class="paper">` inside the relevant `<ol class="papers">`,
then renumber the `paper-num` spans.

```html
<li class="paper reveal">
  <span class="paper-num" aria-hidden="true">03</span>
  <div>
    <h3 class="paper-title">Title of the paper</h3>
    <p class="paper-authors"><span class="me">Ikeya, Lady</span> &middot; 2026</p>
    <p class="paper-note">Any status note, e.g. under review.</p>
  </div>
</li>
```

`<span class="me">` bolds your own name in the author list. For a status pill, add
`<ul class="tags"><li class="tag tag--accent">Job Market Paper</li></ul>`.

### Add a student comment

Inside `<div class="quote-grid">`. The grid reflows on its own, and cards in a row
match heights automatically.

```html
<figure class="quote reveal">
  <blockquote>The comment text, verbatim.</blockquote>
  <figcaption>SPEA V186 &middot; Course evaluation</figcaption>
</figure>
```

### Add a fellowship or award

Inside `<ol class="timeline" id="awards-list">`. The list runs **newest year first**,
so new entries go at the **top**.

```html
<li class="award">
  <span class="award-year">2026</span>
  <div>
    <h4 class="award-name">Name of the award</h4>
    <p class="award-org">Granting institution</p>
  </div>
</li>
```

## Files that still need to be added

Referenced by the page but not yet in the repo:

| Path | What it is |
| --- | --- |
| `assets/img/portrait.jpg` | Hero portrait. Roughly 4:5 crop, ~1200px wide. Falls back to an "LI" monogram if missing. |
| `assets/files/lady-ikeya-cv.pdf` | The downloadable CV. Two links point at it — the hero button and the contact card. |

## Design notes

- **Type** — Newsreader (display serif) for headings, Inter for body, IBM Plex Mono
  for years and course codes, from Google Fonts with system fallbacks.
- **Colour** — warm cream ground (`#fbf9f6`, `#f3efe9` for alternating sections) with
  content blocks raised on white, and a deep garnet accent (`#8c1d21`).
- **Theme** — follows the OS setting; the header toggle overrides it and the choice
  persists in `localStorage`. An inline script in `<head>` applies the stored theme
  before first paint, so there is no flash.
- **Accessibility** — skip link, visible focus rings, labelled controls, and
  `prefers-reduced-motion` respected.

## Deploying to GitHub Pages

Settings → Pages → Build and deployment → Deploy from a branch → `main` / `/ (root)`.
Add a `CNAME` file containing `www.ladyikeya.com` to serve the custom domain.
