module.exports = {
  name: "linkgc",
  desc: "Lien du groupe",
  async execute(sock, m) {
    if (!m.isGroup) return;
    const link = await sock.groupInviteCode(m.key.remoteJid);
    await sock.sendMessage(m.key.remoteJid, {
      text: `🔗 https://chat.whatsapp.com/${link}`
    });
  }
};
