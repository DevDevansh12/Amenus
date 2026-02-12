# How to Find Your SMTP Settings for hello@amenus.online

## Step 1: Identify Your Email Hosting Provider

Run this command in your terminal to see where your email is hosted:

```bash
nslookup -type=mx amenus.online
```

This will show something like:
```
amenus.online   mail exchanger = 10 mail.amenus.online
```

The mail server name will tell you who hosts your email.

## Step 2: Common SMTP Settings by Provider

### If you see "hostinger" in the mail server:
```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_EMAIL=hello@amenus.online
SMTP_PASSWORD=your-email-password
```

### If you see "google" or "googlemail":
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_EMAIL=hello@amenus.online
SMTP_PASSWORD=your-app-password
```
Note: You need to set up Google Workspace and use App Password

### If you see "outlook" or "office365":
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_EMAIL=hello@amenus.online
SMTP_PASSWORD=your-email-password
```

### If you see "zoho":
```env
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_EMAIL=hello@amenus.online
SMTP_PASSWORD=your-email-password
```

### If you see your domain name (mail.amenus.online):
This means you're using your hosting provider's mail server.

**Try these common configurations:**

**Option A (Most common):**
```env
SMTP_HOST=mail.amenus.online
SMTP_PORT=587
SMTP_SECURE=false
SMTP_EMAIL=hello@amenus.online
SMTP_PASSWORD=your-email-password
```

**Option B (Alternative):**
```env
SMTP_HOST=smtp.amenus.online
SMTP_PORT=587
SMTP_SECURE=false
SMTP_EMAIL=hello@amenus.online
SMTP_PASSWORD=your-email-password
```

**Option C (SSL):**
```env
SMTP_HOST=mail.amenus.online
SMTP_PORT=465
SMTP_SECURE=true
SMTP_EMAIL=hello@amenus.online
SMTP_PASSWORD=your-email-password
```

## Step 3: Find Settings in Your Hosting Control Panel

### For cPanel (most common):
1. Log into your hosting control panel
2. Go to "Email Accounts"
3. Click "Configure Email Client" next to hello@amenus.online
4. Look for "Mail Client Manual Settings"
5. Find the "Outgoing Server (SMTP)" section
6. Copy the settings

### For Plesk:
1. Log into Plesk
2. Go to "Mail" → "Email Addresses"
3. Click on hello@amenus.online
4. Look for "External Email Settings" or "Mail Settings"

### For DirectAdmin:
1. Log into DirectAdmin
2. Go to "Email Accounts"
3. Click "Configure Email Client"
4. Find SMTP settings

## Step 4: Test Your Email Login

Before using SMTP, verify your email credentials work:

1. Go to your webmail (usually https://webmail.amenus.online or https://amenus.online/webmail)
2. Try logging in with:
   - Username: `hello@amenus.online` (or just `hello`)
   - Password: Your email password

If webmail login works, use the same credentials for SMTP.

## Step 5: Contact Your Hosting Provider

If you still can't find the settings, contact your hosting provider's support and ask:

> "Hi, I need the SMTP settings for my email address hello@amenus.online. 
> Specifically, I need:
> - SMTP Host/Server
> - SMTP Port
> - Whether to use SSL/TLS
> - Authentication method
> 
> I'm setting up a contact form on my website."

They should provide you with the exact settings.

## Step 6: Update Your .env File

Once you have the correct settings, update your `.env` file:

```env
SMTP_HOST=your-smtp-host-here
SMTP_PORT=587
SMTP_SECURE=false
SMTP_EMAIL=hello@amenus.online
SMTP_PASSWORD=your-actual-password
PORT=3000
```

## Step 7: Restart and Test

```bash
npm run dev
```

Look for:
```
✅ Email server is ready to send messages
```

If you see this, your configuration is correct!

## Quick Alternative: Use Gmail Temporarily

While you figure out your domain email settings, you can use Gmail:

1. Create/use a Gmail account
2. Enable 2FA: https://myaccount.google.com/security
3. Create App Password: https://myaccount.google.com/apppasswords
4. Update .env:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_EMAIL=your-gmail@gmail.com
SMTP_PASSWORD=your-16-char-app-password
PORT=3000
```

This will work immediately and you can switch to your domain email later.

---

**Still stuck?** Let me know your hosting provider name and I can provide exact settings.
