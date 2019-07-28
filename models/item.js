var mongoose = require("mongoose");

// SCHEMA
var boardItemSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

module.exports = mongoose.model("BoardItem", boardItemSchema);
