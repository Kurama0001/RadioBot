module.exports.run = async (client, message, args, data, embedCheck, embedCommand, embedError, embedLogs, EMOJI, Lang) => {
  const lang = args[0]
  if(!lang) return message.channel.send({ embeds: [embedError().setDescription(`${EMOJI.ERROR} ${Lang.LANG1}`)] })
  if(data.Language === lang) return message.channel.send({ embeds: [embedError().setDescription(`${EMOJI.ERROR} ${(Lang.LANG2).replace("{lang}", lang)}`)] }) 

  try {
    if(lang === "FR") {
      await data.updateOne({ Language: "FR" }) 
      return message.channel.send({ embeds: [embedCheck().setDescription(`${EMOJI.CHECK} La langue du serveur est configurée sur 🇫🇷 **Français**.`)] })
    } else if(lang === "EN") {
      await data.updateOne({ Language: "EN" }) 
      return message.channel.send({ embeds: [embedError().setDescription(`${EMOJI.ERROR} The server language is configured to 🇬🇧 **English**.`)] })
    } else {
      return message.channel.send({ embeds: [embedError().setDescription(`${EMOJI.ERROR} ${Lang.LANG1}`)] })
    }
  } catch {
    return message.channel.send({ embeds: [embedError().setDescription(`${EMOJI.ERROR} ${Lang.ERROR}`)] })
  }
};

module.exports.help = {
  name: "setlanguage",
  aliases: [],
  cooldown: 5,
  permissions: {
    MEMBER: ["MANAGE_GUILD"],
    BOT: ["CONNECT"]
  }
}
