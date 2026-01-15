<?php
/**
 * Админка для управления новостями WiterOK
 * Разместить на сервере: public_html/admin/news.php
 * URL: https://witerok.com/admin/news.php
 */

// Подключаем WordPress
require_once dirname(__DIR__) . '/wp-load.php';

// Проверяем что пользователь администратор
if (!current_user_can('manage_options')) {
    wp_die('Доступ заборонено');
}

global $wpdb;
$table_name = $wpdb->prefix . 'witerok_news';

// Создаём таблицу если её нет
$charset_collate = $wpdb->get_charset_collate();
$sql = "CREATE TABLE IF NOT EXISTS $table_name (
    id mediumint(9) NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    content longtext NOT NULL,
    image varchar(500),
    status varchar(20) DEFAULT 'draft' NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY  (id)
) $charset_collate;";

require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
dbDelta($sql);

// Обработка форм
$message = '';
$error = '';

// Удаление новости
if (isset($_GET['action']) && $_GET['action'] === 'delete' && isset($_GET['id'])) {
    check_admin_referer('delete_news_' . $_GET['id']);
    $wpdb->delete($table_name, ['id' => intval($_GET['id'])]);
    $message = 'Новина видалена';
}

// Добавление/редактирование новости
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    check_admin_referer('news_form');
    
    $title = sanitize_text_field($_POST['title'] ?? '');
    $content = wp_kses_post($_POST['content'] ?? '');
    $status = sanitize_text_field($_POST['status'] ?? 'draft');
    $id = intval($_POST['id'] ?? 0);
    
    if (empty($title) || empty($content)) {
        $error = 'Заповніть усі поля';
    } else {
        // Обработка загрузки изображения
        $image_url = '';
        if (!empty($_FILES['image']['name'])) {
            $upload = wp_upload_bits($_FILES['image']['name'], null, file_get_contents($_FILES['image']['tmp_name']));
            if (!$upload['error']) {
                $image_url = $upload['url'];
            } else {
                $error = 'Помилка при завантаженні зображення: ' . $upload['error'];
            }
        } elseif (!empty($_POST['existing_image'])) {
            $image_url = sanitize_text_field($_POST['existing_image']);
        }
        
        if (empty($error)) {
            if ($id > 0) {
                // Обновляем существующую новость
                $wpdb->update(
                    $table_name,
                    [
                        'title' => $title,
                        'content' => $content,
                        'image' => $image_url,
                        'status' => $status,
                    ],
                    ['id' => $id],
                    ['%s', '%s', '%s', '%s'],
                    ['%d']
                );
                $message = 'Новина оновлена';
            } else {
                // Добавляем новую новость
                $wpdb->insert(
                    $table_name,
                    [
                        'title' => $title,
                        'content' => $content,
                        'image' => $image_url,
                        'status' => $status,
                    ],
                    ['%s', '%s', '%s', '%s']
                );
                $message = 'Новина додана';
            }
        }
    }
}

// Получаем новость для редактирования
$edit_news = null;
if (isset($_GET['action']) && $_GET['action'] === 'edit' && isset($_GET['id'])) {
    $edit_news = $wpdb->get_row($wpdb->prepare(
        "SELECT * FROM $table_name WHERE id = %d",
        intval($_GET['id'])
    ));
}

// Получаем все новости
$all_news = $wpdb->get_results("SELECT * FROM $table_name ORDER BY created_at DESC");

?>
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Управління новинами WiterOK</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: #f5f7fa;
            color: #333;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            margin-bottom: 30px;
        }
        
        h1 {
            color: #144073;
            margin-bottom: 10px;
            font-size: 28px;
        }
        
        .breadcrumb {
            color: #666;
            font-size: 14px;
        }
        
        .breadcrumb a {
            color: #1A6DCC;
            text-decoration: none;
        }
        
        .breadcrumb a:hover {
            text-decoration: underline;
        }
        
        .alert {
            padding: 15px 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 14px;
        }
        
        .alert-success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .alert-error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        .form-card {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #144073;
            font-size: 14px;
        }
        
        input[type="text"],
        textarea,
        select {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-family: inherit;
            font-size: 14px;
            transition: border-color 0.3s;
        }
        
        input[type="text"]:focus,
        textarea:focus,
        select:focus {
            outline: none;
            border-color: #1A6DCC;
            box-shadow: 0 0 0 3px rgba(26, 109, 204, 0.1);
        }
        
        textarea {
            min-height: 250px;
            resize: vertical;
        }
        
        .image-preview {
            max-width: 200px;
            margin-top: 10px;
            border-radius: 6px;
        }
        
        .button-group {
            display: flex;
            gap: 10px;
            margin-top: 25px;
        }
        
        button,
        .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            text-decoration: none;
            display: inline-block;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #144073, #1A6DCC);
            color: white;
        }
        
        .btn-primary:hover {
            opacity: 0.9;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(26, 109, 204, 0.3);
        }
        
        .btn-secondary {
            background: #f0f0f0;
            color: #333;
        }
        
        .btn-secondary:hover {
            background: #e0e0e0;
        }
        
        .btn-danger {
            background: #dc3545;
            color: white;
        }
        
        .btn-danger:hover {
            background: #c82333;
        }
        
        .table-card {
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
        }
        
        th {
            background: #f8f9fa;
            padding: 15px;
            text-align: left;
            font-weight: 600;
            color: #144073;
            border-bottom: 2px solid #dee2e6;
            font-size: 13px;
        }
        
        td {
            padding: 15px;
            border-bottom: 1px solid #dee2e6;
            font-size: 14px;
        }
        
        tr:hover {
            background: #f8f9fa;
        }
        
        .news-title {
            font-weight: 600;
            color: #144073;
            max-width: 250px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        
        .news-excerpt {
            color: #666;
            font-size: 13px;
            max-width: 400px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        
        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
        }
        
        .status-published {
            background: #d4edda;
            color: #155724;
        }
        
        .status-draft {
            background: #fff3cd;
            color: #856404;
        }
        
        .actions {
            display: flex;
            gap: 8px;
        }
        
        .actions a,
        .actions button {
            padding: 6px 12px;
            font-size: 12px;
        }
        
        .empty-state {
            text-align: center;
            padding: 40px 20px;
            color: #666;
        }
        
        .empty-state-icon {
            font-size: 48px;
            margin-bottom: 15px;
        }
        
        .tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            border-bottom: 2px solid #dee2e6;
        }
        
        .tab {
            padding: 10px 0;
            cursor: pointer;
            color: #666;
            font-weight: 500;
            border-bottom: 3px solid transparent;
            transition: all 0.3s;
        }
        
        .tab.active {
            color: #1A6DCC;
            border-bottom-color: #1A6DCC;
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 15px;
            }
            
            h1 {
                font-size: 22px;
            }
            
            .form-card,
            .table-card {
                padding: 20px;
            }
            
            table {
                font-size: 12px;
            }
            
            th, td {
                padding: 10px;
            }
            
            .news-title,
            .news-excerpt {
                max-width: 150px;
            }
            
            .button-group {
                flex-direction: column;
            }
            
            button,
            .btn {
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📰 Управління новинами WiterOK</h1>
            <div class="breadcrumb">
                <a href="<?php echo admin_url(); ?>">Панель адміністратора WordPress</a> / Новини
            </div>
        </div>
        
        <?php if ($message): ?>
            <div class="alert alert-success">✓ <?php echo $message; ?></div>
        <?php endif; ?>
        
        <?php if ($error): ?>
            <div class="alert alert-error">✗ <?php echo $error; ?></div>
        <?php endif; ?>
        
        <!-- Форма добавления/редактирования -->
        <div class="form-card">
            <h2><?php echo $edit_news ? 'Редагувати новину' : 'Додати нову новину'; ?></h2>
            
            <form method="POST" enctype="multipart/form-data" style="margin-top: 20px;">
                <?php wp_nonce_field('news_form'); ?>
                <input type="hidden" name="action" value="save">
                <?php if ($edit_news): ?>
                    <input type="hidden" name="id" value="<?php echo $edit_news->id; ?>">
                <?php endif; ?>
                
                <div class="form-group">
                    <label for="title">Заголовок новини *</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value="<?php echo $edit_news ? esc_attr($edit_news->title) : ''; ?>"
                        placeholder="Введіть заголовок новини"
                        required
                    >
                </div>
                
                <div class="form-group">
                    <label for="content">Текст новини *</label>
                    <textarea
                        id="content"
                        name="content"
                        placeholder="Введіть текст новини. Можна використовувати HTML теги"
                        required
                    ><?php echo $edit_news ? esc_textarea($edit_news->content) : ''; ?></textarea>
                </div>
                
                <div class="form-group">
                    <label for="image">Зображення новини</label>
                    <input type="file" id="image" name="image" accept="image/*">
                    <small style="color: #666; display: block; margin-top: 5px;">
                        Максимум 5МБ. Формати: JPG, PNG, GIF
                    </small>
                    
                    <?php if ($edit_news && $edit_news->image): ?>
                        <div style="margin-top: 15px;">
                            <p><strong>Поточне зображення:</strong></p>
                            <img src="<?php echo esc_url($edit_news->image); ?>" alt="Поточне зображення" class="image-preview">
                            <input type="hidden" name="existing_image" value="<?php echo esc_url($edit_news->image); ?>">
                        </div>
                    <?php endif; ?>
                </div>
                
                <div class="form-group">
                    <label for="status">Статус</label>
                    <select id="status" name="status">
                        <option value="draft" <?php echo (!$edit_news || $edit_news->status === 'draft') ? 'selected' : ''; ?>>Чернетка</option>
                        <option value="published" <?php echo ($edit_news && $edit_news->status === 'published') ? 'selected' : ''; ?>>Опублікована</option>
                    </select>
                </div>
                
                <div class="button-group">
                    <button type="submit" class="btn btn-primary">
                        <?php echo $edit_news ? '💾 Оновити новину' : '➕ Додати новину'; ?>
                    </button>
                    <?php if ($edit_news): ?>
                        <a href="?action=list" class="btn btn-secondary">← Назад до списку</a>
                    <?php endif; ?>
                </div>
            </form>
        </div>
        
        <!-- Список новин -->
        <div class="table-card">
            <div style="padding: 20px; border-bottom: 1px solid #dee2e6;">
                <h2>Всі новини (<?php echo count($all_news); ?>)</h2>
            </div>
            
            <?php if (empty($all_news)): ?>
                <div class="empty-state">
                    <div class="empty-state-icon">📝</div>
                    <p>У вас поки немає новин</p>
                    <p style="font-size: 13px; margin-top: 10px;">Додайте першу новину за допомогою форми вище</p>
                </div>
            <?php else: ?>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Заголовок</th>
                            <th>Текст</th>
                            <th>Зображення</th>
                            <th>Статус</th>
                            <th>Дата</th>
                            <th>Дії</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($all_news as $news): ?>
                            <tr>
                                <td>#<?php echo $news->id; ?></td>
                                <td class="news-title"><?php echo esc_html($news->title); ?></td>
                                <td class="news-excerpt"><?php echo wp_trim_words(strip_tags($news->content), 15); ?></td>
                                <td>
                                    <?php if ($news->image): ?>
                                        <img src="<?php echo esc_url($news->image); ?>" alt="<?php echo esc_attr($news->title); ?>" style="max-height: 40px; border-radius: 4px;">
                                    <?php else: ?>
                                        <span style="color: #999;">—</span>
                                    <?php endif; ?>
                                </td>
                                <td>
                                    <span class="status-badge status-<?php echo $news->status; ?>">
                                        <?php echo $news->status === 'published' ? '✓ Опублікована' : '✏️ Чернетка'; ?>
                                    </span>
                                </td>
                                <td><?php echo date('d.m.Y H:i', strtotime($news->created_at)); ?></td>
                                <td>
                                    <div class="actions">
                                        <a href="?action=edit&id=<?php echo $news->id; ?>" class="btn btn-primary" style="background: linear-gradient(135deg, #144073, #1A6DCC);">Редагувати</a>
                                        <a href="<?php echo wp_nonce_url('?action=delete&id=' . $news->id, 'delete_news_' . $news->id); ?>" class="btn btn-danger" onclick="return confirm('Видалити цю новину?');">Видалити</a>
                                    </div>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background: #e7f3ff; border-radius: 8px; border-left: 4px solid #1A6DCC;">
            <h3 style="color: #144073; margin-bottom: 10px;">ℹ️ Інформація</h3>
            <p style="font-size: 14px; color: #333;">
                Усі цi новини автоматично загружаються в React приложення через API:
                <br>
                <code style="background: white; padding: 5px 10px; border-radius: 4px; font-family: monospace;">GET https://witerok.com/api/posts.php</code>
            </p>
            <p style="font-size: 13px; color: #666; margin-top: 10px;">
                Тільки новини зі статусом "Опублікована" будуть видні на сайті.
            </p>
        </div>
    </div>
</body>
</html>
