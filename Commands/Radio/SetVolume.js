module.exports.run = async (client, message, args, data, embedCheck, embedCommand, embedError, embedLogs, EMOJI, Lang) => {
  const volume = parseInt(args[0])
  if(!volume) return message.channel.send({ embeds: [embedError().setDescription(`${EMOJI.ERROR} ${Lang.VOLUME1}`)] })
  if(volume < 1 || volume > 100) return message.channel.send({ embeds: [embedError().setDescription(`${EMOJI.ERROR} ${Lang.VOLUME1}`)] })

  try {
    if(!client.musicPlayer.get(message.guild.id)) return message.channel.send({ embeds: [embedError().setDescription(`${EMOJI.ERROR} ${Lang.NOCOLLECTION}`)] })
    await data.updateOne({ Volume: volume })
    await client.musicPlayer.get(message.guild.id).setVolume(volume)
    return message.channel.send({ embeds: [embedCheck().setDescription(`${EMOJI.CHECK} ${(Lang.SAVED).replace("{volume}", volume)}`)] })
  } catch {
    return message.channel.send({ embeds: [embedError().setDescription(`${EMOJI.ERROR} ${Lang.ERROR}`)]})
  }
};

module.exports.help = {
  name: "setvolume",
  aliases: [],
  cooldown: 5,
  permissions: {
    MEMBER: ["MANAGE_GUILD"],
    BOT: ["CONNECT"]
  }
}