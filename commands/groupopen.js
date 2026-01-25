module.exports = {
  name: "groupopen",
  desc: "Ouvrir le groupe",
  async execute(sock, m) {
    if (!m.isGroup) return;
    await sock.groupSettingUpdate(m.key.remoteJid, "not_announcement");
    await sock.sendMessage(m.key.remoteJid, { text: "🔓 Groupe ouvert." });
  }
};
