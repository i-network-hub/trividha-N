const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
  },
  comment_on: {
    type: String,
    required: true,
  },
  blog_id: {
    type: String,
    required: true,
  },
});

const Userdb = mongoose.model("comments", schema);

module.exports = Userdb;
