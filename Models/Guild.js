const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  GuildID: String,
  Prefix: String,
  Language: String,
  RadioChannelID: String,
  Radio: String,
  Volume: {
    type: Number,
    default: 100
  }
});

module.exports = mongoose.model("Guilds", userSchema);