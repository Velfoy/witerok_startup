<?php
/**
 * API для подписки на newsletter
 * Разместить на сервере: public_html/api/newsletter.php
 * URL: https://witerok.com/api/newsletter.php
 * 
 * ТРЕБУЕТ ПЛАГИН: Newsletter (бесплатный)
 * https://wordpress.org/plugins/newsletter/
 * 
 * Или можно сохранять в базу вручную (см. вариант 2 ниже)
 */

// Подключаем WordPress
require_once dirname(__DIR__) . '/wp-load.php';

// Заголовки для API
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Обработка preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Только POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed'], JSON_UNESCAPED_UNICODE);
    exit;
}

// Получаем данные
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$email = isset($data['email']) ? sanitize_email($data['email']) : '';
$name = isset($data['name']) ? sanitize_text_field($data['name']) : '';

// Валидация
if (empty($email) || !is_email($email)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email'], JSON_UNESCAPED_UNICODE);
    exit;
}

// ========================================
// ВАРИАНТ 1: Использование плагина Newsletter
// ========================================
if (function_exists('newsletter_subscribe')) {
    $result = newsletter_subscribe([
        'email' => $email,
        'name' => $name,
    ]);
    
    if ($result) {
        echo json_encode([
            'success' => true,
            'message' => 'Successfully subscribed to newsletter'
        ], JSON_UNESCAPED_UNICODE);
    } else {
        http_response_code(400);
        echo json_encode([
            'error' => 'Subscription failed'
        ], JSON_UNESCAPED_UNICODE);
    }
    exit;
}

// ========================================
// ВАРИАНТ 2: Сохранение в собственную таблицу
// ========================================
global $wpdb;
$table_name = $wpdb->prefix . 'newsletter_subscribers';

// Создаём таблицу если её нет
$charset_collate = $wpdb->get_charset_collate();
$sql = "CREATE TABLE IF NOT EXISTS $table_name (
    id mediumint(9) NOT NULL AUTO_INCREMENT,
    email varchar(100) NOT NULL,
    name varchar(100) DEFAULT '' NOT NULL,
    subscribed_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status varchar(20) DEFAULT 'active' NOT NULL,
    PRIMARY KEY  (id),
    UNIQUE KEY email (email)
) $charset_collate;";

require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
dbDelta($sql);

// Проверяем дубликаты
$existing = $wpdb->get_var($wpdb->prepare(
    "SELECT COUNT(*) FROM $table_name WHERE email = %s",
    $email
));

if ($existing > 0) {
    http_response_code(400);
    echo json_encode([
        'error' => 'Email already subscribed'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Сохраняем подписчика
$result = $wpdb->insert(
    $table_name,
    [
        'email' => $email,
        'name' => $name,
        'status' => 'active',
    ],
    ['%s', '%s', '%s']
);

if ($result) {
    // Отправляем email подтверждения (опционально)
    $to = $email;
    $subject = 'Welcome to WiterOK Newsletter';
    $message = "Hello $name,\n\nThank you for subscribing to our newsletter!\n\nBest regards,\nWiterOK Team";
    $headers = ['Content-Type: text/html; charset=UTF-8'];
    
    wp_mail($to, $subject, $message, $headers);
    
    echo json_encode([
        'success' => true,
        'message' => 'Successfully subscribed to newsletter'
    ], JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Database error'
    ], JSON_UNESCAPED_UNICODE);
}

exit;
