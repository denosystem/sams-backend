const nodemailer = require("nodemailer");

function mustEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} missing in .env`);
  return v;
}

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  // Using Gmail SMTP OR any SMTP provider
  // Put these in .env:
  // SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
  const host = mustEnv("SMTP_HOST");
  const port = Number(mustEnv("SMTP_PORT"));
  const user = mustEnv("SMTP_USER");
  const pass = mustEnv("SMTP_PASS");

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for 587
    auth: { user, pass },
  });

  return transporter;
}

async function sendMail({ to, subject, text }) {
  const t = getTransporter();
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;

  // nodemailer accepts array or string
  const info = await t.sendMail({
    from,
    to,
    subject,
    text,
  });

  return info;
}

module.exports = { sendMail };
