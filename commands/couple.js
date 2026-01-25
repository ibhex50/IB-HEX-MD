module.exports = {
  name: "couple",
  desc: "Couple du jour",
  async execute(sock, m) {
    if (!m.isGroup) return;
    const members = (await sock.groupMetadata(m.key.remoteJid)).participants;
    const a = members[Math.floor(Math.random() * members.length)];
    const b = members[Math.floor(Math.random() * members.length)];
    await sock.sendMessage(m.key.remoteJid, {
      text: `💖 Couple du jour : @${a.id.split("@")[0]} ❤️ @${b.id.split("@")[0]}`,
      mentions: [a.id, b.id]
    });
  }
};
