const Schema = require(`mongoose`).Schema;


const schema = new Schema({

  ip: {
    type: String,
    required: true
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
