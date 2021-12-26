const { Collection } = require('discord.js');
const EMOJI = require('../../Config/Emojis.json');
const schemaGuild = require('../../Models/Guild')
const { embedCheck, embedCommand, embedError, embedLogs } = require('../../Utils/Functions')

module.exports = async (client, message) => {
  if(message.channel.type !== "GUILD_TEXT") return
  if (message.author.bot) return;
  const data = await schemaGuild.findOne({ GuildID: message.guild.id })

  if(!data) return await new schemaGuild({ GuildID: message.guild.id, Prefix: "l!", Language: "FR", RadioChannelID: "", Radio: "https://www.youtube.com/watch?v=5qap5aO4i9A" }).save()

  if (!message.content.startsWith(data.Prefix)) return;
  
  const args = message.content.slice(data.Prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
  if (!command) return

  const Lang = require(`../../Languages/${data.Language}/${command.help.name}.json`)
  const LangMessageCreate = require(`../../Languages/${data.Language}/messageCreate.json`)

  if(!message.member.permissions.has(command.help.permissions.MEMBER)) return message.channel.send({ embeds: [embedError().setDescription(`${EMOJI.ERROR} ${(LangMessageCreate.MSG1).replace("{command}", command.help.name)}`)]})

  if(!message.guild.members.cache.get(client.user.id).permissions.has(command.help.permissions.BOT)) return message.channel.send({ embeds: [embedError().setDescription(`${EMOJI.ERROR} ${LangMessageCreate.MSG2}`)]})

  if (!client.cooldowns.has(command.help.name)) {
    client.cooldowns.set(command.help.name, new Collection());
  };

  const timeNow = Date.now();
  const tStamps = client.cooldowns.get(command.help.name);
  const cdAmount = (command.help.cooldown || 5) * 1000;

  if (tStamps.has(message.author.id)) {
    const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

    if (timeNow < cdExpirationTime) {
      timeLeft = (cdExpirationTime - timeNow) / 1000;
      return message.react("⏰") 
    }
  }

  tStamps.set(message.author.id, timeNow);
  setTimeout(() => tStamps.delete(message.author.id), cdAmount);

  command.run(client, message, args, data, embedCheck, embedCommand, embedError, embedLogs, EMOJI, Lang)
}