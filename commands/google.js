module.exports = {
  name: "google",
  desc: "Recherche sur Google",
  async execute(sock, m, args) {
    if (!args.length) return await sock.sendMessage(m.key.remoteJid, { text: "❌ Donne un mot clé pour rechercher sur Google." });

    const query = args.join(" ");
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

    await sock.sendMessage(m.key.remoteJid, { text: `🔍 Résultat Google : ${url}` });
  }
};
