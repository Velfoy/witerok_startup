<?php
/**
 * API для обработки донатов
 * Разместить на сервере: public_html/api/donate.php
 * URL: https://witerok.com/api/donate.php
 * 
 * ТРЕБУЕТ ПЛАГИН: WooCommerce + WooCommerce Stripe Payment Gateway
 * ИЛИ
 * Easy Digital Downloads + Stripe Payment Gateway
 * 
 * Этот пример для прямой интеграции со Stripe
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

$amount = isset($data['amount']) ? floatval($data['amount']) : 0;
$name = isset($data['name']) ? sanitize_text_field($data['name']) : '';
$email = isset($data['email']) ? sanitize_email($data['email']) : '';
$message = isset($data['message']) ? sanitize_textarea_field($data['message']) : '';
$payment_method = isset($data['payment_method']) ? sanitize_text_field($data['payment_method']) : 'stripe';

// Валидация
if ($amount <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid amount'], JSON_UNESCAPED_UNICODE);
    exit;
}

if (empty($email) || !is_email($email)) {
    http_response_code(400);
    echo json_encode(['error' => 'Valid email is required'], JSON_UNESCAPED_UNICODE);
    exit;
}

// Сохраняем донат в базу
global $wpdb;
$table_name = $wpdb->prefix . 'donations';

// Создаём таблицу если её нет
$charset_collate = $wpdb->get_charset_collate();
$sql = "CREATE TABLE IF NOT EXISTS $table_name (
    id mediumint(9) NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    amount decimal(10,2) NOT NULL,
    currency varchar(10) DEFAULT 'USD' NOT NULL,
    message text,
    payment_method varchar(50) NOT NULL,
    payment_status varchar(50) DEFAULT 'pending' NOT NULL,
    transaction_id varchar(200),
    donated_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY  (id)
) $charset_collate;";

require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
dbDelta($sql);

// ========================================
// ВАРИАНТ 1: Stripe Integration
// ========================================
if ($payment_method === 'stripe') {
    // Получаем Stripe API ключ из настроек WordPress
    // Добавьте в wp-config.php: define('STRIPE_SECRET_KEY', 'sk_test_...');
    $stripe_secret_key = defined('STRIPE_SECRET_KEY') ? STRIPE_SECRET_KEY : '';
    
    if (empty($stripe_secret_key)) {
        http_response_code(500);
        echo json_encode([
            'error' => 'Stripe not configured. Add STRIPE_SECRET_KEY to wp-config.php'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    // Здесь должна быть интеграция со Stripe API
    // Для этого нужно установить Stripe PHP библиотеку
    // composer require stripe/stripe-php
    
    // Пример (требует библиотеку):
    /*
    require_once dirname(__DIR__) . '/vendor/autoload.php';
    \Stripe\Stripe::setApiKey($stripe_secret_key);
    
    try {
        $intent = \Stripe\PaymentIntent::create([
            'amount' => $amount * 100, // в центах
            'currency' => 'usd',
            'description' => 'Donation to WiterOK',
            'receipt_email' => $email,
        ]);
        
        $transaction_id = $intent->id;
        $payment_status = 'pending';
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode(['error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        exit;
    }
    */
    
    // ВРЕМЕННО: для демонстрации без библиотеки
    $transaction_id = 'demo_' . uniqid();
    $payment_status = 'pending';
}

// ========================================
// ВАРИАНТ 2: PayPal (через redirect)
// ========================================
else if ($payment_method === 'paypal') {
    $transaction_id = 'paypal_' . uniqid();
    $payment_status = 'pending';
    
    // PayPal URL будет возвращён клиенту
    $paypal_url = 'https://www.paypal.com/donate'; // здесь должна быть ваша ссылка
}

// Сохраняем донат
$result = $wpdb->insert(
    $table_name,
    [
        'name' => $name,
        'email' => $email,
        'amount' => $amount,
        'currency' => 'USD',
        'message' => $message,
        'payment_method' => $payment_method,
        'payment_status' => $payment_status,
        'transaction_id' => $transaction_id,
    ],
    ['%s', '%s', '%f', '%s', '%s', '%s', '%s', '%s']
);

if ($result) {
    // Отправляем email подтверждения
    $admin_email = get_option('admin_email');
    
    $email_subject = "[WiterOK] New Donation: $$amount";
    $email_message = "
        <h2>New Donation Received!</h2>
        <p><strong>Donor:</strong> $name ($email)</p>
        <p><strong>Amount:</strong> $$amount USD</p>
        <p><strong>Payment Method:</strong> $payment_method</p>
        <p><strong>Transaction ID:</strong> $transaction_id</p>
        <p><strong>Message:</strong></p>
        <p>" . nl2br($message) . "</p>
    ";
    
    wp_mail($admin_email, $email_subject, $email_message, ['Content-Type: text/html; charset=UTF-8']);
    
    // Email донору
    $donor_subject = 'Thank you for your donation!';
    $donor_message = "
        <h2>Thank you for supporting WiterOK!</h2>
        <p>Hello $name,</p>
        <p>We have received your donation of <strong>$$amount USD</strong>.</p>
        <p>Your support helps us continue our mission.</p>
        <p>Transaction ID: $transaction_id</p>
        <br>
        <p>Best regards,<br>WiterOK Team</p>
    ";
    
    wp_mail($email, $donor_subject, $donor_message, ['Content-Type: text/html; charset=UTF-8']);
    
    $response = [
        'success' => true,
        'message' => 'Donation processed successfully',
        'transaction_id' => $transaction_id,
        'status' => $payment_status,
    ];
    
    if (isset($paypal_url)) {
        $response['redirect_url'] = $paypal_url;
    }
    
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Database error'
    ], JSON_UNESCAPED_UNICODE);
}

exit;
