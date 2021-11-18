require("dotenv").config();
const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = async (msg) => {
  const { content: message } = msg;
  let currency = message.split(" ").slice(1);
  if (currency.length !== 2) {
    return msg.channel.send("Укажите два аргумента! *(например: !convert USD EUR)*");
  }
  let [from, to] = currency; 
  from = from.toUpperCase();
  to = to.toUpperCase();
  try {
      const response = await fetch(`https://free.currconv.com/api/v7/convert?q=${from}_${to}&compact=ultra&apiKey=${process.env.CURRCONV_API_KEY}`);
      const json = await response.json();
      let [value] = Object.values(json);
      if (!value) return msg.channel.send("Некорректные пользовательские данные! <:pepe:244531994808156161>"); 
      value = parseInt(value * 100) / 100;
      return msg.channel.send(`1 ${from} = ${value} ${to} <:frymoney:657429069620838422><:frymoney:657429069620838422><:frymoney:657429069620838422>`); 

  } catch (error) {
      return msg.channel.send("Ошибка! <:pepe:244531994808156161>");
  }
};
