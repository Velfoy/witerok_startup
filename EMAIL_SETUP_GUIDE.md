# Email Setup Guide for Contact Form

The contact form is now configured to send emails using EmailJS. Follow these steps to complete the setup:

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. After logging in, go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended):
   - Select **Gmail**
   - Click **Connect Account**
   - Sign in with your **witerokgreenenergy@gmail.com** account
   - Allow EmailJS to send emails on your behalf
4. Note down your **Service ID** (something like `service_abc123`) service_uwbyzph

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template configuration:

**Template Name:** Contact Form Submission

**Subject:** New Contact Form Submission from {{from_name}}

**Content:**

```
You have received a new message from your WITERoK website contact form:

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}

Message:
{{message}}

---
This email was sent from the WITERoK contact form.
Reply directly to {{from_email}} to respond to this inquiry.
```

4. Click **Save**
5. Note down your **Template ID** (something like `template_xyz789`) template_nfdio7x

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in the EmailJS dashboard
2. Find your **Public Key** (something like `abcdefGHIJKLMN123`)YUxLzl3lgSGwaVhSy
3. Copy this key

## Step 5: Update ContactSection.tsx

Open `src/components/ContactSection.tsx` and replace these placeholders around line 45-47:

```typescript
const serviceId = "YOUR_SERVICE_ID"; // Replace with your Service ID from Step 2
const templateId = "YOUR_TEMPLATE_ID"; // Replace with your Template ID from Step 3
const publicKey = "YOUR_PUBLIC_KEY"; // Replace with your Public Key from Step 4
```

**Example:**

```typescript
const serviceId = "service_abc123";
const templateId = "template_xyz789";
const publicKey = "abcdefGHIJKLMN123";
```

## Step 6: Test the Form

1. Save all changes
2. Run `npm run dev` if not already running
3. Navigate to the contact section on your website
4. Fill out and submit the form
5. Check your **witerokgreenenergy@gmail.com** inbox for the test email

## Important Notes

- **Free Plan Limits:** EmailJS free plan includes 200 emails/month
- **Email Delivery:** Emails usually arrive within seconds
- **Spam Folder:** Check spam if you don't see the email
- **From Address:** Emails will come from EmailJS but include the sender's info in the body

## Troubleshooting

### Form shows "Failed to send" error:

- Check that all three IDs (serviceId, templateId, publicKey) are correct
- Verify your EmailJS account is active
- Check browser console for specific error messages

### Emails not arriving:

- Check spam/junk folder
- Verify the Gmail account is properly connected in EmailJS dashboard
- Ensure you haven't exceeded the 200 emails/month limit

### Need more emails per month?

- Upgrade to EmailJS paid plan ($7.50/month for 1000 emails)
- Or implement a backend server with Nodemailer

## Alternative: Backend Solution

If you prefer a backend solution instead of EmailJS:

1. Create a simple Node.js/Express backend
2. Use Nodemailer with Gmail SMTP
3. Deploy to Vercel/Railway/Render
4. Update the form to POST to your API endpoint

Would you like help implementing a backend solution instead?
