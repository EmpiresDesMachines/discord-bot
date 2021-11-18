const image = require("./commands/image");
const weather = require("./commands/weather");
const ping = require("./commands/ping");
const ball = require("./commands/8ball");
const serverinfo = require("./commands/serverinfo");
const setpresence = require("./commands/setPresence");
const gif = require("./commands/gif");
const help = require("./commands/help");
const draw = require("./commands/draw");

const money = require("./commands/money");
// const info = require("./commands/info");

const commands = {
  money, курс: money, image, weather, погода: weather, ping, ball, serverinfo, setpresence, gif, help, draw,
};

const prefix = "!";
const allowedChannels = []; // add channels

module.exports = async (msg) => {
  if (allowedChannels.indexOf(msg.channel.id) !== -1) {
    if (msg.content.charAt(0) === prefix && msg.content.length > 3) {
      const { content } = msg;
      const [command, ...other] = content.slice(1).split(" ");
      if (commands[command]) {
        commands[command](msg);
      }
    }
  }
};
