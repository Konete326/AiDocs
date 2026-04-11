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

exports.sendSecurityAlertEmail = async (toEmail, displayName, deviceInfo) => {
  const transporter = createTransporter();
  const { isNewDevice, deviceName, time } = deviceInfo;
  
  const subject = isNewDevice 
    ? '🚨 Security Alert: New Login to SwiftDocs AI' 
    : 'Welcome back to SwiftDocs AI!';

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: toEmail,
    subject: subject,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: #000; color: #fff; margin: 0; padding: 40px 20px; }
          .container { max-width: 500px; margin: 0 auto; background: rgba(255,255,255,0.03); border-radius: 32px; padding: 40px; border: 1px solid rgba(255,255,255,0.08); }
          .logo { font-size: 20px; font-weight: 700; margin-bottom: 30px; letter-spacing: -0.02em; }
          h1 { font-size: 24px; font-weight: 600; margin: 0 0 16px; color: #fff; }
          p { color: rgba(255,255,255,0.6); line-height: 1.6; margin: 0 0 20px; font-size: 15px; }
          .device-card { background: rgba(255,255,255,0.05); border-radius: 16px; padding: 20px; margin: 24px 0; border: 1px solid rgba(255,255,255,0.05); }
          .label { font-size: 12px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
          .value { font-size: 14px; color: rgba(255,255,255,0.9); font-weight: 500; }
          .alert-box { background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 16px; border-radius: 8px; margin: 24px 0; }
          .alert-text { color: #f87171; font-size: 13px; margin: 0; }
          .footer { margin-top: 40px; font-size: 11px; color: rgba(255,255,255,0.25); text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">SwiftDocs AI</div>
          <h1>${isNewDevice ? 'New Device Detected' : 'Successful Login'}</h1>
          <p>Hi ${displayName},</p>
          <p>${isNewDevice 
            ? "We noticed a login to your account from a device we don't recognize. If this was you, you're all set!" 
            : "You've successfully logged into your SwiftDocs AI account. Great to have you back!"}</p>
          
          <div class="device-card">
            <div style="margin-bottom: 12px;">
              <div class="label">Device</div>
              <div class="value">${deviceName}</div>
            </div>
            <div>
              <div class="label">Time</div>
              <div class="value">${time}</div>
            </div>
          </div>

          ${isNewDevice ? `
          <div class="alert-box">
            <p class="alert-text"><strong>Security Note:</strong> If you didn't perform this login, please change your password immediately to secure your account.</p>
          </div>
          ` : ''}

          <div class="footer">
            &copy; 2026 SwiftDocs AI · Modern Documentation Powered by AI
          </div>
        </div>
      </body>
      </html>
    `
  });
};
