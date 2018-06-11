const Schema = require(`mongoose`).Schema;


const schema = new Schema({

  title: {
    type: String,
    required: true,
    unique: true
  },

  made: {
    type: String,
    required: true
  },

  text: {
    type: String,
    required: true
  },

  images: {
    type: String,
    required: true
  },

  url: {
    type: String
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
