const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

exports.sendPasswordResetEmail = async (toEmail, resetToken, displayName) => {
  const transporter = createTransporter();
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  
  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Reset your SwiftDocs AI password',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; background: #000; color: #fff; margin: 0; padding: 40px 20px; }
          .container { max-width: 500px; margin: 0 auto; background: rgba(255,255,255,0.05); border-radius: 24px; padding: 40px; border: 1px solid rgba(255,255,255,0.1); }
          h1 { font-size: 24px; font-weight: 500; margin: 0 0 16px; }
          p { color: rgba(255,255,255,0.7); line-height: 1.6; margin: 0 0 16px; font-size: 14px; }
          .button { display: inline-block; background: rgba(255,255,255,0.15); color: #fff; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-size: 14px; font-weight: 500; margin: 16px 0; }
          .footer { margin-top: 32px; font-size: 12px; color: rgba(255,255,255,0.3); }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Reset your password</h1>
          <p>Hi ${displayName || 'there'},</p>
          <p>We received a request to reset your SwiftDocs AI password. Click the button below to create a new password:</p>
          <a href="${resetUrl}" class="button">Reset Password</a>
          <p>This link expires in 1 hour. If you did not request this, you can safely ignore this email.</p>
          <div class="footer">SwiftDocs AI · This is an automated email, please do not reply.</div>
        </div>
      </body>
      </html>
    `
  });
};
