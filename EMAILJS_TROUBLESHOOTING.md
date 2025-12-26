# EmailJS Troubleshooting Guide

Your EmailJS credentials are configured:

- **Service ID:** service_uwbyzph
- **Template ID:** template_nfdio7x
- **Public Key:** YUxLzl3lgSGwaVhSy
- **Recipient Email:** marsonyteam@gmail.com

## Error: "The recipients address is empty"

**This is the most common error!**

### Quick Fix:

1. Go to [https://dashboard.emailjs.com/admin/services](https://dashboard.emailjs.com/admin/services)
2. Click your **Gmail service**
3. Find the **"Default To Email"** field
4. Enter: `marsonyteam@gmail.com`
5. Click **Save**
6. Wait 2 minutes, then test the form again

---

## If emails are not working, try these steps:

### 1. Check Browser Console for Errors

- Open your website in Firefox/Chrome
- Press F12 to open Developer Tools
- Go to **Console** tab
- Fill out and submit the contact form
- Look for error messages (will be red)
- Screenshot and share any errors

### 2. Verify EmailJS Service Setup

Go to [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/) and:

**A. Check if Gmail is connected:**

1. Click **Email Services** in sidebar
2. Find your Gmail service (should show as "Gmail")
3. Verify status is **Active** (green checkmark)
4. If not connected, click the service and re-authorize Gmail account

**B. Verify email destination:**

1. In Email Service settings, look for "Default To Email"
2. It should be: `marsonyteam@gmail.com`
3. If not, update it

### 3. Check Email Template

Go to **Email Templates** and verify your template:

**Template Name:** Should match template_nfdio7x

**Template variables used should be:**

- `{{from_name}}`
- `{{from_email}}`
- `{{company}}`
- `{{message}}`

**Example template content:**

```
You have a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}

Message:
{{message}}
```

If template is missing or variables don't match, create a new one with the above.

### 4. Test with EmailJS Dashboard

1. Go to **Email Templates**
2. Select your template
3. Click **Test it** button
4. Fill in test variables:
   - from_name: "Test"
   - from_email: "test@example.com"
   - company: "Test Co"
   - message: "Test message"
5. Click **Send**
6. Check if email arrives at marsonyteam@gmail.com

If dashboard test works but form doesn't, the issue is with form configuration.

### 5. Check Gmail Spam Settings

Even if sent successfully:

1. Log into marsonyteam@gmail.com
2. Check **Spam** folder (emails might go there)
3. If found in spam, mark as "Not spam"

### 6. Verify Gmail Security

For marsonyteam@gmail.com:

1. Go to [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Look for "Less secure app access"
3. If it says **Off**, you may need to enable it
4. Or create an **App Password** instead:
   - Enable 2-Step Verification first
   - Then create App Password for EmailJS

### 7. Check Free Plan Limits

EmailJS free plan:

- ✅ 200 emails per month
- ✅ Unlimited email addresses
- ✅ Full template support

You should be fine unless you've sent 200+ emails this month.

### 8. Re-authenticate Gmail in EmailJS

If nothing works:

1. Go to [https://dashboard.emailjs.com/admin/services](https://dashboard.emailjs.com/admin/services)
2. Delete the Gmail service
3. Click **Add New Service** → **Gmail**
4. Sign in with marsonyteam@gmail.com
5. Grant permissions
6. Wait 5 minutes for changes to propagate

### 9. Check Form Validation

The form now requires:

- ✅ Name (required)
- ✅ Email (required)
- ✅ Message (required)
- Company (optional)

Make sure all required fields are filled when testing.

## Still not working?

1. **Check browser console** (F12 → Console) for the exact error
2. **Share the error message** with the development team
3. **Try the template test** from EmailJS dashboard
4. **Check spam folder** in Gmail

## Alternative: Direct Email Link

If EmailJS doesn't work, users can click the email address to open their email client:

- Contact card shows: marsonyteam@gmail.com
- They can click and send directly

This is already built-in as a fallback!

## Need Help?

- EmailJS Docs: https://www.emailjs.com/docs/
- Support: https://www.emailjs.com/contact/
- Common issues: https://www.emailjs.com/docs/faq/
