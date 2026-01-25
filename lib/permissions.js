const config = require("../config");

async function isAdmin(sock, jid, user) {
  const meta = await sock.groupMetadata(jid);
  return meta.participants.some(p => p.id === user && p.admin);
}

function isOwner(user) {
  return config.owner.includes(user);
}

module.exports = { isAdmin, isOwner };
