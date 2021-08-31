const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = async (msg) => {
  const { content: message } = msg;
  try {
    const cityName = message.split(" ").slice(1).join(" ");
    const encodeCityName = encodeURI(cityName);
    const f = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeCityName}&units=metric&APPID=${process.env.OPENWEATHER_API_KEY}`);
    const currentWeather = await f.json();
    if (currentWeather.cod === 200) {
      const {
        clouds: { all: cloudsAmount },
        main: { temp: temperature, humidity, pressure },
        sys: { country },
        weather: [weatherInfo],
        wind: { speed: windSpeed, deg: windDegrees },
      } = currentWeather;
      const { description: weatherDescription } = weatherInfo;

      msg.reply(`**Погода в ${cityName}** (${country.toLowerCase()})** :**
Сейчас температура **${Math.round(temperature * 10) / 10} ℃**, ветер ${windDirection(windDegrees)} **${Math.round(windSpeed * 10) / 10} м/с**, **${translateWeatherDescription(weatherDescription)}** облачность **${cloudsAmount}%**, влажность **${humidity}%**, давление **${Math.round(pressure / 1.33)} мм**`);

      /*
      const exampleEmbed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Some title")
        .setURL("https://discord.js.org/")
        .setAuthor("Some name", "https://i.imgur.com/wSTFkRM.png", "https://discord.js.org")
        .setDescription("Some description here")
        .setThumbnail(`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`)
        .addFields(
          { name: "Regular field title", value: "Some value here" },
          { name: "\u200B", value: "\u200B" },
          { name: "Inline field title", value: "Some value here", inline: true },
          { name: "Inline field title", value: "Some value here", inline: true },
        )
        .addField("Inline field title", "Some value here", true)
        .setImage("https://i.imgur.com/wSTFkRM.png")
        .setTimestamp()
        .setFooter("Some footer text here", "https://i.imgur.com/wSTFkRM.png");
      msg.reply(exampleEmbed);
      */
    } else {
      const { cod, message: errorMsg } = currentWeather;
      msg.reply(`[error: ${cod}] ${errorMsg}`);
    }
  } catch (error) {
    return error;
  }
};

function windDirection(deg) {
  if (deg > 22.5 && deg <= 67.5) return ":arrow_lower_left: **северо-восточный**";
  if (deg > 67.5 && deg <= 112.5) return ":arrow_left: **восточный**";
  if (deg > 112.5 && deg <= 157.5) return ":arrow_upper_left: **юго-восточный**";
  if (deg > 157.5 && deg <= 202.5) return ":arrow_up: **южный**";
  if (deg > 202.5 && deg <= 236.5) return ":arrow_upper_right: **юго-западный**";
  if (deg > 236.5 && deg <= 292.5) return ":arrow_right: **западный**";
  if (deg > 292.5 && deg <= 337.5) return ":arrow_lower_right: **северо-западный**";
  return ":arrow_down: **северный**";
}

function translateWeatherDescription(descr) {
  const w = {
    "clear sky": "чистое небо :blue_circle:",
    "few clouds": "малооблачно :white_sun_small_cloud:",
    "scattered clouds": "переменная облачность :white_sun_small_cloud:",
    "broken clouds": "облачно :white_sun_cloud:",
    "overcast clouds": "повышенная облачность :cloud:",
    "light rain": "лёгкий дождь :white_sun_rain_cloud:",
    "moderate rain": "умеренный дождь :white_sun_rain_cloud:",
    rain: "дождь :cloud_rain:",
    "heavy intensity rain": "сильный дождь :cloud_rain:",
    "very heavy rain": "ливень :cloud_rain:",
    "extreme rain": "ливень :cloud_rain:",
    "freezing rain": "замерзающий дождь (ледяной дождь) :cloud_rain:",
    "light intensity shower rain": "лёгкий дождь :cloud_rain:",
    "shower rain": "дождь :cloud_rain:",
    "heavy intensity shower rain": "сильный дождь :cloud_rain:",
    "ragged shower rain": "сильный дождь :cloud_rain:",
    "thunderstorm with light rain": "гроза с легким дождём :thunder_cloud_rain:",
    "thunderstorm with rain": "гроза с дождём :thunder_cloud_rain:",
    "thunderstorm with heavy rain": "гроза с сильным дождём :thunder_cloud_rain:",
    "light thunderstorm": "слабая гроза :thunder_cloud_rain:",
    thunderstorm: "гроза :thunder_cloud_rain:",
    "heavy thunderstorm": "сильная гроза :thunder_cloud_rain:",
    "ragged thunderstorm": "сильная гроза :thunder_cloud_rain:",
    "light snow": "слабый снег :cloud_snow:",
    snow: "снег :cloud_snow:",
    "heavy snow": "снегопад :cloud_snow:",
    sleet: "мокрый снег :cloud_snow:",
    "light shower sleet": "слабый мокрый снег :cloud_snow:",
    "shower sleet": "сильный мокрый снег :cloud_snow:",
    "light rain and snow": "лёгкий дождь со снегом :cloud_rain::cloud_snow:",
    "rain and snow": "дождь со снегом :cloud_rain::cloud_snow:",
    "light shower snow": "слабая метель :cloud_snow:",
    "shower snow": "метель :cloud_snow:",
    "heavy shower snow": "сильная метель :cloud_snow:",
    mist: "дымка :fog:",
    smoke: "дым :fog:",
    haze: "мгла :fog:",
    sand: "песок :fog:",
    "dust whirls": "пыльный вихрь :dash:",
    fog: "туман :fog:",
    dust: "пыль :fog:",
    "volcanic ash": "вулканический пепел :fog:",
    squalls: "шквал :dash:",
    tornado: "торнадо :cloud_tornado:",
  };

  if (descr.indexOf("thunderstorm") !== -1 && !w[descr]) return "гроза :thunder_cloud_rain:";
  if (descr.indexOf("drizzle") !== -1) return "морось :fog:";

  return w[descr] || "нет данных";
}
