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

// Создание таблиц при активации плагина
function witerok_news_plugin_activate() {
    global $wpdb;
    $charset_collate = $wpdb->get_charset_collate();
    
    // Таблица новостей
    $news_table = $wpdb->prefix . 'witerok_news';
    $sql_news = "CREATE TABLE IF NOT EXISTS $news_table (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        title varchar(255) NOT NULL,
        content longtext NOT NULL,
        image varchar(500),
        status varchar(20) DEFAULT 'draft' NOT NULL,
        created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
        PRIMARY KEY  (id)
    ) $charset_collate;";
    
    // Таблица контактных сообщений
    $contact_table = $wpdb->prefix . 'contact_messages';
    $sql_contact = "CREATE TABLE IF NOT EXISTS $contact_table (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        name varchar(100) NOT NULL,
        email varchar(100) NOT NULL,
        subject varchar(200) NOT NULL,
        message text NOT NULL,
        submitted_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
        status varchar(20) DEFAULT 'new' NOT NULL,
        PRIMARY KEY  (id)
    ) $charset_collate;";
    
    // Таблица подписчиков newsletter
    $newsletter_table = $wpdb->prefix . 'newsletter_subscribers';
    $sql_newsletter = "CREATE TABLE IF NOT EXISTS $newsletter_table (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        email varchar(100) NOT NULL,
        name varchar(100) DEFAULT '' NOT NULL,
        subscribed_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
        status varchar(20) DEFAULT 'active' NOT NULL,
        unsubscribe_token varchar(64) UNIQUE,
        PRIMARY KEY  (id),
        UNIQUE KEY email (email)
    ) $charset_collate;";
    
    // Email log table
    $email_log_table = $wpdb->prefix . 'witerok_email_log';
    $sql_email_log = "CREATE TABLE IF NOT EXISTS $email_log_table (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        recipient_email varchar(100) NOT NULL,
        subject varchar(255) NOT NULL,
        message longtext NOT NULL,
        image_url varchar(500),
        sent_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
        status varchar(20) DEFAULT 'sent' NOT NULL,
        PRIMARY KEY  (id),
        KEY sent_at (sent_at)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql_news);
    dbDelta($sql_contact);
    dbDelta($sql_newsletter);
    dbDelta($sql_email_log);
}
register_activation_hook(__FILE__, 'witerok_news_plugin_activate');

// Ensure tables exist on every admin load (in case activation failed)
function witerok_ensure_tables_exist() {
    // Only run on admin pages
    if (!is_admin()) {
        return;
    }
    
    global $wpdb;
    $charset_collate = $wpdb->get_charset_collate();
    
    // Email log table
    $email_log_table = $wpdb->prefix . 'witerok_email_log';
    
    // Check if table exists
    if ($wpdb->get_var("SHOW TABLES LIKE '$email_log_table'") !== $email_log_table) {
        $sql = "CREATE TABLE IF NOT EXISTS $email_log_table (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            recipient_email varchar(100) NOT NULL,
            subject varchar(255) NOT NULL,
            message longtext NOT NULL,
            image_url varchar(500),
            sent_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
            status varchar(20) DEFAULT 'sent' NOT NULL,
            PRIMARY KEY  (id),
            KEY sent_at (sent_at)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
        
        error_log('[WiterOK Newsletter] Email log table created');
    }
}
add_action('admin_init', 'witerok_ensure_tables_exist');

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
    
    // Подсчитываем новые сообщения для бейджа
    global $wpdb;
    $contact_table = $wpdb->prefix . 'contact_messages';
    $new_count = $wpdb->get_var("SELECT COUNT(*) FROM $contact_table WHERE status = 'new'");
    $badge = $new_count > 0 ? " <span class='update-plugins count-$new_count'><span class='update-count'>$new_count</span></span>" : '';
    
    // Добавляем меню для контактных сообщений
    add_menu_page(
        'Контактні повідомлення',
        '📧 Повідомлення' . $badge,
        'manage_options',
        'witerok-contact-messages',
        'witerok_contact_messages_page',
        'dashicons-email',
        7
    );
    
    // Подсчитываем подписчиков для бейджа
    $newsletter_table = $wpdb->prefix . 'newsletter_subscribers';
    $subscribers_count = $wpdb->get_var("SELECT COUNT(*) FROM $newsletter_table WHERE status = 'active'");
    $newsletter_badge = $subscribers_count > 0 ? " <span class='update-plugins count-$subscribers_count'><span class='update-count'>$subscribers_count</span></span>" : '';
    
    // Добавляем меню для newsletter
    add_menu_page(
        'Підписники Newsletter',
        '📬 Newsletter' . $newsletter_badge,
        'manage_options',
        'witerok-newsletter',
        'witerok_newsletter_page',
        'dashicons-email-alt',
        8
    );
    
    // Добавляем меню для логу отправленных писем
    add_submenu_page(
        'witerok-newsletter',
        'Логі надісланих писем',
        '📋 Логи писем',
        'manage_options',
        'witerok-email-log',
        'witerok_email_log_page'
    );
}
add_action('admin_menu', 'witerok_simple_news_menu');

// Enqueue WordPress media library scripts for newsletter page
function witerok_enqueue_media_scripts($hook) {
    // Only load on our newsletter page
    if ($hook !== 'toplevel_page_witerok-newsletter') {
        return;
    }
    // Enqueue WordPress media library
    wp_enqueue_media();
}
add_action('admin_enqueue_scripts', 'witerok_enqueue_media_scripts');

// Ensure HTML emails and log failures (plays nicely with WP Mail SMTP)
function witerok_set_html_mail_content_type() {
    return 'text/html';
}

function witerok_log_mail_error($error) {
    error_log('[WiterOK Newsletter] wp_mail_failed: ' . print_r($error, true));
}
add_action('wp_mail_failed', 'witerok_log_mail_error');

function witerok_send_email($to, $subject, $html_body, $reply_to = '', $extra_headers = []) {
    // Force HTML content type for this email only
    add_filter('wp_mail_content_type', 'witerok_set_html_mail_content_type');

    $headers = [];
    if (!empty($reply_to)) {
        $headers[] = 'Reply-To: ' . $reply_to;
    }
    if (!empty($extra_headers) && is_array($extra_headers)) {
        $headers = array_merge($headers, $extra_headers);
    }

    $result = wp_mail($to, $subject, $html_body, $headers);

    // Restore default content type
    remove_filter('wp_mail_content_type', 'witerok_set_html_mail_content_type');

    return $result;
}

// Log sent email to database
function witerok_log_email($recipient_email, $subject, $message, $image_url = '') {
    global $wpdb;
    $email_log_table = $wpdb->prefix . 'witerok_email_log';
    
    $wpdb->insert(
        $email_log_table,
        [
            'recipient_email' => $recipient_email,
            'subject' => $subject,
            'message' => $message,
            'image_url' => $image_url,
            'status' => 'sent'
        ],
        ['%s', '%s', '%s', '%s', '%s']
    );
}

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
                    // Check if status changed from draft to published
                    $old_status = $wpdb->get_var($wpdb->prepare(
                        "SELECT status FROM $table_name WHERE id = %d",
                        $id
                    ));
                    
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
                    
                    // Send newsletter if status changed to published
                    if ($old_status !== 'published' && $status === 'published') {
                        $sent_count = witerok_send_news_to_subscribers($title, $content, $image_url);
                        if ($sent_count > 0) {
                            $message .= ' та надіслана ' . $sent_count . ' підписникам!';
                        }
                    }
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
                    
                    // Send newsletter if published immediately
                    if ($status === 'published') {
                        $sent_count = witerok_send_news_to_subscribers($title, $content, $image_url);
                        if ($sent_count > 0) {
                            $message .= ' та надіслана ' . $sent_count . ' підписникам!';
                        }
                    }
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
            <code>GET <?php echo esc_html(home_url('/api/posts.php')); ?></code>
        </p>
        <p>Тільки новини зі статусом "Опублікована" будуть видні на сайті.</p>
        <p><strong>📧 Автоматична розсилка:</strong> При публікації новини (зміна статусу з "Чернетка" на "Опублікована" або створення відразу як "Опублікована"), система автоматично надішле цю новину всім активним підписникам newsletter.</p>
    </div>
</div>
<?php
}

// Страница контактных сообщений
function witerok_contact_messages_page() {
    if (!current_user_can('manage_options')) {
        wp_die('Доступ заборонено');
    }

    global $wpdb;
    $table_name = $wpdb->prefix . 'contact_messages';

    $message = '';
    
    // Удаление сообщения
    if (isset($_GET['action']) && $_GET['action'] === 'delete' && isset($_GET['id'])) {
        check_admin_referer('delete_message_' . $_GET['id']);
        $wpdb->delete($table_name, ['id' => intval($_GET['id'])]);
        $message = 'Повідомлення видалено';
    }
    
    // Изменение статуса
    if (isset($_GET['action']) && $_GET['action'] === 'mark_read' && isset($_GET['id'])) {
        check_admin_referer('mark_read_' . $_GET['id']);
        $wpdb->update($table_name, ['status' => 'read'], ['id' => intval($_GET['id'])], ['%s'], ['%d']);
        $message = 'Позначено як прочитане';
    }
    
    if (isset($_GET['action']) && $_GET['action'] === 'mark_new' && isset($_GET['id'])) {
        check_admin_referer('mark_new_' . $_GET['id']);
        $wpdb->update($table_name, ['status' => 'new'], ['id' => intval($_GET['id'])], ['%s'], ['%d']);
        $message = 'Позначено як нове';
    }

    // Фильтрация по статусу
    $status_filter = isset($_GET['status']) ? sanitize_text_field($_GET['status']) : 'all';
    
    // Получаем сообщения
    if ($status_filter === 'all') {
        $all_messages = $wpdb->get_results("SELECT * FROM $table_name ORDER BY submitted_at DESC");
    } else {
        $all_messages = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM $table_name WHERE status = %s ORDER BY submitted_at DESC",
            $status_filter
        ));
    }
    
    // Подсчитываем новые
    $new_count = $wpdb->get_var("SELECT COUNT(*) FROM $table_name WHERE status = 'new'");
    
    ?>
<div class="wrap">
    <h1>📧 Контактні повідомлення</h1>

    <?php if ($message): ?>
    <div class="notice notice-success is-dismissible">
        <p><?php echo esc_html($message); ?></p>
    </div>
    <?php endif; ?>

    <div class="notice notice-info">
        <p><strong>ℹ️ Інформація:</strong> Усі повідомлення з контактної форми зберігаються тут. Коли надходить нове
            повідомлення, адміністратор отримує email-сповіщення на
            <code><?php echo esc_html(get_option('admin_email')); ?></code>
        </p>
    </div>

    <div style="margin: 20px 0;">
        <strong>Фільтр:</strong>
        <a href="<?php echo admin_url('admin.php?page=witerok-contact-messages&status=all'); ?>"
            class="button <?php echo $status_filter === 'all' ? 'button-primary' : ''; ?>">
            Усі (<?php echo count($wpdb->get_results("SELECT * FROM $table_name")); ?>)
        </a>
        <a href="<?php echo admin_url('admin.php?page=witerok-contact-messages&status=new'); ?>"
            class="button <?php echo $status_filter === 'new' ? 'button-primary' : ''; ?>">
            Нові (<?php echo $new_count; ?>)
        </a>
        <a href="<?php echo admin_url('admin.php?page=witerok-contact-messages&status=read'); ?>"
            class="button <?php echo $status_filter === 'read' ? 'button-primary' : ''; ?>">
            Прочитані (<?php echo count($wpdb->get_results("SELECT * FROM $table_name WHERE status = 'read'")); ?>)
        </a>
    </div>

    <?php if (empty($all_messages)): ?>
    <p>Немає повідомлень.</p>
    <?php else: ?>
    <table class="wp-list-table widefat fixed striped table-view-list">
        <thead>
            <tr>
                <th style="width: 50px;">ID</th>
                <th style="width: 80px;">Статус</th>
                <th style="width: 150px;">Ім'я</th>
                <th style="width: 180px;">Email</th>
                <th style="width: 200px;">Тема</th>
                <th>Повідомлення</th>
                <th style="width: 150px;">Дата</th>
                <th style="width: 200px;">Дії</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($all_messages as $msg): ?>
            <tr style="<?php echo $msg->status === 'new' ? 'background: #fffbcc;' : ''; ?>">
                <td>#<?php echo intval($msg->id); ?></td>
                <td>
                    <?php if ($msg->status === 'new'): ?>
                    <span style="color: #d63638; font-weight: bold;">🔴 Нове</span>
                    <?php else: ?>
                    <span style="color: #00a32a;">✓ Прочитано</span>
                    <?php endif; ?>
                </td>
                <td><?php echo esc_html($msg->name); ?></td>
                <td><a href="mailto:<?php echo esc_attr($msg->email); ?>"><?php echo esc_html($msg->email); ?></a></td>
                <td><?php echo esc_html($msg->subject); ?></td>
                <td>
                    <details>
                        <summary style="cursor:pointer;color:#2271b1;">Переглянути повідомлення</summary>
                        <div style="margin-top:10px;padding:10px;background:#f0f0f1;border-radius:4px;">
                            <?php echo nl2br(esc_html($msg->message)); ?>
                        </div>
                    </details>
                </td>
                <td><?php echo date('d.m.Y H:i', strtotime($msg->submitted_at)); ?></td>
                <td>
                    <?php if ($msg->status === 'new'): ?>
                    <a href="<?php echo wp_nonce_url(admin_url('admin.php?page=witerok-contact-messages&action=mark_read&id=' . intval($msg->id)), 'mark_read_' . intval($msg->id)); ?>"
                        class="button button-small">Прочитано</a>
                    <?php else: ?>
                    <a href="<?php echo wp_nonce_url(admin_url('admin.php?page=witerok-contact-messages&action=mark_new&id=' . intval($msg->id)), 'mark_new_' . intval($msg->id)); ?>"
                        class="button button-small">Нове</a>
                    <?php endif; ?>
                    <a href="<?php echo wp_nonce_url(admin_url('admin.php?page=witerok-contact-messages&action=delete&id=' . intval($msg->id)), 'delete_message_' . intval($msg->id)); ?>"
                        class="button button-small button-link-delete"
                        onclick="return confirm('Видалити це повідомлення?')">Видалити</a>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    <?php endif; ?>

    <div class="notice notice-warning" style="margin-top:20px;">
        <p><strong>⚙️ Налаштування email-сповіщень:</strong></p>
        <p>Email для сповіщень: <code><?php echo esc_html(get_option('admin_email')); ?></code></p>
        <p>Змінити можна в <a href="<?php echo admin_url('options-general.php'); ?>">Налаштування → Загальні</a></p>
    </div>
</div>
<?php
}

// Email log page
function witerok_email_log_page() {
    if (!current_user_can('manage_options')) {
        wp_die('Доступ заборонено');
    }

    global $wpdb;
    $email_log_table = $wpdb->prefix . 'witerok_email_log';
    $message = '';
    
    // Delete email log entry
    if (isset($_GET['action']) && $_GET['action'] === 'delete' && isset($_GET['id'])) {
        check_admin_referer('delete_email_log_' . $_GET['id']);
        $wpdb->delete($email_log_table, ['id' => intval($_GET['id'])]);
        $message = '✅ Запис видалено!';
    }
    
    // Clear all logs
    if (isset($_POST['clear_logs']) && check_admin_referer('clear_logs_action', 'clear_logs_nonce')) {
        $wpdb->query("DELETE FROM $email_log_table");
        $message = '✅ Всі логи видалені!';
    }
    
    // Get all logged emails
    $logs = $wpdb->get_results("SELECT * FROM $email_log_table ORDER BY sent_at DESC");
    $total_sent = $wpdb->get_var("SELECT COUNT(*) FROM $email_log_table");
    
    ?>
<div class="wrap">
    <h1>📋 Логи надісланих писем</h1>
    <p>Всього надісланих писем: <strong><?php echo $total_sent; ?></strong></p>
    
    <?php if ($message): ?>
    <div class="notice notice-success is-dismissible">
        <p><?php echo esc_html($message); ?></p>
    </div>
    <?php endif; ?>
    
    <?php if (!empty($logs)): ?>
    <div style="margin: 20px 0;">
        <form method="post" style="display: inline;">
            <?php wp_nonce_field('clear_logs_action', 'clear_logs_nonce'); ?>
            <input type="submit" name="clear_logs" class="button button-danger" value="🗑️ Очистити всі логи" onclick="return confirm('Це видалить ВСІ логи. Продовжити?')">
        </form>
    </div>
    
    <table class="wp-list-table widefat fixed striped">
        <thead>
            <tr>
                <th style="width: 50px;">ID</th>
                <th style="width: 180px;">Email одержувача</th>
                <th style="width: 200px;">Тема</th>
                <th>Повідомлення (перегляд)</th>
                <th style="width: 120px;">Зображення</th>
                <th style="width: 150px;">Дата</th>
                <th style="width: 150px;">Дії</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($logs as $log): ?>
            <tr>
                <td>#<?php echo intval($log->id); ?></td>
                <td><a href="mailto:<?php echo esc_attr($log->recipient_email); ?>"><?php echo esc_html($log->recipient_email); ?></a></td>
                <td><?php echo esc_html($log->subject); ?></td>
                <td>
                    <details>
                        <summary style="cursor: pointer; color: #2271b1;">Показати повідомлення</summary>
                        <div style="margin-top: 10px; padding: 15px; background: #f0f0f1; border-radius: 4px; max-height: 300px; overflow-y: auto;">
                            <?php echo wp_kses_post($log->message); ?>
                        </div>
                    </details>
                </td>
                <td>
                    <?php if (!empty($log->image_url)): ?>
                    <details>
                        <summary style="cursor: pointer; color: #2271b1;">🖼️ Показати</summary>
                        <div style="margin-top: 10px;">
                            <img src="<?php echo esc_url($log->image_url); ?>" alt="Email Image" style="max-width: 200px; max-height: 150px; border-radius: 4px;">
                        </div>
                    </details>
                    <?php else: ?>
                    <span style="color: #999;">—</span>
                    <?php endif; ?>
                </td>
                <td><?php echo date('d.m.Y H:i:s', strtotime($log->sent_at)); ?></td>
                <td>
                    <a href="<?php echo wp_nonce_url(admin_url('admin.php?page=witerok-email-log&action=delete&id=' . intval($log->id)), 'delete_email_log_' . intval($log->id)); ?>" class="button button-small button-link-delete" onclick="return confirm('Видалити цей запис?')">Видалити</a>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    
    <?php else: ?>
    <div class="notice notice-info">
        <p>📭 Логи писем порожні. Вони з'являться тут після відправки першого листа.</p>
    </div>
    <?php endif; ?>
    
    <div class="notice notice-info" style="margin-top: 20px;">
        <p><strong>💡 Про логи:</strong></p>
        <ul>
            <li>Усі відправлені розсилки зберігаються тут</li>
            <li>Ви можете переглянути повне повідомлення та зображення</li>
            <li>Логи зберігаються необмежено (до ручної очистки)</li>
            <li>HTML-стилізація в повідомленнях відображається як є</li>
        </ul>
    </div>
</div>
<?php
}

// Newsletter subscribers management page
function witerok_newsletter_page() {
    global $wpdb;
    $newsletter_table = $wpdb->prefix . 'newsletter_subscribers';
    
    // Handle actions
    if (isset($_GET['action']) && isset($_GET['id'])) {
        $id = intval($_GET['id']);
        
        if ($_GET['action'] === 'delete' && isset($_GET['_wpnonce'])) {
            if (wp_verify_nonce($_GET['_wpnonce'], 'delete_subscriber_' . $id)) {
                $wpdb->delete($newsletter_table, ['id' => $id]);
                echo '<div class="notice notice-success"><p>✅ Підписника видалено!</p></div>';
            }
        }
        
        if ($_GET['action'] === 'toggle_status' && isset($_GET['_wpnonce'])) {
            if (wp_verify_nonce($_GET['_wpnonce'], 'toggle_status_' . $id)) {
                $current = $wpdb->get_var($wpdb->prepare("SELECT status FROM $newsletter_table WHERE id = %d", $id));
                $new_status = ($current === 'active') ? 'inactive' : 'active';
                $wpdb->update($newsletter_table, ['status' => $new_status], ['id' => $id]);
                echo '<div class="notice notice-success"><p>✅ Статус змінено!</p></div>';
            }
        }
    }
    
    // Handle newsletter sending
    if (isset($_POST['send_newsletter']) && check_admin_referer('send_newsletter_action', 'send_newsletter_nonce')) {
        $subject = sanitize_text_field($_POST['newsletter_subject']);
        $message = $_POST['newsletter_message']; // Allow full HTML
        $image_url = '';
        
        // Check if image selected from media library first
        if (!empty($_POST['newsletter_image_url'])) {
            $image_url = esc_url_raw($_POST['newsletter_image_url']);
            error_log('[WiterOK Newsletter] Using media library image: ' . $image_url);
        }
        // Otherwise handle file upload from device
        elseif (!empty($_FILES['newsletter_image']['name']) && !empty($_FILES['newsletter_image']['tmp_name'])) {
            require_once(ABSPATH . 'wp-admin/includes/file.php');
            
            $upload = wp_upload_bits(
                $_FILES['newsletter_image']['name'],
                null,
                file_get_contents($_FILES['newsletter_image']['tmp_name'])
            );
            
            if (empty($upload['error'])) {
                $image_url = $upload['url']; // This is already an absolute URL
                error_log('[WiterOK Newsletter] File uploaded successfully: ' . $image_url);
            } else {
                error_log('[WiterOK Newsletter] File upload error: ' . $upload['error']);
                echo '<div class="notice notice-error"><p>❌ Помилка при завантаженні зображення: ' . esc_html($upload['error']) . '</p></div>';
            }
        }
        
        if (!empty($subject) && !empty($message)) {
            $sent_count = witerok_send_newsletter_to_all($subject, $message, $image_url);
            
            if ($sent_count > 0) {
                echo '<div class="notice notice-success"><p>✅ Розсилка надіслана ' . $sent_count . ' підписникам!</p></div>';
            } else {
                echo '<div class="notice notice-error"><p>❌ Розсилка не була надіслана. Можливі причини:<br>';
                echo '1. Немає активних підписників<br>';
                echo '2. Сервер не налаштований для відправки email<br>';
                echo '3. Проблеми з WordPress mail функцією<br>';
                echo 'Спробуйте налаштувати SMTP плагін.</p></div>';
            }
        } else {
            echo '<div class="notice notice-error"><p>❌ Заповніть тему та повідомлення!</p></div>';
        }
    }
    
    // Get all subscribers
    $subscribers = $wpdb->get_results("SELECT * FROM $newsletter_table ORDER BY subscribed_at DESC");
    $active_count = $wpdb->get_var("SELECT COUNT(*) FROM $newsletter_table WHERE status = 'active'");
    ?>

<div class="wrap">
    <h1>📬 Підписники Newsletter</h1>
    <p>Всього підписників: <strong><?php echo count($subscribers); ?></strong> | Активних: <strong><?php echo $active_count; ?></strong></p>

    <!-- Newsletter sending form -->
    <div style="background: #fff; border: 1px solid #c3c4c7; border-radius: 4px; padding: 20px; margin: 20px 0;">
        <h2>📧 Відправити розсилку</h2>
        <form method="post" action="" enctype="multipart/form-data">
            <?php wp_nonce_field('send_newsletter_action', 'send_newsletter_nonce'); ?>

            <table class="form-table">
                <tr>
                    <th scope="row"><label for="newsletter_subject">Тема листа *</label></th>
                    <td>
                        <input type="text" id="newsletter_subject" name="newsletter_subject" class="regular-text" required placeholder="Наприклад: Нові новини від WiterOK!">
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="newsletter_message">Повідомлення *</label></th>
                    <td>
                        <textarea id="newsletter_message" name="newsletter_message" rows="10" class="large-text" required placeholder="Введіть текст розсилки (HTML допускається)..."></textarea>
                        <p class="description">
                            ✅ Можна використовувати HTML для стилізації. 
                            <br><strong>Приклади:</strong><br>
                            <code>&lt;h2 style="color: #007cba;"&gt;Заголовок&lt;/h2&gt;</code><br>
                            <code>&lt;p style="font-size: 16px; color: #333;"&gt;Текст&lt;/p&gt;</code><br>
                            <code>&lt;strong&gt;Напівжирний текст&lt;/strong&gt;</code><br>
                            <code>&lt;a href="https://example.com"&gt;Посилання&lt;/a&gt;</code>
                        </p>
                    </td>
                </tr>
            </table>

            <p class="submit">
                <input type="submit" name="send_newsletter" class="button button-primary button-large" value="📨 Надіслати всім активним підписникам (<?php echo $active_count; ?>)" onclick="return confirm('Надіслати розсилку всім <?php echo $active_count; ?> активним підписникам?')">
            </p>
        </form>
    </div>

    <!-- Subscribers list -->
    <h2>👥 Список підписників</h2>

    <?php if (empty($subscribers)): ?>
    <div class="notice notice-info">
        <p>📭 Ще немає підписників. Вони з'являться тут після реєстрації через форму на сайті.</p>
    </div>
    <?php else: ?>

    <table class="wp-list-table widefat fixed striped">
        <thead>
            <tr>
                <th style="width: 50px;">ID</th>
                <th style="width: 100px;">Статус</th>
                <th>Ім'я</th>
                <th>Email</th>
                <th style="width: 150px;">Дата підписки</th>
                <th style="width: 150px;">Дії</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($subscribers as $sub): ?>
            <tr style="<?php echo $sub->status === 'inactive' ? 'opacity: 0.6;' : ''; ?>">
                <td>#<?php echo intval($sub->id); ?></td>
                <td>
                    <?php if ($sub->status === 'active'): ?>
                    <span style="color: #00a32a; font-weight: bold;">✓ Активний</span>
                    <?php else: ?>
                    <span style="color: #d63638;">⊘ Неактивний</span>
                    <?php endif; ?>
                </td>
                <td><?php echo esc_html($sub->name); ?></td>
                <td><a href="mailto:<?php echo esc_attr($sub->email); ?>"><?php echo esc_html($sub->email); ?></a></td>
                <td><?php echo date('d.m.Y H:i', strtotime($sub->subscribed_at)); ?></td>
                <td>
                    <a href="<?php echo wp_nonce_url(admin_url('admin.php?page=witerok-newsletter&action=toggle_status&id=' . intval($sub->id)), 'toggle_status_' . intval($sub->id)); ?>" class="button button-small">
                        <?php echo $sub->status === 'active' ? 'Деактивувати' : 'Активувати'; ?>
                    </a>
                    <a href="<?php echo wp_nonce_url(admin_url('admin.php?page=witerok-newsletter&action=delete&id=' . intval($sub->id)), 'delete_subscriber_' . intval($sub->id)); ?>" class="button button-small button-link-delete" onclick="return confirm('Видалити цього підписника?')">Видалити</a>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <?php endif; ?>

    <div class="notice notice-info" style="margin-top:20px;">
        <p><strong>💡 Підказка:</strong></p>
        <ul>
            <li>Розсилка надсилається лише <strong>активним</strong> підписникам</li>
            <li>Підписники можуть відписатися через кнопку в email</li>
            <li>Текст в email має професійний розмір: 16-28px</li>
            <li>Кожен email містить кнопку для відписки</li>
        </ul>
    </div>
</div>
<?php
}

// Function to send news article to all active subscribers
function witerok_send_news_to_subscribers($title, $content, $image_url = '') {
    global $wpdb;
    $newsletter_table = $wpdb->prefix . 'newsletter_subscribers';
    
    $subscribers = $wpdb->get_results("SELECT id, email, name, unsubscribe_token FROM $newsletter_table WHERE status = 'active'");
    
    if (empty($subscribers)) {
        error_log('[WiterOK Newsletter] No active subscribers found');
        return 0;
    }
    
    $sent_count = 0;
    $failed_count = 0;
    $site_url = get_site_url();
    $subject = '📰 ' . $title;
    
    // Create snippet - first 200 chars without HTML tags
    $snippet = wp_trim_words(strip_tags($content), 30);
    
    // Create read more URL
    $news_url = $site_url . '/#news';
    
    foreach ($subscribers as $subscriber) {
        // Generate token if missing
        $token = $subscriber->unsubscribe_token;
        if (empty($token)) {
            $token = bin2hex(random_bytes(32));
            $wpdb->update($newsletter_table, ['unsubscribe_token' => $token], ['id' => $subscriber->id]);
        }
        
        $unsubscribe_url = add_query_arg([
            'token' => $token
        ], $site_url . '/?action=unsubscribe');
        
        // Beautiful HTML email template
        $email_message = '<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            color: #333;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #0073aa 0%, #005a87 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            font-size: 28px;
            font-weight: 600;
            margin: 0;
            letter-spacing: 0.5px;
        }
        .header p {
            font-size: 14px;
            opacity: 0.9;
            margin-top: 5px;
        }
        .content {
            padding: 30px 20px;
        }
        .news-item {
            border-left: 4px solid #0073aa;
            padding-left: 20px;
        }
        .news-item h2 {
            color: #0073aa;
            font-size: 22px;
            margin: 0 0 15px 0;
            font-weight: 600;
        }
        .news-image {
            margin: 20px 0;
            border-radius: 6px;
            overflow: hidden;
        }
        .news-image img {
            max-width: 100%;
            height: auto;
            display: block;
            border-radius: 6px;
        }
        .snippet {
            background-color: #f9f9f9;
            border: 1px solid #e0e0e0;
            border-radius: 6px;
            padding: 15px;
            margin: 20px 0;
            font-size: 15px;
            line-height: 1.7;
            color: #555;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #0073aa 0%, #005a87 100%);
            color: white !important;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
            transition: opacity 0.3s;
        }
        .cta-button:hover {
            opacity: 0.9;
        }
        .divider {
            height: 1px;
            background-color: #e0e0e0;
            margin: 25px 0;
        }
        .footer {
            background-color: #f5f5f5;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e0e0e0;
        }
        .footer-text {
            font-size: 12px;
            color: #777;
            line-height: 1.8;
        }
        .unsubscribe {
            font-size: 12px;
            color: #0073aa;
            text-decoration: none;
        }
        .unsubscribe:hover {
            text-decoration: underline;
        }
        .brand {
            color: #0073aa;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>WiterOK</h1>
            <p>Енергія для майбутнього</p>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="news-item">
                <h2>📰 Нова новина для вас!</h2>
                
                <h3 style="color: #333; font-size: 18px; margin: 15px 0 10px 0;">' . esc_html($title) . '</h3>';
        
        // Add image if available - ensure absolute URL
        if (!empty($image_url)) {
            // Always ensure absolute URL
            if (strpos($image_url, 'http://') === 0 || strpos($image_url, 'https://') === 0) {
                $absolute_image_url = $image_url;
            } else {
                // Relative path - make absolute
                $absolute_image_url = home_url($image_url);
            }
            error_log('[WiterOK Newsletter] News email image URL: ' . $absolute_image_url);
            $email_message .= '
                <div class="news-image">
                    <img src="' . esc_url($absolute_image_url) . '" alt="' . esc_attr($title) . '" style="width: 100%; max-width: 600px; height: auto; border-radius: 6px; display: block; margin: 0;">
                </div>';
        }
        
        $email_message .= '
                <div class="snippet">
                    ' . esc_html($snippet) . '...
                </div>
                
                <a href="' . esc_url($news_url) . '" class="cta-button">→ Читати повну новину</a>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-text">
                <p style="margin: 0 0 10px 0;">
                    © 2024 <span class="brand">WiterOK</span> • Енергія для майбутнього
                </p>
                <p style="margin: 0;">
                    <a href="' . esc_url($unsubscribe_url) . '" class="unsubscribe">Відписатися від розсилки</a>
                </p>
            </div>
        </div>
    </div>
</body>
</html>';
        
        // Use WP Mail SMTP configured sender; set Reply-To to admin email
        $reply_to = get_option('admin_email');
        $mail_result = witerok_send_email(
            $subscriber->email,
            $subject,
            $email_message,
            $reply_to,
            ['X-Mailer: WiterOK Newsletter System']
        );
        
        if ($mail_result) {
            $sent_count++;
            error_log('[WiterOK Newsletter] Email ' . $sent_count . ' sent to: ' . $subscriber->email);
            witerok_log_email($subscriber->email, $subject, $email_message, $image_url);
        } else {
            $failed_count++;
            error_log('[WiterOK Newsletter] Email FAILED for: ' . $subscriber->email);
        }
        
        // Minimal delay - 5ms per email
        usleep(5000);
    }
    
    error_log('[WiterOK Newsletter] News send complete: ' . $sent_count . ' success, ' . $failed_count . ' failed');
    return $sent_count;
}

// Function to send newsletter to all active subscribers
function witerok_send_newsletter_to_all($subject, $message, $image_url = '') {
    global $wpdb;
    $newsletter_table = $wpdb->prefix . 'newsletter_subscribers';
    
    $subscribers = $wpdb->get_results("SELECT id, email, name FROM $newsletter_table WHERE status = 'active'");
    
    if (empty($subscribers)) {
        error_log('[WiterOK Newsletter] No active subscribers found for manual send');
        return 0;
    }
    
    $sent_count = 0;
    $failed_count = 0;
    $site_url = get_site_url();
    
    foreach ($subscribers as $subscriber) {
        // Generate or get unsubscribe token
        $token = $wpdb->get_var($wpdb->prepare("SELECT unsubscribe_token FROM $newsletter_table WHERE id = %d", $subscriber->id));
        if (empty($token)) {
            $token = bin2hex(random_bytes(32));
            $wpdb->update($newsletter_table, ['unsubscribe_token' => $token], ['id' => $subscriber->id]);
        }
        
        $unsubscribe_url = add_query_arg([
            'token' => $token
        ], $site_url . '/?action=unsubscribe');
        
        // Beautiful HTML email template - consistent with news template
        $email_message = '<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            color: #333;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #0073aa 0%, #005a87 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            font-size: 28px;
            font-weight: 600;
            margin: 0;
            letter-spacing: 0.5px;
        }
        .header p {
            font-size: 14px;
            opacity: 0.9;
            margin-top: 5px;
        }
        .content {
            padding: 30px 20px;
        }
        .newsletter-item {
            border-left: 4px solid #0073aa;
            padding-left: 20px;
        }
        .newsletter-image {
            margin: 20px 0;
            border-radius: 6px;
            overflow: hidden;
        }
        .newsletter-image img {
            max-width: 100%;
            height: auto;
            display: block;
            border-radius: 6px;
        }
        .message-body {
            font-size: 15px;
            line-height: 1.8;
            color: #555;
            margin: 15px 0;
        }
        .message-body h2,
        .message-body h3,
        .message-body h4 {
            color: #0073aa;
            margin-top: 15px;
            margin-bottom: 10px;
        }
        .message-body p {
            margin-bottom: 12px;
        }
        .message-body a {
            color: #0073aa;
            text-decoration: none;
            font-weight: 600;
        }
        .message-body a:hover {
            text-decoration: underline;
        }
        .message-body strong {
            color: #333;
            font-weight: 600;
        }
        .divider {
            height: 1px;
            background-color: #e0e0e0;
            margin: 25px 0;
        }
        .footer {
            background-color: #f5f5f5;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e0e0e0;
        }
        .footer-text {
            font-size: 12px;
            color: #777;
            line-height: 1.8;
        }
        .unsubscribe {
            font-size: 12px;
            color: #0073aa;
            text-decoration: none;
        }
        .unsubscribe:hover {
            text-decoration: underline;
        }
        .brand {
            color: #0073aa;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>WiterOK</h1>
            <p>Енергія для майбутнього</p>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="newsletter-item">';
        
        // Add image if provided - ensure absolute URL
        if (!empty($image_url)) {
            // Always ensure absolute URL
            if (strpos($image_url, 'http://') === 0 || strpos($image_url, 'https://') === 0) {
                $absolute_image_url = $image_url;
            } else {
                // Relative path - make absolute
                $absolute_image_url = home_url($image_url);
            }
            error_log('[WiterOK Newsletter] Manual newsletter image URL: ' . $absolute_image_url);
            $email_message .= '
                <div class="newsletter-image">
                    <img src="' . esc_url($absolute_image_url) . '" alt="Newsletter Image" style="width: 100%; max-width: 600px; height: auto; border-radius: 6px; display: block; margin: 0;">
                </div>';
        }
        
        // Add message with styling preserved
        $email_message .= '
                <div class="message-body">
                    ' . $message . '
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-text">
                <p style="margin: 0 0 10px 0;">
                    © 2024 <span class="brand">WiterOK</span> • Енергія для майбутнього
                </p>
                <p style="margin: 0;">
                    <a href="' . esc_url($unsubscribe_url) . '" class="unsubscribe">Відписатися від розсилки</a>
                </p>
            </div>
        </div>
    </div>
</body>
</html>';
        
        // Use WP Mail SMTP configured sender; set Reply-To to admin email
        $reply_to = get_option('admin_email');
        $mail_result = witerok_send_email(
            $subscriber->email,
            $subject,
            $email_message,
            $reply_to,
            ['X-Mailer: WiterOK Newsletter System']
        );
        
        if ($mail_result) {
            $sent_count++;
            witerok_log_email($subscriber->email, $subject, $email_message, $image_url);
            error_log('[WiterOK Newsletter] Email ' . $sent_count . ' sent to: ' . $subscriber->email);
        } else {
            $failed_count++;
            error_log('[WiterOK Newsletter] FAILED to send to: ' . $subscriber->email);
        }
        
        // Minimal delay - 5ms per email to avoid rate limiting
        usleep(5000);
    }
    
    error_log('[WiterOK Newsletter] Manual newsletter complete: ' . $sent_count . ' success, ' . $failed_count . ' failed');
    
    return $sent_count;
}
?>