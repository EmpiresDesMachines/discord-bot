const Discord = require("discord.js");
const Canvas = require("canvas");

module.exports = async (msg) => {
  const { content: message } = msg;
  const drawWord = message.split(" ").slice(1).join(" ");

  const canvas = Canvas.createCanvas(800, 350);
  const context = canvas.getContext("2d");
  // Since the image takes time to load, you should await it
  const background = await Canvas.loadImage("https://discordjs.guide/assets/canvas-preview.30c4fe9e.png");
  // This uses the canvas dimensions to stretch the image onto the entire canvas
  context.drawImage(background, 0, 0, canvas.width, canvas.height);
  // Use the helpful Attachment class structure to process the file for you

  context.strokeRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#ffffff";
  context.font = "60px Arial";
  context.textBaseline = "middle";
  context.textAlign = "center";
  // context.fillText(drawWord, canvas.width / 2.5, canvas.height / 1.8);
  context.fillText(drawWord, canvas.width / 2, canvas.height / 1.8);

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome-image.png");
  msg.channel.send("", attachment);
};
