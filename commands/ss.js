module.exports = {
  name: "ss",
  desc: "Screenshot désactivé (Render safe)",
  async execute(sock, m) {
    await sock.sendMessage(m.key.remoteJid, {
      text: "❌ La commande *ss* est désactivée sur Render (puppeteer non supporté)."
    });
  }
};
