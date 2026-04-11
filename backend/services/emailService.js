const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (options) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Email credentials missing. Email not sent.');
    return;
  }

  const mailOptions = {
    from: `"SwiftDocs AI" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html
  };

  await transporter.sendEmail(mailOptions);
};

exports.sendLoginAlert = async (user, deviceInfo) => {
  const { isNewDevice, deviceName, location } = deviceInfo;
  
  const subject = isNewDevice 
    ? '🚨 Security Alert: New Login to SwiftDocs AI' 
    : 'Welcome back to SwiftDocs AI!';

  const title = isNewDevice ? 'New Device Detected' : 'Welcome Back!';
  
  const html = `
    <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
      <h2 style="color: #000; text-align: center;">SwiftDocs AI</h2>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
      <h3>Hello, ${user.displayName}!</h3>
      <p style="font-size: 16px; line-height: 1.6;">
        ${isNewDevice 
          ? `We detected a login from a <strong>new device</strong>. If this was you, you can safely ignore this email.` 
          : `We're glad to see you again! You've successfully logged into your account.`}
      </p>
      
      <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0; font-size: 14px;"><strong>Device:</strong> ${deviceName}</p>
        <p style="margin: 5px 0 0; font-size: 14px;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      </div>

      ${isNewDevice ? `
      <p style="font-size: 14px; color: #e63946;">
        <strong>If this wasn't you:</strong> Please reset your password immediately and secure your account.
      </p>
      ` : ''}

      <div style="text-align: center; margin-top: 30px;">
        <a href="${process.env.FRONTEND_URL || 'https://swiftdocsai.vercel.app/'}" 
           style="background: #000; color: #fff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
           Go to Dashboard
        </a>
      </div>
      
      <p style="font-size: 12px; color: #999; margin-top: 40px; text-align: center;">
        © 2026 SwiftDocs AI. All rights reserved.
      </p>
    </div>
  `;

  await sendEmail({
    email: user.email,
    subject,
    html
  });
};
