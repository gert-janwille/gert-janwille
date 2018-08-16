const Scopes = require(`../../modules/mongoose/const/Scopes`);
const uploader = require(`../../lib/uploader`);
const {createValidString} = require(`../../lib/util`);

const {Project} = require(`mongoose`).models;
const {pick, omit} = require(`lodash`);

const Joi = require(`joi`);
const Boom = require(`boom`);

const base = `/api`;

module.exports = [

  {

    method: `GET`,
    path: `${base}/projects`,

    handler: (req, res) => {
      Project.find()
        .then(projects => res({projects}));
    }

  },

  {

    method: `GET`,
    path: `${base}/tags`,

    handler: (req, res) => {
      Project.find().distinct('services')
        .then(tags => res({tags}));
    }

  },

  {

    method: `POST`,
    path: `${base}/projects`,

    config: {

      auth: {
        strategy: `token`,
        scope: [Scopes.ADMIN]
      },

      payload: {
        maxBytes: 209715200,
        output: "stream",
        parse: true,
        allow: "multipart/form-data",
      },

      validate: {
        options: {
          allowUnknown: true,
          abortEarly: false
        },

        payload: {
          title: Joi.string().min(3).required(),
          subtitle: Joi.string().min(3).required(),

          services: Joi.array().min(1).required(),
          url: Joi.string().min(3),

          introText: Joi.string().min(3).required(),
          centerText: Joi.string().min(3).required(),

          mainImage: Joi.any().required(),
          bigImage: Joi.any().required(),
          smallImage: Joi.any().required(),
          preview: Joi.any().required(),

          color: Joi.array().required(),
        }
      }
    },

    handler: (req, res) => {
      const data = pick(req.payload, [`title`, `subtitle`, `services`, `url`, `introText`, `centerText`, `color`]);
      const upload = pick(req.payload, [`mainImage`, `bigImage`, `smallImage`, `preview`])

      for (var key in upload) data[key] = uploader(upload[key], `${createValidString(data.title)}/`);

      const work = new Project(data);

      work.save()
        .then(u => {
          u = omit(u.toJSON(), [`__v`, `isActive`]);
          return res(u);
        })
        .catch(() => res(Boom.badRequest(`cannot save project`)));
    }

  }

];
