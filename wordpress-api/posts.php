<?php
/**
 * API для получения новостей WiterOK из кастомной таблицы
 * Разместить на сервере: public_html/api/posts.php
 * URL: https://witerok.com/api/posts.php
 */

// Подключаем WordPress
require_once dirname(__DIR__) . '/wp-load.php';

// Заголовки для API
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Обработка preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

global $wpdb;
$table_name = $wpdb->prefix . 'witerok_news';

// Получаем параметры
$numberposts = isset($_GET['limit']) ? intval($_GET['limit']) : 10;

// Получаем опубликованные новости
$query = $wpdb->prepare(
    "SELECT * FROM $table_name WHERE status = %s ORDER BY created_at DESC LIMIT %d",
    'published',
    $numberposts
);

$news_items = $wpdb->get_results($query);

$result = [];

foreach ($news_items as $item) {
    // Создаём slug из заголовка
    $slug = sanitize_title($item->title);
    
    // Создаём excerpt (первые 30 слов из контента)
    $excerpt = wp_trim_words(strip_tags($item->content), 30);
    
    $result[] = [
        'id' => intval($item->id),
        'title' => $item->title,
        'slug' => $slug,
        'excerpt' => $excerpt,
        'content' => $item->content,
        'date' => $item->created_at,
        'image' => $item->image ? $item->image : '',
        'categories' => [],
        'link' => home_url('/news/' . $slug . '/'),
    ];
}

// Отдаём JSON
echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
exit;
