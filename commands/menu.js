module.exports = {
  name: "menu",
  category: "menu",
  desc: "Afficher le menu complet du bot",
  async execute(sock, m) {
    const menu = `
🥷──𝗜𝗕-𝗛𝗘𝗫-𝗕𝗢𝗧─────🥷

『 𝗛𝗘𝗫-𝗠𝗘𝗡𝗨 』
│ ⬡ Ib menu
│ ⬡ Ib alive
│ ⬡ Ib ping
│ ⬡ Ib owner

『 𝗛𝗘𝗫-𝗢𝗪𝗡𝗘𝗥 』
│ ⬡ Ib join
│ ⬡ Ib leave
│ ⬡ Ib update
│ ⬡ Ib antidelete
│ ⬡ Ib upload
│ ⬡ Ib vv
│ ⬡ Ib allcmds
│ ⬡ Ib delete
│ ⬡ Ib repo

『 𝗛𝗘𝗫-𝗕𝗢𝗧-𝗔𝗜 』
│ ⬡ Ib ai
│ ⬡ Ib bug
│ ⬡ Ib bot
│ ⬡ Ib gemini
│ ⬡ Ib chatbot
│ ⬡ Ib gpt

『 𝗛𝗘𝗫-𝗖𝗩𝗧𝗥 』
│ ⬡ Ib attp
│ ⬡ Ib toimage
│ ⬡ Ib gimage
│ ⬡ Ib mp3
│ ⬡ Ib ss
│ ⬡ Ib fancy
│ ⬡ Ib url
│ ⬡ Ib sticker
│ ⬡ Ib take

『 𝗛𝗘𝗫-𝗦𝗘𝗔𝗥𝗖𝗛 』
│ ⬡ Ib google
│ ⬡ Ib play
│ ⬡ Ib video
│ ⬡ Ib song
│ ⬡ Ib mediafire
│ ⬡ Ib facebook
│ ⬡ Ib instagram
│ ⬡ Ib tiktok
│ ⬡ Ib lyrics
│ ⬡ Ib image

『 𝗛𝗘𝗫-𝗙𝗨𝗡 』
│ ⬡ Ib getpp
│ ⬡ Ib goodnight
│ ⬡ Ib wcg
│ ⬡ Ib rank
│ ⬡ Ib quizz
│ ⬡ Ib anime
│ ⬡ Ib profile
│ ⬡ Ib couple
│ ⬡ Ib poll
│ ⬡ Ib emojimix

『 𝗛𝗘𝗫-𝗚𝗥𝗢𝗨𝗣𝗦 』
│ ⬡ Ib kickall
│ ⬡ Ib tagadmin
│ ⬡ Ib acceptall
│ ⬡ Ib tagall
│ ⬡ Ib getall
│ ⬡ Ib group close
│ ⬡ Ib group open
│ ⬡ Ib add
│ ⬡ Ib vcf
│ ⬡ Ib linkgc
│ ⬡ Ib antilink
│ ⬡ Ib antisticker
│ ⬡ Ib antispam
│ ⬡ Ib create
│ ⬡ Ib setname
│ ⬡ Ib groupinfo

『 𝗛𝗘𝗫-𝗕𝗢𝗧-𝗥𝗘𝗔𝗖𝗧𝗜𝗢𝗡 』
│ ⬡ Ib yeet
│ ⬡ Ib slap
│ ⬡ Ib nom
│ ⬡ Ib poke
│ ⬡ Ib wave
│ ⬡ Ib smile
│ ⬡ Ib dance
│ ⬡ Ib smug
│ ⬡ Ib cringe
│ ⬡ Ib happy
│ ⬡ Ib shinobu
`;
    await sock.sendMessage(m.key.remoteJid, { text: menu });
  }
};
