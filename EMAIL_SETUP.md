# Email System Setup Guide

AiDocs uses Nodemailer to send transactional emails (like password resets).

## Option 1: Gmail (Quickest for Development)
1. Log into your Gmail account.
2. Go to **Security** → **2-Step Verification** (must be ON).
3. Scroll to the bottom and click **App Passwords**.
4. Select App: "Other", Name: "SwiftDocs AI".
5. Copy the 16-character code (the App Password).

**Environment Variables:**
```
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx (the 16-char code)
EMAIL_FROM=noreply@swiftdocsai.com
```

## Option 2: Resend (Professional / Production)
1. Sign up at [resend.com](https://resend.com).
2. Get your API Key.
3. Verify your domain (e.g., mail.swiftdocsai.com).

**Environment Variables:**
```
EMAIL_SERVICE=resend
EMAIL_USER=resend (use the string 'resend' if using SMTP)
EMAIL_PASS=re_xxxxxxxxxxxxxx (your api key)
EMAIL_FROM=onboarding@resend.dev (or your verified domain email)
```

## Troubleshooting
- If using Gmail and it fails, ensure you haven't exceeded your daily limit.
- Ensure `FRONTEND_URL` is correctly set to the base URL of your application so the reset link works.
- Check Vercel logs for `INVALID_LOGIN` or `ECONNREFUSED` errors.
