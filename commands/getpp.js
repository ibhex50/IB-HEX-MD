module.exports = {
  name: "getpp",
  desc: "Voir la photo de profil",
  async execute(sock, m) {
    const jid = m.mentionedJid?.[0] || m.key.remoteJid;
    try {
      const pp = await sock.profilePictureUrl(jid, "image");
      await sock.sendMessage(m.key.remoteJid, {
        image: { url: pp },
        caption: "📸 Photo de profil"
      });
    } catch {
      await sock.sendMessage(m.key.remoteJid, { text: "❌ Impossible de récupérer la photo." });
    }
  }
};
