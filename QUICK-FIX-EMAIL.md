# 🚨 Quick Fix for Email Error

## The Problem

You're trying to use `hello@amenus.online` with Gmail's SMTP server (`smtp.gmail.com`), which doesn't work because:
- Gmail only accepts Gmail addresses (@gmail.com)
- Your domain email needs your hosting provider's SMTP settings

## ✅ Quick Solution (Choose One)

### Option 1: Use Gmail for Testing (Fastest)

1. **Update your .env file:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_EMAIL=your-personal-gmail@gmail.com
SMTP_PASSWORD=your-app-password-here
PORT=3000
```

2. **Get Gmail App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Enable 2FA if not enabled
   - Create app password for "Mail"
   - Copy the 16-character password (no spaces)
   - Paste it as `SMTP_PASSWORD`

3. **Restart server:**
```bash
npm run dev
```

### Option 2: Use Your Domain Email (Production Ready)

You need to find your hosting provider's SMTP settings.

#### If you're using Hostinger, cPanel, or similar:

1. **Update your .env file:**
```env
SMTP_HOST=mail.amenus.online
SMTP_PORT=587
SMTP_SECURE=false
SMTP_EMAIL=hello@amenus.online
SMTP_PASSWORD=your-email-password
PORT=3000
```

2. **Common SMTP hosts by provider:**
   - **Hostinger**: `mail.amenus.online` or `smtp.hostinger.com`
   - **GoDaddy**: `smtpout.secureserver.net`
   - **Namecheap**: `mail.privateemail.com`
   - **Bluehost**: `mail.amenus.online`
   - **SiteGround**: `mail.amenus.online`

3. **How to find your SMTP settings:**
   - Log into your hosting control panel (cPanel)
   - Look for "Email Accounts" or "Email Settings"
   - Find SMTP configuration
   - Or contact your hosting support

#### If you don't know your hosting provider:

Run this command to check:
```bash
nslookup -type=mx amenus.online
```

This will show your mail server. Contact that provider for SMTP settings.

### Option 3: Use SendGrid (Free & Reliable)

1. **Sign up at SendGrid:**
   - Go to: https://sendgrid.com
   - Free tier: 100 emails/day (perfect for contact forms)

2. **Create API Key:**
   - Dashboard → Settings → API Keys
   - Create API Key with "Mail Send" permission
   - Copy the key

3. **Update your .env file:**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_EMAIL=apikey
SMTP_PASSWORD=your-sendgrid-api-key-here
PORT=3000
```

4. **Verify sender email:**
   - SendGrid → Settings → Sender Authentication
   - Verify hello@amenus.online

## 🧪 Test Your Configuration

After updating .env:

1. **Restart the server:**
```bash
npm run dev
```

2. **Look for this message:**
```
Email server is ready to send messages
```

3. **If you see an error:**
   - Double-check your credentials
   - Verify SMTP_HOST is correct
   - Try SMTP_PORT=465 with SMTP_SECURE=true
   - Check if your email provider requires SSL

4. **Test the form:**
   - Open http://localhost:3000
   - Click "Connect With Me!"
   - Fill and submit the form
   - Check your email inbox

## 🔍 Debugging

### Error: "Invalid login"
- Wrong username or password
- For Gmail: Must use App Password, not regular password
- For domain email: Check with hosting provider

### Error: "Connection timeout"
- Wrong SMTP_HOST
- Firewall blocking port 587 or 465
- Try alternative port

### Error: "Self-signed certificate"
- Already handled in code with `rejectUnauthorized: false`
- If still failing, contact hosting provider

### Still not working?

1. **Check your current .env file:**
```bash
type .env
```

2. **Verify email credentials work:**
   - Try logging into webmail with same credentials
   - If webmail works, SMTP should work too

3. **Contact your hosting provider:**
   - Ask for: "SMTP settings for hello@amenus.online"
   - They'll provide: host, port, and confirm password

## 📝 My Recommendation

**For immediate testing:** Use Option 1 (Gmail)
**For production:** Use Option 3 (SendGrid) - it's free, reliable, and professional

---

**Need help?** Check which hosting provider you're using and I can provide exact SMTP settings.
