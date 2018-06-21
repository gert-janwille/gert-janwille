const fs = require(`fs`);
const path = require(`path`);
const nodemailer = require(`nodemailer`);
const Handlebars = require(`handlebars`);

const {EMAILUSER: user, EMAILPASS: pass} = process.env;

module.exports = (data, to) => {

  const transporter = nodemailer.createTransport({
    host: `smtp-auth.mailprotect.be`,
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: pass
    }
  });

  const source = fs.readFileSync(path.join(__dirname, `templates/${data.mailtype}.hbs`), `utf8`);
  const template = Handlebars.compile(source);

  const mailOptions = {
    from: `"Gert-Jan Wille ✉️" <no-reply@gert-janwille.com>`,
    to: to,
    subject: data.subject,
    html: template({data})
  };

  if (data.email) mailOptions['from'] = data.email;

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error);
    console.log(`Message %s sent: %s`, info.messageId, info.response);
  });
};
