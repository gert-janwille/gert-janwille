const Schema = require(`mongoose`).Schema;


const schema = new Schema({

  date: {
    type: String,
    required: true
  },

  job: {
    type: String,
    required: true
  },

  company: {
    type: String,
    required: true
  },

  current: {
    type: Boolean,
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
