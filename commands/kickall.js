module.exports = {
  name: "kickall",
  desc: "Expulser tous les membres",
  async execute(sock, m) {
    if (!m.isGroup) return;
    const meta = await sock.groupMetadata(m.key.remoteJid);
    const admins = meta.participants.filter(p => p.admin);
    const members = meta.participants.filter(p => !p.admin);

    for (let user of members) {
      await sock.groupParticipantsUpdate(m.key.remoteJid, [user.id], "remove");
    }

    await sock.sendMessage(m.key.remoteJid, { text: "🚨 Tous les membres ont été expulsés." });
  }
};
