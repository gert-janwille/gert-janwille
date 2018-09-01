const Scopes = require(`../../modules/mongoose/const/Scopes`);

const {Experience} = require(`mongoose`).models;
const {pick, omit, isEmpty} = require(`lodash`);

const Joi = require(`joi`);
const Boom = require(`boom`);

const base = `/api`;

module.exports = [

  {

    method: `GET`,
    path: `${base}/experiences/{type?}`,
    config : {
      cache:{
        expiresIn: 31536000 * 10000,
        privacy: 'private'
      }
    },

    handler: (req, res) => {
      const {type} = req.params;
      Experience.find(isEmpty(type) ? {} : {type}).sort({created: -1})
        .then(experiences => res({experiences}));
    }

  },

  {

    method: `POST`,
    path: `${base}/experiences`,

    config: {

      cache:{
        expiresIn: 31536000 * 10000,
        privacy: 'private'
      },

      auth: {
        strategy: `token`,
        scope: [Scopes.ADMIN]
      },

      validate: {
        options: {
          abortEarly: false
        },

        payload: {
          date: Joi.string().min(3).required(),
          job: Joi.string().min(3).required(),
          company: Joi.string().min(3).required(),
          current: Joi.bool().default(false),
          type: Joi.string().required()
        }
      }
    },

    handler: (req, res) => {
      const data = pick(req.payload, [`date`, `job`, `company`, `current`, `type`])
      const work = new Experience(data);

      work.save()
        .then(u => {
          u = omit(u.toJSON(), [`__v`, `isActive`]);
          return res(u);
        })
        .catch(() => res(Boom.badRequest(`cannot save experience`)));
    }

  }

];
