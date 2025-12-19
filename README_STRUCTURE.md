# WITERoK Pitch Website - Quick Reference Guide

## ✅ Завершено: Всі 15 основних компонентів

### Порядок на сторінці (як вони відображаються):

1. **Navigation** - Фіксована навігація вверху (anchor links на всі секції)
2. **HeroSection** (#home) - Вступна сторінка з градієнтом та call-to-action
3. **ESGSection** (#about) - ESG модель (Environmental, Social, Governance)
4. **ProblemSection** - 4 проблеми на ринку
5. **ProductSection** (#product) - Prezentacija prodotta WITERoK
6. **CompetitiveSection** - Конкурентні переваги та порівняння
7. **TargetAudienceSection** - 4 цільові аудиторії
8. **BusinessModelSection** (#business) - Бізнес модель
9. **MarketingSection** - Маркетингова стратегія
10. **TeamSection** (#team) - Команда та радники
11. **FinancialSection** - Фінансова модель з графіками
12. **RoadmapSection** - Дорожна карта (TRL 4-8)
13. **FAQSection** (#faq) - Часті питання ★ НОВИЙ
14. **ContactSection** (#contact) - Контакти та форма
15. **Footer** - Футер з лінками

---

## 🎨 Дизайн

### Кольорова схема:

- **Primary**: #144073 (Темний синій)
- **Secondary**: #1A6DCC (Світлий синій)
- **Muted**: #f0f5fb (Світло-сірий фон)
- **Background**: #ffffff (Білий)

### Компоненти використовують Tailwind CSS:

- `bg-primary`, `bg-secondary`, `bg-muted`
- `text-primary`, `text-secondary`, `text-foreground`
- `rounded-xl`, `shadow-lg`, `border-border`

---

## 📱 Responsive Design

Все адаптивне для мобільних:

- `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` (1 col mobile, 2 tablet, 4 desktop)
- Mobile меню в Navigation
- Flex layouts змінюють напрямок

---

## 🔗 Anchor Links для навігації

```
#home         → HeroSection
#about        → ESGSection
#product      → ProductSection
#business     → BusinessModelSection
#team         → TeamSection
#faq          → FAQSection (НОВИЙ)
#contact      → ContactSection
```

---

## 📊 Компоненти з динамічними даними

### FAQSection (НОВИЙ)

- 5 категорій питань
- ~20 Q&A
- Accordion з expand/collapse

### FinancialSection

- Area Chart (доходи + прибуток)
- Pie Chart (структура витрат)
- Unit Economics таблиця

### RoadmapSection

- 6 timeline этапів
- Status indicators (Completed, In Progress, Planned)
- SVG лінія для підключення

### CompetitiveSection

- Порівняльна таблиця
- Highlight рядки для бенчмарків

---

## 🚀 Як запустити

```bash
# Встановити залежності
npm install

# Dev server
npm run dev

# Build
npm run build
```

---

## ⚙️ Залежності

```json
{
  "react": "^18.3",
  "react-dom": "^18.3",
  "lucide-react": "^latest", // Іконки
  "recharts": "^2.latest", // Графіки
  "class-variance-authority": "^latest", // CVA для CSS
  "@radix-ui/react-*": "^latest" // UI primitives (якщо додаватимеш)
}
```

---

## 💡 Примітки

1. **FAQSection** - Новий компонент, який ви запросили
2. Усі компоненти використовують **useState** для інтерактивності (Mobile menu, FAQ expand)
3. Компоненти мають **responsive грідс** і **hover effects**
4. **CSS variables** визначені в index.css для теми
5. **Anchor links** автоматично скролять до відповідних секцій

---

## 📝 Що змінити під свій бренд

1. `WITERoK` - замінити на назву вашої компанії
2. Кольори в `index.css` (--primary, --secondary, etc.)
3. Контакти в **ContactSection** та **Footer**
4. Дані в кожній секції (команда, ціни, тощо)
5. Images URLs (поточно Unsplash images)

---

## 🎯 Наступні кроки

- [ ] Налаштувати кольори під брендинг
- [ ] Замінити placeholder images
- [ ] Додати form submission handler
- [ ] Додати Analytics (GA4)
- [ ] SEO meta tags
- [ ] Deploy на Vercel/Netlify

---

Все готово! Проект повністю структурований і готовий до роботи. 🚀
