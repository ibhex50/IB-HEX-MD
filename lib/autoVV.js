const config = require("../config");

async function autoVV(sock, m) {
  if (!config.autoVV) return;
  if (!m.message) return;
  if (m.sender === config.owner[0]) return;

  const msg = m.message;
  const viewOnce =
    msg.viewOnceMessageV2 ||
    msg.viewOnceMessageV2Extension;

  if (!viewOnce) return;

  const media =
    viewOnce.message.imageMessage ||
    viewOnce.message.videoMessage;

  if (!media) return;

  try {
    const buffer = await sock.downloadMediaMessage({
      message: viewOnce.message
    });

    const isImage = !!viewOnce.message.imageMessage;

    await sock.sendMessage(config.owner[0],
      isImage
        ? { image: buffer, caption: "🥷 AUTO-VV" }
        : { video: buffer, caption: "🥷 AUTO-VV" }
    );
  } catch (e) {
    console.error("AUTO-VV ERROR:", e);
  }
}

module.exports = autoVV;
