const { MAILER_USER, MAILER_PASS } = process.env;
const nodemailer = require("nodemailer");

async function mailService(to, subject, text, htmlToSend) {
  console.log(to, subject, text);
  let transporter = await nodemailer.createTransport({
    host: "smtppro.zoho.com",
    secureConnection: true,
    port: 465,
    secure: true,
    auth: {
      user: MAILER_USER,
      pass: MAILER_PASS,
    },
  });

  await transporter.sendMail({
    from: '"CapsAi" <support@exponentialhost.com>',
    to: to,
    subject: subject,
    text: text,
    html: htmlToSend,
  });
}

module.exports = {
  mailService,
};
