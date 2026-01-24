const { writeFileSync } = require('fs');
const { spawn } = require('child_process');
const path = require('path');

module.exports = {
  name: "sticker",
  desc: "Créer un sticker à partir d'une image ou vidéo",
  async execute(sock, m) {
    try {
      if (!m.quoted || (!m.quoted.message.imageMessage && !m.quoted.message.videoMessage)) {
        return await sock.sendMessage(m.key.remoteJid, { text: "❌ Répond à une image ou vidéo pour créer un sticker." });
      }

      // Télécharge l'image ou vidéo
      const mediaBuffer = await sock.downloadMediaMessage(m.quoted);

      // Définir le nom du fichier temporaire
      const tempFile = path.join(__dirname, `temp_${Date.now()}`);
      const outputFile = path.join(__dirname, `sticker_${Date.now()}.webp`);

      // Sauvegarde temporaire du fichier pour ffmpeg
      writeFileSync(tempFile, mediaBuffer);

      // Convertir en WebP pour sticker
      const ffmpegArgs = [
        '-i', tempFile,
        '-vcodec', 'libwebp',
        '-filter:v', 'fps=fps=15,scale=512:512:flags=lanczos',
        '-lossless', '1',
        '-loop', '0',
        '-preset', 'default',
        '-an',
        '-vsync', '0',
        outputFile
      ];

      await new Promise((resolve, reject) => {
        const ff = spawn('ffmpeg', ffmpegArgs);
        ff.on('close', (code) => {
          if (code === 0) resolve();
          else reject(new Error(`ffmpeg exited with code ${code}`));
        });
      });

      // Lire le sticker et envoyer
      const stickerBuffer = require('fs').readFileSync(outputFile);
      await sock.sendMessage(m.key.remoteJid, { sticker: stickerBuffer });

      // Supprimer fichiers temporaires
      require('fs').unlinkSync(tempFile);
      require('fs').unlinkSync(outputFile);

    } catch (err) {
      console.error(err);
      await sock.sendMessage(m.key.remoteJid, { text: "❌ Une erreur est survenue lors de la création du sticker." });
    }
  }
};
