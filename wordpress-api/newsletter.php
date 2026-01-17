<?php
/**
 * API для управління newsletter підписками
 * URL: https://witerok.com/api/newsletter.php
 * 
 * POST - Subscribe (форма на сайті)
 * GET - Unsubscribe (посилання з email)
 */

// Підключаємо WordPress
require_once dirname(__DIR__) . '/wp-load.php';

// Заголовки для API
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Обработка preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

global $wpdb;
$table_name = $wpdb->prefix . 'newsletter_subscribers';

// ========================================
// UNSUBSCRIBE - GET request with token
// ========================================
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'unsubscribe') {
    $token = isset($_GET['token']) ? sanitize_text_field($_GET['token']) : '';
    
    if (empty($token)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid token'], JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    // Перевіряємо токен і видаляємо підписника
    $subscriber = $wpdb->get_row($wpdb->prepare(
        "SELECT id, email FROM $table_name WHERE unsubscribe_token = %s",
        $token
    ));
    
    if (!$subscriber) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Token not found'], JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    // Видаляємо підписника
    $wpdb->delete($table_name, ['id' => $subscriber->id]);
    
    echo json_encode([
        'success' => true,
        'message' => 'Ви успішно відписалися від розсилки WiterOK. Вибачте, що ви від нас пішли!'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// ========================================
// SUBSCRIBE - POST request
// ========================================
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

// Проверяем дубликаты
$existing = $wpdb->get_var($wpdb->prepare(
    "SELECT COUNT(*) FROM $table_name WHERE email = %s",
    $email
));

if ($existing > 0) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Ця email адреса вже підписана'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Генеруємо токен для відписки
$unsubscribe_token = bin2hex(random_bytes(32));

// Сохраняем подписчика
$result = $wpdb->insert(
    $table_name,
    [
        'email' => $email,
        'name' => $name,
        'status' => 'active',
        'unsubscribe_token' => $unsubscribe_token,
    ],
    ['%s', '%s', '%s', '%s']
);

if ($result === false) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Database error: ' . $wpdb->last_error
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Отправляем email подтверждения с БОЛЬШИМ ТЕКСТОМ
$site_url = get_site_url();
$to = $email;
$subject = '🎉 Дякуємо за підписку на WiterOK Newsletter!';

$unsubscribe_url = add_query_arg([
    'token' => $unsubscribe_token
], $site_url . '/?action=unsubscribe');

// Красивий HTML email з ВЕЛИКИМ ТЕКСТОМ
$message = '<html><body style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, sans-serif; line-height: 1.8; color: #333; background: #f5f5f5; margin: 0; padding: 0;">';
$message .= '<div style="max-width: 650px; margin: 0 auto; padding: 0;">';

// Header
$message .= '<div style="background: linear-gradient(135deg, #2271b1 0%, #1f5fa0 100%); padding: 40px 20px; text-align: center;">';
$message .= '<h2 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">🎉 Ласкаво просимо!</h2>';
$message .= '</div>';

// Content з ВЕЛИКИМ ТЕКСТОМ
$message .= '<div style="background: white; padding: 40px;">';
$message .= '<p style="font-size: 18px; margin: 0 0 20px 0; color: #555; font-weight: 500;">Вітаємо, <strong>' . esc_html($name) . '</strong>!</p>';

$message .= '<p style="font-size: 16px; line-height: 1.8; color: #333; margin-bottom: 20px;">';
$message .= 'Спасибі за підписку на новини від <strong>WiterOK</strong>! 🌬️';
$message .= '</p>';

$message .= '<div style="background: #f9f9f9; padding: 20px; border-left: 4px solid #2271b1; border-radius: 4px; margin: 25px 0;">';
$message .= '<p style="font-size: 16px; margin: 0; color: #333; font-weight: 500;">';
$message .= 'Тепер ви будете отримувати:';
$message .= '</p>';
$message .= '<ul style="font-size: 16px; margin: 15px 0 0 20px; padding: 0;">';
$message .= '<li style="margin-bottom: 10px;">📰 Найновіші новини про відновлювану енергію</li>';
$message .= '<li style="margin-bottom: 10px;">💡 Цікаві статті та дослідження</li>';
$message .= '<li style="margin-bottom: 10px;">🚀 Оновлення про нові проекти WiterOK</li>';
$message .= '</ul>';
$message .= '</div>';

$message .= '<p style="font-size: 16px; color: #333; margin-top: 30px;">Спасибі за вашу підтримку! 💚</p>';

$message .= '</div>';

// Footer з КНОПКОЮ ВІДПИСКИ
$message .= '<div style="background: #f9f9f9; padding: 30px; border-top: 1px solid #ddd; text-align: center;">';
$message .= '<p style="font-size: 14px; color: #666; margin: 0 0 15px 0;">Цей email надіслано, оскільки ви підписалися на розсилку WiterOK.</p>';
$message .= '<p style="margin: 0;"><a href="' . esc_url($unsubscribe_url) . '" style="display: inline-block; background: #e74c3c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 14px; font-weight: 600;">Відписатися від розсилки</a></p>';
$message .= '</div>';

$message .= '</div></body></html>';

$headers = ['Content-Type: text/html; charset=UTF-8'];
wp_mail($to, $subject, $message, $headers);

echo json_encode([
    'success' => true,
    'message' => 'Дякуємо за підписку! Перевірте вашу email-скриньку на повідомлення про підтвердження.'
], JSON_UNESCAPED_UNICODE);

exit;
?>