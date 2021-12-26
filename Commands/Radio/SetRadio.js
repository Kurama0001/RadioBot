const Radio = require('../../Config/Radio.json')

module.exports.run = async (client, message, args, data, embedCheck, embedCommand, embedError, embedLogs, EMOJI, Lang) => {
  const getRadio = args[0]
  if(!getRadio) return message.channel.send({ embeds: [embedError().setDescription(`${EMOJI.ERROR} ${Lang.NORADIO}`)] })
  if(!Radio[getRadio]) return message.channel.send({ embeds: [embedError().setDescription(`${EMOJI.ERROR} ${(Lang.NORADIO2).replace("{radio}", getRadio).replace("{prefix}", data.Prefix)}`)] })
  if(Radio[getRadio] === data.Radio) return message.channel.send({ embeds: [embedError().setDescription(`${EMOJI.ERROR} ${(Lang.ISRADIO).replace("{radio}", getRadio)}`)] })

  try {
    await data.updateOne({ Radio: Radio[getRadio ]})

    const musicSearchResults = await client.music.search(Radio[getRadio], client.user)
    for (const track of musicSearchResults.tracks) {
      client.musicPlayer.get(message.guild.id).queue.add(track)
      client.musicPlayer.get(message.guild.id).stop()
      return message.channel.send({ embeds: [embedCommand().setDescription(`${EMOJI.CHECK} ${(Lang.SAVED).replace("{radio}", getRadio)}`)] })
    }
  } catch {
    return message.channel.send({ embeds: [embedError().setDescription(`${EMOJI.ERROR} ${Lang.ERROR}`)] })
  }
};

module.exports.help = {
  name: "setradio",
  aliases: [],
  cooldown: 5,
  permissions: {
    MEMBER: ["MANAGE_GUILD"],
    BOT: ["CONNECT"]
  }
}