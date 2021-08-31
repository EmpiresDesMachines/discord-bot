const Discord = require("discord.js");

module.exports = async (msg) => {
  const { guild } = msg;
  const {
    name, region, memberCount, owner,
  } = guild;
  const icon = guild.iconURL();
  // console.log(name, region, memberCount, icon)
  // console.log(owner.user.username)
  const embed = new Discord.MessageEmbed()
    .setColor("#ff99ff")
    .setTitle(`Server info for ${name}`)
    .setThumbnail(icon)
    .addFields(
      { name: "Region", value: region },
      { name: "Members Count", value: memberCount },
      { name: "Guild Owner", value: owner },
    );

  msg.channel.send(embed);
};
