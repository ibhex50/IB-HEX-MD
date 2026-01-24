module.exports = {
  name: "alive",
  desc: "Vérifie si le bot est actif",
  async execute(sock, m) {
    await sock.sendMessage(m.key.remoteJid, {
      text: "🤖 IB_HEX_BOT est actif 🟢"
    });
  }
};
