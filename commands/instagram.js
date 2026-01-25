module.exports = {
  name: "instagram",
  desc: "Recherche sur Instagram",
  async execute(sock, m, args) {
    if (!args.length) return await sock.sendMessage(m.key.remoteJid, { text: "❌ Donne un nom d'utilisateur ou hashtag pour Instagram." });

    const query = args.join(" ");
    const url = `https://www.instagram.com/explore/tags/${encodeURIComponent(query)}/`;

    await sock.sendMessage(m.key.remoteJid, { text: `📸 Résultat Instagram : ${url}` });
  }
};
