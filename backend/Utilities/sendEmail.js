const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port:process.env.MAIL_PORT, // Or use other services like SendGrid
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.env.MAIL_AUTH_PASS,
    }, 
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  console.log("response: ",mailOptions)
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
