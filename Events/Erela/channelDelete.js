const schemaGuild = require("../../Models/Guild")

module.exports = async (client, channel) => {
  const data = await schemaGuild.findOne({ GuildID: channel.guild.id })
  if(!data) return;
  if(channel.id === data.RadioChannelID) return await data.updateOne({ RadioChannelID: "" })
}