module.exports.run = async (client, message, args, data, embedCheck, embedCommand, embedError, embedLogs, EMOJI, Lang) => {
  const targetChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
  if(!targetChannel) return message.channel.send({ embeds: [embedError().setDescription(`${EMOJI.ERROR} ${Lang.CHANNEL}`)] })
  if(targetChannel.type !== "GUILD_VOICE") return message.channel.send({ embeds: [embedError().setDescription(`${EMOJI.ERROR} ${Lang.CHANNEL2}`)] })
  if(data.RadioChannelID !== "") return message.channel.send({ embeds: [embedCommand().setDescription(`${EMOJI.ERROR} ${(Lang.CHANNEL3).replace("{channel}", targetChannel)}`)] })
  
  try {
    await data.updateOne({ RadioChannelID: targetChannel.id })

    const player = client.music.players.spawn({
      guild: message.guild.id,
      voiceChannel: targetChannel,
      selfDeaf: true,
      volume: data.Volume
    })

    await client.musicPlayer.set(message.guild.id, player);

    const musicSearchResults = await client.music.search(data.Radio, client.user)
    for (const track of musicSearchResults.tracks) {
      client.musicPlayer.get(message.guild.id).queue.add(track)
      if(!client.musicPlayer.get(message.guild.id).playing) client.musicPlayer.get(message.guild.id).play()
      message.channel.send({ embeds: [embedCommand().setDescription(`${EMOJI.CHECK} ${(Lang.SAVED).replace("{channel}", targetChannel)}`)] })
    }
  } catch {
    return message.channel.send({ embeds: [embedError().setDescription(`${EMOJI.ERROR} ${Lang.ERROR}`)] })
  }
};

module.exports.help = {
  name: "setchannel",
  aliases: [],
  cooldown: 5,
  permissions: {
    MEMBER: ["MANAGE_GUILD"],
    BOT: ["CONNECT"]
  }
}