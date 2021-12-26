const { ErelaClient } = require('erela.js')
const schemaGuild = require('../../Models/Guild')

module.exports = async (client) => {
  client.music = new ErelaClient(client, [
    {
      host: client.config.LAVALINK.HOST,
      port: parseInt(client.config.LAVALINK.PORT),
      password: client.config.LAVALINK.PASSWORD
    }
  ])

  client.music.on("nodeConnect", node => {
    console.log(["Lavalink"], "🎶 Connexion réussie")
    const guilds = client.guilds.cache.filter(g => g.members.cache.has(client.user.id)).map(r => r.id).slice(0, (Number(client.guilds.cache.filter(g => g.members.cache.has(client.user.id)).size)))
    guilds.map(async r => {
      await schemaGuild.findOne({ GuildID: r }).then(async s => {
        if(!s) return
        if(client.channels.cache.get(s.RadioChannelID) === undefined) { return await s.updateOne({ RadioChannelID: ""})}
        if(s.RadioChannelID === "") return
        else {
          const player = client.music.players.spawn({
            guild: r,
            voiceChannel: client.channels.cache.get(s.RadioChannelID),
            selfDeaf: true,
            volume: s.Volume
          })
      
          await client.musicPlayer.set(r, player);
      
          const musicSearchResults = await client.music.search(s.Radio, client.user)
          for (const track of musicSearchResults.tracks) {
            client.musicPlayer.get(r).queue.add(track)
            if(!client.musicPlayer.get(r).playing) client.musicPlayer.get(r).play()
          }
         }
      })
    })
  })
  client.music.on("nodeError", (node, error) => console.log(["Lavalink"], "🚀 Connexion interrompu\n\nVPS :\n> pm2 start --name=Lavalink Lavalink.jar --interpreter=java --node-args=-jar\n\nPC :\n> java -jar Lavalink.jar"))
  client.music.on("queueEnd", player => {
    client.music.players.destroy(player.guild)
  })
}