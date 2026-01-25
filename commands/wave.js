const axios = require("axios");

module.exports = {
  name: "wave",
  desc: "Gif anime wave",
  async execute(sock, m) {
    const { data } = await axios.get("https://api.waifu.pics/sfw/wave");

    await sock.sendMessage(m.key.remoteJid, {
      video: { url: data.url },
      gifPlayback: true,
      caption: "👋 Salut tout le monde"
    });
  }
};
