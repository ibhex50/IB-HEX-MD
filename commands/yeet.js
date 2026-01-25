module.exports = {
  name: "yeet",
  desc: "Jeter quelqu’un",
  async execute(sock, m) {
    const target = m.mentionedJid?.[0];
    const text = target
      ? `💨 @${target.split("@")[0]} a été YEET 💥`
      : "💨 YEET 💥";

    await sock.sendMessage(m.key.remoteJid, {
      text,
      mentions: target ? [target] : []
    });
  }
};
