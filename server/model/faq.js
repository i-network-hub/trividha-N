const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },

  answer: {
    type: String,
    required: true,
  },
});

const Userdb = mongoose.model("faq", schema);

module.exports = Userdb;
