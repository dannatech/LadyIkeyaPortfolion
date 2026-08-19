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

## Deploying to www.ladyikeya.com

The domain is an **IONOS Instant Domain** contract — registration only, with no
web space. There is no File Manager or SFTP to upload to, so the files need a
static host, and IONOS DNS points the domain at it.

The site is plain static files: no build step, no server code, no database.

### Recommended — Netlify Drop (free, no account link, no repo)

1. Go to <https://app.netlify.com/drop>.
2. Drag the whole project folder (or `ladyikeya-website.zip`) onto the page.
   It deploys in seconds and gives a URL like `random-name.netlify.app`.
3. Open that URL and check the site works — portrait, theme toggle, CV download.
4. Sign up (free) to keep the deploy, then **Site configuration → Domain
   management → Add a domain** → `www.ladyikeya.com`.
5. Netlify shows the exact DNS records to create. Use the values from *that*
   panel; they are authoritative. They will look like:

   | Type | Host | Points to |
   | --- | --- | --- |
   | CNAME | `www` | `your-site-name.netlify.app` |
   | A | `@` | `75.2.60.5` |

6. In IONOS → `ladyikeya.com` → **DNS**, **edit** exactly two existing rows —
   do not delete them, just change the Value:

   | Type | Host name | Old value (Wix) | New value |
   | --- | --- | --- | --- |
   | A | `@` | `185.230.63.107` | Netlify's apex IP |
   | CNAME | `www` | `pointing.wixdns.net` | `your-site-name.netlify.app` |

   **Leave every other row alone.** The MX, TXT (SPF), `_dmarc`,
   `*._domainkey` (DKIM) and `autodiscover` records run email on this domain;
   deleting any of them silently breaks mail delivery to `@ladyikeya.com`, and
   that failure looks nothing like a website problem when you go hunting for it.
   `_domainconnect` is IONOS-managed — leave it too.

7. HTTPS is issued automatically once DNS resolves — no certificate to buy.

The old site is on **Wix**. Moving DNS does not cancel a Wix subscription; if
one is being paid for, cancel it separately once the new site is confirmed live.

Updating later: drag the folder onto the same site's *Deploys* tab. Netlify
keeps every previous deploy, so rolling back is one click.

### Alternative — Cloudflare Pages

Equivalent and also free, via **Create a project → Direct Upload**. Requires
moving the domain's nameservers to Cloudflare, which is more disruptive than
editing two records, so prefer Netlify unless you already use Cloudflare.

### Alternative — buy IONOS Web Hosting

If everything should stay under one IONOS bill, add a **Web Hosting** package
(not Instant Domain). That unlocks the File Manager and SFTP, and the upload is:

```
index.html
robots.txt
sitemap.xml
assets/css/main.css
assets/js/main.js
assets/img/portrait.webp
assets/files/lady-ikeya-cv.pdf
```

Keep the `assets/` folders nested exactly as shown — `index.html` refers to them
by relative path, so a flattened upload loses all styling, the portrait, and the
CV link. With hosting on the same account the domain usually points at it
already, so no DNS change is needed.

### Whichever route

The current site at `185.230.63.107` is replaced, not edited. Save anything you
still want from it first. After the switch, hard-refresh with
Ctrl/Cmd + Shift + R — browsers cache the old page aggressively.
