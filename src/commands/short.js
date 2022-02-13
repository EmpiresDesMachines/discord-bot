const fetch = require('node-fetch');

module.exports = async (msg) => {
  const { content } = msg;
  const pureLink = content.split(' ').slice(1).join(' ');
  const url = encodeURI(pureLink);
  if (
    !/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/.test(
      url,
    )
  ) {
    return msg.reply(`Адрес ${pureLink} не похож на ссылку <:goose:643803589655003156>`);
  }
  try {
    const f = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
    const resp = await f.json();
    if (resp.ok) {
      return msg.reply(resp.result.short_link2);
    }
  } catch (error) {
    return msg.reply('О, нет! Что-то пошло не так! <:pepe:244531994808156161>');
  }
};
