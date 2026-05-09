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

**Integrations:**
- Calendly link: https://calendly.com/shafiqhassan429/mhs (live iframe + button targets)
- Jotform link: https://www.jotform.com/build/261208419658059 (button targets)
- Naixol IG: https://www.instagram.com/naixol_int/ (case study link)
- Email: shafiqhassan429@gmail.com (mailto in footer)
- Logo: /app/frontend/public/assets/mhs-logo.png

## Test Status
- testing_agent_v3 iteration_1: **100% pass** (backend + frontend)
- All 18 review-request items verified
- Zero console errors, zero a11y blockers

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
