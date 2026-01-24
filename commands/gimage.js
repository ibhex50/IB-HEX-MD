const fetch = require("node-fetch");

module.exports = {
  name: "gimage",
  desc: "Recherche une image sur Google",
  async execute(sock, m, args) {
    if (!args.length) return await sock.sendMessage(m.key.remoteJid, { text: "❌ Écris un mot clé pour l'image." });

    const query = args.join(" ");
    const url = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`;

    await sock.sendMessage(m.key.remoteJid, { text: `🔗 Voici le lien pour ton image : ${url}` });
  }
};
