const axios = require("axios");

module.exports = {
  name: "slap",
  desc: "Gif anime slap",
  async execute(sock, m) {
    const t = m.mentionedJid?.[0];
    const { data } = await axios.get("https://api.waifu.pics/sfw/slap");

    await sock.sendMessage(m.key.remoteJid, {
      video: { url: data.url },
      gifPlayback: true,
      caption: t ? `👋 @${t.split("@")[0]} SLAP 💥` : "👋 SLAP 💥",
      mentions: t ? [t] : []
    });
  }
};
