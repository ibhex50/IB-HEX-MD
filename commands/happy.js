module.exports = {
  name: "happy",
  desc: "Être heureux",
  async execute(sock, m) {
    await sock.sendMessage(m.key.remoteJid, {
      text: "😄 Trop heureux aujourd’hui !"
    });
  }
};
