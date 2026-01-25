module.exports = {
  name: "acceptall",
  desc: "Accepter toutes les demandes",
  async execute(sock, m) {
    if (!m.isGroup) return;
    const requests = await sock.groupRequestParticipantsList(m.key.remoteJid);
    for (let user of requests) {
      await sock.groupRequestParticipantsUpdate(m.key.remoteJid, [user.jid], "approve");
    }
    await sock.sendMessage(m.key.remoteJid, { text: "✅ Toutes les demandes acceptées." });
  }
};
