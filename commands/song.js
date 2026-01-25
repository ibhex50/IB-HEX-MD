module.exports = {
  name: "song",
  desc: "Recherche une musique",
  async execute(sock, m, args) {
    if (!args.length) return await sock.sendMessage(m.key.remoteJid, { text: "❌ Donne un titre de musique." });

    const query = args.join(" ");
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}+song`;

    await sock.sendMessage(m.key.remoteJid, { text: `🎵 Résultat musique : ${url}` });
  }
};
