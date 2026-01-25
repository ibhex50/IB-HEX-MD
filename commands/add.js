module.exports = {
  name: "add",
  desc: "Ajouter un membre",
  async execute(sock, m, args) {
    if (!m.isGroup || !args[0]) return;
    const number = args[0].replace(/\D/g, "") + "@s.whatsapp.net";
    await sock.groupParticipantsUpdate(m.key.remoteJid, [number], "add");
  }
};
