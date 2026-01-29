const nodemailer = require("nodemailer");

// const options = {
//   to: 'email@email.com',
//   subject: 'Subject',
//   html: 'HTML code'
// }

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });

  const emailInfo = await transporter.sendMail({
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.html
  });

  console.log(`Email sent: ${emailInfo.messageId}`);
};

module.exports = sendEmail;
