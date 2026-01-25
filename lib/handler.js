const fs = require("fs");
const path = require("path");
const config = require("./config");

const commands = new Map();

/**
 * Charger toutes les commandes automatiquement
 */
function loadCommands(dir = "./commands") {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      loadCommands(fullPath);
    } else if (file.endsWith(".js")) {
      const cmd = require(fullPath);
      if (cmd.name) {
        commands.set(cmd.name.toLowerCase(), cmd);
      }
    }
  }
}

loadCommands();

/**
 * HANDLER PRINCIPAL
 */
module.exports = async function handler(sock, m) {
  try {
    if (!m.message) return;

    const body =
      m.message.conversation ||
      m.message.extendedTextMessage?.text ||
      m.message.imageMessage?.caption ||
      m.message.videoMessage?.caption ||
      "";

    if (!body.startsWith(config.prefix)) return;

    const args = body
      .slice(config.prefix.length)
      .trim()
      .split(/\s+/);

    const commandName = args.shift()?.toLowerCase();
    if (!commandName) return;

    const command = commands.get(commandName);
    if (!command) return;

    // 🔒 Mode privé
    if (config.mode === "private" && !config.owner.includes(m.sender)) {
      return sock.sendMessage(m.key.remoteJid, {
        text: "🔒 Bot en mode privé."
      });
    }

    // 👑 Commande owner
    if (command.owner && !config.owner.includes(m.sender)) {
      return sock.sendMessage(m.key.remoteJid, {
        text: "❌ Commande réservée au propriétaire."
      });
    }

    // 👥 Groupe uniquement
    if (command.group && !m.key.remoteJid.endsWith("@g.us")) {
      return sock.sendMessage(m.key.remoteJid, {
        text: "❌ Cette commande fonctionne uniquement en groupe."
      });
    }

    await command.execute(sock, m, args);
  } catch (err) {
    console.error("Handler error:", err);
    sock.sendMessage(m.key.remoteJid, {
      text: "❌ Une erreur est survenue."
    });
  }
};
