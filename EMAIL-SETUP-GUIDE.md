# Nodemailer Contact Form Setup Guide

## ✅ Integration Complete

Your contact form popup is now fully integrated with Nodemailer and ready to send emails.

## Configuration Required

### 1. Update .env File

Open your `.env` file and replace the placeholder values with your actual Gmail credentials:

```env
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
PORT=3000
```

### 2. Gmail App Password Setup

**IMPORTANT:** You cannot use your regular Gmail password. You must create an App Password.

#### Steps to Create Gmail App Password:

1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Enable "2-Step Verification" if not already enabled
4. After enabling 2FA, go back to Security
5. Scroll down to "2-Step Verification" section
6. Click on "App passwords" at the bottom
7. Select "Mail" as the app and "Other" as the device
8. Name it "Amenus Website" or similar
9. Click "Generate"
10. Copy the 16-character password (no spaces)
11. Paste it in your `.env` file as `SMTP_PASSWORD`

### Alternative: Use Other Email Services

If you prefer not to use Gmail, you can modify the transporter configuration:

#### For Outlook/Hotmail:
```javascript
const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});
```

#### For Custom SMTP Server:
```javascript
const transporter = nodemailer.createTransport({
    host: "smtp.yourdomain.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});
```

## How It Works

### 1. User Flow
1. User clicks "Connect With Me!" button
2. Contact modal popup opens
3. User fills in: Name, Email, Message
4. User clicks "Send Message"
5. Form data is sent to `/contact` endpoint via AJAX
6. Server validates and sends email
7. User sees success/error message
8. Modal closes automatically on success

### 2. Server Processing
- **Validation**: Checks all fields are filled and email format is valid
- **Email Sending**: Uses Nodemailer to send formatted HTML email
- **Response**: Returns success or error message to the popup
- **Logging**: Logs submission details to console

### 3. Email Format
The email sent to you includes:
- Professional HTML formatting
- Sender's name
- Sender's email (clickable)
- Message content (preserves line breaks)
- Branded header with your site colors
- Footer with source information

## Testing

### 1. Start the Server
```bash
npm start
```

### 2. Test the Contact Form
1. Open http://localhost:3000
2. Click "Connect With Me!" button
3. Fill in the form with test data
4. Click "Send Message"
5. Check your email inbox for the message

### 3. Check Console Output
You should see:
```
Server is running on http://localhost:3000
Email server is ready to send messages
Contact form submitted by [Name] ([Email])
```

## Troubleshooting

### Error: "Email transporter configuration error"
- Check your `.env` file has correct credentials
- Verify you're using an App Password, not regular password
- Ensure 2FA is enabled on your Gmail account

### Error: "Failed to send email"
- Check your internet connection
- Verify Gmail App Password is correct
- Check if Gmail is blocking the connection
- Try generating a new App Password

### Form doesn't submit
- Check browser console for JavaScript errors
- Verify `/contact` route is accessible
- Ensure all form fields have correct `name` attributes

### Email not received
- Check spam/junk folder
- Verify `SMTP_EMAIL` in `.env` is correct
- Check Gmail "Sent" folder to confirm email was sent
- Wait a few minutes (sometimes delayed)

## Security Notes

✅ **Implemented:**
- Environment variables for sensitive data
- Input validation (required fields, email format)
- Error handling without exposing system details
- HTTPS recommended for production

⚠️ **Recommendations:**
- Never commit `.env` file to version control
- Use rate limiting to prevent spam (consider `express-rate-limit`)
- Add CAPTCHA for production (Google reCAPTCHA)
- Use HTTPS in production
- Consider adding honeypot field for bot protection

## Production Deployment

Before deploying to production:

1. **Set Environment Variables** on your hosting platform:
   - Heroku: `heroku config:set SMTP_EMAIL=your-email@gmail.com`
   - Vercel: Add in project settings
   - AWS/DigitalOcean: Add to environment configuration

2. **Update Email Recipient** (if needed):
   In `server.js`, change the `to:` field to your production email

3. **Add Rate Limiting** (recommended):
   ```bash
   npm install express-rate-limit
   ```
   
   Then in `server.js`:
   ```javascript
   const rateLimit = require('express-rate-limit');
   
   const contactLimiter = rateLimit({
       windowMs: 15 * 60 * 1000, // 15 minutes
       max: 3, // limit each IP to 3 requests per windowMs
       message: 'Too many contact form submissions, please try again later.'
   });
   
   app.post("/contact", contactLimiter, async(req, res) => {
       // ... existing code
   });
   ```

4. **Test thoroughly** before going live

## Files Modified

- ✅ `server.js` - Enhanced with validation and better error handling
- ✅ `.env` - Needs your actual credentials
- ⚠️ No other files were modified (as requested)

## Support

If you encounter issues:
1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Test with a simple email first
4. Review the troubleshooting section above

---

**Your contact form is ready to use!** Just add your Gmail credentials to `.env` and start the server.
