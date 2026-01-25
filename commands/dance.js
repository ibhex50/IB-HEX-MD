const axios = require("axios");

module.exports = {
  name: "dance",
  desc: "Gif anime dance",
  async execute(sock, m) {
    const { data } = await axios.get("https://api.waifu.pics/sfw/dance");

    await sock.sendMessage(m.key.remoteJid, {
      video: { url: data.url },
      gifPlayback: true,
      caption: "💃🕺 Ça danse 🔥"
    });
  }
};
