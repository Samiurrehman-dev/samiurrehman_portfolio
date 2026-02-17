# SMTP Setup Instructions

## Gmail SMTP Configuration

To enable contact form email functionality, follow these steps:

### 1. Enable 2-Factor Authentication
- Go to your Google Account: https://myaccount.google.com/
- Navigate to Security
- Enable 2-Step Verification

### 2. Generate App Password
- Go to: https://myaccount.google.com/apppasswords
- Select "Mail" and "Windows Computer" (or Other)
- Click "Generate"
- Copy the 16-character password (remove spaces)

### 3. Update .env File
Edit the `.env` file in the root directory:

```env
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
ADMIN_EMAIL=your-email@gmail.com
```

Replace:
- `your-email@gmail.com` with your actual Gmail address
- `your-16-char-app-password` with the App Password from step 2
- `ADMIN_EMAIL` is where contact form submissions will be sent

### 4. Restart Server
After updating .env, restart your development server:
```bash
npm run dev
```

## Features Implemented

✅ **Email to Admin**: You'll receive formatted notifications of all contact form submissions
✅ **Confirmation Email**: Users receive an automated thank you email with their message copy
✅ **Form Validation**: Server-side validation for required fields and email format
✅ **Loading State**: Button shows loading spinner during submission
✅ **Success/Error Messages**: Clear feedback to users about submission status
✅ **Professional Templates**: Beautiful HTML email templates with your branding
✅ **Error Handling**: Graceful error handling with user-friendly messages

## Testing

1. Fill out the contact form on `/contact` page
2. Check your inbox (ADMIN_EMAIL) for the notification
3. Check the sender's email for the confirmation message

## Alternative SMTP Providers

If you don't want to use Gmail, you can modify `server/routes/contact.ts`:

### SendGrid
```typescript
const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
});
```

### Mailgun
```typescript
const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASS,
  },
});
```

### Custom SMTP
```typescript
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
```

## Troubleshooting

**Error: Invalid credentials**
- Double-check your Gmail address and App Password
- Make sure there are no spaces in the App Password
- Verify 2FA is enabled on your Google Account

**Error: Connection timeout**
- Check your internet connection
- Some networks block SMTP ports - try a different network
- Consider using a different port (465 with secure: true)

**Emails not received**
- Check spam/junk folders
- Verify ADMIN_EMAIL is correct
- Check Gmail's "Sent" folder to confirm emails were sent

**Rate limiting**
- Gmail has sending limits (500 emails/day for free accounts)
- For production, consider using a dedicated email service like SendGrid or Mailgun
