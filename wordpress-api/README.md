# WordPress Backend для WiterOK (NEW VERSION) ✨

## 🎉 Нова система управління новинами

**Тепер новини додаються через стандартний WordPress інтерфейс!**

### 📦 Що у вас є:

1. **WordPress плагін** - додає розділ "Новини WiterOK" в адмін-панель
2. **API endpoint** - віддає новини для React додатку
3. **Стандартні WordPress форми** - звичний інтерфейс для додавання новин

---

## 🚀 Швидкий старт

### ШАГ 1: Завантажте файли

Структура на сервері:

```
public_html/
├── wp-content/
│   └── plugins/
│       └── witerok-news/
│           └── witerok-news.php  ← Перейменуйте з witerok-news-plugin.php
│
└── api/
    ├── posts.php           ← Новини для React (ОНОВЛЕНО)
    ├── newsletter.php      ← Підписка на розсилку
    ├── contact.php         ← Контактна форма
    └── donate.php          ← Донати
```

### ШАГ 2: Активуйте плагін

1. WordPress Admin → **Плагіни** → **Встановлені плагіни**
2. Знайдіть **"WiterOK News Manager"**
3. Натисніть **"Активувати"**

### ШАГ 3: Додайте новину

1. WordPress Admin → **📰 Новини WiterOK** → **Додати нову**
2. Заповніть форму (стандартна WordPress форма з Gutenberg редактором)
3. Додайте зображення (праворуч: "Встановити зображення новини")
4. Натисніть **"Опублікувати"**

### ШАГ 4: Перевірте

- **API:** https://witerok.com/api/posts.php
- **React:** `npm run dev` → http://localhost:5173

---

## 📚 Детальна документація

- **[QUICK-START.md](QUICK-START.md)** - швидкий старт з візуальними схемами
- **[README-WORDPRESS-SETUP.md](README-WORDPRESS-SETUP.md)** - повна інструкція з прикладами

---

## 🎯 Переваги нової системи

### ✅ Стандартний WordPress

- Звична форма для додавання/редагування
- Візуальний редактор Gutenberg
- Вбудований медіа-завантажувач
- Попередній перегляд
- Автозбереження

### ✅ Зручне управління

- Список новин з мініатюрами
- Швидке редагування
- Чернетки (Drafts)
- Запланована публікація
- Історія версій

### ✅ API для React

- JSON формат
- CORS налаштований
- Параметр `limit` для кількості новин
- Автоматичне оновлення при публікації

---

### ШАГ 2: Загрузите PHP файлы

Скопируйте все `.php` файлы из папки `wordpress-api` в `public_html/api/` на сервере.

### ШАГ 3: Проверьте доступ

Откройте в браузере:

✅ **https://witerok.com/api/posts.php** - должен показать JSON с постами

Если видите JSON - всё работает! 🎉

---

## 📡 API Endpoints

### 1. **Получить посты** (новости)

```
GET https://witerok.com/api/posts.php
GET https://witerok.com/api/posts.php?limit=5
GET https://witerok.com/api/posts.php?category=news
```

**Ответ:**

```json
[
  {
    "id": 1,
    "title": "Hello world!",
    "slug": "hello-world",
    "excerpt": "Welcome to WordPress...",
    "content": "<p>Welcome to WordPress...</p>",
    "date": "2024-01-15 10:00:00",
    "image": "https://witerok.com/wp-content/uploads/image.jpg",
    "categories": ["News"],
    "link": "https://witerok.com/hello-world/"
  }
]
```

### 2. **Получить один пост**

```
GET https://witerok.com/api/post-single.php?slug=hello-world
```

### 3. **Подписка на Newsletter**

```
POST https://witerok.com/api/newsletter.php
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe"
}
```

**Ответ:**

```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter"
}
```

### 4. **Контактная форма**

```
POST https://witerok.com/api/contact.php
Content-Type: application/json

{
  "name": "John Doe",
  "email": "user@example.com",
  "subject": "Question",
  "message": "Hello, I have a question..."
}
```

**Ответ:**

```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

### 5. **Донаты**

```
POST https://witerok.com/api/donate.php
Content-Type: application/json

{
  "amount": 50,
  "name": "John Doe",
  "email": "user@example.com",
  "message": "Keep up the great work!",
  "payment_method": "stripe"
}
```

---

## 🔌 Необходимые плагины WordPress

### Для Newsletter (выберите один вариант):

**ВАРИАНТ 1 (рекомендую):** Без плагинов

- Код уже включает создание своей таблицы в базе
- Просто работает "из коробки"

**ВАРИАНТ 2:** С плагином

- **Newsletter** (бесплатный) - https://wordpress.org/plugins/newsletter/
- Установите через: WordPress Admin → Плагины → Добавить новый → Поиск "Newsletter"

### Для Donate (выберите вариант):

**ВАРИАНТ 1:** Базовое решение (текущий код)

- Сохраняет донаты в базу
- Отправляет email уведомления
- Для реальных платежей нужна интеграция

**ВАРИАНТ 2:** WooCommerce

- **WooCommerce** - https://wordpress.org/plugins/woocommerce/
- **WooCommerce Stripe** - https://wordpress.org/plugins/woocommerce-gateway-stripe/
- Для полноценного магазина и платежей

**ВАРИАНТ 3:** Stripe напрямую

- Добавьте в `wp-config.php`:

```php
define('STRIPE_SECRET_KEY', 'sk_test_YOUR_KEY_HERE');
define('STRIPE_PUBLIC_KEY', 'pk_test_YOUR_KEY_HERE');
```

- Установите Stripe PHP библиотеку (требует SSH):

```bash
cd public_html
composer require stripe/stripe-php
```

### Для Contact Form:

**НЕ ТРЕБУЕТ ПЛАГИНОВ** - работает сразу!

Опционально можете установить:

- **Contact Form 7** - https://wordpress.org/plugins/contact-form-7/
- Но код уже работает без него

---

## 📧 Настройка Email

### Проверьте настройки SMTP

WordPress по умолчанию использует PHP `mail()`, но лучше настроить SMTP:

**Установите плагин:**

- **WP Mail SMTP** - https://wordpress.org/plugins/wp-mail-smtp/

**Или добавьте в `wp-config.php`:**

```php
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', '587');
define('SMTP_USER', 'your-email@gmail.com');
define('SMTP_PASS', 'your-password');
```

---

## 🗃️ База данных

Код автоматически создаёт таблицы:

- `wp_newsletter_subscribers` - подписчики
- `wp_contact_messages` - сообщения из контактной формы
- `wp_donations` - донаты

### Посмотреть данные

Подключитесь к PhpMyAdmin и найдите эти таблицы.

---

## 🔐 Безопасность (рекомендации)

### 1. Добавьте rate limiting

Создайте файл `api/.htaccess`:

```apache
# Защита от DDoS
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_METHOD} POST
    RewriteCond %{HTTP:X-Forwarded-For} !=""
    RewriteRule .* - [F,L]
</IfModule>
```

### 2. Добавьте API ключ (опционально)

В начало каждого PHP файла:

```php
// Проверка API ключа
$api_key = isset($_SERVER['HTTP_X_API_KEY']) ? $_SERVER['HTTP_X_API_KEY'] : '';
if ($api_key !== 'your-secret-key-here') {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}
```

В React:

```typescript
fetch("https://witerok.com/api/posts.php", {
  headers: {
    "X-API-Key": "your-secret-key-here",
  },
});
```

---

## 🧪 Тестирование

### 1. Проверьте Posts API

```bash
curl https://witerok.com/api/posts.php
```

### 2. Проверьте Newsletter

```bash
curl -X POST https://witerok.com/api/newsletter.php \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'
```

### 3. Проверьте Contact Form

```bash
curl -X POST https://witerok.com/api/contact.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Hello"}'
```

---

## ✅ Чеклист готовности

- [ ] Создана папка `public_html/api/`
- [ ] Загружены все PHP файлы
- [ ] `https://witerok.com/api/posts.php` открывается и показывает JSON
- [ ] Email настроен (приходят уведомления)
- [ ] Таблицы в базе данных созданы (проверьте в PhpMyAdmin)

---

## 🔧 Что делать дальше

### Вариант 1: Интеграция с вашим React приложением

Создайте service для API в вашем React проекте.

### Вариант 2: Расширение функционала

- Добавить пагинацию для постов
- Добавить поиск по постам
- Добавить фильтры по категориям
- Добавить комментарии

---

## ❓ Troubleshooting

### Проблема: 404 Not Found

**Решение:** Проверьте путь к файлам. Должно быть:

```
public_html/api/posts.php
```

А НЕ:

```
public_html/wp-content/api/posts.php
```

### Проблема: 500 Internal Server Error

**Решение:** Проверьте путь к `wp-load.php`:

```php
require_once dirname(__DIR__) . '/wp-load.php';
```

Если не работает, попробуйте:

```php
require_once $_SERVER['DOCUMENT_ROOT'] . '/wp-load.php';
```

### Проблема: Email не отправляются

**Решение:**

1. Установите плагин WP Mail SMTP
2. Проверьте в PhpMyAdmin - данные сохраняются?
3. Проверьте папку спам

### Проблема: База данных не создаётся

**Решение:** Запустите файл один раз напрямую в браузере:

```
https://witerok.com/api/newsletter.php
```

Таблица создастся автоматически.

---

## 📞 Поддержка

Если что-то не работает:

1. Проверьте логи ошибок: `public_html/error_log`
2. Включите debug в WordPress: `define('WP_DEBUG', true);` в `wp-config.php`
3. Проверьте права доступа к файлам: должно быть 644

---

**Готово! Теперь у вас полноценный WordPress API для вашего React приложения! 🚀**
