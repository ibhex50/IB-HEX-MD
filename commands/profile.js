module.exports = {
  name: "profile",
  desc: "Profil utilisateur",
  async execute(sock, m) {
    const user = m.key.participant || m.key.remoteJid;
    await sock.sendMessage(m.key.remoteJid, {
      text: `👤 Profil\nID: ${user}\nStatut: Actif ✅`
    });
  }
};
