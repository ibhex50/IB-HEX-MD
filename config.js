// config.js
require('dotenv').config(); // Lit les variables dans .env

module.exports = {
  prefix: process.env.PREFIX || "Ib",     // Préfixe du bot
  mode: process.env.MODE || "public",     // Mode : public ou privé
  owner: process.env.OWNER || "224XXXXXXXX", // Ton numéro WhatsApp
  pairCode: process.env.PAIR_CODE === "true" ? true : false // PAIR_CODE activé ?
};
