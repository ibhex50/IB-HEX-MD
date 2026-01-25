module.exports = {
  name: "wcg",
  desc: "Qui est le plus beau du groupe",
  async execute(sock, m) {
    if (!m.isGroup) return;
    const members = await sock.groupMetadata(m.key.remoteJid);
    const random = members.participants[Math.floor(Math.random() * members.participants.length)];
    await sock.sendMessage(m.key.remoteJid, {
      text: `😎 Le plus stylé du groupe est : @${random.id.split("@")[0]}`,
      mentions: [random.id]
    });
  }
};
