const Schema = require(`mongoose`).Schema;


const schema = new Schema({

  name: {
    type: String,
    required: true
  },

  skill: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
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
