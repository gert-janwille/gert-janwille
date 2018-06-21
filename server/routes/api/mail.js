const mail = require(`../../lib/mail`);
const {pick} = require(`lodash`);
const Joi = require(`joi`);

const base = `/api`;

module.exports = [

  {

    method: `POST`,
    path: `${base}/mail`,

    config: {

      validate: {
        options: {
          abortEarly: false
        },

        payload: {
          name: Joi.string().required(),
          company: Joi.string(),
          email: Joi.string().email().required(),
          message: Joi.string().min(3).required()
        }
      }
    },

    handler: (req, res) => {
      const data = pick(req.payload, [`name`, `company`, `email`, `message`]);

      data.subject = `🔔 Hey ${data.name}, quick heads up❕`;
      data.mailtype = `contact`;

      mail(data, `hello@gert-janwille.com`);

      return res({status: 1});
    }

  }

];
