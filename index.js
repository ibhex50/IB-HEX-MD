/**
 * 🥷───────────────────────────────🥷
 * 🤖 IB-HEX-MD WhatsApp Bot
 * Author  : Ib Sacko
 * Prefix  : Ib
 * Version : 2.0.0
 * Engine  : Baileys Multi-Device
 * Web QR : http://<ton-app>.onrender.com
 * 🥷───────────────────────────────🥷
 */

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const express = require("express");
const QRCode = require("qrcode");
const Pino = require("pino");

const { 
  default: makeWASocket, 
  useMultiFileAuthState, 
  DisconnectReason, 
  fetchLatestBaileysVersion 
} = require("@whiskeysockets/baileys");

const handler = require("./handler");
const config = require("./config");

const SESSION_PATH = path.join(__dirname, "session");
let latestQRCodeData = "";

// ───────────────────────────────
// 🌐 Express pour la page Web QR
// ───────────────────────────────
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>IB-HEX-MD QR Code</title></head>
      <body style="display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:sans-serif;">
        <h1>IB-HEX-MD WhatsApp Bot</h1>
        <p>Scanne le QR ci-dessous avec WhatsApp</p>
        ${latestQRCodeData ? `<img src="${latestQRCodeData}" />` : "<p>QR non généré</p>"}
      </body>
    </html>
  `);
});

app.listen(PORT, () => console.log(`🌐 Serveur Web actif sur le port ${PORT}`));

// ───────────────────────────────
// 🚀 START BOT
// ───────────────────────────────
async function startIBHEX() {
  console.log("⚡ Démarrage de IB-HEX-MD...");

  if (!fs.existsSync(SESSION_PATH)) fs.mkdirSync(SESSION_PATH);

  const { version } = await fetchLatestBaileysVersion();
  const { state, saveCreds } = await useMultiFileAuthState(SESSION_PATH);

  const sock = makeWASocket({
    version,
    logger: Pino({ level: "silent" }),
    auth: state,
    printQRInTerminal: false,
    browser: ["IB-HEX-MD", "Chrome", "2.0"]
  });

  // 🔢 PAIR CODE (si activé)
  if (!state.creds.registered && process.env.PAIR_CODE === "true") {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question("📱 Numéro WhatsApp (ex: 224XXXXXXXX) : ", async (num) => {
      num = num.replace(/[^0-9]/g, "");
      console.log("\n🔗 Connecte-toi avec le QR qui va s'afficher sur ton navigateur...\n");
      rl.close();
    });
  }

  // 🔐 Sauvegarde session + SESSION_ID
  sock.ev.on("creds.update", async () => {
    await saveCreds();

    if (!process.env.SESSION_ID) {
      const sessionID = Buffer.from(JSON.stringify(state.creds)).toString("base64");
      console.log("\n🔐 SESSION_ID (copie pour Render) :\n");
      console.log(sessionID);
      console.log("\n───────────────────────────────\n");
    }
  });

  // 📡 Connexion
  sock.ev.on("connection.update", (update) => {
    const { connection, qr, lastDisconnect } = update;

    // 🔳 QR Code
    if (qr && process.env.PAIR_CODE !== "true") {
      QRCode.toDataURL(qr, (err, url) => {
        if (!err) latestQRCodeData = url;
      });
      QRCode.generate(qr, { small: true });
    }

    if (connection === "open") {
      console.log("✅ IB-HEX-MD connecté !");
      console.log(`🔧 Mode : ${config.mode}`);
      console.log(`🔑 Préfixe : ${config.prefix}`);
    }

    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode;
      if (reason !== DisconnectReason.loggedOut) {
        console.log("♻️ Reconnexion...");
        startIBHEX();
      } else {
        console.log("❌ Session supprimée. Relance avec QR ou Pair Code.");
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
