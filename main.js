const { Client, Collection } = require('discord.js');
const { loadCommands, loadEvents } = require("./Utils/Loader");

const client = new Client({ intents: 32767 });
client.config = require("./Config/Config");
client.mongoose = require("./Utils/Mongoose");
["commands", "cooldowns", "musicPlayer"].forEach(x => client[x] = new Collection());

loadCommands(client);
loadEvents(client);
client.mongoose.init();

client.login(client.config.TOKEN);