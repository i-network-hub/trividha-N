const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  challenge: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  highlights: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  image: [
    {
      type: String,
      required: true,
    },
  ],
  timestamp: { type: Date, default: Date.now },
});

const Userdb = mongoose.model("upcoming_camp", schema);

module.exports = Userdb;
