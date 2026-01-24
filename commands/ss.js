const puppeteer = require('puppeteer');

module.exports = {
  name: "ss",
  desc: "Prend une capture d’écran d’un site",
  async execute(sock, m, args) {
    try {
      if (!args.length) return await sock.sendMessage(m.key.remoteJid, { text: "❌ Envoie un lien pour la capture." });

      const url = args[0];

      // Lance Puppeteer
      const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 720 });

      // Va sur l'URL et prends la capture
      await page.goto(url, { waitUntil: 'networkidle2' });
      const screenshotBuffer = await page.screenshot({ fullPage: true });

      await browser.close();

      // Envoie l'image directement dans WhatsApp
      await sock.sendMessage(m.key.remoteJid, {
        image: screenshotBuffer,
        caption: `📸 Capture d'écran du site : ${url}`
      });

    } catch (err) {
      console.error(err);
      await sock.sendMessage(m.key.remoteJid, { text: "❌ Une erreur est survenue lors de la capture d'écran." });
    }
  }
};
