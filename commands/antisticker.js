module.exports = {
  name: "antisticker",
  desc: "Bloque les stickers",
  async execute(sock, m) {
    if (m.message?.stickerMessage) {
      await sock.sendMessage(m.key.remoteJid, { text: "❌ Stickers interdits." });
    }
  }
};
