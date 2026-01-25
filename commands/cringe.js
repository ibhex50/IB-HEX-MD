module.exports = {
  name: "cringe",
  desc: "Moment gênant",
  async execute(sock, m) {
    await sock.sendMessage(m.key.remoteJid, {
      text: "😬 Cringe..."
    });
  }
};
