/**
 * 🥷───────────────────────────────🥷
 * 🤖 IB-HEX-MD WhatsApp Bot
 * Author  : Ib Sacko
 * Prefix  : Ib
 * Version : 2.0.0
 * Engine  : Baileys Multi-Device
 * 🥷───────────────────────────────🥷
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

// ───────────────────────────────
// 🚀 START BOT
// ───────────────────────────────
async function startIBHEX() {
  console.log("⚡ Démarrage de IB-HEX-MD...");

  // 📁 Session folder
  if (!fs.existsSync(SESSION_PATH)) {
    fs.mkdirSync(SESSION_PATH);
  }

  const { version } = await fetchLatestBaileysVersion();

  const { state, saveCreds } = await useMultiFileAuthState(SESSION_PATH);

  const sock = makeWASocket({
    version,
    logger: Pino({ level: "silent" }),
    auth: state,
    printQRInTerminal: false,
    browser: ["IB-HEX-MD", "Chrome", "2.0"]
  });

  // 🔐 Sauvegarde session + SESSION_ID
  sock.ev.on("creds.update", async () => {
    await saveCreds();

    if (!process.env.SESSION_ID) {
      const sessionID = Buffer.from(
        JSON.stringify(state.creds)
      ).toString("base64");

      console.log("\n🔐 SESSION_ID (copie pour Render) :\n");
      console.log(sessionID);
      console.log("\n───────────────────────────────\n");
    }
  });

  // 📡 Connexion
  sock.ev.on("connection.update", (update) => {
    const { connection, qr, lastDisconnect } = update;

    if (qr) {
      console.log("\n📲 Scan le QR Code pour connecter IB-HEX-MD\n");
      QRCode.generate(qr, { small: true });
    }

    if (connection === "open") {
      console.log("✅ IB-HEX-MD connecté avec succès !");
      console.log(`🔧 Mode : ${config.mode}`);
      console.log(`🔑 Préfixe : ${config.prefix}`);
    }

    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode;

      if (reason !== DisconnectReason.loggedOut) {
        console.log("♻️ Reconnexion...");
        startIBHEX();
      } else {
        console.log("❌ Session supprimée. Relance avec QR.");
      }
    }
  });

  // 📩 Messages entrants
  sock.ev.on("messages.upsert", async ({ messages }) => {
    try {
      const m = messages[0];
      if (!m.message || m.key.fromMe) return;

      await handler(sock, m);
    } catch (err) {
      console.error("Message error:", err);
    }
  });
}

// ───────────────────────────────
// ▶️ RUN
// ───────────────────────────────
startIBHEX();
