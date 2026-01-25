module.exports = {
  name: "vcf",
  desc: "Exporter les contacts",
  async execute(sock, m) {
    if (!m.isGroup) return;
    const meta = await sock.groupMetadata(m.key.remoteJid);
    let vcf = "";

    meta.participants.forEach((p, i) => {
      vcf += `BEGIN:VCARD\nVERSION:3.0\nFN:Member ${i}\nTEL;type=CELL:${p.id.split("@")[0]}\nEND:VCARD\n`;
    });

    await sock.sendMessage(m.key.remoteJid, {
      document: Buffer.from(vcf),
      fileName: "group_contacts.vcf",
      mimetype: "text/vcard"
    });
  }
};
