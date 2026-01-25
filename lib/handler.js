const fs = require("fs");
const path = require("path");
const config = require("../config");

const commands = new Map();

/* 🔄 Charger toutes les commandes */
function loadCommands() {
  const basePath = path.join(__dirname, "../commands");

  function readDir(dir) {
    const files = fs.readdirSync(dir);

    for (let file of files) {
      const full = path.join(dir, file);

      if (fs.statSync(full).isDirectory()) {
        readDir(full);
      } else if (file.endsWith(".js")) {
        const cmd = require(full);
        if (cmd.name) {
          commands.set(cmd.name.toLowerCase(), cmd);
          if (cmd.aliases) {
            cmd.aliases.forEach(a =>
              commands.set(a.toLowerCase(), cmd)
            );
          }
        }
      }
    }
  }

  readDir(basePath);
  console.log(`✅ ${commands.size} commandes chargées`);
}

/* ▶️ Handler principal */
async function handler(sock, m) {
  if (!m.text) return;

  const prefix = config.prefix;
  if (!m.text.startsWith(prefix)) return;

  const body = m.text.slice(prefix.length).trim();
  if (!body) return;

  const args = body.split(/\s+/);
  const commandName = args.shift().toLowerCase();

  const command = commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(sock, m, args);
  } catch (e) {
    console.error(`❌ Erreur cmd ${commandName}`, e);
    await sock.sendMessage(m.chat, {
      text: "❌ Erreur lors de l’exécution de la commande."
    });
  }
}

module.exports = { handler, loadCommands };
