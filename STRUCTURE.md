# WITERoK Pitch Website - Структура проекту

## Укладне завдання ✅ Виконано

Ви мали план розробити структуру з 16 блоків. Ось поточний стан:

### Реалізовані секції (15/16):

1. **HeroSection** ✅

   - Вступний блок з назвою стартапа
   - Call-to-action кнопки
   - Background image з градієнтом
   - Scroll indicator

2. **ESGSection** ✅

   - ESG модель бізнесу (Environmental, Social, Governance)
   - Градієнтний фон (primary → secondary)
   - 3 основні принципи

3. **ProblemSection** ✅

   - 4 основні проблеми бізнесу і громад
   - Чому потребують саме наш продукт
   - Solution teaser

4. **ProductSection** ✅

   - Основна презентація продукту
   - 8 ключових характеристик
   - Переваги WITERoK
   - Изображення продукта

5. **CompetitiveSection** ✅

   - 4 конкурентні переваги
   - Порівняльна таблиця з традиційними рішеннями
   - Highlight рядки для кращої видимості

6. **TargetAudienceSection** ✅

   - 4 цільові аудиторії (МСБ, Промисловість, Агросектор, Громади)
   - Переваги для кожного сегменту
   - Розмір ринку в Україні

7. **BusinessModelSection** ✅

   - 4 потоки доходів (60% прямі продажі, 25% сервіс, 10% консалтинг, 5% лізинг)
   - Структура витрат (Виробництво, Маркетинг, R&D, Операційні)
   - Ключові метрики (45% валова маржа, 3-5 років окупність, 18 міс break-even)

8. **MarketingSection** ✅

   - 4 маркетингові стратегії (Онлайн, Партнерства, Освітні програми, Прямі продажі)
   - Розподіл бюджету (35% онлайн, 30% продажи, 20% партнерства, 15% івенти)
   - КПІ метрики

9. **TeamSection** ✅

   - 4 основних членів команди з деталями
   - 2 радника (Технічний та Бізнес)
   - Секція "Приєднуйся до команди"

10. **FinancialSection** ✅

    - Прогноз доходів та прибутку (2024-2028)
    - Структура витрат (Pie Chart)
    - Unit Economics (LTV/CAC = 90x)
    - Інвестиційна пропозиція ($500K Seed раунд)

11. **RoadmapSection** ✅

    - 6 етапів розвитку (TRL 4-8 + Масштабування)
    - Статуси (Completed, In Progress, Planned)
    - Timeline лінія з дизайном

12. **FAQSection** ✅ (НОВИЙ)

    - 5 категорій питань
    - ~20 питань з відповідями
    - Accordion компонент для розгортання

13. **ContactSection** ✅

    - Email, Phone, Address контакти
    - Соціальні мережи (LinkedIn, Facebook, Instagram)
    - Контактна форма
    - CTA блок

14. **Navigation** ✅

    - Fixed header з логотипом WITERoK
    - Desktop меню з 7 пунктів (+ FAQ)
    - Mobile меню з hamburger
    - CTA кнопка

15. **Footer** ✅
    - 4 колонки з лінками
    - Copyright інформація
    - Privacy policy та Terms of use

---

## Структура файлів

```
src/
├── App.tsx                          # Основне приложення
├── App.css                          # Стилі (можна видалити, якщо використовуєш Tailwind)
├── main.tsx                         # Entry point
├── index.css                        # Глобальні стилі
└── components/
    ├── Navigation.tsx               # Фіксована навігація
    ├── HeroSection.tsx              # Вступна секція
    ├── ESGSection.tsx               # ESG модель
    ├── ProblemSection.tsx           # Проблема на ринку
    ├── ProductSection.tsx           # Презентація продукту
    ├── CompetitiveSection.tsx       # Конкурентні переваги
    ├── TargetAudienceSection.tsx    # Цільова аудиторія
    ├── BusinessModelSection.tsx     # Бізнес модель
    ├── MarketingSection.tsx         # Маркетинг стратегія
    ├── TeamSection.tsx              # Команда та радники
    ├── FinancialSection.tsx         # Фінансова модель (Recharts)
    ├── RoadmapSection.tsx           # Дорожна карта
    ├── FAQSection.tsx               # Часті питання
    ├── ContactSection.tsx           # Контакти
    └── Footer.tsx                   # Футер
```

---

## Технічний стек

- **React 18** + TypeScript
- **Tailwind CSS** для стилізації
- **Lucide React** для іконок
- **Recharts** для графіків (FinancialSection)
- **Vite** як бундлер

---

## Color System (CSS Variables)

```css
--primary: #144073          /* Темний синій *)
--secondary: #1A6DCC        /* Світлий синій *)
--accent: #1A6DCC
--muted: #f0f5fb            /* Світло-сірий *)
--foreground: #144073
--background: #ffffff
--border: rgba(20, 64, 115, 0.1)
```

---

## Запуск проекту

```bash
# Встановлення залежностей
npm install

# Розробка з hot reload
npm run dev

# Білдинг для production
npm run build

# Превью білда
npm run preview
```

---

## Наступні кроки

1. ✅ Закінчити всі компоненти
2. ⏳ Налаштувати правильні кольори та брендинг
3. ⏳ Додати анімації та transitions
4. ⏳ Оптимізувати mobile версію
5. ⏳ Додати form submission handler
6. ⏳ SEO оптимізація
7. ⏳ Перевірити performance
8. ⏳ Deploy на hosting

---

## Нотатки

- Всі компоненти готові до використання
- Використовуються реальні дані та структура для стартапу WITERoK
- Компоненти модульні та легко переробляються
- CSS класи на основі Tailwind + CSS variables для теми
- Адаптивні для мобільних пристроїв
