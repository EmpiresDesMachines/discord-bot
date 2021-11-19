require("dotenv").config();
const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = async (msg) => {
  const { content: message } = msg;
  let currency = message.split(" ").slice(1);
  if (currency.length < 2 || currency.length > 3) {
    return msg.channel.send("Укажите два аргумента! *(например: !convert USD EUR)*");
  }
  let coeff = 1;
  let from = "";
  let to = "";
  if (currency.length == 2) {
    [from, to] = currency;
  }
  if (currency.length == 3) {
    [n, from, to] = currency;
    coeff = +n;
  }
  if (isNaN(coeff)) return msg.channel.send("Не верный формат данных! <:pepe:244531994808156161>"); 
  from = from.toUpperCase();
  to = to.toUpperCase();
  try {
      const response = await fetch(`https://free.currconv.com/api/v7/convert?q=${from}_${to}&compact=ultra&apiKey=${process.env.CURRCONV_API_KEY}`);
      const json = await response.json();
      let [value] = Object.values(json);
      if (!value) return msg.channel.send("Некорректные пользовательские данные! <:pepe:244531994808156161>");
      value *= coeff;
      value = value >= 1 ? parseInt(value * 100) / 100 : value.toPrecision(2);
      return msg.channel.send(`${coeff} ${from} = ${value} ${to} <:frymoney:657429069620838422><:frymoney:657429069620838422><:frymoney:657429069620838422>`); 

  } catch (error) {
      return msg.channel.send("Ошибка! <:pepe:244531994808156161>");
  }
};
