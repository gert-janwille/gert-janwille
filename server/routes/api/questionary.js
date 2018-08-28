const Scopes = require(`../../modules/mongoose/const/Scopes`);
const mail = require(`../../lib/mail`);
const {pick} = require(`lodash`);
const Joi = require(`joi`);

const base = `/api`;

module.exports = [
  {
    method: `POST`,
    path: `${base}/questionary/invite`,

    config: {

      auth: {
        strategy: `token`,
        scope: [Scopes.ADMIN]
      },

      validate: {
        options: {
          abortEarly: false
        },

        payload: {
          client: Joi.string().min(1).required(),
          email: Joi.string().email().required(),
          lang: Joi.string().min(2).max(2).required()
        }
      }
    },

    handler: (req, res) => {
      const data = pick(req.payload, [`client`, `email`, `lang`]);

      data.subject = `Hey ${data.client}, quick heads up❕`;
      data.mailtype = `inviteQuestionary`;
      data.url = `http://gert-janwille.com/questionary?ref=${Buffer.from(data.client).toString('base64')}&lang=${data.lang}`;

      return res({
        mail: mail(data, data.email),
        status: req.payload
      });
    }
  },

  {

    method: `POST`,
    path: `${base}/questionary`,

    config: {

      validate: {
        options: {
          abortEarly: false,
          allowUnknown : true
        },
      }
    },

    handler: (req, res) => {
      const data = req.payload;
      console.log(data);

      data.subject = `${data.client}, filled in the questionary❕`;
      data.mailtype = `questionary`;

      mail(data, `feedback@gert-janwille.com`);

      return res({data});
    }

  }

];
