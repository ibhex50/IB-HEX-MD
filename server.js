const express = require('express')
const fs = require('fs')
const QRCode = require('qrcode')
const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys')

const app = express()
app.use(express.json())
app.use(express.static('web'))

if (!fs.existsSync('./sessions')) fs.mkdirSync('./sessions')

function makeId() {
    return Math.random().toString(36).substring(2, 10)
}

// 🔹 PAIR CODE
app.post('/pair', async (req, res) => {
    try {
        const number = req.body.number
        if (!number) return res.json({ error: 'Numéro requis' })

        const id = makeId()
        const { state, saveCreds } = await useMultiFileAuthState(`./sessions/${id}`)

        const sock = makeWASocket({
            auth: state,
            printQRInTerminal: false
        })

        sock.ev.on('creds.update', saveCreds)

        const code = await sock.requestPairingCode(number.replace('+', ''))

        res.json({
            pair_code: code,
            session_id: id
        })
    } catch (e) {
        res.json({ error: e.message })
    }
})

// 🔹 QR CODE
app.get('/qr', async (req, res) => {
    try {
        const id = makeId()
        const { state, saveCreds } = await useMultiFileAuthState(`./sessions/${id}`)

        const sock = makeWASocket({
            auth: state,
            printQRInTerminal: false
        })

        sock.ev.on('creds.update', saveCreds)

        sock.ev.on('connection.update', async ({ qr }) => {
            if (qr) {
                const img = await QRCode.toDataURL(qr)
                res.json({
                    qr: img,
                    session_id: id
                })
            }
        })
    } catch (e) {
        res.json({ error: e.message })
    }
})

app.listen(3000, () => {
    console.log('🌐 Site lancé : http://localhost:3000')
})
