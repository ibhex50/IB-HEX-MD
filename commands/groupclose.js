module.exports = {
  name: "groupclose",
  desc: "Fermer le groupe",
  async execute(sock, m) {
    if (!m.isGroup) return;
    await sock.groupSettingUpdate(m.key.remoteJid, "announcement");
    await sock.sendMessage(m.key.remoteJid, { text: "🔒 Groupe fermé." });
  }
};
