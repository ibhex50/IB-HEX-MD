module.exports = {
  name: "slap",
  desc: "Gifler quelqu’un",
  async execute(sock, m) {
    const t = m.mentionedJid?.[0];
    await sock.sendMessage(m.key.remoteJid, {
      text: t ? `👋 @${t.split("@")[0]} a été giflé 😭` : "👋 Slap !",
      mentions: t ? [t] : []
    });
  }
};
