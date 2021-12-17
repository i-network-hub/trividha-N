const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  disease: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  symptoms: {
    type: String,
    required: true,
  },
  solutions: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Userdb = mongoose.model("disease", schema);

module.exports = Userdb;
