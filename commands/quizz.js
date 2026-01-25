module.exports = {
  name: "quizz",
  desc: "Quiz rapide",
  async execute(sock, m) {
    const quiz = "❓ Question :\nQuelle est la capitale de la Guinée ?\nA) Dakar\nB) Conakry\nC) Bamako";
    await sock.sendMessage(m.key.remoteJid, { text: quiz });
  }
};
