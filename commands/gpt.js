const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

module.exports = {
  name: "gpt",
  desc: "Discussion avec ChatGPT",
  async execute(sock, m, args) {
    if (!args.length) 
      return await sock.sendMessage(m.key.remoteJid, { text: "❌ Pose une question à ChatGPT." });

    const question = args.join(" ");

    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }],
      });

      const answer = response.data.choices[0].message.content;
      await sock.sendMessage(m.key.remoteJid, { text: `🤖 ChatGPT : ${answer}` });
    } catch (error) {
      console.error(error);
      await sock.sendMessage(m.key.remoteJid, { text: "❌ Erreur avec l'API ChatGPT" });
    }
  }
};
