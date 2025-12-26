<div align="center">

# WITERoK — Bladeless Wind Turbine Landing

React + TypeScript + Vite + Tailwind CSS

</div>

WITERoK is a modern Ukrainian startup building innovative bladeless wind turbines. This repository contains the marketing/landing website with rich interactive sections, bilingual content (UA/EN), animated backgrounds, and a working contact form powered by EmailJS.

## Features

- Bilingual content (Ukrainian/English) with an in-app language switcher
- Consistent ESG-inspired design system with Tailwind CSS
- Animated canvas backgrounds for Hero, Product, Team, etc.
- Horizontal, button-controlled Roadmap timeline
- Product section with specs grid and summary
- FAQ accordion and ESG-style information cards
- Contact section with EmailJS integration (no backend required)
- Responsive layout, accessible focus styles, and smooth scrolling

## Tech Stack

- React 19 + TypeScript
- Vite 7 (dev/build/preview)
- Tailwind CSS 3
- lucide-react (icons)
- Recharts (data visuals used in some sections)
- EmailJS (form-to-email)

## Project Structure

```
startup/
├─ public/
├─ src/
│  ├─ assets/               # Images & media
│  ├─ components/           # Page sections and UI pieces
│  │  ├─ HeroSection.tsx
│  │  ├─ AboutSection.tsx
│  │  ├─ ESGSection.tsx
│  │  ├─ ProblemSection.tsx
│  │  ├─ ProductSection.tsx
│  │  ├─ CompetitiveSection.tsx
│  │  ├─ ComparisonSection.tsx
│  │  ├─ TargetAudienceSection.tsx
│  │  ├─ BusinessModelSection.tsx
│  │  ├─ MarketingSection.tsx
│  │  ├─ TeamSection.tsx
│  │  ├─ AdvisorsSection.tsx
│  │  ├─ FinancialSection.tsx
│  │  ├─ RoadmapSection.tsx
│  │  ├─ FAQSection.tsx
│  │  ├─ EfficiencyCalculator.tsx
│  │  ├─ ContactSection.tsx
│  │  └─ Footer.tsx / Navigation.tsx
│  ├─ contexts/
│  │  └─ LanguageContext.tsx # UA/EN toggle and provider
│  ├─ App.tsx                # Section composition + lazy loading
│  └─ index.css              # Tailwind & global styles
├─ EMAIL_SETUP_GUIDE.md      # Step-by-step EmailJS setup
├─ EMAILJS_TROUBLESHOOTING.md# Common fixes for EmailJS
├─ package.json
└─ vite.config.ts
```

## Section Overview (IDs for navigation)

- Hero (`#home`) — headline, CTAs, animated background
- About Us (`#about`) — mission, product approach, values
- ESG (`#esg`) — sustainability-focused cards
- Problem & Solution (`#problem`) — context and value proposition
- Product (`#product`) — summary, specs grid, product image
- Competitive Advantages (`#advantages`) — key differentiators
- Comparison (`#comparison`) — benchmark vs alternatives
- Target Audience (`#audience`) — who benefits
- Business Model (`#business`) — how it works financially
- Marketing Strategy (`#marketing`) — go-to-market
- Team (`#team`) — team slider and open roles
- Advisors (`#partnership`) — partners/advisors
- Financial Model (`#financial`) — KPIs, charts
- Roadmap (`#roadmap`) — horizontal timeline with buttons
- FAQ (`#faq`) — common questions
- Efficiency Calculator (`#calculator`) — preview/coming soon
- Contact (`#contact`) — form + socials

## Getting Started

Prerequisites:

- Node.js 18+ (recommended) and npm

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Email (Contact Form)

The contact form sends messages via EmailJS (no backend needed).

1. Follow `EMAIL_SETUP_GUIDE.md` to create the Service, Template, and get your Public Key.
2. Update placeholders/IDs in `src/components/ContactSection.tsx` if needed.
3. If you get errors, see `EMAILJS_TROUBLESHOOTING.md`.

Current recipient: `marsonyteam@gmail.com` (configured via EmailJS service “Default To Email”).

## Styling & Design System

- Tailwind CSS utilities; primary blues: `#144073` and `#1A6DCC`
- ESG-style light sections; product/team with animated dark gradients
- lucide-react for icons; accessible focus states & transitions

## Development Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — type-check then build
- `npm run preview` — preview build locally
- `npm run lint` — run ESLint

## Deployment

This is a static SPA. Recommended hosts: Vercel, Netlify, GitHub Pages.

- Build: `npm run build`
- Deploy `dist/` output folder

Vercel/Netlify auto-detect Vite apps. Framework preset: Vite. Build command: `npm run build`. Output dir: `dist`.

## Contributing

Pull requests are welcome for fixes and improvements. For larger changes, please open an issue describing the proposal first.

## License

All rights reserved. The content and design are proprietary to the WITERoK project.
