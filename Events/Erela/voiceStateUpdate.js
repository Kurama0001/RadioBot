const schemaGuild = require("../../Models/Guild")

module.exports = async (client, oldState, newState) => {
  if(oldState.member.user.id !== client.user.id) return;
  if(oldState.channelId === newState.channelId) return;
  else {
    const data = await schemaGuild.findOne({ GuildID: oldState.guild.id })
    if(oldState.channelId === data.RadioChannelID && newState.channelId) {
     await data.updateOne({ RadioChannelID: newState.channelId })
    } else if(newState.channelId !== data.RadioChannelID) {
      await client.music.players.destroy(oldState.guild.id)
      const player = client.music.players.spawn({
        guild: oldState.guild.id,
        voiceChannel: client.channels.cache.get(data.RadioChannelID),
        selfDeaf: true,
        volume: data.Volume
      })
      await client.musicPlayer.set(oldState.guild.id, player);
  
      const musicSearchResults = await client.music.search(data.Radio, client.user)
      for (const track of musicSearchResults.tracks) {
        client.musicPlayer.get(oldState.guild.id).queue.add(track)
        if(!client.musicPlayer.get(oldState.guild.id).playing) client.musicPlayer.get(oldState.guild.id).play()
      }
    }
  }
}