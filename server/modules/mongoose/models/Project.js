const Schema = require(`mongoose`).Schema;


const schema = new Schema({

  title: {
    type: String,
    required: true,
    unique: true
  },

  subtitle: {
    type: String,
    required: true
  },

  mainImage: {
    type: String,
    required: true
  },

  services: {
    type: Array,
    required: true
  },

  introText: {
    type: String,
    required: true
  },

  bigImage: {
    type: String,
    required: true
  },

  smallImage: {
    type: String,
    required: true
  },

  url: {
    type: String
  },

  centerText: {
    type: String,
    required: true
  },

  preview: {
    type: String,
    required: true
  },

  color: {
    type: Array,
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
