/**
 * 🤖 IB-HEX-MD WhatsApp Bot
 * Author : Ib Sacko
 * Engine : Baileys MD
 */

require("dotenv").config();

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const Pino = require("pino");
const QRCode = require("qrcode-terminal");
const fs = require("fs");
const path = require("path");

const handler = require("./handler");
const config = require("./config");

const SESSION_PATH = path.join(__dirname, "session");

async function startIBHEX() {
  console.log("⚡ Démarrage de IB-HEX-MD...");

  if (!fs.existsSync(SESSION_PATH)) {
    fs.mkdirSync(SESSION_PATH);
  }

  const { state, saveCreds } = await useMultiFileAuthState(SESSION_PATH);
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    logger: Pino({ level: "silent" }),
    auth: state,
    printQRInTerminal: true,
    browser: ["IB-HEX-MD", "Chrome", "2.0"]
  });

  // 💾 Sauvegarde session
  sock.ev.on("creds.update", saveCreds);

  // 🔌 Connexion
  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "open") {
      console.log("✅ IB-HEX-MD connecté !");
      console.log("🔑 Prefix :", config.prefix);
      console.log("🔧 Mode :", config.mode);
    }

    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode;

      if (reason !== DisconnectReason.loggedOut) {
        console.log("♻️ Reconnexion...");
        startIBHEX();
      } else {
        console.log("❌ Déconnecté définitivement. Supprime le dossier session.");
      }
    }
  });

  // 📩 Messages
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const m = messages[0];
    if (!m?.message || m.key.fromMe) return;

    try {
      await handler(sock, m);
    } catch (e) {
      console.error("Erreur handler :", e);
    }
  });
}

startIBHEX();
