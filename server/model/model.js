const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  especialities: {
    type: String,
    required: true,
  },
  benefits: {
    type: String,
    required: true,
  },
  botanicalName: {
    type: String,
    required: true,
  },
  familyName: {
    type: String,
    required: true,
  },
  commonName: {
    type: String,
    required: true,
  },
  partUsed: {
    type: String,
    required: true,
  },
  habitat: {
    type: String,
    required: true,
  },
  curingDiseases: [
    {
      type: String,
    },
  ],
  whySpecial: {
    type: String,
  },
  image: [
    {
      type: String,
    },
  ],
});

const Userdb = mongoose.model("raw_herb", schema);

module.exports = Userdb;
