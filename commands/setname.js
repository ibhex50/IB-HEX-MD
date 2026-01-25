module.exports = {
  name: "setname",
  desc: "Changer le nom du groupe",
  async execute(sock, m, args) {
    if (!m.isGroup || !args.length) return;
    await sock.groupUpdateSubject(m.key.remoteJid, args.join(" "));
  }
};
