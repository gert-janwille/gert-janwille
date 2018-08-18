const Schema = require(`mongoose`).Schema;


const schema = new Schema({

  type: {
    type: String,
    required: true
  },

  username: {
    type: String,
    required: true
  },

  score: {
    type: Number,
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
