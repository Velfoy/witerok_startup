# WITERoK Design Language

Reference for building new sections that match the existing visual system.

---

## Colors

### Brand Palette
```
Primary Blue:    #144073   (CSS: --primary)
Secondary Blue:  #1A6DCC   (CSS: --secondary, --accent)
Dark Navy:       #0a2540   (canvas gradient base only)
```

### Surface Colors
```
Background:      #ffffff
Muted:           #f0f5fb   (light section tint)
Input fill:      #f3f8fd
Border:          rgba(20, 64, 115, 0.1)
```

### Dark Section Overlay Palette
Cards on dark backgrounds use white with opacity:
```
bg-white/10   → subtle card fill
bg-white/15   → hover state
border-white/20 → card border
text-white/90 → primary text
text-white/70 → secondary text
text-white/50 → muted text
```

### Status Colors
```
Success: bg-green-50 / border-green-200 / text-green-700
Error:   bg-red-50   / border-red-200   / text-red-700
```

### Chart Scale (blue gradient)
```
--chart-1: #144073
--chart-2: #1a6dcc
--chart-3: #5a9de8
--chart-4: #84b6f1
--chart-5: #b3d4f5
```

---

## Typography

No custom font — system default. Font sizes are Tailwind scale.

### Heading Hierarchy
| Role | Classes | Weight |
|------|---------|--------|
| Hero H1 | `text-5xl md:text-6xl lg:text-7xl` | `font-medium` |
| Section H2 | `text-4xl md:text-5xl` | `font-semibold` or `font-bold` |
| Card H3 | `text-xl md:text-2xl` | `font-semibold` |
| Label/Button | `text-sm` or `text-base` | `font-medium` |
| Body | `text-base` or `text-lg` | `font-normal` |

### Color Rules
- Dark sections: `text-white`, subtitles `text-white/70`
- Light sections: headings `text-[#144073]`, body `text-slate-600`

---

## Section Structure

Every section follows this shell:

```tsx
<section id="sectionId" className="relative py-24 overflow-hidden">
  {/* Layer 0: canvas or gradient background */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#0a2540] via-[#144073] to-[#1A6DCC]"
    style={{ zIndex: 0 }} />

  {/* Layer 1: optional overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20"
    style={{ zIndex: 1 }} />

  {/* Layer 10: content */}
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 10 }}>
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl text-[#144073] font-semibold mt-4 mb-3">Title</h2>
      <p className="text-lg text-slate-600 max-w-3xl mx-auto">Subtitle</p>
    </div>
    {/* grid content */}
  </div>
</section>
```

### Light vs Dark Sections

**Light** (FAQ, Contact, Competitive, ESG):
```tsx
className="relative py-24 bg-gradient-to-b from-white via-[#f7fbff] to-white overflow-hidden"
```
Use `text-[#144073]` headings, `text-slate-600` body, white cards with `border-slate-200`.

**Dark** (Hero, Product, Team, Roadmap, About):
Canvas gradient `#0a2540 → #144073 → #1A6DCC` as background.
Use `text-white` text, glass cards (`bg-white/10 border-white/20`).

---

## Layout

### Container
```tsx
className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
```
Narrower text blocks: `max-w-4xl`. Slightly tighter sections: `max-w-6xl`.

### Grids
```tsx
// Standard 3-col
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// 2-col (feature / detail layouts)
className="grid grid-cols-1 md:grid-cols-2 gap-8"

// Auto-fit cards (news, team)
className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(min(100%,350px),1fr))]"
```

### Section Padding
- Vertical: `py-14` (compact) → `py-16` → `py-24` (standard)
- Header margin bottom: `mb-12`
- Grid gaps: `gap-4` tight / `gap-6` standard / `gap-8` generous

---

## Components

### Glass Card (dark backgrounds)
```css
/* .glass-panel */
background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06));
border: 1px solid rgba(255, 255, 255, 0.22);
backdrop-filter: blur(18px) saturate(140%);
box-shadow: 0 6px 20px rgba(20,64,115,0.08), inset 0 1px 0 rgba(255,255,255,0.06);
border-radius: 0.9rem;
```
Hover: `transform: translateY(-8px) scale(1.01)` via `.glass-panel:hover`.

### Light Card (light backgrounds)
```tsx
className="p-6 rounded-2xl bg-white border border-slate-200
  shadow-[0_8px_24px_rgba(0,0,0,0.06)]
  hover:shadow-[0_14px_36px_rgba(26,109,204,0.18)] transition"
```

### Icon Block
```tsx
<div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
  style={{ background: "linear-gradient(135deg, #144073, #1A6DCC)" }}>
  <Icon size={24} className="text-white" />
</div>
```

### Glass Pill / Badge
```tsx
className="glass-pill px-4 py-1 rounded-full text-sm font-medium text-white/90"
```
```css
/* .glass-pill */
background: linear-gradient(90deg, rgba(26,109,204,0.12), rgba(20,64,115,0.06));
border: 1px solid rgba(255,255,255,0.06);
backdrop-filter: blur(6px);
```

### Primary Button (CTA)
```tsx
className="px-6 py-3 bg-[#1A6DCC] text-white rounded-full
  hover:opacity-95 transition-opacity text-sm font-medium"
```

### Gradient Button (hero/dark)
```tsx
className="inline-flex items-center gap-3 px-6 py-3 rounded-full
  bg-white text-[#004799] shadow-md transition-all duration-300
  hover:scale-[1.03] hover:shadow-[0_10px_30px_rgba(0,71,153,0.35)]"
```

### Gradient Submit Button (forms)
```tsx
className="w-full px-8 py-3 bg-gradient-to-r from-[#144073] to-[#1A6DCC]
  text-white rounded-lg font-semibold
  hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50"
```

---

## Forms

```tsx
{/* Label */}
<label className="block text-[#144073] font-semibold mb-2 text-sm md:text-base">

{/* Input / Textarea */}
<input className="w-full px-4 py-3 rounded-lg border border-slate-200
  focus:outline-none focus:ring-2 focus:ring-[#1A6DCC] focus:border-transparent
  text-slate-900 bg-white" />

{/* Status */}
<div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700">
```

---

## Borders & Shadows

| Use | Value |
|-----|-------|
| Card radius | `rounded-2xl` (0.875rem) |
| Button radius | `rounded-full` |
| Icon block | `rounded-xl` |
| Standard shadow | `shadow-[0_8px_24px_rgba(0,0,0,0.06)]` |
| Hover shadow (light) | `shadow-[0_14px_36px_rgba(26,109,204,0.18)]` |
| Hover shadow (dark) | `shadow-[0_18px_40px_rgba(20,64,115,0.12)]` |
| CTA strong shadow | `shadow-[0_12px_32px_rgba(26,109,204,0.25)]` |

---

## Animations & Transitions

### Standard Timing
- Fast interaction: `duration-200`
- Standard hover: `duration-300`
- Slow reveal: `duration-700`
- Glass panel: `cubic-bezier(0.2, 0.9, 0.2, 1)` 260ms

### Hover Transforms
```tsx
hover:scale-[1.02]   // subtle card lift
hover:scale-[1.03]   // CTA button
hover:scale-105      // icon/badge
hover:scale-110      // image zoom (inside group)
translateY(-8px)     // glass panel float (via class)
```

### Group Pattern (image zoom)
```tsx
<div className="group overflow-hidden rounded-2xl">
  <img className="transition-transform duration-300 group-hover:scale-110" />
</div>
```

### Canvas Particle System (reference params)
Used in Hero, Product, Roadmap, SharedBackground.
- Hero: 80 particles, size 2–5px, mouse radius 200px, connection distance 120px
- Background sections: 40 particles, 5 wave layers, amplitude 20–52px
- Gradient: `#0a2540 → #144073 → #1A6DCC`
- Damping: `vx *= 0.85`, return force: `(baseX - x) * 0.05`

New sections don't need canvas — use CSS gradients from the dark palette instead.

---

## Navigation Bar

```
Fixed, z-50, h-16, bg-white, border-b
Logo: text-2xl text-primary font-medium
Nav links: text-foreground/70 text-sm
CTA: px-5 py-2 bg-[#1A6DCC] text-white rounded-full
Lang toggle: px-3 py-1 rounded-full bg-white/10 text-primary text-sm
```

---

## Gradients Quick Reference

```tsx
// Primary brand gradient (horizontal)
bg-gradient-to-r from-[#144073] to-[#1A6DCC]

// Dark section background
bg-gradient-to-b from-[#0a2540] via-[#144073] to-[#1A6DCC]

// Light section background
bg-gradient-to-b from-white via-[#f7fbff] to-white

// Subtle light radial (on white sections)
bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.08)_0%,transparent_60%)]
```

---

## Checklist for New Sections

- [ ] Section has `relative overflow-hidden` and `py-24`
- [ ] Content inside `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- [ ] Header: H2 + subtitle, centered, `mb-12`
- [ ] Cards use `rounded-2xl` with appropriate shadow variant
- [ ] Buttons use `rounded-full` with `transition-all duration-300`
- [ ] All text bilingual `{ uk: "...", en: "..." }` via `useLanguage()`
- [ ] Dark section: glass cards (`bg-white/10 border-white/20`)
- [ ] Light section: white cards (`border-slate-200`)
- [ ] Icons wrapped in gradient `rounded-xl` block
- [ ] Hover states defined for all interactive elements
