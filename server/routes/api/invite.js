const makeInviteCode = require('../../lib/invitecode');
const {Invite} = require(`mongoose`).models;
const {pick, omit} = require(`lodash`);

const Joi = require(`joi`);
const Boom = require(`boom`);

const base = `/api`;

module.exports = [

  {

    method: `GET`,
    path: `${base}/invite/generate`,

    config: {
      plugins: {
        'hapi-geo-locate': {
          enabled: true,
        }
      }
    },

    handler: (req, res) => {

      const invite = makeInviteCode();
      const data = pick({invite, ...req.location, ip: req.info.remoteAddress, scope: 'user'}, [`invite`, `ip`, `hostname`, `city`, `region`, `country`, `loc`, `postal`, `org`])

      const inviteModel = new Invite(data);

      inviteModel.save()
        .then(u => {
          return res({
            ip: req.info.remoteAddress,
            success: 1,
            code: Buffer.from(invite).toString('base64'),
            format: "encoded"
          })
        })
        .catch((e) => {
          console.log(e);
          res(Boom.badRequest(`cannot save invite code`))
        });

    }

  },

  {
    method: `POST`,
    path: `${base}/invite`,

    config: {

      validate: {

        options: {
          abortEarly: false
        },

        payload: {
          invite: Joi.string().min(3).required()
        }

      }

    },

    handler: (req, res) => {
      const {invite} = req.payload;
      const isActive = true;

      Invite.findOneAndUpdate(
        {
          $and: [
            {invite},
            {isActive}
          ]
        },
        {$set: {isActive: false, scope: 'hacker'}},
        {new: true}
      )
      .then(invite => {

        if (!invite)return res(Boom.badRequest(`Invalid/expired invite code`));

        const {ip: subject} = invite;
        invite = omit(invite.toJSON(), [`__v`, `invite`, `isActive`, `_id`, `created`]);

        return res.token(invite, {subject, audience: [1]});
      })
      .catch(() => {
        return res(Boom.badRequest(`error while authenticating invite`));
      });
    }
  }

];
