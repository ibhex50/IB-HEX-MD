module.exports = {
  /* 🤖 Bot */
  botName: "IbBot",
  prefix: "Ib",

  /* 👑 Propriétaire */
  owner: [
  "224621963059@s.whatsapp.net",
  "224666952949@s.whatsapp.net"
]

  /* 🌍 Langue */
  language: "fr",

  /* ⚙️ Options générales */
  autoRead: true,
  autoTyping: false,
  autoRecording: false,
  autoVV: true, // 🥷 auto-vue des statuts

  /* 🧠 IA */
  openai: {
    apiKey: process.env.OPENAI_API_KEY || ""
  },

  gemini: {
    apiKey: process.env.GEMINI_API_KEY || ""
  },

  /* 🛡️ Sécurité */
  antiLink: true,
  antiSpam: true,
  maxSpam: 5,

  /* ⏱️ Cooldown */
  cooldown: 3, // secondes

  /* 📦 Téléchargements */
  maxFileSize: 50 * 1024 * 1024, // 50MB

  /* 🎭 Réactions */
  reactions: {
    enabled: true,
    pack: "waifu"
  }
};
