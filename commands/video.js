module.exports = {
  name: "video",
  desc: "Recherche une vidéo YouTube",
  async execute(sock, m, args) {
    if (!args.length) return await sock.sendMessage(m.key.remoteJid, { text: "❌ Donne un mot clé pour YouTube." });

    const query = args.join(" ");
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

    await sock.sendMessage(m.key.remoteJid, { text: `🎥 Résultat vidéo : ${url}` });
  }
};
