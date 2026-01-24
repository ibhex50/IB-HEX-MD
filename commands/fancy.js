const axios = require('axios');

module.exports = {
  name: "fancy",
  desc: "Texte stylé",
  async execute(sock, m, args) {
    try {
      if (!args.length) return await sock.sendMessage(m.key.remoteJid, { text: "❌ Écris un texte à styliser." });

      const text = args.join(" ");

      // Appel à l'API pour générer le texte stylé
      const response = await axios.get(`https://api.popcatdev.repl.co/fancytext?text=${encodeURIComponent(text)}`);
      const fancyText = response.data.result || text;

      await sock.sendMessage(m.key.remoteJid, { text: `✨ Texte stylé : ${fancyText}` });

    } catch (err) {
      console.error(err);
      await sock.sendMessage(m.key.remoteJid, { text: "❌ Une erreur est survenue lors de la stylisation du texte." });
    }
  }
};
