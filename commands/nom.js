module.exports = {
  name: "nom",
  desc: "Manger quelqu’un",
  async execute(sock, m) {
    const t = m.mentionedJid?.[0];
    await sock.sendMessage(m.key.remoteJid, {
      text: t ? `🍽️ @${t.split("@")[0]} a été mangé 😋` : "🍽️ Nom nom",
      mentions: t ? [t] : []
    });
  }
};
