module.exports = {
  name: "anime",
  desc: "Anime aléatoire",
  async execute(sock, m) {
    const animes = ["Naruto", "One Piece", "Attack on Titan", "Jujutsu Kaisen", "Demon Slayer"];
    const anime = animes[Math.floor(Math.random() * animes.length)];
    await sock.sendMessage(m.key.remoteJid, { text: `🎌 Anime du jour : ${anime}` });
  }
};
