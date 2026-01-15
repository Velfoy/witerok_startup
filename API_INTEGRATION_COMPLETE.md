# 🚀 WiterOK - Полная интеграция WordPress API + React

## ✅ ЧТО ГОТОВО

### Backend (WordPress):

✅ **API для постов** - `public_html/api/posts.php`
✅ **Newsletter подписка** - `public_html/api/newsletter.php`
✅ **Контактная форма** - `public_html/api/contact.php`
✅ **Система донатов** - `public_html/api/donate.php`

### Frontend (React):

✅ **NewsSection** - загружает посты с WordPress API
✅ **NewsletterSection** - интегрирована с API
✅ **ContactSection** - обновлена на API
✅ **DonateSection** - новый компонент для донатов

### API Service:

✅ **src/services/api.ts** - TypeScript сервис для всех запросов

---

## 📋 ШАГИ ДЛЯ ЗАПУСКА

### ШАГ 1️⃣: Загрузить PHP файлы на сервер

1. **Подключитесь к серверу** через FTP (FileZilla) или SSH
2. **Создайте папку** `api` в `public_html/`:
   ```
   public_html/api/
   ```
3. **Загрузите все PHP файлы** из папки `wordpress-api/`:
   - posts.php
   - post-single.php
   - newsletter.php
   - contact.php
   - donate.php

### ШАГ 2️⃣: Проверить API работает

Откройте в браузере:

```
https://witerok.com/api/posts.php
```

**Ожидаемый результат:** JSON с вашими постами ✅

Если видите JSON - всё работает!

### ШАГ 3️⃣: Запустить React приложение

```bash
npm run dev
```

Откройте http://localhost:5173

### ШАГ 4️⃣: Собрать и развернуть

```bash
npm run build
```

Загрузите папку `dist/` в `public_html/`:

```
public_html/
├── index.html
├── assets/
└── api/
```

---

## 🔌 API Endpoints

### 📰 Получить посты (новости)

```typescript
import { getPosts } from "@/services/api";

// Загрузить 10 последних постов
const posts = await getPosts(10);

// С фильтром по категориям
const categoryPosts = await getPosts(10, "news");
```

**Ответ:**

```json
[
  {
    "id": 1,
    "title": "Hello world!",
    "slug": "hello-world",
    "excerpt": "Welcome to WordPress...",
    "content": "<p>Full HTML content</p>",
    "date": "2024-01-15 10:00:00",
    "image": "https://witerok.com/wp-content/uploads/image.jpg",
    "categories": ["News"],
    "link": "https://witerok.com/hello-world/"
  }
]
```

### 📧 Подписать на newsletter

```typescript
import { subscribeNewsletter } from "@/services/api";

await subscribeNewsletter({
  email: "user@example.com",
  name: "John Doe",
});
```

### 💬 Отправить контактное сообщение

```typescript
import { sendContactMessage } from "@/services/api";

await sendContactMessage({
  name: "John Doe",
  email: "user@example.com",
  subject: "Question about WiterOK",
  message: "Hello, I have a question...",
});
```

### ❤️ Создать донат

```typescript
import { createDonation } from "@/services/api";

await createDonation({
  amount: 50,
  name: "John Doe",
  email: "user@example.com",
  message: "Keep up the great work!",
  payment_method: "stripe", // или 'paypal'
});
```

---

## 🧪 Примеры использования в компонентах

### Пример 1: Загрузка новостей

```typescript
import { useEffect, useState } from "react";
import { getPosts, Post } from "@/services/api";

export function NewsSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts(6)
      .then(setPosts)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <img src={post.image} alt={post.title} />
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

### Пример 2: Newsletter форма

```typescript
import { subscribeNewsletter } from "@/services/api";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await subscribeNewsletter({ email });
      alert("Спасибо за подписку!");
      setEmail("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
      />
      <button disabled={loading}>
        {loading ? "Подписка..." : "Подписаться"}
      </button>
    </form>
  );
}
```

---

## 📊 Структура файлов

```
src/
├── components/
│   ├── NewsSection.tsx         ← Загружает посты с API
│   ├── NewsletterSection.tsx   ← Интегрирована с API
│   ├── ContactSection.tsx      ← Отправляет сообщения в API
│   ├── DonateSection.tsx       ← Новый компонент для донатов
│   └── index.ts
├── services/
│   └── api.ts                  ← TypeScript API сервис
└── App.tsx

wordpress-api/
├── posts.php              ← API для постов
├── post-single.php        ← API для одного поста
├── newsletter.php         ← API для подписки
├── contact.php            ← API для контактной формы
├── donate.php             ← API для донатов
├── README.md              ← Детальная инструкция
└── INTEGRATION_GUIDE.md   ← Интеграция с React
```

---

## 🔐 Безопасность

### Email настройка

Код использует встроенную функцию WordPress `wp_mail()`. Для надёжной доставки:

1. Установите плагин **WP Mail SMTP**
2. Настройте Gmail SMTP или SendGrid
3. Все email отправляются через WordPress

### CORS

API позволяет запросы со всех источников:

```php
header('Access-Control-Allow-Origin: *');
```

Если нужна защита - добавьте API ключ:

```php
// В начале каждого PHP файла
$api_key = $_SERVER['HTTP_X_API_KEY'] ?? '';
if ($api_key !== 'your-secret-key') {
    http_response_code(401);
    exit(json_encode(['error' => 'Unauthorized']));
}
```

---

## 🐛 Troubleshooting

### ❌ Ошибка: 404 на API

**Проверьте:**

1. Файлы загружены в `public_html/api/`
2. URL правильный: `https://witerok.com/api/posts.php`
3. В логах ошибок: `/wp-content/debug.log`

### ❌ Ошибка: CORS

**Решение:** Убедитесь что в PHP файлах есть:

```php
header('Access-Control-Allow-Origin: *');
```

### ❌ Email не отправляются

**Решение:**

1. Установите WP Mail SMTP
2. Настройте SMTP (Gmail, SendGrid)
3. Проверьте папку спама

### ❌ Таблицы в БД не создаются

**Решение:** Запустите файл один раз напрямую в браузере:

```
https://witerok.com/api/newsletter.php
```

Таблица создастся автоматически.

---

## 📱 Мобильная адаптация

Все компоненты уже адаптированы для мобильных:

- ✅ Responsive forms
- ✅ Touch-friendly buttons
- ✅ Mobile-optimized images
- ✅ Fast loading on slow networks

---

## 🚀 Деплойм на продакшен

### 1️⃣ Финальная сборка

```bash
npm run build
```

### 2️⃣ Загрузить dist/ на сервер

```
public_html/
├── index.html
├── assets/
│   ├── index-xxx.js
│   ├── index-xxx.css
│   └── *.png *.jpg
└── api/
    ├── posts.php
    ├── contact.php
    └── ...
```

### 3️⃣ Проверить

- ✅ `https://witerok.com` - React приложение работает
- ✅ `https://witerok.com/api/posts.php` - API возвращает JSON
- ✅ Формы отправляют данные
- ✅ Email приходят администратору

---

## 📞 Что можно расширить

- 🔍 Поиск по постам
- 📑 Пагинация
- 🏷️ Фильтры по категориям
- 💳 Интеграция Stripe для платежей
- 📧 Рассылка новостей
- 👤 Профиль пользователя
- ⭐ Отзывы и рейтинги

---

## ✅ Чеклист

- [ ] PHP файлы загружены в `public_html/api/`
- [ ] API открывается в браузере и показывает JSON
- [ ] `npm run build` работает без ошибок
- [ ] Формы отправляют данные на API
- [ ] Email приходит администратору
- [ ] Таблицы созданы в БД (PhpMyAdmin)
- [ ] Всё развёрнуто на сервере

---

## 🎉 Готово!

Вы имеете полнофункциональное WordPress + React приложение с:

- ✅ Реальными постами из WordPress
- ✅ Подпиской на newsletter
- ✅ Контактной формой
- ✅ Системой донатов
- ✅ Email уведомлениями
- ✅ Защитой данных

**Удачи с проектом! 🚀**
