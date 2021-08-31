require("dotenv").config();
const fetch = require("node-fetch");

module.exports = async (msg) => {
  const { content } = msg;
  const target = encodeURI(content.split(" ").slice(1).join(" "));
  const f = await fetch(`https://api.tenor.com/v1/search?q=${target}&key=${process.env.TENOR_API_KEY}&contentfilter=high`);
  const response = await f.json();
  if (!response.results.length) {
    return msg.channel.send(`По запросу **${content.split(" ").slice(1).join(" ")}** ничего не найдено <:pepe:244531994808156161>`);
  }
  const randomIndex = Math.floor(Math.random() * response.results.length);
  return msg.channel.send(response.results[randomIndex].url);
};
