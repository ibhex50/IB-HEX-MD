module.exports = {
  name: "shinobu",
  desc: "Réaction Shinobu",
  async execute(sock, m) {
    await sock.sendMessage(m.key.remoteJid, {
      text: "🦋 Shinobu sourit calmement..."
    });
  }
};
