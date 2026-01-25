module.exports = {
  name: "getall",
  desc: "Liste des membres",
  async execute(sock, m) {
    if (!m.isGroup) return;
    const meta = await sock.groupMetadata(m.key.remoteJid);
    const list = meta.participants.map(p => `• ${p.id.split("@")[0]}`).join("\n");

    await sock.sendMessage(m.key.remoteJid, { text: `👥 Membres:\n${list}` });
  }
};
