module.exports = {
  name: "owner",
  desc: "Afficher le propriétaire du bot",
  async execute(sock, m) {
    await sock.sendMessage(m.key.remoteJid, {
      text: "🥷 Propriétaire : IbSacko"
    });
  }
};
