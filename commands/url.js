const axios = require('axios');

module.exports = {
  name: "url",
  desc: "Raccourcir un lien",
  async execute(sock, m, args) {
    try {
      if (!args.length) return await sock.sendMessage(m.key.remoteJid, { text: "❌ Donne un lien à raccourcir." });

      const link = args[0];

      // Vérifie que le lien commence par http ou https
      if (!/^https?:\/\//i.test(link)) {
        return await sock.sendMessage(m.key.remoteJid, { text: "❌ Lien invalide. Assure-toi qu'il commence par http:// ou https://" });
      }

      // Appel à l'API TinyURL
      const response = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(link)}`);
      const shortLink = response.data;

      await sock.sendMessage(m.key.remoteJid, { text: `🔗 Lien raccourci : ${shortLink}` });

    } catch (err) {
      console.error(err);
      await sock.sendMessage(m.key.remoteJid, { text: "❌ Une erreur est survenue lors du raccourcissement du lien." });
    }
  }
};
