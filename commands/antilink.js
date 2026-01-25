module.exports = {
  name: "antilink",
  desc: "Anti lien (simple)",
  async execute(sock, m) {
    if (m.text?.includes("http")) {
      await sock.sendMessage(m.key.remoteJid, { text: "❌ Les liens sont interdits ici." });
    }
  }
};
