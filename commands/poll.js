module.exports = {
  name: "poll",
  desc: "Créer un sondage",
  async execute(sock, m, args) {
    if (!args.length) return;
    await sock.sendMessage(m.key.remoteJid, {
      poll: {
        name: args.join(" "),
        values: ["Oui", "Non"],
        selectableCount: 1
      }
    });
  }
};
