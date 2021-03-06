const Schema = require(`mongoose`).Schema;
const Scopes = require(`../const/Scopes`);

const schema = new Schema({

  ip: {
    type: String,
    default: "unkown"
  },

  invite: {
    type: String,
    required: true
  },

  hostname: {
    type: String,
    default: "unkown"
  },

  city: {
    type: String,
    default: "unkown"
  },

  region: {
    type: String,
    default: "unkown"
  },

  country: {
    type: String,
    default: "unkown"
  },

  loc: {
    type: String,
    default: "unkown"
  },

  postal: {
    type: String,
    default: "unkown"
  },

  org: {
    type: String,
    default: "unkown"
  },

  scope: {
    type: String,
    default: Scopes.USER
  },

  isActive: {
    type: Boolean,
    default: true
  },

  created: {
    type: Date,
    default: Date.now
  }

});

module.exports = {schema};
