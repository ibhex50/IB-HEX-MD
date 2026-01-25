module.exports = {
  name: "tiktok",
  desc: "Recherche sur TikTok",
  async execute(sock, m, args) {
    if (!args.length) return await sock.sendMessage(m.key.remoteJid, { text: "❌ Donne un mot clé pour TikTok." });

    const query = args.join(" ");
    const url = `https://www.tiktok.com/search?q=${encodeURIComponent(query)}`;

    await sock.sendMessage(m.key.remoteJid, { text: `🎵 Résultat TikTok : ${url}` });
  }
};
