module.exports = {
  name: "create",
  desc: "Créer un groupe",
  async execute(sock, m, args) {
    if (!args.length) return;
    await sock.groupCreate(args.join(" "), [m.key.remoteJid]);
  }
};
