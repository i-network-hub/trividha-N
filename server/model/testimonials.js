const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  testimonial: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Userdb = mongoose.model("testimonials", schema);

module.exports = Userdb;
