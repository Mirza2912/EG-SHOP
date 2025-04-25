const nodemailer = require("nodemailer");

const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    host: process.env.MAIL_HOST,
    port: process.env.SMTP_PORT, // Or use other services like SendGrid
    secure: false,
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.env.MAIL_AUTH_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject,
    text: message,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
