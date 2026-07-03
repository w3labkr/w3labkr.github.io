# index.html Business Redesign — Implementation Record

Date: 2026-07-03
Branch: `redesign/business-refresh`
Plan: `/Users/user/.claude/plans/index-html-vectorized-scroll.md` (written and cross-reviewed during a separate planning session; not part of this repo)

## Why

The previous `index.html` paired an agency-toned hero ("WE CREATE BEST DIGITAL PRODUCTS") with a raw, uncurated list of 49 GitHub repository cards and no connective content between them — reading as a repo index rather than a business/studio site. This redesign restructures the page around a credible independent-studio narrative: Hero → What We Do → How We Work → Featured Work (curated) → Contact, backed only by claims the actual repositories can substantiate.

## What changed

- **Content**: curated 49 → 12 project cards across 4 categories (Web & App Development, Automation & DevOps, Documentation & Standards, Data & Utility Tooling), each with its own accent color (blue/emerald/amber/violet) that maps 1:1 to a new "What We Do" capabilities section — every claimed capability has a matching proof-of-work group.
- **New sections**: `#capabilities` ("What We Do") and `#approach` ("How We Work") bridge the hero and the project showcase.
- **Technical**: de-duplicated a GitHub icon SVG that was inlined 49 times into a single `<symbol>`/`<use>` sprite (also used for new UI icons); added a mobile hamburger nav (previously nav links had no responsive handling and would overflow on small screens); added SEO meta (description, canonical, Open Graph, Twitter Card, theme-color, favicon, JSON-LD Organization); fixed `lang="ko"` → `lang="en"` (content was already English); fixed a heading-hierarchy bug (card titles were `<h3>` nested under another `<h3>`, now `<h4>`); normalized "W3LabKR" vs "W3LabKr" brand-name inconsistency.
- File size: ~117KB → ~38KB (net decrease despite two new sections, mostly from the SVG dedup).
- GTM snippet and its noscript fallback preserved byte-for-byte; the original site's mailto address and GitHub org link are unchanged.

## Review process

1. **Plan review** (separate session): 4 parallel subagents cross-checked the plan for requirements coverage, deployment/blast-radius risk, test-plan adequacy, and security/performance — findings folded into the plan before implementation began.
2. **Implementation**: built directly from the reviewed plan.
3. **Manual + Playwright verification**: desktop/mobile rendering, hamburger open/close/Escape/auto-close-on-link-click, smooth-scroll + anchor integrity (`grep` cross-check of every `href="#..."` against a matching `id="..."`), console-error check (only the expected Tailwind Play-CDN production warning), dynamic copyright year.
4. **`/code-review --fix`** (xhigh effort, 6 parallel finder angles + live-browser verification): see findings below.

## Code-review findings — fixed

- Sticky header covered the top of each section after anchor navigation (no scroll offset compensation) → added `scroll-margin-top: 5rem` to all section IDs.
- Clicking a link inside the open mobile menu fired the smooth-scroll and menu-close listeners in an order that could cause scroll overshoot (menu collapse shifted layout mid-scroll) → reordered listener registration so the menu closes before the scroll target is computed. Verified live: Contact section top now lands at exactly the header-offset position with no overshoot.
- Changing the header/footer logo to an in-page `#hero` anchor (from a hard URL) silently stopped clearing `location.hash` on "home" clicks, a regression vs. the original site's behavior → added a targeted `history.replaceState` for the `#hero` case. Verified live.
- A leftover custom CSS hover rule (`translateY(-5px)`) was silently dead, overridden by the new Tailwind `hover:-translate-y-1` utility on project cards (confirmed via computed-style measurement) → removed the redundant rule.
- Minor cleanups: mobile-menu toggle handler now reuses the shared `closeMobileMenu()` function instead of duplicating its logic; removed an inert hover-underline animation (default and hover state were identical, so it never animated) and a redundant Tailwind `transform` class; fixed one line's indentation to match `.editorconfig`'s 2-space rule.

## Explicitly skipped (not defects)

- Footer nav omits "What We Do" — intentional, a deliberately shorter footer link set.
- Nav links duplicated across desktop/mobile/footer, and category-color badges repeated per card without a shared "template" — both are inherent to keeping this a static, build-free, crawlable HTML file (no JS-driven templating). Introducing one would be a bigger architectural change than this redesign's scope, and static markup better serves SEO and no-JS clients.

## Verification commands used

```bash
grep -oE 'href="#[a-zA-Z0-9_-]+"' index.html | sort -u   # anchors
grep -oE 'id="[a-zA-Z0-9_-]+"' index.html | sort -u      # ids — cross-checked all resolve
grep -c 'class="project-card' index.html                  # 12
wc -c index.html                                           # ~38.6KB
```

## Deployment status

Not merged to `master`. This repo is a `<username>.github.io` GitHub Pages site with no CI/staging — `master` deploys immediately on push. Per the plan's deployment-safety section, this stays on `redesign/business-refresh` until reviewed and explicitly approved for merge.
