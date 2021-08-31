// !setpresence activityType statusType newActivityName
// !setpresence WATCHING dnd anime

const Discord = require("discord.js");
require("dotenv").config();

const client = new Discord.Client();
client.login(process.env.DISCORD_API_KEY);

const ownerId = ""; // your id

module.exports = async (msg) => {
  const { author: { id: authorId } } = msg;
  if (ownerId === authorId) {
    const { content } = msg;
    const [setNewType = "WATCHING", setNewStatus = "dnd", ...setNewName] = content.split(" ").slice(1);

    client.user.setPresence({
      activity: {
        name: setNewName.join(" "), // anything
        type: setNewType.toUpperCase(), // "PLAYING", "WATCHING", "STREAMING", "LISTENING"
      },
      status: setNewStatus, // online/idle/dnd/invisible
    });
  } else {
    msg.channel.reply("у вас недостаточно прав для выполнения этой команды.");
  }
};
