module.exports = {
  name: "goodnight",
  desc: "Souhaite bonne nuit",
  async execute(sock, m) {
    const msg = "🌙 Bonne nuit 😴\nFais de beaux rêves ✨";
    await sock.sendMessage(m.key.remoteJid, { text: msg });
  }
};
