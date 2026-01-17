# Email Setup Guide for WiterOK Newsletter

## Problem: Emails Not Sending

If emails are not being sent from your newsletter, the issue is likely that **WordPress/PHP is not configured to send emails**.

## Solutions

### Solution 1: Use SMTP Plugin (RECOMMENDED)

The easiest way is to use an SMTP plugin that connects to Gmail or another email service.

#### Option A: Using WP Mail SMTP Plugin

1. **Go to WordPress Admin** → **Plugins** → **Add New**
2. **Search for:** "WP Mail SMTP"
3. **Install and Activate**
4. **Go to:** Settings → WP Mail SMTP
5. **Configure:**
   - **From Email:** witerokenergy@gmail.com
   - **From Name:** WiterOK
   - **Mailer:** Gmail
   - **Client ID & Secret:** Follow their Google authentication guide
   - Click "Save Settings"
6. **Test:** Go to Settings → WP Mail SMTP → "Email Test" tab
   - Send a test email to verify it works

#### Option B: Using Mailgun Plugin

1. **Create account** at https://www.mailgun.com (free tier available)
2. **WordPress** → **Plugins** → **Add New**
3. **Search for:** "Mailgun"
4. **Install and Activate**
5. **Configure with your Mailgun API key**

#### Option C: Using SendGrid

1. **Create account** at https://sendgrid.com (100 free emails/day)
2. **Install SendGrid plugin** from WordPress repository
3. **Add API key** in plugin settings
4. **From Email:** witerokenergy@gmail.com

---

### Solution 2: Configure PHP Mail Function (Server Level)

If you have server access via cPanel or SSH:

#### Via cPanel (Shared Hosting):

1. Open **cPanel**
2. Go to **Mail** → **Email Accounts**
3. Make sure the sender email account is created
4. Update WordPress settings to use that email

#### Via SSH/Command Line:

```bash
# Check if mail is installed
which sendmail
which postfix

# If not installed, ask your hosting provider to install it
```

---

### Solution 3: Check Hosting Provider

Some hosting providers block outgoing emails. Contact support and ask:

- "Can I send emails from my website?"
- "Is outgoing mail (SMTP) blocked?"
- "Do you support the WordPress wp_mail() function?"

Common hosting providers with email issues:

- Shared hosting (often blocks mail)
- Cloud services (usually require SMTP configuration)
- Development servers

---

## Debugging: Check Error Logs

Once you make changes, try sending a newsletter and check the logs:

1. **WordPress Error Log:**
   - File: `wp-content/debug.log`
   - Look for lines starting with `[WiterOK Newsletter]`

2. **Check PHP Error Log:**
   - Ask hosting provider for PHP error log location
   - Usually in `logs/` folder

3. **Mail Server Log:**
   - Command: `tail -f /var/log/mail.log` (on Linux servers)

---

## Quick Test: Send Test Email

To test if WordPress can send emails:

1. **Create a test file** at: `wp-content/test-mail.php`

```php
<?php
require_once('../wp-load.php');

$to = 'your-email@example.com';
$subject = 'Test Email from WordPress';
$message = 'If you see this, WordPress email is working!';
$headers = array('Content-Type: text/html; charset=UTF-8');

$result = wp_mail($to, $subject, $message, $headers);

if ($result) {
    echo '✅ Email sent successfully!';
} else {
    echo '❌ Failed to send email. Check error logs.';
}
?>
```

2. **Visit in browser:** `https://witerok.com/wp-content/test-mail.php`
3. **Check your email** (and spam folder)

---

## Recommended: WP Mail SMTP with Gmail

**This is the easiest and most reliable solution:**

1. Install "WP Mail SMTP" plugin
2. Connect to Gmail via OAuth
3. Set From: `witerokenergy@gmail.com`
4. Test it
5. Done!

**Benefits:**

- No server configuration needed
- Reliable delivery
- Good deliverability rates
- Free tier available
- Proper email headers

---

## Still Not Working?

1. **Check logs** for errors
2. **Verify subscriber count** - go to Newsletter admin page
3. **Test with one subscriber** - try sending to just one email first
4. **Use SMTP plugin** - most reliable solution
5. **Contact hosting support** - they may be blocking email
6. **Check email address** - make sure `witerokenergy@gmail.com` is valid

---

## Final Checklist

- [ ] WordPress is installed and working
- [ ] You have active newsletter subscribers
- [ ] SMTP plugin is installed (WP Mail SMTP recommended)
- [ ] SMTP is configured with valid credentials
- [ ] Test email was sent successfully
- [ ] You can receive the test email
- [ ] Newsletter sends to all subscribers

Once these are checked, your newsletter will work!
