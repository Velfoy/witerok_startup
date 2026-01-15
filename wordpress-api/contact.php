<?php
/**
 * API для контактной формы
 * Разместить на сервере: public_html/api/contact.php
 * URL: https://witerok.com/api/contact.php
 * 
 * ОПЦИОНАЛЬНО: Contact Form 7 (бесплатный)
 * https://wordpress.org/plugins/contact-form-7/
 * 
 * Этот код работает БЕЗ плагинов
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

$name = isset($data['name']) ? sanitize_text_field($data['name']) : '';
$email = isset($data['email']) ? sanitize_email($data['email']) : '';
$subject = isset($data['subject']) ? sanitize_text_field($data['subject']) : 'Contact Form Message';
$message = isset($data['message']) ? sanitize_textarea_field($data['message']) : '';

// Валидация
$errors = [];

if (empty($name)) {
    $errors[] = 'Name is required';
}

if (empty($email) || !is_email($email)) {
    $errors[] = 'Valid email is required';
}

if (empty($message)) {
    $errors[] = 'Message is required';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['error' => implode(', ', $errors)], JSON_UNESCAPED_UNICODE);
    exit;
}

// Сохраняем в базу данных
global $wpdb;
$table_name = $wpdb->prefix . 'contact_messages';

// Создаём таблицу если её нет
$charset_collate = $wpdb->get_charset_collate();
$sql = "CREATE TABLE IF NOT EXISTS $table_name (
    id mediumint(9) NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    subject varchar(200) NOT NULL,
    message text NOT NULL,
    submitted_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status varchar(20) DEFAULT 'new' NOT NULL,
    PRIMARY KEY  (id)
) $charset_collate;";

require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
dbDelta($sql);

// Сохраняем сообщение
$result = $wpdb->insert(
    $table_name,
    [
        'name' => $name,
        'email' => $email,
        'subject' => $subject,
        'message' => $message,
        'status' => 'new',
    ],
    ['%s', '%s', '%s', '%s', '%s']
);

if ($result) {
    // Отправляем email администратору
    $admin_email = get_option('admin_email');
    
    $email_subject = "[WiterOK Contact] $subject";
    $email_message = "
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Subject:</strong> $subject</p>
        <p><strong>Message:</strong></p>
        <p>" . nl2br($message) . "</p>
    ";
    
    $headers = [
        'Content-Type: text/html; charset=UTF-8',
        'From: WiterOK <noreply@witerok.com>',
        'Reply-To: ' . $name . ' <' . $email . '>'
    ];
    
    wp_mail($admin_email, $email_subject, $email_message, $headers);
    
    // Отправляем подтверждение клиенту
    $client_subject = 'Thank you for contacting WiterOK';
    $client_message = "
        <h2>Thank you for your message!</h2>
        <p>Hello $name,</p>
        <p>We have received your message and will get back to you soon.</p>
        <p><strong>Your message:</strong></p>
        <p>" . nl2br($message) . "</p>
        <br>
        <p>Best regards,<br>WiterOK Team</p>
    ";
    
    wp_mail($email, $client_subject, $client_message, ['Content-Type: text/html; charset=UTF-8']);
    
    echo json_encode([
        'success' => true,
        'message' => 'Message sent successfully'
    ], JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Database error'
    ], JSON_UNESCAPED_UNICODE);
}

exit;
