const config = require("../../config");

module.exports = {
  name: "🥷",
  desc: "Récupérer vue unique en privé (vv2)",
  async execute(sock, m) {

    // Sécurité : owner only
    if (!config.owner.includes(m.sender)) {
      return sock.sendMessage(m.key.remoteJid, {
        text: "❌ Commande réservée au propriétaire."
      });
    }

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

    const mediaMsg =
      viewOnce.message.imageMessage ||
      viewOnce.message.videoMessage;

    if (!mediaMsg) {
      return sock.sendMessage(m.key.remoteJid, {
        text: "❌ Média non supporté."
      });
    }

    const buffer = await sock.downloadMediaMessage({
      message: viewOnce.message
    });

    // Envoi DIRECT dans le privé du owner
    await sock.sendMessage(config.owner[0], {
      image: buffer,
      caption: "🥷 Vue unique récupérée (vv2)"
    });

    // Confirmation discrète dans le groupe
    await sock.sendMessage(m.key.remoteJid, {
      text: "🥷 Média envoyé en privé."
    });
  }
};
