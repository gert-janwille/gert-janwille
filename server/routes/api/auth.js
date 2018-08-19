const {User} = require(`mongoose`).models;

const {omit} = require(`lodash`);

const Joi = require(`joi`);
const Boom = require(`boom`);

const base = `/api`;

module.exports = [
  {

    method: `GET`,
    path: `${base}/auth`,

    config: {
      plugins: {
        'hapi-geo-locate': {
          enabled: true,
        }
      }
    },

    handler: (req, res) => {
      const data = {...req.location, ip: req.info.remoteAddress, scope: 'auth'};
      return res.token(data, {subject: data.ip, audience: [1]});
    }

  },

  {

    method: `POST`,
    path: `${base}/auth`,

    config: {

      validate: {

        options: {
          abortEarly: false
        },

        payload: {
          login: Joi.string().min(3).required(),
          password: Joi.string().min(3).required()
        }

      }

    },

    handler: (req, res) => {

      const {login, password} = req.payload;
      const isActive = true;

      User.findOne({
        $and: [
          {
            $or: [
              {username: login},
              {email: login}
            ]
          },
          {isActive}
        ]
      }).then(user => {


        if (!user) {
          return res(
            Boom.badRequest(`user/password combination incorrect`)
          );
        }

        user.verifyPassword(password, (err, isValid) => {

          if (err || !isValid) {
            return res(
              Boom.badRequest(`user/password combination incorrect`)
            );
          }

          const {_id: subject} = user;
          user = omit(user.toJSON(), [`__v`, `password`, `isActive`, `_id`, `created`]);

          return res.token(user, {subject, audience: [1]});

        });

      }).catch(() => {
        return res(
          Boom.badRequest(`error while authenticating user`)
        );
      });

    }

  }

];
