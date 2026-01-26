/**
 * 🥷───────────────────────────────🥷
 * Handler des commandes IB-HEX-MD
 * Author  : Ib Sacko
 * Version : 2.0
 * 🥷───────────────────────────────🥷
 */

const fs = require("fs");
const path = require("path");

// ────────────────
// Charger toutes les commandes dynamiquement
// ────────────────
const commands = {};

// Parcours du dossier commands
const walkDir = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith(".js")) {
      try {
        const cmd = require(fullPath);
        if (cmd.name) {
          commands[cmd.name.toLowerCase()] = cmd;
          console.log(`✅ Commande chargée : ${cmd.name}`);
        }
      } catch (err) {
        console.error(`❌ Erreur en chargeant ${file}:`, err);
      }
    }
  }
};

// Charger toutes les commandes depuis ./commands
walkDir(path.join(__dirname, "commands"));

// ────────────────
// Export du handler
// ────────────────
module.exports = async (sock, m) => {
  try {
    // Vérifie message
    if (!m.message || m.key.fromMe) return;

    let msgBody = m.message.conversation || m.message.extendedTextMessage?.text;
    if (!msgBody) return;

    // Préfixe depuis config
    const prefix = process.env.PREFIX || "Ib";

    // Vérifie préfixe
    if (!msgBody.startsWith(prefix)) return;

    // Extrait commande + arguments
    const args = msgBody.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Cherche la commande
    const cmd = commands[commandName];
    if (!cmd) return; // commande inexistante

    // Execute la commande
    await cmd.execute(sock, m, args);
  } catch (err) {
    console.error("Erreur handler:", err);
    await sock.sendMessage(m.key.remoteJid, { text: "❌ Une erreur est survenue." });
  }
};
