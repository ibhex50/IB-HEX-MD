module.exports = {
  name: "facebook",
  desc: "Recherche sur Facebook",
  async execute(sock, m, args) {
    if (!args.length) return await sock.sendMessage(m.key.remoteJid, { text: "❌ Donne un mot clé pour Facebook." });

    const query = args.join(" ");
    const url = `https://www.facebook.com/search/top?q=${encodeURIComponent(query)}`;

    await sock.sendMessage(m.key.remoteJid, { text: `📘 Résultat Facebook : ${url}` });
  }
};
