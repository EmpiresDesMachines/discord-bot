require("dotenv").config();
const Discord = require("discord.js");

const commandHandler = require("./commandHandler");

const client = new Discord.Client();
client.login(process.env.DISCORD_API_KEY);

client.on("ready", () => {
  client.user.setPresence({
    activity: {
      name: "twitch.tv",
      type: "WATCHING", // PLAYING/LISTENING/WATCHING
    },
    status: "dnd", // online/idle/dnd/invisible
  });
});

client.on("message", commandHandler);
