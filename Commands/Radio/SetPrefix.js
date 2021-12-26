module.exports.run = async (client, message, args, data, embedCheck, embedCommand, embedError, embedLogs, EMOJI, Lang) => {
  const prefix = args[0]
  if(!prefix) return message.channel.send({ embeds: [embedError().setDescription(`${EMOJI.ERROR} ${Lang.PREFIX1}`)] })
  if(prefix.length > 3) return message.channel.send({ embeds: [embedError().setDescription(`${EMOJI.ERROR} ${Lang.PREFIX2}`)] })
  if(prefix === data.Prefix) return message.channel.send({ embeds: [embedError().setDescription(`${EMOJI.ERROR} ${(Lang.PREFIX3).replace("{prefix}", prefix)}`)] })

  try {
    await data.updateOne({ Prefix: prefix })
    return message.channel.send({ embeds: [embedCheck().setDescription(`${EMOJI.CHECK} ${(Lang.SAVED).replace("{prefix}", prefix)}`)] })
  } catch {
    return message.channel.send({ embeds: [embedError().setDescription(`${EMOJI.ERROR} ${Lang.ERROR}`)] })
  }
};

module.exports.help = {
  name: "setprefix",
  aliases: [],
  cooldown: 5,
  permissions: {
    MEMBER: ["MANAGE_GUILD"],
    BOT: ["CONNECT"]
  }
}