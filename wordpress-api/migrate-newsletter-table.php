<?php
/**
 * Migration script to add unsubscribe_token column to newsletter_subscribers table
 * 
 * Run this once by visiting: https://witerok.com/api/migrate-newsletter-table.php
 */

// Підключаємо WordPress
require_once dirname(__DIR__) . '/wp-load.php';

// Перевірка прав доступу (тільки адміністратори)
if (!current_user_can('manage_options')) {
    die('Access denied. Only administrators can run migrations.');
}

global $wpdb;
$table_name = $wpdb->prefix . 'newsletter_subscribers';

// Перевіряємо чи існує таблиця
$table_exists = $wpdb->get_var("SHOW TABLES LIKE '$table_name'") === $table_name;

if (!$table_exists) {
    echo '<h2>❌ Error: Table does not exist</h2>';
    echo '<p>The table <code>' . $table_name . '</code> does not exist. Please activate the WiterOK News plugin first.</p>';
    exit;
}

// Перевіряємо чи існує колонка unsubscribe_token
$column_exists = $wpdb->get_results("SHOW COLUMNS FROM $table_name LIKE 'unsubscribe_token'");

if (!empty($column_exists)) {
    echo '<h2>✅ Migration already completed</h2>';
    echo '<p>The <code>unsubscribe_token</code> column already exists in the <code>' . $table_name . '</code> table.</p>';
    exit;
}

// Додаємо колонку unsubscribe_token
$sql = "ALTER TABLE $table_name ADD COLUMN unsubscribe_token VARCHAR(64) UNIQUE AFTER status";
$result = $wpdb->query($sql);

if ($result === false) {
    echo '<h2>❌ Migration failed</h2>';
    echo '<p><strong>Error:</strong> ' . $wpdb->last_error . '</p>';
    echo '<p><strong>SQL:</strong> <code>' . $sql . '</code></p>';
    exit;
}

// Генеруємо токени для існуючих підписників, які не мають токена
$subscribers_without_token = $wpdb->get_results("SELECT id FROM $table_name WHERE unsubscribe_token IS NULL");

if (!empty($subscribers_without_token)) {
    foreach ($subscribers_without_token as $subscriber) {
        $token = bin2hex(random_bytes(32));
        $wpdb->update(
            $table_name,
            ['unsubscribe_token' => $token],
            ['id' => $subscriber->id]
        );
    }
    $updated_count = count($subscribers_without_token);
    echo '<p>✅ Generated unsubscribe tokens for ' . $updated_count . ' existing subscriber(s).</p>';
}

echo '<h2>✅ Migration completed successfully!</h2>';
echo '<p>The <code>unsubscribe_token</code> column has been added to the <code>' . $table_name . '</code> table.</p>';
echo '<h3>Table structure:</h3>';
echo '<pre style="background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto;">';

// Показуємо структуру таблиці
$columns = $wpdb->get_results("SHOW COLUMNS FROM $table_name");
foreach ($columns as $column) {
    echo sprintf(
        "%-25s %-20s %-10s %-10s\n",
        $column->Field,
        $column->Type,
        $column->Null,
        $column->Key
    );
}
echo '</pre>';

echo '<p><a href="' . admin_url('admin.php?page=witerok-newsletter') . '" class="button button-primary">← Back to Newsletter Admin</a></p>';

// Стилі для красивого відображення
echo '<style>
    body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        max-width: 800px;
        margin: 50px auto;
        padding: 20px;
        background: #f5f5f5;
    }
    h2 { color: #2271b1; }
    code { 
        background: #fff3cd; 
        padding: 2px 6px; 
        border-radius: 3px; 
        font-size: 0.9em;
    }
    pre { 
        font-family: "Courier New", monospace; 
        font-size: 0.85em; 
    }
    .button {
        display: inline-block;
        padding: 10px 20px;
        background: #2271b1;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
    }
    .button:hover {
        background: #135e96;
    }
</style>';
?>