const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({ apiKey: process.env.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});
const openai = new OpenAIApi(configuration);

module.exports = {
  name: "chatbot",
  desc: "Discussion avec le chatbot",
  async execute(sock, m, args) {
    if (!args.length) 
      return await sock.sendMessage(m.key.remoteJid, { text: "❌ Écris quelque chose pour le chatbot." });

    const input = args.join(" ");

    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: input }],
      });

      const reply = response.data.choices[0].message.content;
      await sock.sendMessage(m.key.remoteJid, { text: `💬 Chatbot : ${reply}` });
    } catch (error) {
      console.error(error);
      await sock.sendMessage(m.key.remoteJid, { text: "❌ Erreur avec l'API Chatbot" });
    }
  }
};
