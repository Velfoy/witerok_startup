# WP Mail SMTP Setup Guide for WiterOK Newsletter

## Step 1: Install the Plugin

1. **Go to WordPress Admin** → **Plugins** → **Add New**
2. **Search:** `WP Mail SMTP`
3. **Click:** "Install Now" (by WP Mail SMTP)
4. **Click:** "Activate"

You should see: "WP Mail SMTP by WPForms" in your plugins list

---

## Step 2: Configure Gmail Authentication

### Option A: Gmail with Google Account (Recommended)

1. **Go to:** WordPress Admin → **Settings** → **WP Mail SMTP**
2. **Under "From Email":** Enter `witerokenergy@gmail.com`
3. **Under "From Name":** Enter `WiterOK`
4. **Mailer:** Select `Gmail` from dropdown
5. **Click:** "Google Authentication" or "Authenticate"
   - Browser will open Google login
   - Sign in with `witerokenergy@gmail.com`
   - Click "Allow" to give permission
   - You'll be redirected back to WordPress
6. **Click:** "Save Settings"

### Option B: Gmail with App Password (If 2FA Enabled)

If the above doesn't work, use app-specific password:

1. **Go to:** https://myaccount.google.com/apppasswords
2. **Sign in** with `witerokenergy@gmail.com`
3. **Select App:** Choose `Mail`
4. **Select Device:** Choose `Windows PC`
5. **Generate** - Google will show a 16-character password
6. **Copy** the password
7. **Back to WordPress:**
   - Mailer: `Other SMTP`
   - SMTP Host: `smtp.gmail.com`
   - SMTP Port: `465`
   - Encryption: `SSL`
   - Username: `witerokenergy@gmail.com`
   - Password: Paste the 16-character password from Google
8. **Click:** "Save Settings"

---

## Step 3: Test Email Sending

1. **In WP Mail SMTP settings page**
2. **Scroll down** to **"Email Test"** section
3. **Enter your test email:** (e.g., your personal email)
4. **Click:** "Send Test Email"
5. **Check your inbox** (and spam folder)
   - If you receive it ✅ **PLUGIN IS WORKING!**
   - If nothing arrives ❌ Check settings and try again

---

## Step 4: React Integration (No Changes Needed!)

**Good news:** Your React application **does NOT need any changes!**

The plugin works at the PHP/WordPress level, so:

1. ✅ Newsletter subscription still works the same
2. ✅ Automatic newsletter sending works the same
3. ✅ Your code doesn't need updating
4. ✅ Emails will now actually send to subscribers

### How It Works:

```
React App
   ↓ (form submission)
API → newsletter.php
   ↓ (calls wp_mail)
WP Mail SMTP (intercepts)
   ↓ (uses Gmail SMTP)
Gmail Server
   ↓ (sends email)
Subscriber Email
```

---

## Step 5: Verify Your Newsletter System

Once WP Mail SMTP is configured:

### Test 1: Manual Newsletter

1. **Go to:** WordPress Admin → **📬 Newsletter**
2. **Click:** "📨 Надіслати всім активним підписникам"
3. **Fill in:**
   - **Тема листа:** "Test Newsletter"
   - **Повідомлення:** "This is a test message"
4. **Click:** "📨 Надіслати"
5. **Check logs:** `wp-content/debug.log`
   - Should show: `[WiterOK Newsletter] Email sent to: subscriber@email.com`
6. **Check email** - you should receive it!

### Test 2: Automatic Newsletter (Publish News)

1. **Go to:** WordPress Admin → **🗞️ Прості новини**
2. **Click:** "Додати нову новину"
3. **Fill in:**
   - **Заголовок:** "Test News Article"
   - **Текст новини:** "This is test content"
   - **Статус:** Select "Опублікована"
4. **Click:** "➕ Додати новину"
5. **Message should say:** "Новина додана та надіслана X підписникам!"
6. **Check your email** - newsletter should arrive!

---

## Troubleshooting

### Problem: "Authentication failed"

**Solution:**

- Make sure you're using the correct Gmail account (`witerokenergy@gmail.com`)
- Try App Password method instead of OAuth
- Check that Gmail account exists and has no security blocks

### Problem: "Test email didn't arrive"

**Solutions:**

1. Check spam/promotions folder
2. Try sending to a different email address
3. Check WP Mail SMTP error log:
   - Look in settings page for error messages
4. Enable debug mode to see what's happening:
   - Add to `wp-config.php`:
   ```php
   define('WP_DEBUG', true);
   define('WP_DEBUG_LOG', true);
   ```

   - Check `wp-content/debug.log`

### Problem: "No active subscribers found"

**Solution:**

- Go to **📬 Newsletter**
- Check if you have any active subscribers
- Make sure subscriber status is "Активний" (Active)

---

## Final Checklist

- [ ] WP Mail SMTP installed and activated
- [ ] Gmail authentication completed
- [ ] Test email sent and received
- [ ] Newsletter admin shows success message
- [ ] Check `wp-content/debug.log` shows email sent logs
- [ ] Manual newsletter test successful
- [ ] Automatic newsletter (publish news) test successful

---

## What Happens Now?

✅ **Your newsletter system is complete!**

Users who subscribe on your React website will:

1. Get confirmation email from `witerokenergy@gmail.com`
2. Receive newsletters when you publish news
3. Can unsubscribe via link in email
4. All managed through WordPress admin

**No React code changes needed.** The plugin handles everything at the server level!

---

## If You Still Have Issues

1. **Check error logs:** `wp-content/debug.log`
2. **Test with WordPress:** Try sending from WordPress admin first
3. **Contact Gmail support:** If authentication fails
4. **Check hosting:** Some hosts block outgoing mail (contact support)
5. **Use alternative:** Consider Mailgun or SendGrid if Gmail doesn't work

---

## Next Steps

After confirming everything works:

1. ✅ Users can subscribe from React website
2. ✅ They receive confirmation email
3. ✅ You publish news in WordPress
4. ✅ Newsletter automatically sent to subscribers
5. ✅ Subscribers can unsubscribe from email link

**Your newsletter system is live!** 🚀
