module.exports = {
  name: "rank",
  desc: "Classement aléatoire",
  async execute(sock, m) {
    const ranks = ["🥇 Légende", "🥈 Pro", "🥉 Débutant", "🤡 Troll"];
    const rank = ranks[Math.floor(Math.random() * ranks.length)];
    await sock.sendMessage(m.key.remoteJid, { text: `🏆 Ton rang : ${rank}` });
  }
};
