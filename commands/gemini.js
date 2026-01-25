const fetch = require("node-fetch");
require('dotenv').config();

module.exports = {
  name: "gemini",
  desc: "Discussion avec l'IA Gemini",
  async execute(sock, m, args) {
    if (!args.length)
      return await sock.sendMessage(m.key.remoteJid, { text: "❌ Écris quelque chose pour Gemini." });

    const question = args.join(" ");

    try {
      const response = await fetch("https://api.gemini.ai/v1/chat", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.AIzaSyAk-vcYwpF_APrV6G3Lu1Fsr5UnNJMcNQw}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: question })
      });

      const data = await response.json();
      const answer = data.response || "❌ Pas de réponse de Gemini";
      await sock.sendMessage(m.key.remoteJid, { text: `💡 Gemini : ${answer}` });
    } catch (error) {
      console.error(error);
      await sock.sendMessage(m.key.remoteJid, { text: "❌ Erreur avec l'API Gemini" });
    }
  }
};
