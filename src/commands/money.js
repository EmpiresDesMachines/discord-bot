require("dotenv").config();
const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = async (msg) => {
  const { content: message } = msg;
  let currency = message.split(" ").slice(1);
  if (currency.length !== 1) {
    return msg.channel.send("<:fryhmm:657429118371233835> Не верный формат валюты!");
  }
  currency = currency.join("").toUpperCase();
  
  try {
    const arr = ["USD", "EUR", "RUB", "UAH"];
    if (!arr.includes(currency)) return msg.channel.send("<:fryhmm:657429118371233835> Не верный формат валюты!");
    const getValue = async (el) => {
      if (el === currency) return "";
      const response = await fetch(`https://free.currconv.com/api/v7/convert?q=${el}_${currency}&compact=ultra&apiKey=${process.env.CURRCONV_API_KEY}`);
      const json = await response.json();
      let [value] = Object.values(json);
      value = parseInt(value * 100) / 100;
      return `${el}: ${value}\n`;
    };
 
    const getMoney = async () => {
      const values = [];
      for (const name of arr) {
        const val = await getValue(name);
        values.push(val);
      }

      return msg.channel.send(`<:frymoney:657429069620838422><:frymoney:657429069620838422><:frymoney:657429069620838422>\`\`\`
Валютный курс (${currency}):
${values.join("")}\`\`\``);
    };
 
    const getMultipleExchangeRate = async () => {
      await getMoney();
    };

    getMultipleExchangeRate();

  } catch (error) {
      return msg.channel.send("Ошибка! <:pepe:244531994808156161>");
  }
};
