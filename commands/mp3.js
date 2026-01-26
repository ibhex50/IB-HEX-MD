const ytdl = require("ytdl-core");

module.exports = {
  name: "mp3",
  desc: "Télécharger une vidéo YouTube en audio (mp3)",
  async execute(sock, m, args) {
    try {
      if (!args[0]) {
        return await sock.sendMessage(
          m.key.remoteJid,
          { text: "❌ Donne un lien YouTube.\nEx: Ib mp3 https://youtu.be/xxxx" },
          { quoted: m }
        );
      }

      const url = args[0];

      if (!ytdl.validateURL(url)) {
        return await sock.sendMessage(
          m.key.remoteJid,
          { text: "❌ Lien YouTube invalide." },
          { quoted: m }
        );
      }

      // Infos vidéo
      const info = await ytdl.getInfo(url);
      const title = info.videoDetails.title;

      await sock.sendMessage(
        m.key.remoteJid,
        { text: "⏳ Téléchargement de l'audio en cours..." },
        { quoted: m }
      );

      // Stream audio
      const audioStream = ytdl(url, {
        filter: "audioonly",
        quality: "highestaudio"
      });

      await sock.sendMessage(
        m.key.remoteJid,
        {
          audio: audioStream,
          mimetype: "audio/mpeg",
          ptt: false,
          fileName: `${title}.mp3`
        },
        { quoted: m }
      );

    } catch (err) {
      console.error("❌ Erreur mp3:", err);
      await sock.sendMessage(
        m.key.remoteJid,
        { text: "❌ Erreur lors du téléchargement MP3." },
        { quoted: m }
      );
    }
  }
};
