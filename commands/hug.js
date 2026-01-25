const axios = require("axios");

module.exports = {
  name: "hug",
  desc: "Gif anime hug",
  async execute(sock, m) {
    const t = m.mentionedJid?.[0];
    const { data } = await axios.get("https://api.waifu.pics/sfw/hug");

    await sock.sendMessage(m.key.remoteJid, {
      video: { url: data.url },
      gifPlayback: true,
      caption: t ? `🤗 @${t.split("@")[0]} reçoit un câlin` : "🤗 Hug",
      mentions: t ? [t] : []
    });
  }
};
