module.exports = {
  name: "poke",
  desc: "Toucher quelqu’un",
  async execute(sock, m) {
    const t = m.mentionedJid?.[0];
    await sock.sendMessage(m.key.remoteJid, {
      text: t ? `👉 @${t.split("@")[0]} poke 😳` : "👉 Poke",
      mentions: t ? [t] : []
    });
  }
};
