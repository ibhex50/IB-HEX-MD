const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

module.exports = {
  name: "chatbot",
  desc: "Chatbot IA automatique",
  async execute(sock, m, args) {
    if (!args.length) {
      return sock.sendMessage(m.key.remoteJid, {
        text: "❌ Écris un message pour le chatbot."
      });
    }

    try {
      const question = args.join(" ");

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Tu es un assistant WhatsApp sympa et utile." },
          { role: "user", content: question }
        ]
      });

      const reply = response.choices[0].message.content;

      await sock.sendMessage(m.key.remoteJid, {
        text: `🤖 Chatbot : ${reply}`
      });

    } catch (err) {
      console.error("Chatbot error:", err);
      await sock.sendMessage(m.key.remoteJid, {
        text: "❌ Erreur du chatbot."
      });
    }
  }
};
