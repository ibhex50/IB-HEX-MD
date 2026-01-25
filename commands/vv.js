module.exports = {
  name: "vv",
  desc: "Récupérer une vue unique",
  async execute(sock, m) {
    if (!m.quoted) {
      return sock.sendMessage(m.key.remoteJid, {
        text: "❌ Réponds à une image ou vidéo en vue unique."
      });
    }

    const msg = m.quoted.message;
    const viewOnce =
      msg.viewOnceMessageV2 ||
      msg.viewOnceMessageV2Extension;

    if (!viewOnce) {
      return sock.sendMessage(m.key.remoteJid, {
        text: "❌ Ce message n’est pas une vue unique."
      });
    }

    const media =
      viewOnce.message.imageMessage ||
      viewOnce.message.videoMessage;

    const buffer = await sock.downloadMediaMessage(
      { message: viewOnce.message }
    );

    await sock.sendMessage(m.key.remoteJid, {
      image: buffer,
      caption: "👁️ Vue unique récupérée"
    });
  }
};
