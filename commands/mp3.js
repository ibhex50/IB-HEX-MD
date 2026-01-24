const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const { PassThrough } = require('stream');

module.exports = {
  name: "mp3",
  desc: "Convertit une vidéo YouTube en MP3",
  async execute(sock, m, args) {
    try {
      if (!args.length) return await sock.sendMessage(m.key.remoteJid, { text: "❌ Envoie un lien vidéo à convertir." });

      const link = args[0];

      // Vérifie que le lien est valide
      if (!ytdl.validateURL(link)) {
        return await sock.sendMessage(m.key.remoteJid, { text: "❌ Lien YouTube invalide." });
      }

      // Crée un flux pour convertir en MP3
      const stream = ytdl(link, { filter: 'audioonly' });
      const output = new PassThrough();

      ffmpeg(stream)
        .audioBitrate(128)
        .format('mp3')
        .pipe(output);

      // Envoie le MP3 directement au chat
      await sock.sendMessage(m.key.remoteJid, {
        audio: output,
        mimetype: 'audio/mpeg',
        fileName: `audio_${Date.now()}.mp3`
      });

    } catch (err) {
      console.error(err);
      await sock.sendMessage(m.key.remoteJid, { text: "❌ Une erreur est survenue lors de la conversion en MP3." });
    }
  }
};
