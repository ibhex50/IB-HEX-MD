module.exports = {
  name: "ping",
  desc: "Vitesse du bot",
  async execute(sock, m) {
    const start = Date.now();
    await sock.sendMessage(m.key.remoteJid, { text: "🏓 Pong..." });
    const end = Date.now();
    await sock.sendMessage(m.key.remoteJid, {
      text: `⚡ Ping : ${end - start} ms`
    });
  }
};
