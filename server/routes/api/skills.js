const Scopes = require(`../../modules/mongoose/const/Scopes`);

const {Skill} = require(`mongoose`).models;
const {pick, omit, isEmpty} = require(`lodash`);

const Joi = require(`joi`);
const Boom = require(`boom`);

const base = `/api`;

module.exports = [

  {

    method: `GET`,
    path: `${base}/skills/{type?}`,
    config: {
      cache:{
        expiresIn: 31536000 * 10000,
        privacy: 'private'
      }
    },

    handler: (req, res) => {
      const {type} = req.params;
      Skill.find(isEmpty(type) ? {} : {type}).sort({created: -1})
        .then(skills => res({skills}));
    }

  },

  {

    method: `POST`,
    path: `${base}/skills`,

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
          name: Joi.string().required(),
          skill: Joi.string().required(),
          type: Joi.string().required()
        }
      }
    },

    handler: (req, res) => {
      const data = pick(req.payload, [`name`, `skill`, `type`]);


      const work = new Skill(data);

      work.save()
        .then(u => {
          u = omit(u.toJSON(), [`__v`, `isActive`]);
          return res(u);
        })
        .catch(() => res(Boom.badRequest(`cannot save skill`)));
    }

  }

];
