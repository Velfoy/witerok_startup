<?php
/**
 * API для получения одного поста по slug
 * Разместить на сервере: public_html/api/post-single.php
 * URL: https://witerok.com/api/post-single.php?slug=hello-world
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

// Получаем slug
$slug = isset($_GET['slug']) ? sanitize_text_field($_GET['slug']) : '';

if (empty($slug)) {
    echo json_encode(['error' => 'Slug is required'], JSON_UNESCAPED_UNICODE);
    exit;
}

// Получаем пост по slug
$post = get_page_by_path($slug, OBJECT, 'post');

if (!$post || $post->post_status !== 'publish') {
    echo json_encode(['error' => 'Post not found'], JSON_UNESCAPED_UNICODE);
    exit;
}

// Получаем featured image
$thumbnail_id = get_post_thumbnail_id($post->ID);
$thumbnail_url = $thumbnail_id ? wp_get_attachment_image_url($thumbnail_id, 'large') : '';

// Получаем категории
$categories = get_the_category($post->ID);
$cat_names = [];
foreach ($categories as $cat) {
    $cat_names[] = $cat->name;
}

// Получаем excerpt
$excerpt = has_excerpt($post->ID) 
    ? get_the_excerpt($post->ID) 
    : wp_trim_words(strip_tags($post->post_content), 30);

$result = [
    'id' => $post->ID,
    'title' => $post->post_title,
    'slug' => $post->post_name,
    'excerpt' => $excerpt,
    'content' => apply_filters('the_content', $post->post_content),
    'date' => $post->post_date,
    'image' => $thumbnail_url,
    'categories' => $cat_names,
    'link' => get_permalink($post->ID),
];

// Отдаём JSON
echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
exit;
