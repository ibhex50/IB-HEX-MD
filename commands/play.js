module.exports = {
  name: "play",
  desc: "Recherche sur le Play Store",
  async execute(sock, m, args) {
    if (!args.length) return await sock.sendMessage(m.key.remoteJid, { text: "❌ Donne un mot clé pour le Play Store." });

    const query = args.join(" ");
    const url = `https://play.google.com/store/search?q=${encodeURIComponent(query)}&c=apps`;

    await sock.sendMessage(m.key.remoteJid, { text: `📱 Résultat Play Store : ${url}` });
  }
};
