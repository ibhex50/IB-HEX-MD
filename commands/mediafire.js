module.exports = {
  name: "mediafire",
  desc: "Recherche sur MediaFire",
  async execute(sock, m, args) {
    if (!args.length) return await sock.sendMessage(m.key.remoteJid, { text: "❌ Donne un mot clé pour MediaFire." });

    const query = args.join(" ");
    const url = `https://www.mediafire.com/search/?q=${encodeURIComponent(query)}`;

    await sock.sendMessage(m.key.remoteJid, { text: `📂 Résultat MediaFire : ${url}` });
  }
};
