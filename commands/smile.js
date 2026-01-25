module.exports = {
  name: "smile",
  desc: "Sourire",
  async execute(sock, m) {
    await sock.sendMessage(m.key.remoteJid, {
      text: "😊 Sourire !"
    });
  }
};
