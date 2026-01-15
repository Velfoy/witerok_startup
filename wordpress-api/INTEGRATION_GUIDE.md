# Инструкция по интеграции WordPress API с React

## 📋 Что нужно сделать

### Шаг 1: Загрузить PHP файлы на сервер

1. **Подключитесь к серверу** через FTP (FileZilla) или SSH
2. **Создайте папку** `api` в `public_html/`:
   ```
   public_html/api/
   ```
3. **Загрузите все PHP файлы** из папки `wordpress-api` в `public_html/api/`:
   - posts.php
   - post-single.php
   - newsletter.php
   - contact.php
   - donate.php

### Шаг 2: Проверьте что API работает

Откройте в браузере:

```
https://witerok.com/api/posts.php
```

**Ожидаемый результат:** JSON с постами

**Если видите 404:** проверьте путь к файлам

**Если видите 500:** проверьте путь к `wp-load.php` в файле

---

## 🔧 Настройка React приложения

### 1. API Service уже создан

Файл `src/services/api.ts` содержит все функции для работы с API.

### 2. Используйте API в компонентах

#### Пример 1: Загрузка новостей

```typescript
import { useEffect, useState } from "react";
import { getPosts, Post } from "../services/api";

export function NewsSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPosts(10);
        setPosts(data);
      } catch (err) {
        setError("Failed to load news");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <img src={post.image} alt={post.title} />
          <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          <time>{new Date(post.date).toLocaleDateString()}</time>
        </article>
      ))}
    </div>
  );
}
```

#### Пример 2: Форма подписки на Newsletter

```typescript
import { useState } from "react";
import { subscribeNewsletter } from "../services/api";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const result = await subscribeNewsletter({ email, name });
      setStatus("success");
      setMessage(result.message);
      setEmail("");
      setName("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Subscription failed");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </button>

      {status === "success" && <p className="success">{message}</p>}
      {status === "error" && <p className="error">{message}</p>}
    </form>
  );
}
```

#### Пример 3: Контактная форма

```typescript
import { useState } from "react";
import { sendContactMessage } from "../services/api";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      await sendContactMessage(formData);
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Subject"
        value={formData.subject}
        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        required
      />
      <textarea
        placeholder="Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
      />
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && <p>Message sent successfully!</p>}
      {status === "error" && <p>Failed to send message</p>}
    </form>
  );
}
```

#### Пример 4: Форма доната

```typescript
import { useState } from "react";
import { createDonation } from "../services/api";

export function DonateForm() {
  const [formData, setFormData] = useState({
    amount: 50,
    name: "",
    email: "",
    message: "",
    payment_method: "stripe" as "stripe" | "paypal",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const presetAmounts = [10, 25, 50, 100, 250];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const result = await createDonation(formData);
      setStatus("success");

      // Если есть redirect URL (для PayPal)
      if ("redirect_url" in result) {
        window.location.href = (result as any).redirect_url;
      }
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="preset-amounts">
        {presetAmounts.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => setFormData({ ...formData, amount })}
            className={formData.amount === amount ? "active" : ""}
          >
            ${amount}
          </button>
        ))}
      </div>

      <input
        type="number"
        placeholder="Custom amount"
        value={formData.amount}
        onChange={(e) =>
          setFormData({ ...formData, amount: Number(e.target.value) })
        }
        min="1"
        required
      />

      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <textarea
        placeholder="Message (optional)"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />

      <select
        value={formData.payment_method}
        onChange={(e) =>
          setFormData({
            ...formData,
            payment_method: e.target.value as "stripe" | "paypal",
          })
        }
      >
        <option value="stripe">Credit Card (Stripe)</option>
        <option value="paypal">PayPal</option>
      </select>

      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Processing..." : `Donate $${formData.amount}`}
      </button>

      {status === "success" && <p>Thank you for your donation!</p>}
      {status === "error" && <p>Payment failed. Please try again.</p>}
    </form>
  );
}
```

---

## 🔌 Какие плагины установить в WordPress

### Обязательные:

✅ **Уже не нужны!** Код работает без плагинов.

### Рекомендуемые (опционально):

1. **WP Mail SMTP** - для надёжной отправки email

   - https://wordpress.org/plugins/wp-mail-smtp/
   - Настройте Gmail/SendGrid SMTP

2. **Newsletter** - если хотите продвинутую систему рассылок

   - https://wordpress.org/plugins/newsletter/
   - Но код уже работает без него

3. **Wordfence Security** - для защиты API
   - https://wordpress.org/plugins/wordfence/

### Для платежей (выберите один вариант):

**ВАРИАНТ А:** Простой донат (текущий код)

- ✅ Не требует плагинов
- Сохраняет в базу
- Email уведомления
- Для Stripe нужен API ключ

**ВАРИАНТ Б:** Полноценный магазин

- **WooCommerce** - https://wordpress.org/plugins/woocommerce/
- **WooCommerce Stripe** - https://wordpress.org/plugins/woocommerce-gateway-stripe/

---

## 🔐 Настройка Stripe (для донатов)

### Шаг 1: Получите API ключи

1. Зарегистрируйтесь на https://stripe.com
2. Перейдите в Dashboard → Developers → API keys
3. Скопируйте:
   - `Publishable key` (начинается с `pk_`)
   - `Secret key` (начинается с `sk_`)

### Шаг 2: Добавьте ключи в WordPress

Откройте `public_html/wp-config.php` и добавьте **перед строкой** `/* That's all, stop editing! */`:

```php
// Stripe API Keys
define('STRIPE_SECRET_KEY', 'sk_test_YOUR_SECRET_KEY_HERE');
define('STRIPE_PUBLIC_KEY', 'pk_test_YOUR_PUBLIC_KEY_HERE');
```

### Шаг 3: Установите Stripe PHP библиотеку

Подключитесь к серверу через SSH и выполните:

```bash
cd public_html
composer require stripe/stripe-php
```

**Если нет Composer:**

```bash
curl -sS https://getcomposer.org/installer | php
php composer.phar require stripe/stripe-php
```

### Шаг 4: Обновите donate.php

Раскомментируйте блок со Stripe в файле `api/donate.php` (строки 67-86).

---

## 📧 Настройка Email

### Вариант 1: Использовать Gmail SMTP

1. Установите плагин **WP Mail SMTP**
2. Настройте:
   - SMTP Host: `smtp.gmail.com`
   - SMTP Port: `587`
   - Encryption: `TLS`
   - Username: ваш Gmail
   - Password: App Password (не обычный пароль!)

**Как создать App Password:**

1. Google Account → Security
2. 2-Step Verification → App passwords
3. Generate → Copy password

### Вариант 2: Использовать SendGrid (рекомендуется для продакшена)

1. Зарегистрируйтесь на https://sendgrid.com (бесплатно 100 email/день)
2. Получите API ключ
3. В WP Mail SMTP выберите SendGrid
4. Вставьте API ключ

---

## 🧪 Тестирование на localhost (перед загрузкой на сервер)

Пока API не на сервере, используйте моковые данные:

```typescript
// src/services/api.ts (временно для разработки)

const USE_MOCK = true; // Поставьте false когда API будет на сервере

export async function getPosts(): Promise<Post[]> {
  if (USE_MOCK) {
    return [
      {
        id: 1,
        title: "Test Post",
        slug: "test-post",
        excerpt: "This is a test post",
        content: "<p>Full content here</p>",
        date: "2024-01-15",
        image: "/placeholder.jpg",
        categories: ["News"],
        link: "#",
      },
    ];
  }

  return fetchAPI<Post[]>("/posts.php");
}
```

---

## ✅ Checklist перед запуском

- [ ] PHP файлы загружены на сервер в `public_html/api/`
- [ ] `https://witerok.com/api/posts.php` открывается и показывает JSON
- [ ] Email настроен (WP Mail SMTP)
- [ ] Stripe ключи добавлены в `wp-config.php` (если нужны платежи)
- [ ] API service (`src/services/api.ts`) создан в React
- [ ] Формы обновлены для использования API

---

## 🚀 Развёртывание

### 1. Соберите React приложение

```bash
npm run build
```

### 2. Загрузите на сервер

Из папки `dist/` загрузите всё в `public_html/`:

```
public_html/
├── index.html
├── assets/
│   ├── index-xxx.js
│   ├── index-xxx.css
│   └── ...
└── api/
    ├── posts.php
    ├── contact.php
    └── ...
```

### 3. Проверьте

- `https://witerok.com` - React приложение
- `https://witerok.com/api/posts.php` - API

---

## 🎯 Что у вас получилось

✅ **Backend:** WordPress + Custom API (без /wp-json)
✅ **Frontend:** React + TypeScript + Vite
✅ **Newsletter:** Подписка на рассылку
✅ **Contact Form:** Контактная форма
✅ **Donate:** Система донатов
✅ **Email:** Уведомления администратору и клиенту
✅ **Database:** Автоматическое создание таблиц
✅ **Security:** CORS, валидация, sanitization

**Это полноценный production-ready стек! 🎉**

---

## 📞 Troubleshooting

### Ошибка: CORS

**Проблема:** `Access-Control-Allow-Origin` блокирует запросы

**Решение:** Проверьте что в PHP файлах есть:

```php
header('Access-Control-Allow-Origin: *');
```

### Ошибка: 404 на API

**Проблема:** `https://witerok.com/api/posts.php` не найден

**Решение:** Проверьте путь к файлам на сервере. Должно быть:

```
/home/username/public_html/api/posts.php
```

### Ошибка: Cannot find module 'wp-load.php'

**Проблема:** Путь к WordPress неверный

**Решение:** Измените в PHP файлах:

```php
// Попробуйте разные варианты:
require_once dirname(__DIR__) . '/wp-load.php';
// или
require_once $_SERVER['DOCUMENT_ROOT'] . '/wp-load.php';
// или
require_once '/home/username/public_html/wp-load.php';
```

### Email не приходят

**Решение:**

1. Проверьте spam
2. Установите WP Mail SMTP
3. Проверьте логи: `public_html/wp-content/debug.log`

---

**Готово! Теперь всё работает! 🚀**
