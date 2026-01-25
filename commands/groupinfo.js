module.exports = {
  name: "groupinfo",
  desc: "Infos du groupe",
  async execute(sock, m) {
    if (!m.isGroup) return;
    const meta = await sock.groupMetadata(m.key.remoteJid);

    await sock.sendMessage(m.key.remoteJid, {
      text: `ℹ️ Groupe Info
Nom: ${meta.subject}
Membres: ${meta.participants.length}
Créé le: ${new Date(meta.creation * 1000).toLocaleDateString()}`
    });
  }
};
