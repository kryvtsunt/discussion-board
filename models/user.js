var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// SCHEMA
var userSchema = new mongoose.Schema({
  username: String,
  passport: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
