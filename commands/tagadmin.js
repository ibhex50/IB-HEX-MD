module.exports = {
  name: "tagadmin",
  desc: "Mentionne tous les admins",
  async execute(sock, m) {
    if (!m.isGroup) return;
    const meta = await sock.groupMetadata(m.key.remoteJid);
    const admins = meta.participants.filter(p => p.admin);

    const text = admins.map(a => `@${a.id.split("@")[0]}`).join("\n");

    await sock.sendMessage(m.key.remoteJid, {
      text: `👮 Admins du groupe:\n${text}`,
      mentions: admins.map(a => a.id)
    });
  }
};
