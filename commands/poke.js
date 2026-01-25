const axios = require("axios");

module.exports = {
  name: "poke",
  desc: "Gif anime poke",
  async execute(sock, m) {
    const t = m.mentionedJid?.[0];
    const { data } = await axios.get("https://api.waifu.pics/sfw/poke");

    await sock.sendMessage(m.key.remoteJid, {
      video: { url: data.url },
      gifPlayback: true,
      caption: t ? `👉 @${t.split("@")[0]} poke 😳` : "👉 Poke",
      mentions: t ? [t] : []
    });
  }
};
