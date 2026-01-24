const { encode } = require('image-data-uri'); // Pour convertir buffer en data-uri

module.exports = {
  name: "toimage",
  desc: "Convertit un sticker en image",
  async execute(sock, m) {
    try {
      // Vérifie si le message est un sticker
      if (!m.quoted || !m.quoted.message.stickerMessage) {
        return await sock.sendMessage(m.key.remoteJid, { text: "❌ Répond à un sticker pour le convertir." });
      }

      // Télécharge le sticker en buffer
      const stickerBuffer = await sock.downloadMediaMessage(m.quoted);

      // Envoie l'image directement depuis le buffer
      await sock.sendMessage(m.key.remoteJid, { 
        image: stickerBuffer, 
        caption: "🖼 Sticker converti en image !"
      });

    } catch (err) {
      console.error(err);
      await sock.sendMessage(m.key.remoteJid, { text: "❌ Une erreur est survenue lors de la conversion du sticker." });
    }
  }
};
