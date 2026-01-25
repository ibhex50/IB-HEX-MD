module.exports = {
  name: "wave",
  desc: "Saluer",
  async execute(sock, m) {
    await sock.sendMessage(m.key.remoteJid, {
      text: "👋 Coucou tout le monde"
    });
  }
};
