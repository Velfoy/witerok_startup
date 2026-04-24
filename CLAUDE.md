# CLAUDE.md — WITERoK Startup Landing Site

## Project Summary

Marketing SPA for WITERoK wind energy startup. React 19 + TypeScript + Vite + Tailwind. Bilingual (UK/EN). Static frontend + WordPress PHP backend for news, contact, newsletter.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| UI | React 19.2.0, TypeScript 5.9.3 |
| Build | Vite 7.2.4 |
| Styling | Tailwind CSS 3.4.1 + CSS variables |
| Icons | lucide-react 0.562.0 |
| Charts | recharts 2.10.3 |
| Backend | WordPress PHP (custom REST endpoints) |
| External API | Railway.app (efficiency calculator) |
| Email | wp_mail() via WP Mail SMTP plugin |
| Lint | ESLint 9 (flat config, react-hooks, typescript-eslint) |

No router. No test suite. No global state manager.

---

## Architecture

```
main.tsx
  └── App.tsx
        ├── LanguageProvider (Context — only global state)
        ├── Navigation (fixed, hash-based nav links)
        ├── HeroSection (eager)
        └── 23× React.lazy() + Suspense sections
              ├── NewsSection         → api.getPosts()
              ├── EfficiencyCalculator → efficiencyCalculatorApi
              ├── ContactSection      → api.sendContactMessage()
              ├── NewsletterSection   → api.subscribeNewsletter()
              └── UnsubscribeSection  → api.unsubscribe() via ?token=
```

Navigation is hash-based (`#about`, `#calculator`, etc.). No React Router. `?token=XXX` query param only used for unsubscribe flow.

---

## API Layer

### WordPress endpoints (`https://witerok.com/api`)
Hardcoded in `src/services/api.ts:7`. No env var fallback (localhost commented out).

| Endpoint | Method | Purpose |
|----------|--------|---------|
| posts.php | GET | Fetch news (`?limit=N`) |
| post-single.php | GET | Single post (`?slug=X`) |
| contact.php | POST | Save message + email admin |
| newsletter.php | POST | Subscribe + welcome email |
| newsletter.php | GET | Unsubscribe via `?action=unsubscribe&token=X` |
| donate.php | POST | Donation stub (not in production UI) |

CORS: `Access-Control-Allow-Origin: *`

Custom DB tables: `wp_witerok_news`, `wp_newsletter_subscribers`, `wp_contact_messages`.

### Efficiency Calculator
`src/services/efficiencyCalculatorApi.ts:19–20` — POST to `https://efficiency-calculator-production.up.railway.app/api/calculate`.
Partially env-var driven: `VITE_EFFICIENCY_CALCULATOR_API_ORIGIN`, `VITE_EFFICIENCY_CALCULATOR_API_KEY`. Only external API with env var support.

---

## Language System

Binary: `"uk"` | `"en"`. State in `LanguageContext`. Hook: `useLanguage()`.

All strings inline in components as `{ uk: "...", en: "..." }` objects. No i18n library. 100+ bilingual string pairs across 26 components. Does not scale beyond 2 languages.

---

## Canvas Animations

4 components use canvas particle systems with custom physics:

- `HeroSection.tsx` — particle field, mouse interaction
- `ProductSection.tsx` — gradient + particles
- `RoadmapSection.tsx` — wave + particles
- `SharedBackground.tsx` — shared gradient for team/about sections

`WindCursorGlobal.tsx` — custom mouse cursor (hides native cursor globally via `.hide-cursor` in CSS).

Particle physics: velocity, damping (`vx *= 0.85`), return force (`(baseX - x) * 0.05`). No OffscreenCanvas, no pooling. CPU-intensive on low-end devices.

---

## Styling

CSS variables in `src/index.css` drive theming:

```css
--primary: #144073
--secondary: #1A6DCC
--accent: #1A6DCC
```

Tailwind references these via `tailwind.config.js`. However, canvas components hardcode the same hex values directly — not reading from CSS vars.

Custom utility classes: `.glass-panel`, `.glass-hover-strong`, `.cta-circle`, `.glass-pill`, `.glass-input`.

Dark mode class `.dark` defined but not actively toggled.

---

## What's Hardcoded (Not Config-Driven)

| Value | Location |
|-------|----------|
| WordPress API URL `https://witerok.com/api` | `src/services/api.ts:7` |
| Brand colors `#144073`, `#1A6DCC` | canvas components, index.css |
| Admin email `witerokgreenenergy@gmail.com` | `ContactSection.tsx` |
| Address "Чоколівський бульвар, 13, Київ" | `ContactSection.tsx` |
| Social links (LinkedIn, FB, IG, YouTube) | `ContactSection.tsx` |
| Default calculator coords lat `46.8483`, lon `31.0821` | `EfficiencyCalculator.tsx` |
| All 19 nav items with bilingual labels | `Navigation.tsx` |
| Team member data (names, roles, images) | `TeamSection.tsx` |
| Advisors data | `AdvisorsSection.tsx` |

No `.env.example` file exists.

---

## Dead Code

These sections are imported but commented out in `App.tsx`:

- `MarketingSection`
- `FinancialSection`
- `DonateSection`
- `GallerySection`

---

## Known Structural Issues

1. **No env config for API URLs** — WordPress URL hardcoded; local dev requires manual comment swap.
2. **No test infrastructure** — zero test files, no Vitest/Jest setup.
3. **No error boundaries** — section throw = full app crash.
4. **`console.log` in api.ts** — debug logs shipped to production.
5. **Forms lack schema validation** — basic regex only; no Zod/Yup.
6. **Color duplication** — brand hex values in CSS vars AND canvas components.
7. **No accessibility** — missing alt text, canvas bypasses screen readers, form labels not semantically linked.
8. **Bilingual strings in components** — no central translations file.
9. **Email HTML template inline in PHP** — `newsletter.php` has 170+ line HTML string.
10. **No skeleton loaders** — Suspense fallback is plain "Loading…" text.

---

## Key Files

| File | Purpose |
|------|---------|
| `src/App.tsx` | Root layout, lazy loading, section order |
| `src/contexts/LanguageContext.tsx` | Language state |
| `src/services/api.ts` | All WordPress API calls |
| `src/services/efficiencyCalculatorApi.ts` | External calculator API |
| `src/components/Navigation.tsx` | Nav logic, hamburger, lang toggle |
| `src/index.css` | CSS variables, custom utilities |
| `tailwind.config.js` | Theme mapping to CSS vars |
| `wordpress-api/` | PHP backend (deploy to WordPress host) |

---

## Build & Dev

```bash
npm run dev      # Vite dev server
npm run build    # tsc -b && vite build → dist/
npm run preview  # Serve dist/ locally
npm run lint     # ESLint
```

Output in `dist/` is fully static. Requires external WordPress instance at `witerok.com` for dynamic data.
