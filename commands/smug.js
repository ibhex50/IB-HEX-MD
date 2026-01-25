module.exports = {
  name: "smug",
  desc: "Sourire narquois",
  async execute(sock, m) {
    await sock.sendMessage(m.key.remoteJid, {
      text: "😏 Smug mood"
    });
  }
};
