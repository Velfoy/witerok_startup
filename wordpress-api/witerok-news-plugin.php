<?php
/**
 * Plugin Name: WiterOK News Manager
 * Description: Управління новинами WiterOK з API для React додатку
 * Version: 1.0
 * Author: WiterOK Team
 */

if (!defined('ABSPATH')) {
    exit;
}

// Создание таблицы при активации плагина
function witerok_news_plugin_activate() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'witerok_news';
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
}
register_activation_hook(__FILE__, 'witerok_news_plugin_activate');

// Главное меню: Просте управління новинами (без редиректов)
function witerok_simple_news_menu() {
    add_menu_page(
        'Прості новини WiterOK',
        '🗞️ Прості новини',
        'manage_options',
        'witerok-simple-news',
        'witerok_simple_news_page',
        'dashicons-media-document',
        6
    );

    add_submenu_page(
        'witerok-simple-news',
        'API для React',
        '🔌 API для React',
        'manage_options',
        'witerok-news-api',
        'witerok_news_api_page'
    );
}
add_action('admin_menu', 'witerok_simple_news_menu');

// Сторінка з інформацією про API
function witerok_news_api_page() {
    ?>
<div class="wrap">
    <h1>🔌 API для React додатку</h1>

    <div class="card" style="max-width: 800px; margin-top: 20px;">
        <h2>📡 Endpoints API</h2>

        <h3 style="margin-top: 20px;">1. Отримати список новин</h3>
        <p><strong>URL:</strong> <code><?php echo home_url('/api/posts.php'); ?></code></p>
        <p><strong>Метод:</strong> GET</p>
        <p><strong>Параметри:</strong></p>
        <ul>
            <li><code>limit</code> - кількість новин (за замовчуванням: 10)</li>
        </ul>
        <p><strong>Приклад:</strong></p>
        <pre
            style="background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto;">GET <?php echo home_url('/api/posts.php?limit=6'); ?></pre>

        <h3 style="margin-top: 20px;">📊 Тестування API</h3>
        <p>
            <a href="<?php echo home_url('/api/posts.php'); ?>" target="_blank" class="button button-primary">
                Відкрити API в новій вкладці
            </a>
        </p>

        <h3 style="margin-top: 30px;">🔧 Використання в React</h3>
        <pre style="background: #2d2d2d; color: #f8f8f2; padding: 15px; border-radius: 5px; overflow-x: auto;">
// src/services/api.ts
const API_BASE_URL = '<?php echo home_url('/api'); ?>';

export async function getPosts(limit = 10) {
  const response = await fetch(`${API_BASE_URL}/posts.php?limit=${limit}`);
  return response.json();
}</pre>
    </div>

    <div class="card" style="max-width: 800px; margin-top: 20px;">
        <h2>📝 Як працює система</h2>
        <ol style="line-height: 2;">
            <li>Ви додаєте новини через цю адмін-панель WordPress</li>
            <li>Новини зберігаються в базі даних у таблиці <code>wp_witerok_news</code></li>
            <li>React додаток робить запит до API (posts.php)</li>
            <li>API повертає список опублікованих новин у форматі JSON</li>
            <li>React відображає новини на сайті</li>
        </ol>
    </div>

    <div class="card" style="max-width: 800px; margin-top: 20px; background: #fff3cd; border-left: 4px solid #ffc107;">
        <h2>⚠️ Важливо</h2>
        <ul style="line-height: 2;">
            <li>Тільки <strong>опубліковані</strong> новини відображаються через API</li>
            <li>Чернетки (Drafts) не потраплять в React додаток</li>
            <li>Обов'язково додайте зображення до кожної новини</li>
            <li>Рекомендований розмір зображення: мінімум 800x600px</li>
        </ul>
    </div>
</div>
<?php
}

// Страница простого управления новостями (собственная форма, без редиректов)
function witerok_simple_news_page() {
    if (!current_user_can('manage_options')) {
        wp_die('Доступ заборонено');
    }

    global $wpdb;
    $table_name = $wpdb->prefix . 'witerok_news';

    $message = '';
    $error = '';

    // Удаление новости
    if (isset($_GET['action']) && $_GET['action'] === 'delete' && isset($_GET['id'])) {
        check_admin_referer('delete_news_' . $_GET['id']);
        $wpdb->delete($table_name, ['id' => intval($_GET['id'])]);
        $message = 'Новина видалена';
    }

    // Добавление/редактирование новости
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'save') {
        check_admin_referer('news_form');

        $title = sanitize_text_field($_POST['title'] ?? '');
        $content = wp_kses_post($_POST['content'] ?? '');
        $status = sanitize_text_field($_POST['status'] ?? 'draft');
        $id = intval($_POST['id'] ?? 0);

        if (empty($title) || empty($content)) {
            $error = 'Заповніть усі поля';
        } else {
            // Загрузка изображения через файловый инпут
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

    // Рендер страницы в стиле wp-admin
    ?>
<div class="wrap">
    <h1>🗞️ Прості новини WiterOK</h1>

    <?php if ($message): ?>
    <div class="notice notice-success is-dismissible">
        <p><?php echo esc_html($message); ?></p>
    </div>
    <?php endif; ?>
    <?php if ($error): ?>
    <div class="notice notice-error is-dismissible">
        <p><?php echo esc_html($error); ?></p>
    </div>
    <?php endif; ?>

    <h2 class="title"><?php echo $edit_news ? 'Редагувати новину' : 'Додати нову новину'; ?></h2>
    <form method="POST" enctype="multipart/form-data">
        <?php wp_nonce_field('news_form'); ?>
        <input type="hidden" name="action" value="save">
        <?php if ($edit_news): ?>
        <input type="hidden" name="id" value="<?php echo intval($edit_news->id); ?>">
        <?php endif; ?>

        <table class="form-table" role="presentation">
            <tbody>
                <tr>
                    <th scope="row"><label for="title">Заголовок *</label></th>
                    <td><input name="title" type="text" id="title"
                            value="<?php echo $edit_news ? esc_attr($edit_news->title) : ''; ?>" class="regular-text"
                            required></td>
                </tr>
                <tr>
                    <th scope="row"><label for="content">Текст новини *</label></th>
                    <td>
                        <textarea name="content" id="content" rows="10" class="large-text"
                            required><?php echo $edit_news ? esc_textarea($edit_news->content) : ''; ?></textarea>
                        <p class="description">Можна використовувати HTML теги.</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="image">Зображення</label></th>
                    <td>
                        <input type="file" id="image" name="image" accept="image/*">
                        <p class="description">Максимум 5МБ. Формати: JPG, PNG, GIF</p>
                        <?php if ($edit_news && $edit_news->image): ?>
                        <img src="<?php echo esc_url($edit_news->image); ?>" alt="Поточне зображення"
                            style="max-height:80px;border-radius:4px;display:block;margin-top:8px;">
                        <input type="hidden" name="existing_image" value="<?php echo esc_url($edit_news->image); ?>">
                        <?php endif; ?>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="status">Статус</label></th>
                    <td>
                        <select id="status" name="status">
                            <option value="draft"
                                <?php echo (!$edit_news || $edit_news->status === 'draft') ? 'selected' : ''; ?>>
                                Чернетка</option>
                            <option value="published"
                                <?php echo ($edit_news && $edit_news->status === 'published') ? 'selected' : ''; ?>>
                                Опублікована</option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>

        <?php submit_button($edit_news ? '💾 Оновити новину' : '➕ Додати новину'); ?>
    </form>

    <hr>

    <h2 class="title">Всі новини (<?php echo count($all_news); ?>)</h2>
    <?php if (empty($all_news)): ?>
    <p>У вас поки немає новин. Додайте першу новину за допомогою форми вище.</p>
    <?php else: ?>
    <table class="wp-list-table widefat fixed striped table-view-list">
        <thead>
            <tr>
                <th>ID</th>
                <th>Заголовок</th>
                <th>Короткий текст</th>
                <th>Зображення</th>
                <th>Статус</th>
                <th>Дата</th>
                <th>Дії</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($all_news as $news): ?>
            <tr>
                <td>#<?php echo intval($news->id); ?></td>
                <td><?php echo esc_html($news->title); ?></td>
                <td><?php echo wp_trim_words(strip_tags($news->content), 15); ?></td>
                <td>
                    <?php if (!empty($news->image)): ?>
                    <img src="<?php echo esc_url($news->image); ?>" alt="<?php echo esc_attr($news->title); ?>"
                        style="max-height:40px;border-radius:4px;">
                    <?php else: ?>
                    <span style="color:#999">—</span>
                    <?php endif; ?>
                </td>
                <td><?php echo $news->status === 'published' ? '✓ Опублікована' : '✏️ Чернетка'; ?></td>
                <td><?php echo date('d.m.Y H:i', strtotime($news->created_at)); ?></td>
                <td>
                    <a href="<?php echo wp_nonce_url(admin_url('admin.php?page=witerok-simple-news&action=edit&id=' . intval($news->id)), 'edit_news_' . intval($news->id)); ?>"
                        class="button button-primary">Редагувати</a>
                    <a href="<?php echo wp_nonce_url(admin_url('admin.php?page=witerok-simple-news&action=delete&id=' . intval($news->id)), 'delete_news_' . intval($news->id)); ?>"
                        class="button button-danger" onclick="return confirm('Видалити цю новину?')">Видалити</a>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    <?php endif; ?>

    <div class="notice notice-info" style="margin-top:20px;">
        <p><strong>ℹ️ Інформація:</strong> Усі опубліковані новини автоматично загружаються в React додаток через API:
            <code>GET <?php echo esc_html(home_url('/api/posts.php')); ?></code></p>
        <p>Тільки новини зі статусом "Опублікована" будуть видні на сайті.</p>
    </div>
</div>
<?php
}