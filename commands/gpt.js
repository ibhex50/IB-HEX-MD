const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

module.exports = {
  name: "gpt",
  desc: "Discussion avec ChatGPT",
  async execute(sock, m, args) {
    if (!args.length) {
      return sock.sendMessage(m.key.remoteJid, {
        text: "❌ Pose une question."
      });
    }

    try {
      const prompt = args.join(" ");

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      });

      const reply = response.choices[0].message.content;

      await sock.sendMessage(m.key.remoteJid, {
        text: `🤖 GPT : ${reply}`
      });
    } catch (e) {
      console.error(e);
      await sock.sendMessage(m.key.remoteJid, {
        text: "❌ Erreur OpenAI."
      });
    }
  }
};
