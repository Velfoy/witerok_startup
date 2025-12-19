# 🗺️ WITERoK Pitch Website - Site Map

## Navigation Structure

```
WITERoK (Logo) → #home
│
├─ Головна (#home)
│  └─ HeroSection
│
├─ Про проєкт (#about)
│  └─ ESGSection
│
├─ Продукт (#product)
│  └─ ProductSection
│
├─ Бізнес-модель (#business)
│  └─ BusinessModelSection
│
├─ Команда (#team)
│  └─ TeamSection
│
├─ FAQ (#faq) ⭐ НОВИЙ
│  └─ FAQSection
│
├─ Контакти (#contact)
│  └─ ContactSection
│
└─ Зв'язатися (button → #contact)
```

---

## Page Flow (Порядок прокручування)

```
┌─────────────────────────────────┐
│    Navigation (Fixed Header)    │
├─────────────────────────────────┤
│  1. HeroSection                 │ ← Вступна сторінка
│     [Hero Image + CTA]          │
├─────────────────────────────────┤
│  2. ESGSection                  │ ← Про нас (ESG)
│     [E + S + G Cards]           │
├─────────────────────────────────┤
│  3. ProblemSection              │ ← Проблема на ринку
│     [4x Problem Cards]          │
├─────────────────────────────────┤
│  4. ProductSection              │ ← Наш продукт
│     [Product Image + Specs]     │
├─────────────────────────────────┤
│  5. CompetitiveSection          │ ← Переваги
│     [4x Advantage Cards +       │
│      Comparison Table]          │
├─────────────────────────────────┤
│  6. TargetAudienceSection       │ ← Цільова аудиторія
│     [4x Audience Cards +        │
│      Market Size]               │
├─────────────────────────────────┤
│  7. BusinessModelSection        │ ← Бізнес модель
│     [Revenue Streams +          │
│      Cost Structure]            │
├─────────────────────────────────┤
│  8. MarketingSection            │ ← Маркетинг
│     [4x Strategy Cards +        │
│      Budget Distribution]       │
├─────────────────────────────────┤
│  9. TeamSection                 │ ← Команда
│     [4x Team Members +          │
│      Advisors]                  │
├─────────────────────────────────┤
│  10. FinancialSection           │ ← Фінанси
│      [Area Chart + Pie Chart +  │
│       Unit Economics +          │
│       Investment Ask]           │
├─────────────────────────────────┤
│  11. RoadmapSection             │ ← Дорожна карта
│      [6x Timeline Items]        │
├─────────────────────────────────┤
│  12. FAQSection ⭐              │ ← Часті питання
│      [Accordion with Q&A]       │
├─────────────────────────────────┤
│  13. ContactSection             │ ← Контакти
│      [Contact Info + Form +     │
│       CTA]                      │
├─────────────────────────────────┤
│         Footer                  │
│      [Links + Copyright]        │
└─────────────────────────────────┘
```

---

## Color Zones

```
White (#ffffff) Sections:
  - ProductSection
  - TargetAudienceSection
  - MarketingSection
  - FinancialSection

Muted (#f0f5fb) Sections:
  - ProblemSection
  - CompetitiveSection
  - BusinessModelSection
  - TeamSection
  - RoadmapSection

Gradient (Primary → Secondary) Sections:
  - HeroSection (background image overlay)
  - ESGSection (full gradient background)
  - ContactSection (full gradient background)
  - FinancialSection (Investment Ask subsection)
  - MarketingSection (Budget Distribution subsection)
  - TargetAudienceSection (Market Size subsection)
```

---

## Component Dependencies

```
App.tsx
├── Navigation (독립적)
├── HeroSection (독립적)
├── ESGSection (독립적)
├── ProblemSection (독립적)
├── ProductSection
│   └── lucide-react (icons)
├── CompetitiveSection (独立)
├── TargetAudienceSection (独立)
├── BusinessModelSection (独立)
├── MarketingSection (独立)
├── TeamSection (独立)
├── FinancialSection
│   ├── recharts (charts)
│   └── lucide-react (icons)
├── RoadmapSection
│   └── lucide-react (icons)
├── FAQSection ⭐
│   ├── useState (state management)
│   └── lucide-react (ChevronDown icon)
├── ContactSection
│   └── lucide-react (icons)
└── Footer (독립적)
```

---

## Responsive Breakpoints

```
Mobile (<640px)
  ├─ Navigation: Hamburger menu
  ├─ Grid: 1 column
  ├─ Text: Smaller (text-2xl → text-3xl)
  └─ Spacing: Reduced padding

Tablet (640px - 1024px)
  ├─ Navigation: Some desktop items visible
  ├─ Grid: 2 columns
  ├─ Text: Medium (text-3xl → text-4xl)
  └─ Spacing: Medium padding

Desktop (>1024px)
  ├─ Navigation: Full menu
  ├─ Grid: 3-4 columns
  ├─ Text: Larger (text-4xl → text-5xl)
  └─ Spacing: Full padding
```

---

## Interactive Elements

```
Navigation
  ├─ Hover: Underline on links
  ├─ Click: Jump to anchor
  └─ Mobile: Toggle menu button

Buttons
  ├─ Hover: Background change
  ├─ Click: CTA action
  └─ State: Active/disabled

Cards
  ├─ Hover: Shadow increase
  ├─ Hover: Scale or color change
  └─ Click: Link navigation

FAQ
  ├─ Click: Expand/collapse accordion
  └─ Icon: Rotate on expand

Forms
  ├─ Focus: Border highlight
  ├─ Hover: Background change
  └─ Submit: Form action
```

---

## SEO Anchors

```
<a href="#home">Головна</a>         → HeroSection id="home"
<a href="#about">Про проєкт</a>     → ESGSection id="about"
<a href="#product">Продукт</a>     → ProductSection id="product"
<a href="#business">Бізнес</a>     → BusinessModelSection id="business"
<a href="#team">Команда</a>        → TeamSection id="team"
<a href="#faq">FAQ</a>              → FAQSection id="faq" ⭐
<a href="#contact">Контакти</a>    → ContactSection id="contact"
```

---

## File Size Estimates

```
Navigation.tsx           ~2 KB
HeroSection.tsx          ~2 KB
ESGSection.tsx           ~2 KB
ProblemSection.tsx       ~2 KB
ProductSection.tsx       ~3 KB
CompetitiveSection.tsx   ~3 KB
TargetAudienceSection.tsx ~3 KB
BusinessModelSection.tsx ~3 KB
MarketingSection.tsx     ~3 KB
TeamSection.tsx          ~4 KB
FinancialSection.tsx     ~5 KB (with Recharts)
RoadmapSection.tsx       ~4 KB
FAQSection.tsx           ~4 KB (new)
ContactSection.tsx       ~3 KB
Footer.tsx               ~2 KB
───────────────────────────────
Total:                   ~45 KB (uncompressed)
After gzip:              ~12 KB (estimated)
```

---

## Performance Considerations

- Lazy loading sections (if needed)
- Image optimization
- Chart rendering optimization
- CSS minification
- JavaScript bundling

---

## Browser Support

All components use:

- Modern CSS (Tailwind v3+)
- ES6+ JavaScript
- React 18+
- CSS Grid & Flexbox

Should work on:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

Great! Your pitch website is fully structured and ready to go! 🚀
