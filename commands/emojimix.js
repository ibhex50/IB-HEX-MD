module.exports = {
  name: "emojimix",
  desc: "Mélange deux emojis",
  async execute(sock, m, args) {
    if (args.length < 2) return await sock.sendMessage(m.key.remoteJid, { text: "❌ Exemple: .emojimix 😎 🔥" });
    await sock.sendMessage(m.key.remoteJid, {
      text: `✨ Emoji mix : ${args[0]}${args[1]}`
    });
  }
};
