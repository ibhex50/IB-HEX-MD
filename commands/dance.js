module.exports = {
  name: "dance",
  desc: "Danser",
  async execute(sock, m) {
    await sock.sendMessage(m.key.remoteJid, {
      text: "💃🕺 Ça danse ici 🔥"
    });
  }
};
