# MHS-ScaleOps — Product Requirements Doc

## Original Problem Statement
Create a premium modern landing page for MHS-ScaleOps from scratch. The brand is an online training-business operator run by Muhammad Hassan Shafiq. Positioning: "I build expert-led online training businesses — course, funnel, content, and marketing — at zero upfront cost. I only get paid when you make money." Style: bold, dark premium, teal accents, amber CTAs, operator-first. Reference: https://ayyan.digitalsocialdreams.com/

## Architecture / Stack
- React 19 + Tailwind 3 + Shadcn UI (existing) + Framer Motion (added)
- Fonts: Outfit (display, 900/700/300) + Manrope (body)
- Routing: react-router-dom (single `/` route)
- Backend: FastAPI default (untouched — only boilerplate /api/ + /api/status remain)
- DB: MongoDB (unused by landing — Jotform handles leads)

## User Persona
**Primary:** Skill-holders and experts globally (doctors, engineers, IT trainers, coaches, consultants, fitness creators, educators, finance/trading experts) who want to monetize expertise through online training but lack systems/marketing.

**Secondary:** Founder Muhammad Hassan Shafiq using this as primary outbound conversion asset.

## Core Requirements (static)
1. Bold, dark premium aesthetic: #050505 base, teal #14b8a6 accents, amber #f59e0b CTAs
2. Asymmetric high-trust hero with dual CTAs (Calendly + Jotform)
3. Operator-first tone — no fluff, no agency-speak
4. Zero-upfront-cost positioning communicated visibly throughout
5. 12-deliverable bento grid for "The Offer"
6. 3-phase commission timeline (Launch 25-30% → Growth 20% → Retainer $500-$2K)
7. Naixol International featured case study
8. 30-day roadmap, founder section, FAQ accordion, final CTA with embedded Calendly
9. Mobile responsive, all interactive elements have data-testid
10. Smooth-scroll navigation

## What's Been Implemented
**[Dec 2025 — v1 launch]**
- Glass navbar with logo, 5 nav anchors, mobile menu, amber Book Free Call CTA
- Hero — asymmetric layout, headline, sub-positioning, 4-stat strip, dual CTAs, cinematic offset image with floating chips
- Trust marquee strip — 10 niches as scrolling band
- The Offer — 12 deliverable cards in 3-col bento grid with hover transitions
- How It Works — vertical alternating timeline, 3 phases with teal nodes
- Niches — 10 pill chips + 3 criteria cards
- Naixol Case Study — feature block with dashboard image, 3 directional metrics, IG outbound link
- 30-Day Roadmap — 4-week 4-card grid (Foundations / Build / Launch / Optimize)
- Founder — Hassan portrait placeholder, 4 operator principles, Calendly CTA
- FAQ — Shadcn Accordion with 8 honest answers
- Final CTA — embedded Calendly iframe (lazy-loaded), dual buttons
- Footer — logo, contact, social icons, navigation, copyright

**[Dec 2025 — v2 enhancements]**
- SEO/Social: full meta tags (description, keywords, og:title/description/image, twitter:card), branded `<title>`, favicon → /assets/mhs-logo.png, custom OG image at /assets/og-image.svg (1200×630, branded)
- Founder Video Intro section with play button + "coming soon" placeholder UI (set `LOOM_PLACEHOLDER` in `VideoIntro.jsx` once Hassan records)
- Native on-page Lead Form (`#apply` section) — replaces external Jotform link in all CTAs
  - Backend: `POST /api/leads` + `GET /api/leads` (sorted desc, no `_id` leak)
  - Frontend: validated form (name, email, expertise, revenue tier, message) → success state with Calendly fallback
  - Resend integration wired but **gracefully skips** until real `RESEND_API_KEY` is set
- New "Apply" nav link added (desktop + mobile)

**[Dec 2025 — v3 motion + atmosphere layer]**
- Custom glowing cursor — teal ring + dot, lerp-follow, expands 2.4× on interactive hover, shifts amber over amber CTAs, contracts on mousedown
- Liquid animated background — 3 large blurred blobs (teal × 2 + amber) orbiting on long CSS keyframes (28–40s)
- Premium grid texture overlay — fine 56px grid, 7% opacity, radial-mask vignette
- Magnetic CTAs — Hero, Final CTA, and Navbar primary buttons subtly attract toward cursor (RAF-driven, transform-only)
- 3D tilt cards — Offer (12 deliverables) + Roadmap (4 weeks) cards rotate ±5–6° on perspective-900 hover with smooth lerp
- All effects: GPU-accelerated, RAF-throttled, **double-gated** on `(hover: none)` AND `prefers-reduced-motion` (CSS + JS)

## Test Status
- **iteration_1**: 100% pass — initial v1 build
- **iteration_2**: 100% pass — v2 enhancements (lead form, video intro, OG meta)
- **iteration_3**: 100% pass — v3 motion layer (zero regressions, zero a11y issues)

## Integrations & Placeholders
| Item | Status | Action to go live |
|---|---|---|
| Calendly | ✅ Live | None — real link wired |
| Naixol IG | ✅ Live | None |
| Logo | ✅ Live | Replace if rebrand |
| Founder photo | ⚠ Pexels placeholder | Replace `Founder.jsx` image src with real headshot |
| Naixol metrics | ⚠ Directional copy | Replace `CaseStudy.jsx` 3 metric values |
| Loom intro video | ⚠ Placeholder | Set `LOOM_PLACEHOLDER` in `VideoIntro.jsx` |
| Resend email | ⚠ Placeholder key | Set real `RESEND_API_KEY` in `/app/backend/.env` + restart backend |
| OG image | ✅ Branded SVG ready | Optional: replace with photo-based 1200×630 PNG for richer link previews |

## Prioritized Backlog
**P1 — Polish**
- Replace founder placeholder image with real headshot of Hassan
- Add real Naixol metrics (revenue, students, course launched) once shared
- Add OG image + meta tags for social sharing previews
- Add favicon variants

**P2 — Conversion lift**
- Add a sticky "Book Call" CTA bar on scroll past hero
- Inline 60-90s loom video from founder under hero (operator face = trust)
- Add 2-3 short text testimonials block above FAQ
- WhatsApp click-to-chat floating button (Pakistan-friendly)

**P3 — Growth**
- Convert Jotform to native lead form → MongoDB + Resend email notifications
- Light/dark dual mode (currently dark-only)
- Blog/insights section for SEO
- Multi-language toggle (EN/UR) for South-Asia traffic
