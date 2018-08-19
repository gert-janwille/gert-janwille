const Scopes = require(`../../modules/mongoose/const/Scopes`);

const {Game} = require(`mongoose`).models;
const {pick, omit} = require(`lodash`);

const Joi = require(`joi`);
const Boom = require(`boom`);

const base = `/api`;

module.exports = [

  {

    method: `GET`,
    path: `${base}/games/{type?}`,

    handler: (req, res) => {
      const {type} = req.params;
      if (!type) return res({error: 'Pleas give the name of a game.'})
      Game.find({type}).sort({score: -1})
        .then(scores => res({scores: scores[0]}));
    }
  },

  {

    method: `POST`,
    path: `${base}/games`,

    config: {

      auth: {
        strategy: `token`,
        scope: [Scopes.AUTH]
      },

      validate: {
        options: {
          abortEarly: false
        },

        payload: {
          type: Joi.string().min(3).required(),
          username: Joi.string().min(3).required(),
          score: Joi.number().min(3).required()
        }
      }
    },

    handler: (req, res) => {
      const data = pick(req.payload, [`type`, `username`, `score`])
      const game = new Game(data);

      game.save()
        .then(u => {
          u = omit(u.toJSON(), [`__v`, `isActive`]);
          return res(u);
        })
        .catch(() => res(Boom.badRequest(`cannot save game`)));
    }

  }

];
