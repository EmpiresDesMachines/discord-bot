const fetch = require("node-fetch");

module.exports = async (msg) => {
  const { content } = msg;
  if (content.split(" ").length === 1) {
    const f = await fetch("https://source.unsplash.com/500x280/");
    return msg.channel.send(`${f.url}`);
  }
  const request = encodeURI(content.split(" ").slice(1).join(" "));
  const f = await fetch(`https://source.unsplash.com/500x280/?${request}`);
  return msg.channel.send(`${f.url}`);
};
