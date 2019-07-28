var mongoose = require("mongoose");

// SCHEMA
var boardItemSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
});

module.exports = mongoose.model("BoardItem", boardItemSchema);
