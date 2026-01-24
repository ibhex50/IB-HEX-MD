const axios = require('axios');

module.exports = {
  name: "attp",
  desc: "Convertit du texte en sticker animé",
  async execute(sock, m, args) {
    try {
      if (!args.length) {
        return await sock.sendMessage(m.key.remoteJid, { text: "❌ Écris du texte pour le sticker." });
      }

      const text = args.join(" ");

      // Appel à l'API pour créer le sticker animé
      const url = `https://api.xteam.xyz/attp?file&text=${encodeURIComponent(text)}`;
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const stickerBuffer = Buffer.from(response.data, 'binary');

      // Envoie le sticker animé en WebP
      await sock.sendMessage(m.key.remoteJid, {
        sticker: stickerBuffer
      });

    } catch (err) {
      console.error(err);
      await sock.sendMessage(m.key.remoteJid, { text: "❌ Une erreur est survenue lors de la création du sticker animé." });
    }
  }
};
