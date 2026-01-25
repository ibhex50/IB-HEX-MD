module.exports = {
  name: "lyrics",
  desc: "Recherche paroles de chanson",
  async execute(sock, m, args) {
    if (!args.length) return await sock.sendMessage(m.key.remoteJid, { text: "❌ Donne le titre d'une chanson." });

    const query = args.join(" ");
    const url = `https://www.lyrics.com/serp.php?st=${encodeURIComponent(query)}`;

    await sock.sendMessage(m.key.remoteJid, { text: `🎶 Paroles : ${url}` });
  }
};
