# Mailchimp Newsletter Setup Guide

## Step 1: Create Mailchimp Account

1. Go to https://mailchimp.com
2. Sign up for a **Free account** (500 contacts, 1,000 emails/month)
3. Verify your email address

## Step 2: Create an Audience (Mailing List)

1. Click **Audience** in the left menu
2. Click **Create Audience** or **Manage Audience**
3. Fill in:
   - **Audience name**: WITERoK Newsletter
   - **Default From name**: WITERoK
   - **Default From email**: your verified email
   - **Contact information**: Your company details
4. Click **Save**

## Step 3: Get Audience ID

1. Go to **Audience** > **Settings** > **Audience name and defaults**
2. Look for **Audience ID** (e.g., `a1b2c3d4e5`)
3. Copy this ID

## Step 4: Create API Key

1. Click your profile icon (top right)
2. Go to **Account & Billing** > **Extras** > **API keys**
3. Click **Create A Key**
4. Name it: `WITERoK Website`
5. Copy the API key (e.g., `abc123def456...xyz-us21`)
   - **Important**: The key ends with datacenter code like `-us21`, `-us19`, etc.

## Step 5: Update Code

Open `src/components/NewsletterSection.tsx` and replace (around lines 34-35):

```typescript
const API_KEY = "YOUR_MAILCHIMP_API_KEY"; // Your full API key with datacenter
const AUDIENCE_ID = "YOUR_AUDIENCE_ID"; // Your Audience ID from step 3
```

**Example:**

```typescript
const API_KEY = "abc123def456ghi789jkl012mno345pqr-us21";
const AUDIENCE_ID = "a1b2c3d4e5";
```

## Step 6: Test Subscription

1. Start dev server: `npm run dev`
2. Navigate to Newsletter section
3. Enter test email
4. Check Mailchimp Audience dashboard for new subscriber

## How to Send Newsletters

### Via Mailchimp Dashboard:

1. Go to **Campaigns** > **Create Campaign**
2. Choose **Regular Email Campaign**
3. Select your audience: WITERoK Newsletter
4. Design email using drag-and-drop builder
5. Preview and send to all subscribers

### When to Send:

- Company announcements
- New product features
- Partnership news
- Event invitations
- Monthly updates

## Features You Get:

✅ **Automatic subscriber management**

- Subscribers added instantly
- Unsubscribe links handled automatically
- Duplicate prevention

✅ **Professional email campaigns**

- Drag-and-drop email builder
- Mobile-responsive templates
- A/B testing (paid plans)

✅ **Analytics**

- Open rates
- Click rates
- Geographic data
- Device usage

✅ **Automation** (paid plans)

- Welcome emails
- Abandoned cart reminders
- Birthday emails

## CORS Issues? Use Backend Proxy

If you encounter CORS errors, create a simple backend endpoint:

### Option 1: Netlify Function

Create `netlify/functions/subscribe.js`:

```javascript
exports.handler = async (event) => {
  const { email } = JSON.parse(event.body);

  const response = await fetch(
    `https://us21.api.mailchimp.com/3.0/lists/YOUR_AUDIENCE_ID/members`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`anystring:YOUR_API_KEY`).toString(
          "base64"
        )}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
      }),
    }
  );

  return {
    statusCode: response.status,
    body: JSON.stringify(await response.json()),
  };
};
```

Then update NewsletterSection.tsx to call:

```typescript
const response = await fetch("/.netlify/functions/subscribe", {
  method: "POST",
  body: JSON.stringify({ email }),
});
```

### Option 2: Vercel Serverless Function

Create `api/subscribe.js` with similar code

## Security Best Practice: Environment Variables

Create `.env` file:

```
VITE_MAILCHIMP_API_KEY=your_api_key_here
VITE_MAILCHIMP_AUDIENCE_ID=your_audience_id_here
```

Update NewsletterSection.tsx:

```typescript
const API_KEY = import.meta.env.VITE_MAILCHIMP_API_KEY;
const AUDIENCE_ID = import.meta.env.VITE_MAILCHIMP_AUDIENCE_ID;
```

Add to `.gitignore`:

```
.env
.env.local
```

## Troubleshooting

**CORS Error**: Use backend proxy (see above)
**401 Unauthorized**: Check API key is correct
**404 Not Found**: Verify Audience ID and datacenter in API key match
**"Member Exists"**: Email already subscribed (handled in code)
**Rate Limiting**: Free tier limits apply

## Free Tier Limits

- 500 contacts
- 1,000 emails/month (campaign sends)
- 1 Audience
- Basic templates
- 24/7 email support

Perfect for startups! Upgrade when you exceed limits.

## Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Sign up for a free account (200 emails/month)
3. Verify your email address

## Step 2: Add Email Service

1. Go to **Email Services** in dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect and authenticate your email
5. Copy the **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to **Email Templates** in dashboard
2. Click **Create New Template**
3. Use this template structure:

**Template Name:** `newsletter_subscription`

**Subject:** `New Newsletter Subscription - WITERoK`

**Content:**

```
New subscriber to WITERoK newsletter:

Email: {{subscriber_email}}

Date: {{current_date}}

---
This email was sent automatically from your WITERoK website newsletter subscription form.
```

4. Copy the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key

1. Go to **Account** > **General**
2. Find your **Public Key** (e.g., `abcdefg123456`)
3. Copy it

## Step 5: Update Code

Open `src/components/NewsletterSection.tsx` and replace these lines (around line 26-28):

```typescript
const SERVICE_ID = "YOUR_SERVICE_ID"; // Replace with your Service ID
const TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // Replace with your Template ID
const PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // Replace with your Public Key
```

## Step 6: (Optional) Auto-Reply Template

To send a confirmation email to subscribers:

1. Create another template named `newsletter_confirmation`
2. **To Email:** `{{subscriber_email}}`
3. **Subject:** `Welcome to WITERoK Newsletter!`
4. **Content:**

```
Дякуємо за підписку на розсилку WITERoK!

Ви будете отримувати останні новини про наші інновації у вітроенергетиці.

---

Thank you for subscribing to WITERoK newsletter!

You will receive the latest news about our wind energy innovations.

З повагою / Best regards,
Команда WITERoK / WITERoK Team
```

5. In NewsletterSection.tsx, add second emailjs.send() call for auto-reply

## Testing

1. Start dev server: `npm run dev`
2. Navigate to Newsletter section
3. Enter a test email
4. Check your inbox for notification email

## Troubleshooting

- **CORS errors**: Make sure Public Key is correct
- **403 errors**: Check Service ID and Template ID
- **No emails**: Verify email service is connected and active
- **Rate limit**: Free tier allows 200 emails/month

## Alternative: Environment Variables

For security, use environment variables:

1. Create `.env` file in project root:

```
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=abcdefg123456
```

2. Update NewsletterSection.tsx:

```typescript
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
```

3. Add `.env` to `.gitignore` to keep keys private
