const { MessageEmbed } = require('discord.js')
module.exports = {
  embedError: function() {
    return new MessageEmbed().setColor("#fc1515").setFooter("© Radio'Bot")
  },

  embedCheck: function() {
    return new MessageEmbed().setColor("#06f543").setFooter("© Radio'Bot")
  },

  embedCommand: function() {
    return new MessageEmbed().setColor("#3a5ee4").setFooter("© Radio'Bot")
  },

  embedMusic: function() {
    return new MessageEmbed().setColor("#9841d4").setFooter("© Radio'Bot")
  }
}