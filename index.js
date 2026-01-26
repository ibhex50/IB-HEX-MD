/**
 * 🤖 IB-HEX-MD – QR Web + Render Compatible
 * Author : Ib Sacko
 */

require("dotenv").config();

const express = require("express");
const QRCode = require("qrcode");

const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason
} = require("@whiskeysockets/baileys");

const Pino = require("pino");
const fs = require("fs");
const path = require("path");

const handler = require("./handler");
const config = require("./config");

const app = express();
const PORT = process.env.PORT || 3000;

let latestQR = null;

const SESSION_PATH = path.join(__dirname, "session");
if (!fs.existsSync(SESSION_PATH)) fs.mkdirSync(SESSION_PATH);

// ─────────────────────────────
// 🌐 PAGE WEB QR
// ─────────────────────────────
app.get("/", async (req, res) => {
  if (!latestQR) {
    return res.send(`
      <h2>✅ IB-HEX-MD</h2>
      <p>Bot connecté ou QR non disponible.</p>
    `);
  }

  const qrImage = await QRCode.toDataURL(latestQR);
  res.send(`
    <html>
      <body style="text-align:center;font-family:sans-serif">
        <h2>📲 Scanner le QR WhatsApp</h2>
        <img src="${qrImage}" />
        <p>WhatsApp → Appareils liés</p>
      </body>
    </html>
  `);
});

// ─────────────────────────────
// 🚀 START BOT
// ─────────────────────────────
async function startBot() {
  console.log("⚡ Démarrage de IB-HEX-MD...");

  const { version } = await fetchLatestBaileysVersion();
  const { state, saveCreds } = await useMultiFileAuthState(SESSION_PATH);

  const sock = makeWASocket({
    version,
    logger: Pino({ level: "silent" }),
    auth: state,
    browser: ["IB-HEX-MD", "Chrome", "2.0"]
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, qr, lastDisconnect } = update;

    if (qr) {
      latestQR = qr;
      console.log("📲 QR reçu – disponible sur le site web");
    }

    if (connection === "open") {
      latestQR = null;
      console.log("✅ WhatsApp connecté !");
    }

    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode;
      if (reason !== DisconnectReason.loggedOut) {
        console.log("♻️ Reconnexion...");
        startBot();
      } else {
        console.log("❌ Session supprimée");
      }
    }
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    try {
      const m = messages[0];
      if (!m.message || m.key.fromMe) return;
      await handler(sock, m);
    } catch (e) {
      console.error(e);
    }
  });
}

// ─────────────────────────────
// ▶️ RUN
// ─────────────────────────────
app.listen(PORT, () => {
  console.log(`🌐 Serveur Web actif sur le port ${PORT}`);
  startBot();
});
