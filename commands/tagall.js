module.exports = {
  name: "tagall",
  desc: "Mentionne tout le groupe",
  async execute(sock, m) {
    if (!m.isGroup) return;
    const meta = await sock.groupMetadata(m.key.remoteJid);
    const members = meta.participants;

    await sock.sendMessage(m.key.remoteJid, {
      text: "📢 TAG ALL",
      mentions: members.map(m => m.id)
    });
  }
};
