const axios = require("axios");

module.exports = {
  name: "happy",
  async execute(sock, m) {
    const { data } = await axios.get("https://api.waifu.pics/sfw/happy");

    await sock.sendMessage(m.key.remoteJid, {
      sticker: { url: data.url }
    });
  }
};
