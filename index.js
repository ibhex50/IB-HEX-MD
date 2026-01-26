/**
 * 🥷 IB-HEX-MD
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

// 📁 Session
const SESSION_PATH = path.join(__dirname, "session");
if (!fs.existsSync(SESSION_PATH)) fs.mkdirSync(SESSION_PATH);

// 🚀 START BOT
async function startIBHEX() {
  console.log("⚡ Démarrage de IB-HEX-MD...");

  const { version } = await fetchLatestBaileysVersion();
  const { state, saveCreds } = await useMultiFileAuthState(SESSION_PATH);

  const sock = makeWASocket({
    version,
    logger: Pino({ level: "silent" }),
    auth: state,
    browser: ["IB-HEX-MD", "Chrome", "2.0"]
  });

  // 🔐 Sauvegarde session
  sock.ev.on("creds.update", saveCreds);

  // 📡 CONNEXION + QR
  sock.ev.on("connection.update", (update) => {
    const { connection, qr, lastDisconnect } = update;

    if (qr) {
      console.log("\n📲 Scanne le QR Code pour connecter IB-HEX-MD\n");
      QRCode.generate(qr, { small: true });
    }

    if (connection === "open") {
      console.log("✅ IB-HEX-MD connecté avec succès !");
      console.log("🔑 Préfixe :", config.prefix);
      console.log("🔧 Mode :", config.mode);
    }

    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode;
      if (reason !== DisconnectReason.loggedOut) {
        console.log("♻️ Reconnexion...");
        startIBHEX();
      } else {
        console.log("❌ Session supprimée. Rescan QR.");
      }
    }
  });

  // 📩 MESSAGES (FIX SYNCHRONISATION)
  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    try {
      if (type !== "notify") return;

      const m = messages[0];
      if (!m || !m.message) return;
      if (m.key.fromMe) return;

      await handler(sock, m);
    } catch (err) {
      console.error("❌ Message error :", err);
    }
  });
}

// ▶️ RUN
startIBHEX();
