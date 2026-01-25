module.exports = {
  name: "image",
  desc: "Recherche une image",
  async execute(sock, m, args) {
    if (!args.length) return await sock.sendMessage(m.key.remoteJid, { text: "❌ Donne un mot clé pour l'image." });

    const query = args.join(" ");
    const url = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`;

    await sock.sendMessage(m.key.remoteJid, { text: `🖼 Résultat image : ${url}` });
  }
};
