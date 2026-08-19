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

## Replacing the portrait

`assets/img/portrait.webp` is shown in a **square** frame with `object-fit: cover`,
so a roughly 1:1 source loses almost nothing. Update the `width`/`height`
attributes on the `<img>` to match any replacement — they reserve the space and
stop the hero jumping as the image loads. If the file is ever missing, the frame
falls back to an "LI" monogram.

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

## Deploying to www.ladyikeya.com (IONOS hosting)

The site is plain static files — no build step, no server-side code, no
database. Deploying means copying seven files into the domain's web root.

**Upload these, keeping the folder structure exactly:**

```
index.html
robots.txt
sitemap.xml
assets/css/main.css
assets/js/main.js
assets/img/portrait.webp
assets/files/lady-ikeya-cv.pdf
```

The `assets/` folders must stay nested as shown — `index.html` refers to them by
relative path, so a flattened upload will load the page with no styling, no
portrait, and a broken CV link.

Do **not** upload `README.md` or `.gitignore`; they are repo housekeeping and
serve no purpose on the web host.

### Option A — IONOS File Manager (browser, no extra software)

1. IONOS → **Hosting** → your package → **File Manager** (sometimes under
   *Web Space* → *Manage files*).
2. Open the web root. IONOS usually names it `/` for the primary domain, or
   `/ladyikeya.com/` when several domains share one package. It is the folder
   whose contents already answer at `https://www.ladyikeya.com/`.
3. Remove or rename the old site's files. Renaming the old `index.html` to
   `index.old.html` is the safest way to keep a rollback.
4. Upload, preserving folders. If the uploader will not take folders, create
   `assets`, then `assets/css`, `assets/js`, `assets/img`, `assets/files`
   by hand and upload into each.

### Option B — SFTP (better for repeat updates)

IONOS → **Hosting** → **SFTP & SSH** for the host, username, and port; set the
password there if you have not already.

```bash
# from the project root
sftp -P <port> <user>@<host>
> cd /                 # the web root from step 2 above
> put index.html
> put robots.txt
> put sitemap.xml
> mkdir assets assets/css assets/js assets/img assets/files
> put assets/css/main.css   assets/css/
> put assets/js/main.js     assets/js/
> put assets/img/portrait.webp assets/img/
> put assets/files/lady-ikeya-cv.pdf assets/files/
```

Or in one command with rsync, if SSH is enabled on the package:

```bash
rsync -avz --delete \
  --exclude '.git' --exclude 'README.md' --exclude '.gitignore' \
  ./ <user>@<host>:/
```

`--delete` makes the server match the local folder exactly, which also clears
out the old site. Drop that flag if anything else lives in the web root.

### After uploading

Open `https://www.ladyikeya.com/` and hard-refresh (Ctrl/Cmd + Shift + R) —
browsers cache the old page aggressively. Check that the portrait appears, the
theme toggle works, and **Download CV** saves the PDF.

No DNS change is needed if the domain already points at this IONOS package.
Confirm HTTPS is on under **Domains & SSL** → `ladyikeya.com` → *SSL*; IONOS
includes a free certificate, and the site should be served over HTTPS only.

### Updating later

Edit `index.html`, then re-upload just the files you changed. There is nothing
to rebuild.
