module.exports = {
  name: "antispam",
  desc: "Anti spam (basique)",
  async execute(sock, m) {
    await sock.sendMessage(m.key.remoteJid, { text: "🚫 Anti-spam actif." });
  }
};
