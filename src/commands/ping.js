module.exports = async (msg) => {
  msg.react("🏓");
  const latency = Date.now() - msg.createdTimestamp;
  return msg.reply(`твой пинг ${latency}ms.`);
};
