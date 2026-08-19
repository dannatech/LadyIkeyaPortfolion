#!/usr/bin/env bash
# Assemble the static site from src/partials + src/pages into the repo root.
# Usage: ./build.sh
set -euo pipefail

cd "$(dirname "$0")"

HEAD_PART="src/partials/head.html"
HEADER_PART="src/partials/header.html"
FOOTER_PART="src/partials/footer.html"

# page-slug|<title>|<meta description>
PAGES=(
  "index|Lady Ikeya — Public Finance &amp; Fiscal Federalism|Lady Ikeya is a Ph.D. candidate in public affairs at Indiana University's O'Neill School, researching public budgeting, Medicaid finance, and fiscal federalism."
  "research|Research — Lady Ikeya|Working papers and works in progress on Medicaid provider taxes, federal deduction caps, short-term rentals, and local government budgets."
  "teaching|Teaching — Lady Ikeya|Undergraduate public budgeting and finance teaching at Indiana University's O'Neill School, with student course-evaluation feedback."
  "cv|CV — Lady Ikeya|Curriculum vitae: education, working papers, works in progress, fellowships and awards, teaching, and research experience."
)

for spec in "${PAGES[@]}"; do
  IFS='|' read -r slug title desc <<< "$spec"
  out="${slug}.html"

  {
    printf '<!doctype html>\n<html lang="en">\n<head>\n  '
    cat "$HEAD_PART"
    printf '  <title>%s</title>\n' "$title"
    printf '  <meta name="description" content="%s">\n' "$desc"
    printf '  <meta property="og:type" content="website">\n'
    printf '  <meta property="og:title" content="%s">\n' "$title"
    printf '  <meta property="og:description" content="%s">\n' "$desc"
    printf '  <meta name="twitter:card" content="summary_large_image">\n'
    printf '</head>\n<body>\n\n'
    cat "$HEADER_PART"
    printf '\n'
    cat "src/pages/${slug}.html"
    printf '\n'
    cat "$FOOTER_PART"
    printf '\n</body>\n</html>\n'
  } > "$out"

  # Mark the active nav item for this page.
  sed -i "s|<a href=\"${slug}.html\" data-nav=\"${slug}\">|<a href=\"${slug}.html\" data-nav=\"${slug}\" aria-current=\"page\">|" "$out"
  if [ "$slug" = "index" ]; then
    sed -i 's|<a href="index.html" data-nav="home">|<a href="index.html" data-nav="home" aria-current="page">|' "$out"
  fi

  echo "built ${out}"
done
