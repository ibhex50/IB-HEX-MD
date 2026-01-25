function serialize(sock, m) {
  m.id = m.key.id;
  m.chat = m.key.remoteJid;
  m.fromMe = m.key.fromMe;
  m.sender = m.key.participant || m.chat;
  m.isGroup = m.chat.endsWith("@g.us");

  m.text =
    m.message?.conversation ||
    m.message?.extendedTextMessage?.text ||
    "";

  m.mentionedJid =
    m.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];

  m.quoted =
    m.message?.extendedTextMessage?.contextInfo?.quotedMessage
      ? {
          message:
            m.message.extendedTextMessage.contextInfo.quotedMessage
        }
      : null;

  return m;
}

module.exports = serialize;
