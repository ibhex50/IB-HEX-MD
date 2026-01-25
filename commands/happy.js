const axios = require("axios");

module.exports = {
  name: "happy",
  desc: "Gif anime happy",
  async execute(sock, m) {
    const { data } = await axios.get("https://api.waifu.pics/sfw/happy");

    await sock.sendMessage(m.key.remoteJid, {
      video: { url: data.url },
      gifPlayback: true,
      caption: "😄 Happy mood ✨"
    });
  }
};
