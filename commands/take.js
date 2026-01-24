const { writeFileSync } = require('fs');

module.exports = {
  name: "take",
  desc: "Récupérer le média d’un sticker",
  async execute(sock, m) {
    try {
      if (!m.quoted || !m.quoted.message.stickerMessage) {
        return await sock.sendMessage(m.key.remoteJid, { text: "❌ Répond à un sticker pour récupérer le média." });
      }

      // Télécharge le sticker en buffer
      const stickerBuffer = await sock.downloadMediaMessage(m.quoted);

      // Vérifie si le sticker est animé (webp avec animation)
      const isAnimated = m.quoted.message.stickerMessage.isAnimated || false;

      if (isAnimated) {
        // Si sticker animé, renvoyer en WebP animé
        await sock.sendMessage(m.key.remoteJid, {
          video: stickerBuffer,
          mimetype: 'image/webp',
          caption: "📥 Média récupéré du sticker animé !"
        });
      } else {
        // Sticker statique → renvoyer en image PNG
        await sock.sendMessage(m.key.remoteJid, {
          image: stickerBuffer,
          caption: "📥 Média récupéré du sticker !"
        });
      }

    } catch (err) {
      console.error(err);
      await sock.sendMessage(m.key.remoteJid, { text: "❌ Une erreur est survenue lors de la récupération du média du sticker." });
    }
  }
};
